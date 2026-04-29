/**
 * Генерирует mcp-data.json — bundle AI-документации для
 * @sberbusiness/triplex-next-mcp-server.
 *
 * Вызывается в релиз-workflow (.github/workflows/release.yml): результат
 * прикладывается к GitHub Release как asset, оттуда его скачивает
 * `scripts/fetch-bundle.ts` в mcp-server и раскладывает в дерево
 * `bundle/{components,guides,release-notes}/` + `bundle/manifest.json`.
 *
 * Bundle — transport-формат, не хранится в mcp-server. Поэтому схема простая:
 * плоский JSON с полным markdown в поле `raw`. Парсинг frontmatter и секций
 * выполняется в mcp-server (gray-matter), чтобы форматные изменения AI.md
 * не требовали пересборки bundle.
 *
 * Для компонентов без AI.md пишем минимальную запись с `raw: null` + `fallback`
 * (имя + путь к stories) — mcp-server возвращает `ai_ready: false`.
 *
 * Подробности: docs/ai/ROADMAP.md, Фаза 4.
 */
import { existsSync, mkdirSync, readFileSync, readdirSync, statSync, writeFileSync } from "fs";
import { basename, dirname, resolve } from "path";
import { fileURLToPath } from "url";
import { glob } from "glob";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");

interface ExampleEntry {
    name: string;
    path: string;
    code: string;
}

interface ComponentEntry {
    name: string;
    path: string;
    raw: string | null;
    examples: ExampleEntry[];
    fallback: {
        name: string;
        storiesPath: string | null;
    } | null;
}

interface GuideEntry {
    topic: string;
    path: string;
    raw: string;
}

interface ReleaseNoteEntry {
    version: string;
    path: string;
    raw: string;
}

interface Bundle {
    schemaVersion: 1;
    triplexVersion: string;
    generatedAt: string;
    components: ComponentEntry[];
    guides: GuideEntry[];
    releaseNotes: ReleaseNoteEntry[];
}

const GUIDE_TOPICS: { topic: string; file: string }[] = [
    { topic: "context", file: "CONTEXT.md" },
    { topic: "codestyle", file: "codestyle.md" },
    { topic: "tests", file: "tests.md" },
    { topic: "stories", file: "stories-guide.md" },
    { topic: "commits", file: "commits.md" },
    { topic: "template", file: "template-ai.md" },
];

function parseArgs(): { out: string } {
    const args = process.argv.slice(2);
    let out = resolve(ROOT, "mcp-data.json");
    for (let i = 0; i < args.length; i++) {
        if (args[i] === "--out" && args[i + 1]) {
            out = resolve(process.cwd(), args[i + 1]);
            i++;
        }
    }
    return { out };
}

function readPackageVersion(): string {
    const pkg = JSON.parse(readFileSync(resolve(ROOT, "package.json"), "utf-8")) as { version: string };
    return pkg.version;
}

/**
 * Стори, которые не попадают в bundle: Playground — интерактивная песочница без
 * показа кода, VisualTests — скриншот-регрессия без показа кода. Обе бесполезны
 * как пример использования для AI-агента. См. docs/ai/stories-guide.md.
 */
const EXCLUDED_STORIES = new Set(["Playground", "VisualTests"]);

/**
 * Парсит секцию `## Stories` в AI.md, вытаскивает ссылки из колонки `Example file`
 * и читает соответствующие файлы из `stories/.../examples/`.
 *
 * Ожидаемый формат в AI.md:
 *   Файлы примеров: `stories/Category/examples/Component/`
 *   | Story | Example file | ... |
 *   | `Name` | `NameExample.tsx` | ... |  — или `—` если inline в stories.tsx
 *
 * В multi-component документах (Alert-AI.md: AlertContext + AlertProcess) может
 * быть несколько пар "Файлы примеров: + таблица". Активная директория обновляется
 * при каждом появлении строки `Файлы примеров:` и применяется к последующим строкам
 * таблицы до следующего обновления.
 *
 * Стори из EXCLUDED_STORIES пропускаются.
 */
