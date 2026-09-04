import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "fs";
import { tmpdir } from "os";
import { join } from "path";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import {
    buildTokenRegistry,
    extractTokensFromLess,
    findForbiddenBodyMentions,
    findGroupCollisions,
    isTokensBlockBroken,
    normalizeTokenEntry,
    readTokensBlock,
    run,
    writeTokensBlock,
} from "../syncAiMdTokens";

const aiMd = (tokensBlock: string, body = "\n# Component\n"): string =>
    ["---", "component: Calendar", tokensBlock, 'version: "1.0"', "---", body].join("\n");

describe("normalizeTokenEntry", () => {
    it("переводит css-переменную в путь токена", () => {
        expect(normalizeTokenEntry("--triplex-next-Calendar-Background")).toBe("Calendar.Background");
    });

    it("сохраняет подчёркивания в имени токена", () => {
        expect(normalizeTokenEntry("--triplex-next-Calendar-View_Item_Background_Hover")).toBe(
            "Calendar.View_Item_Background_Hover",
        );
    });

    it("не меняет уже нормализованный путь", () => {
        expect(normalizeTokenEntry("ColorBrand.50")).toBe("ColorBrand.50");
    });

    it("отбрасывает runtime-переменные — это не дизайн-токены", () => {
        expect(normalizeTokenEntry("--triplex-next-runtime-ImageGalleryExtended-Track_Shift")).toBeNull();
    });

    it("отбрасывает запись, из которой не собирается путь", () => {
        expect(normalizeTokenEntry("--triplex-next-Calendar")).toBeNull();
        expect(normalizeTokenEntry("просто текст")).toBeNull();
    });

    it("разбирает несуществующий токен — его отсеет проверка по реестру", () => {
        const { paths } = buildTokenRegistry();
        const path = normalizeTokenEntry("--triplex-next-scroll-width");

        expect(path).toBe("scroll.width");
        expect(paths.has(path!)).toBe(false);
    });
});

describe("findGroupCollisions", () => {
    it("находит пересечение имён core- и компонентных групп", () => {
        expect(findGroupCollisions(["ColorBrand", "Typography"], ["Calendar", "Typography"])).toEqual(["Typography"]);
    });

    it("молчит, когда пересечений нет", () => {
        expect(findGroupCollisions(["ColorBrand"], ["Calendar"])).toEqual([]);
    });

    it("группы реальных токенов не пересекаются", () => {
        const { coreGroups, componentGroups } = buildTokenRegistry();

        expect(findGroupCollisions(coreGroups, componentGroups)).toEqual([]);
    });
});

describe("buildTokenRegistry", () => {
    it("собирает пути core- и компонентных токенов", () => {
        const { paths } = buildTokenRegistry();

        expect(paths.has("ColorBrand.50")).toBe(true);
        expect(paths.has("Calendar.Background")).toBe(true);
        expect(paths.has("Calendar.Backgroundd")).toBe(false);
    });
});

describe("readTokensBlock", () => {
    it("читает блочный список", () => {
        const markdown = aiMd(["tokens:", "  - Calendar.Background", "  - Calendar.View_Header_Color"].join("\n"));

        expect(readTokensBlock(markdown)).toEqual(["Calendar.Background", "Calendar.View_Header_Color"]);
    });

    it("читает инлайн-форму", () => {
        expect(readTokensBlock(aiMd("tokens: []"))).toEqual([]);
        expect(readTokensBlock(aiMd("tokens: [Calendar.Background]"))).toEqual(["Calendar.Background"]);
    });

    it("читает многострочный flow-список с кавычками", () => {
        const markdown = aiMd(
            ["tokens: [", '  "--triplex-next-Calendar-Background",', '  "Calendar.View_Header_Color"', "]"].join("\n"),
        );

        expect(readTokensBlock(markdown)).toEqual(["--triplex-next-Calendar-Background", "Calendar.View_Header_Color"]);
    });

    it("снимает кавычки с записей блочного списка", () => {
        const markdown = aiMd(["tokens:", '  - "Calendar.Background"'].join("\n"));

        expect(readTokensBlock(markdown)).toEqual(["Calendar.Background"]);
    });

    it("не заходит за пределы frontmatter", () => {
        const markdown = aiMd("tokens: []", "\n## Дизайн-токены\n\n  - Calendar.Background\n");

        expect(readTokensBlock(markdown)).toEqual([]);
    });
});

