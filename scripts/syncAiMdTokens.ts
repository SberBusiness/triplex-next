/**
 * Синхронизирует блок `tokens:` во frontmatter AI-документации компонентов
 * (`{Component}-ai.md`) с реальными дизайн-токенами библиотеки.
 *
 * Публичный слой токенов — TS-дерево (`DesignTokensCore` + `DesignTokensComponents`).
 * Путь токена — `Группа.Токен`, ровно в этом виде он передаётся в `ThemeProvider`
 * через prop `tokens`. CSS-переменные `--triplex-next-*` — внутренний слой: на сборке
 * к имени дописывается версия пакета, поэтому в документации для потребителя их быть
 * не должно. Подробности: docs/ai/CONTEXT.md → «Дизайн-токены».
 *
 * Что делает скрипт:
 * - нормализует записи `tokens:` в формат `Группа.Токен` (принимает и старый
 *   css-формат `--triplex-next-Группа-Токен`), идемпотентно;
 * - валидирует, что каждый токен существует в TS-дереве;
 * - проверяет тело AI.md на упоминания `--triplex-next-*` (разрешены только
 *   runtime-переменные и обобщённый паттерн с плейсхолдерами `{...}`);
 * - падает, если имена групп core- и компонентных токенов пересеклись;
 * - предупреждает о расхождениях между токенами в LESS компонента и в AI.md.
 *
 * Состав токенов конкретного AI.md скрипт не переписывает: в одной директории
 * живёт несколько компонентов с разными наборами (см. src/components/List),
 * поэтому автоматически развести их по файлам нельзя. Скрипт нормализует и
 * проверяет то, что перечислил автор, а расхождения с LESS показывает
 * предупреждениями.
 *
 * Запуск:
 *   npm run syncAiMdTokens            — нормализует файлы
 *   npm run syncAiMdTokens -- --check — только проверка, ничего не пишет
 */
import { readFileSync, writeFileSync } from "fs";
import { dirname } from "path";
import { pathToFileURL } from "url";
import { globSync } from "glob";
import { DesignTokensCore } from "../src/components/DesignTokens/DesignTokensCore";
import { DesignTokensComponents } from "../src/components/DesignTokens/DesignTokensComponents";

/** Glob файлов AI-документации компонентов. */
const AI_MD_GLOB = "src/components/*/*-ai.md";
/** Префикс css-переменных дизайн-токенов. */
const CSS_VAR_PREFIX = "--triplex-next-";
/** Префикс runtime-переменных: это не токены, их упоминание в теле AI.md допустимо. */
const RUNTIME_PREFIX = "runtime-";

/** Реестр реальных токенов: имена групп и путей `Группа.Токен`. */
export interface ITokenRegistry {
    /** Имена групп core-токенов (палитра). */
    coreGroups: string[];
    /** Имена групп компонентных токенов. */
    componentGroups: string[];
    /** Все существующие пути `Группа.Токен`. */
    paths: Set<string>;
}

/** Проблема, найденная в одном файле. */
export interface IIssue {
    file: string;
    message: string;
}

/** Собирает реестр реальных токенов из TS-дерева. */
export const buildTokenRegistry = (): ITokenRegistry => {
    const paths = new Set<string>();
    const collect = (tokens: Record<string, Record<string, unknown>>): string[] =>
        Object.keys(tokens).map((group) => {
            Object.keys(tokens[group]).forEach((token) => paths.add(`${group}.${token}`));
            return group;
        });

    const coreGroups = collect(DesignTokensCore as unknown as Record<string, Record<string, unknown>>);
    const componentGroups = collect(DesignTokensComponents as unknown as Record<string, Record<string, unknown>>);

    return { coreGroups, componentGroups, paths };
};

/**
 * Гард на коллизию имён: core- и компонентные группы живут в одном плоском
 * неймспейсе (`TDesignTokens = TDesignTokensCore & TDesignTokensComponents`),
 * поэтому одинаковые имена схлопнутся при мердже токенов и сломают типы.
 */
export const findGroupCollisions = (coreGroups: string[], componentGroups: string[]): string[] => {
    const core = new Set(coreGroups);

    return componentGroups.filter((group) => core.has(group));
};

/**
 * Приводит запись `tokens:` к пути `Группа.Токен`.
 * Принимает старый css-формат и новый путь. Возвращает null, если запись нераспознана.
 */
export const normalizeTokenEntry = (raw: string): string | null => {
    const entry = raw.trim();

    if (entry.startsWith(CSS_VAR_PREFIX)) {
        const tail = entry.slice(CSS_VAR_PREFIX.length);

        if (tail.startsWith(RUNTIME_PREFIX)) {
            return null;
        }

        const separator = tail.indexOf("-");

        if (separator <= 0 || separator === tail.length - 1) {
            return null;
        }

        return `${tail.slice(0, separator)}.${tail.slice(separator + 1)}`;
    }

    return /^[A-Za-z][A-Za-z0-9]*\.[A-Za-z0-9_]+$/.test(entry) ? entry : null;
};

