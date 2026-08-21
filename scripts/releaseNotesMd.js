/**
 * Преобразование release notes из MDX в markdown для GitHub Release.
 *
 * Канон преобразования зафиксирован в .agents/skills/release/SKILL.md
 * (раздел «Преобразование MDX → release notes»); этот скрипт — его
 * исполняемая форма, чтобы команда выпуска умещалась в одну строку:
 *
 *   node scripts/releaseNotesMd.js stories/release-notes/v0/0.42.0.mdx \
 *     | gh release create 0.42.0 --target release-0 --title "0.42.0" \
 *       --latest=false --notes-file -
 *
 * Правила: строки `import …`, `<Meta … />` и `<Title>…</Title>` удаляются,
 * `<Heading>X</Heading>` превращается в `## X`, остальное — без изменений.
 * Подряд идущие пустые строки схлопываются, пустые строки по краям убираются.
 */
import fs from "node:fs";

const [, , mdxPath] = process.argv;

if (!mdxPath) {
    console.error("Usage: node scripts/releaseNotesMd.js <path-to-notes.mdx | ->");
    process.exit(1);
}

let source;
try {
    // «-» — чтение из stdin, для запуска без чекаута нужной ветки:
    // git show origin/release-0:<путь>.mdx | node scripts/releaseNotesMd.js -
    source = fs.readFileSync(mdxPath === "-" ? 0 : mdxPath, "utf8");
} catch (error) {
    console.error(`Не удалось прочитать ${mdxPath}: ${error.message}`);
    process.exit(1);
}

const lines = [];
let insideImport = false;
let headerDone = false;
for (const rawLine of source.split("\n")) {
    const line = rawLine.trimEnd();
    const trimmed = line.trim();
    // Шапка (import / <Meta> / <Title>) вырезается только до первой
    // содержательной строки — import внутри fenced-блока с примером кода
    // дальше по тексту не пострадает. import может быть отформатирован
    // в несколько строк — пропускаем блок целиком, до завершающей `;`.
    if (!headerDone) {
        if (insideImport) {
            if (trimmed.endsWith(";")) {
                insideImport = false;
            }
            continue;
        }
        if (trimmed.startsWith("import ")) {
            insideImport = !trimmed.endsWith(";");
            continue;
        }
        if (trimmed.startsWith("<Meta") || trimmed.startsWith("<Title")) {
            continue;
        }
        if (trimmed !== "") {
            headerDone = true;
        }
    }
    const heading = trimmed.match(/^<Heading>(.*)<\/Heading>$/);
    if (heading) {
        lines.push(`## ${heading[1]}`);
        continue;
    }
    lines.push(line);
}

const collapsed = [];
for (const line of lines) {
    if (line === "" && (collapsed.length === 0 || collapsed[collapsed.length - 1] === "")) {
        continue;
    }
    collapsed.push(line);
}
while (collapsed.length > 0 && collapsed[collapsed.length - 1] === "") {
    collapsed.pop();
}

process.stdout.write(`${collapsed.join("\n")}\n`);