describe("writeTokensBlock", () => {
    it("заменяет старый блок новым", () => {
        const markdown = aiMd(["tokens:", "  - --triplex-next-Calendar-Background"].join("\n"));

        expect(writeTokensBlock(markdown, ["Calendar.Background"])).toContain("tokens:\n  - Calendar.Background\n");
    });

    it("пустой список пишет инлайном", () => {
        const markdown = aiMd(["tokens:", "  - Calendar.Background"].join("\n"));

        expect(writeTokensBlock(markdown, [])).toContain("tokens: []");
    });

    it("не трогает остальной frontmatter и тело", () => {
        const markdown = aiMd("tokens: []", "\n# Calendar\n\nТекст.\n");
        const next = writeTokensBlock(markdown, ["Calendar.Background"]);

        expect(next).toContain("component: Calendar");
        expect(next).toContain('version: "1.0"');
        expect(next).toContain("Текст.");
    });

    it("заменяет многострочный flow-список целиком, не оставляя хвоста", () => {
        const markdown = aiMd(
            [
                "tokens: [",
                '  "--triplex-next-Calendar-Background",',
                '  "--triplex-next-Calendar-View_Header_Color"',
                "]",
            ].join("\n"),
        );
        const next = writeTokensBlock(markdown, ["Calendar.Background", "Calendar.View_Header_Color"]);

        expect(next).not.toContain("[");
        expect(next).not.toContain("]");
        expect(next).toContain("tokens:\n  - Calendar.Background\n  - Calendar.View_Header_Color\n");
        expect(next).toContain('version: "1.0"');
    });

    it("не трогает файл с незакрытым flow-списком", () => {
        const markdown = aiMd(["tokens: [", '  "Calendar.Background",'].join("\n"));

        expect(isTokensBlockBroken(markdown)).toBe(true);
        expect(writeTokensBlock(markdown, ["Calendar.Background"])).toBe(markdown);
    });

    it("идемпотентен", () => {
        const markdown = aiMd(["tokens:", "  - --triplex-next-Calendar-Background"].join("\n"));
        const once = writeTokensBlock(markdown, ["Calendar.Background"]);

        expect(writeTokensBlock(once, readTokensBlock(once))).toBe(once);
    });
});

describe("findForbiddenBodyMentions", () => {
    it("находит css-переменную токена в тексте", () => {
        const markdown = aiMd("tokens: []", "\nФон задаётся `--triplex-next-Calendar-Background`.\n");
        const mentions = findForbiddenBodyMentions(markdown);

        expect(mentions).toHaveLength(1);
        expect(mentions[0].text).toBe("--triplex-next-Calendar-Background");
    });

    it("разрешает runtime-переменные", () => {
        const markdown = aiMd("tokens: []", "\n`--triplex-next-runtime-ImageGalleryExtended-Track_Shift`\n");

        expect(findForbiddenBodyMentions(markdown)).toEqual([]);
    });

    it("разрешает обобщённый паттерн с плейсхолдерами", () => {
        const markdown = aiMd("tokens: []", "\n`--triplex-next-{Группа}-{Токен}-{версия}`\n");

        expect(findForbiddenBodyMentions(markdown)).toEqual([]);
    });

    it("не смотрит во frontmatter", () => {
        const markdown = aiMd(["tokens:", "  - --triplex-next-Calendar-Background"].join("\n"));

        expect(findForbiddenBodyMentions(markdown)).toEqual([]);
    });
});

