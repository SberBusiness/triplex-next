/**
 * Генерирует mcp-data.json — bundle AI-документации для
 * @sberbusiness/triplex-next-mcp-server.
 *
 * Вызывается в релиз-workflow (.github/workflows/release.yml): результат
 * прикладывается к GitHub Release как asset, оттуда его скачивает
 * `scripts/fetch-bundle.ts` в mcp-server и раскладывает в дерево
 * `data/{components,guides,release-notes}/` + `data/manifest.json`.
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

interface ComponentEntry {
    name: string;
    path: string;
    raw: string | null;
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
    { topic: "template", file: "template-AI.md" },
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
        entries.push({ name, path: relPath, raw, fallback: null });
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
    process.stdout.write(
        [
            `Wrote ${out}`,
            `  triplexVersion: ${triplexVersion}`,
            `  components: ${components.length} (${aiReady} AI-ready, ${fallback} fallback)`,
            `  guides: ${guides.length}`,
            `  releaseNotes: ${releaseNotes.length}`,
            "",
        ].join("\n"),
    );
}

main();