function collectExamples(raw: string, componentName: string): ExampleEntry[] {
    const lines = raw.split("\n");
    const examples: ExampleEntry[] = [];
    let inStories = false;
    let currentDir: string | null = null;
    let hasExampleColumn = false;

    for (const line of lines) {
        if (/^##\s+Stories\b/.test(line)) {
            inStories = true;
            continue;
        }
        if (inStories && /^##\s/.test(line)) {
            break;
        }
        if (!inStories) {
            continue;
        }

        const dirMatch = line.match(/Файлы примеров:\s*`([^`]+)`/);
        if (dirMatch) {
            currentDir = dirMatch[1].replace(/\/$/, "");
            hasExampleColumn = false;
            continue;
        }

        if (/\|\s*Story\s*\|/.test(line)) {
            hasExampleColumn = /\|\s*Example file\s*\|/i.test(line);
            continue;
        }
        if (!hasExampleColumn || !currentDir) {
            continue;
        }
        if (/^\|[\s\-|]+\|\s*$/.test(line)) {
            continue;
        }

        const rowMatch = line.match(/^\|\s*`([^`]+)`\s*\|\s*(?:`([^`]+)`|—|-)\s*\|/);
        if (!rowMatch) {
            continue;
        }
        const [, storyName, fileName] = rowMatch;
        if (!fileName) {
            continue;
        }
        if (EXCLUDED_STORIES.has(storyName)) {
            continue;
        }
        const relPath = `${currentDir}/${fileName}`;
        const absPath = resolve(ROOT, relPath);
        if (!existsSync(absPath)) {
            process.stderr.write(`  warn: example not found for ${componentName}: ${relPath}\n`);
            continue;
        }
        examples.push({
            name: storyName,
            path: relPath,
            code: readFileSync(absPath, "utf-8"),
        });
    }
    return examples;
}

function collectComponents(): ComponentEntry[] {
    const componentsDir = resolve(ROOT, "src/components");
    const entries: ComponentEntry[] = [];
    const covered = new Set<string>();

    const aiMdPaths = glob.sync("src/components/*/*-AI.md", { cwd: ROOT }).sort();
    for (const relPath of aiMdPaths) {
        const absPath = resolve(ROOT, relPath);
        const raw = readFileSync(absPath, "utf-8");
        const fileName = basename(relPath);
        const name = fileName.replace(/-AI\.md$/, "");
        const dirName = basename(dirname(relPath));
        // Multi-component папки (Button/ButtonIcon-AI.md) — директория считается
        // "покрытой" только если в ней есть AI.md с именем самой директории.
        covered.add(`${dirName}/${name}`);
        entries.push({ name, path: relPath, raw, examples: collectExamples(raw, name), fallback: null });
    }

    const componentDirs = readdirSync(componentsDir).filter((entry) => {
        const full = resolve(componentsDir, entry);
        return statSync(full).isDirectory();
    });

    for (const dir of componentDirs) {
        if (covered.has(`${dir}/${dir}`)) {
            continue;
        }
        const storiesMatches = glob.sync(`stories/**/${dir}.stories.tsx`, { cwd: ROOT });
        entries.push({
            name: dir,
            path: `src/components/${dir}`,
            raw: null,
            examples: [],
            fallback: {
                name: dir,
                storiesPath: storiesMatches[0] ?? null,
            },
        });
    }

    entries.sort((a, b) => a.name.localeCompare(b.name));
    return entries;
}

function collectGuides(): GuideEntry[] {
    const guides: GuideEntry[] = [];
    for (const { topic, file } of GUIDE_TOPICS) {
        const relPath = `docs/ai/${file}`;
        const absPath = resolve(ROOT, relPath);
        if (!existsSync(absPath)) {
            continue;
        }
        guides.push({ topic, path: relPath, raw: readFileSync(absPath, "utf-8") });
    }
    return guides;
}

function collectReleaseNotes(): ReleaseNoteEntry[] {
    const notes: ReleaseNoteEntry[] = [];
    const files = glob.sync("stories/release-notes/v1/*.mdx", { cwd: ROOT }).sort();
    for (const relPath of files) {
        const absPath = resolve(ROOT, relPath);
        notes.push({
            version: basename(relPath, ".mdx"),
            path: relPath,
            raw: readFileSync(absPath, "utf-8"),
        });
    }
    return notes;
}

function main(): void {
    const { out } = parseArgs();
    const triplexVersion = readPackageVersion();
    const components = collectComponents();
    const guides = collectGuides();
    const releaseNotes = collectReleaseNotes();

    const bundle: Bundle = {
        schemaVersion: 1,
        triplexVersion,
        generatedAt: new Date().toISOString(),
        components,
        guides,
        releaseNotes,
    };

    mkdirSync(dirname(out), { recursive: true });
    writeFileSync(out, `${JSON.stringify(bundle, null, 2)}\n`);

    const aiReady = components.filter((c) => c.raw !== null).length;
    const fallback = components.length - aiReady;
    const totalExamples = components.reduce((sum, c) => sum + c.examples.length, 0);
    process.stdout.write(
        [
            `Wrote ${out}`,
            `  triplexVersion: ${triplexVersion}`,
            `  components: ${components.length} (${aiReady} AI-ready, ${fallback} fallback)`,
            `  examples: ${totalExamples}`,
            `  guides: ${guides.length}`,
            `  releaseNotes: ${releaseNotes.length}`,
            "",
        ].join("\n"),
    );
}

main();