describe("extractTokensFromLess", () => {
    it("собирает токены из var()", () => {
        const less = [
            ".calendar {",
            "    background: var(--triplex-next-Calendar-Background);",
            "    color: var(--triplex-next-Calendar-View_Item_Color_Default, #000);",
            "}",
        ].join("\n");

        expect(extractTokensFromLess(less).sort()).toEqual(["Calendar.Background", "Calendar.View_Item_Color_Default"]);
    });

    it("пропускает runtime-переменные и локальные css-переменные", () => {
        const less = [
            "transform: translateX(var(--triplex-next-runtime-ImageGalleryExtended-Track_Shift, 0%));",
            "width: calc(var(--lightBox-screen-width) - var(--lightBox-scroll-width, 0));",
        ].join("\n");

        expect(extractTokensFromLess(less)).toEqual([]);
    });

    it("не дублирует повторяющиеся токены", () => {
        const less =
            "a { color: var(--triplex-next-Link-Text_Color_Default); } b { color: var(--triplex-next-Link-Text_Color_Default); }";

        expect(extractTokensFromLess(less)).toEqual(["Link.Text_Color_Default"]);
    });
});

describe("run по конкретным файлам", () => {
    let directory: string;

    beforeEach(() => {
        directory = mkdtempSync(join(tmpdir(), "sync-ai-md-tokens-"));
    });

    afterEach(() => {
        rmSync(directory, { force: true, recursive: true });
    });

    const write = (content: string): string => {
        const file = join(directory, "Component-ai.md");

        writeFileSync(file, content);

        return file;
    };

    it("нормализует переданный файл", () => {
        const file = write(aiMd(["tokens:", "  - --triplex-next-Calendar-Background"].join("\n")));
        const result = run(false, [file]);

        expect(result.errors).toEqual([]);
        expect(result.changed).toEqual([file]);
        expect(readFileSync(file, "utf8")).toContain("tokens:\n  - Calendar.Background\n");
    });

    it("не переписывает файл с несуществующим токеном", () => {
        const markdown = aiMd(
            ["tokens:", "  - --triplex-next-Calendar-Background", "  - --triplex-next-scroll-width"].join("\n"),
        );
        const file = write(markdown);
        const result = run(false, [file]);

        expect(result.errors).toHaveLength(1);
        expect(result.changed).toEqual([]);
        expect(readFileSync(file, "utf8")).toBe(markdown);
    });

    it("не переписывает файл с незакрытым flow-списком", () => {
        const markdown = aiMd(["tokens: [", '  "--triplex-next-Calendar-Background",'].join("\n"));
        const file = write(markdown);
        const result = run(false, [file]);

        expect(result.errors).toHaveLength(1);
        expect(result.changed).toEqual([]);
        expect(readFileSync(file, "utf8")).toBe(markdown);
    });

    it("не сверяет с LESS при частичном прогоне", () => {
        const file = write(aiMd(["tokens:", "  - Calendar.Background"].join("\n")));

        expect(run(true, [file]).warnings).toEqual([]);
    });
});

describe("run: ошибки в тексте не мешают нормализации frontmatter", () => {
    let directory: string;

    beforeEach(() => {
        directory = mkdtempSync(join(tmpdir(), "sync-ai-md-tokens-body-"));
    });

    afterEach(() => {
        rmSync(directory, { force: true, recursive: true });
    });

    it("нормализует блок и всё равно сообщает про css-переменную в тексте", () => {
        const file = join(directory, "Component-ai.md");

        writeFileSync(
            file,
            aiMd(
                ["tokens:", "  - --triplex-next-Calendar-Background"].join("\n"),
                "\nФон — `--triplex-next-Calendar-Background`.\n",
            ),
        );

        const result = run(false, [file]);

        expect(result.errors).toHaveLength(1);
        expect(result.changed).toEqual([file]);
        expect(readFileSync(file, "utf8")).toContain("tokens:\n  - Calendar.Background\n");
    });
});