/** Границы frontmatter в markdown-файле. */
interface IFrontmatter {
    /** Индекс первой строки frontmatter (после открывающего `---`). */
    start: number;
    /** Индекс закрывающего `---`. */
    end: number;
    lines: string[];
}

/** Возвращает границы frontmatter или null, если его нет. */
export const parseFrontmatter = (markdown: string): IFrontmatter | null => {
    const lines = markdown.split("\n");

    if (lines[0] !== "---") {
        return null;
    }

    const end = lines.indexOf("---", 1);

    return end === -1 ? null : { start: 1, end, lines };
};

/** Снимает кавычки с записи YAML. */
const stripQuotes = (entry: string): string =>
    entry
        .trim()
        .replace(/^["']|["']$/g, "")
        .trim();

/** Разобранный блок `tokens:`: его границы в строках файла и записи. */
interface ITokensBlock {
    /** Индекс строки `tokens:`. */
    line: number;
    /** Индекс первой строки после блока. */
    blockEnd: number;
    entries: string[];
}

/**
 * Находит блок `tokens:` во frontmatter. Поддерживает три формы YAML:
 * `tokens: []`, однострочный и многострочный flow-список `[...]`, блочный список `- ...`.
 */
const findTokensBlock = (markdown: string): ITokensBlock | null => {
    const frontmatter = parseFrontmatter(markdown);

    if (!frontmatter) {
        return null;
    }

    const { lines, start, end } = frontmatter;
    const line = lines.findIndex((text, index) => index >= start && index < end && /^tokens:/.test(text));

    if (line === -1) {
        return null;
    }

    const inline = lines[line].slice("tokens:".length).trim();

    if (inline.startsWith("[")) {
        let blockEnd = line;
        let flow = "";

        // Flow-список может занимать несколько строк — собираем до закрывающей скобки.
        while (blockEnd < end) {
            flow += blockEnd === line ? inline : lines[blockEnd];

            if (flow.includes("]")) {
                break;
            }

            blockEnd++;
        }

        if (!flow.includes("]")) {
            // Незакрытый flow-список: не трогаем файл, пусть чинит автор.
            return { line, blockEnd: line + 1, entries: [] };
        }

        const entries = flow
            .slice(flow.indexOf("[") + 1, flow.lastIndexOf("]"))
            .split(",")
            .map(stripQuotes)
            .filter(Boolean);

        return { line, blockEnd: blockEnd + 1, entries };
    }

    const entries: string[] = [];
    let blockEnd = line + 1;

    while (blockEnd < end) {
        const match = /^\s+-\s+(.+?)\s*$/.exec(lines[blockEnd]);

        if (!match) {
            break;
        }

        entries.push(stripQuotes(match[1]));
        blockEnd++;
    }

    return { line, blockEnd, entries };
};

/** Читает записи блока `tokens:` из frontmatter. */
export const readTokensBlock = (markdown: string): string[] => findTokensBlock(markdown)?.entries ?? [];

/** Переписывает блок `tokens:` во frontmatter. Пустой список пишется как `tokens: []`. */
export const writeTokensBlock = (markdown: string, tokens: string[]): string => {
    const block = findTokensBlock(markdown);

    if (!block) {
        return markdown;
    }

    const lines = markdown.split("\n");
    const next = tokens.length ? ["tokens:", ...tokens.map((token) => `  - ${token}`)] : ["tokens: []"];

    return [...lines.slice(0, block.line), ...next, ...lines.slice(block.blockEnd)].join("\n");
};

/**
 * Находит в теле AI.md упоминания css-переменных дизайн-токенов.
 * Разрешены runtime-переменные и обобщённый паттерн с плейсхолдерами
 * (`--triplex-next-{Группа}-{Токен}-{версия}`) — им описывают внутренний слой.
 */
export const findForbiddenBodyMentions = (markdown: string): Array<{ line: number; text: string }> => {
    const frontmatter = parseFrontmatter(markdown);
    const lines = markdown.split("\n");
    const bodyStart = frontmatter ? frontmatter.end + 1 : 0;
    const mentions: Array<{ line: number; text: string }> = [];

    for (let index = bodyStart; index < lines.length; index++) {
        const matches = lines[index].matchAll(/--triplex-next-([^\s`),:;]*)/g);

        for (const match of matches) {
            const tail = match[1];

            if (tail.startsWith(RUNTIME_PREFIX) || tail.startsWith("{")) {
                continue;
            }

            mentions.push({ line: index + 1, text: match[0] });
        }
    }

    return mentions;
};

/** Вытаскивает пути токенов, использованных в LESS-исходнике. */
export const extractTokensFromLess = (less: string): string[] => {
    const found = new Set<string>();
    const matches = less.matchAll(/var\(\s*--triplex-next-([A-Za-z0-9]+)-([A-Za-z0-9_]+)/g);

    for (const match of matches) {
        if (match[1] === "runtime") {
            continue;
        }

        found.add(`${match[1]}.${match[2]}`);
    }

    return [...found];
};

/** Собирает токены, использованные в LESS-файлах директории компонента. */
const readDirectoryLessTokens = (directory: string): Set<string> => {
    const tokens = new Set<string>();

    globSync(`${directory}/**/*.less`).forEach((file) => {
        extractTokensFromLess(readFileSync(file, "utf8")).forEach((token) => tokens.add(token));
    });

    return tokens;
};

/** Результат прогона по всем AI.md. */
interface IRunResult {
    changed: string[];
    errors: IIssue[];
    warnings: IIssue[];
}

/** Нормализует и проверяет все AI.md. В режиме check ничего не пишет на диск. */
export const run = (check: boolean): IRunResult => {
    const registry = buildTokenRegistry();
    const collisions = findGroupCollisions(registry.coreGroups, registry.componentGroups);
    const result: IRunResult = { changed: [], errors: [], warnings: [] };

    if (collisions.length) {
        result.errors.push({
            file: "src/components/DesignTokens",
            message: `Имена групп core- и компонентных токенов пересекаются: ${collisions.join(", ")}. Токены схлопнутся при мердже — переименуй группу.`,
        });

        return result;
    }

    const files = globSync(AI_MD_GLOB).sort();
    // Токены из LESS считаются один раз на директорию: в ней может быть несколько AI.md.
    const lessTokensByDirectory = new Map<string, Set<string>>();
    const declaredByDirectory = new Map<string, Set<string>>();

    files.forEach((file) => {
        const markdown = readFileSync(file, "utf8");
        const entries = readTokensBlock(markdown);
        const normalized: string[] = [];

        entries.forEach((entry) => {
            const path = normalizeTokenEntry(entry);

            if (!path) {
                result.errors.push({ file, message: `Запись "${entry}" не является путём токена.` });
                return;
            }

            if (!registry.paths.has(path)) {
                result.errors.push({ file, message: `Токена "${path}" нет в дизайн-токенах.` });
                return;
            }

            if (!normalized.includes(path)) {
                normalized.push(path);
            }
        });

        findForbiddenBodyMentions(markdown).forEach(({ line, text }) => {
            result.errors.push({
                file,
                message: `Строка ${line}: css-переменная "${text}" в тексте. Указывай путь токена вида Группа.Токен.`,
            });
        });

        const directory = dirname(file);

        if (!lessTokensByDirectory.has(directory)) {
            lessTokensByDirectory.set(directory, readDirectoryLessTokens(directory));
            declaredByDirectory.set(directory, new Set());
        }

        normalized.forEach((path) => declaredByDirectory.get(directory)!.add(path));

        const next = writeTokensBlock(markdown, normalized);

        if (next !== markdown) {
            result.changed.push(file);

            if (!check) {
                writeFileSync(file, next);
            }
        }
    });

    lessTokensByDirectory.forEach((lessTokens, directory) => {
        const declared = declaredByDirectory.get(directory)!;
        const missing = [...lessTokens].filter((token) => !declared.has(token)).sort();
        const extra = [...declared].filter((token) => !lessTokens.has(token)).sort();

        if (missing.length) {
            result.warnings.push({
                file: directory,
                message: `Токены есть в LESS, но не указаны ни в одном AI.md: ${missing.join(", ")}`,
            });
        }

        if (extra.length) {
            result.warnings.push({
                file: directory,
                message: `Токены указаны в AI.md, но не встречаются в LESS директории: ${extra.join(", ")}`,
            });
        }
    });

    return result;
};

const main = (): void => {
    const check = process.argv.includes("--check");
    const { changed, errors, warnings } = run(check);

    warnings.forEach(({ file, message }) => console.warn(`warning ${file}: ${message}`));
    errors.forEach(({ file, message }) => console.error(`error ${file}: ${message}`));

    if (changed.length) {
        console.log(
            check
                ? `Формат tokens: устарел в ${changed.length} файл(ах). Прогони: npm run syncAiMdTokens\n${changed.join("\n")}`
                : `Обновлено файлов: ${changed.length}\n${changed.join("\n")}`,
        );
    } else {
        console.log("Блоки tokens: в актуальном формате.");
    }

    if (errors.length || (check && changed.length)) {
        process.exit(1);
    }
};

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    main();
}
