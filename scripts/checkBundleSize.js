/**
 * Проверка размера собранных JS-файлов в dist.
 *
 * Защита от того, чтобы в бандл случайно не попали dev-only зависимости
 * (vitest, testing-library и т.п.). Именно так в 1.39.0 тестовый хелпер
 * `__tests__/utils.ts` стал entry-точкой и утянул vitest в общий чанк vendor,
 * раздув его с 640 KB до 1.28 MB и уронив пакет у потребителей.
 *
 * Проверяются два лимита:
 *
 * 1. На каждый JS-файл отдельно. Ловит распухший чанк: всё из node_modules
 *    сливается в единственный `vendor` (см. manualChunks в vite.config.ts),
 *    поэтому утечка runtime-зависимости всегда видна как один большой файл.
 * 2. На суммарный вес всех JS-файлов. Ловит то, что первый лимит пропускает:
 *    утечку кода мимо node_modules (stories, генерируемые файлы, алиас
 *    `@sberbusiness/triplex-next` → src) и медленный рост сотен мелких файлов.
 *
 * Для калибровки: 1.38.0 — 1726 KB суммарно, сломанный 1.39.0 — 2392 KB.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.resolve(__dirname, "../dist");

/** Лимит на один JS-файл в KB. Переопределяется через BUNDLE_SIZE_LIMIT_KB. */
const LIMIT_KB = Number(process.env.BUNDLE_SIZE_LIMIT_KB ?? 700);
const LIMIT_BYTES = LIMIT_KB * 1024;

/** Лимит на суммарный вес всех JS-файлов в KB. Переопределяется через BUNDLE_TOTAL_LIMIT_KB. */
const TOTAL_LIMIT_KB = Number(process.env.BUNDLE_TOTAL_LIMIT_KB ?? 2000);
const TOTAL_LIMIT_BYTES = TOTAL_LIMIT_KB * 1024;

/** Сколько самых крупных файлов показывать в отчёте. */
const TOP_COUNT = 5;

function collectJsFiles(dir) {
    const result = [];

    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        const fullPath = path.join(dir, entry.name);

        if (entry.isDirectory()) {
            result.push(...collectJsFiles(fullPath));
        } else if (entry.name.endsWith(".js")) {
            result.push({ path: fullPath, size: fs.statSync(fullPath).size });
        }
    }

    return result;
}

const formatKB = (bytes) => `${(bytes / 1024).toFixed(1)} KB`;
const formatRow = ({ path: filePath, size }) => `  ${path.relative(distDir, filePath)} — ${formatKB(size)}`;

if (!fs.existsSync(distDir)) {
    console.error(`[checkBundleSize] Директория ${distDir} не найдена. Сначала выполни сборку.`);
    process.exit(1);
}

const files = collectJsFiles(distDir).sort((a, b) => b.size - a.size);

if (files.length === 0) {
    console.error("[checkBundleSize] В dist нет ни одного .js файла — сборка выглядит сломанной.");
    process.exit(1);
}

const totalSize = files.reduce((sum, file) => sum + file.size, 0);
const oversized = files.filter((file) => file.size > LIMIT_BYTES);
const errors = [];

if (oversized.length > 0) {
    errors.push(`Превышен лимит размера отдельного файла (${LIMIT_KB} KB):\n${oversized.map(formatRow).join("\n")}`);
}

if (totalSize > TOTAL_LIMIT_BYTES) {
    errors.push(`Превышен лимит суммарного веса JS (${TOTAL_LIMIT_KB} KB): ${formatKB(totalSize)}`);
}

const topFiles = files.slice(0, TOP_COUNT).map(formatRow).join("\n");

if (errors.length > 0) {
    console.error(`\n[checkBundleSize] Сборка не прошла проверку размера.\n`);
    console.error(errors.join("\n\n"));
    console.error(
        `\nТоп-${TOP_COUNT} по размеру:\n${topFiles}\n\n` +
            "Вероятная причина — в бандл попала dev-зависимость (vitest, @testing-library, storybook).\n" +
            "Проверь, не стал ли entry-точкой файл из __tests__/ или *.stories.*: список entry задаётся\n" +
            "глобом в vite.config.ts (build.rollupOptions.input).\n" +
            'Найти виновника: grep -rl "vitest" dist/\n' +
            "Если рост размера легитимный — подними лимит в scripts/checkBundleSize.js осознанно.\n",
    );
    process.exit(1);
}

console.log(
    `[checkBundleSize] OK: ${files.length} JS-файлов, суммарно ${formatKB(totalSize)} ` +
        `(лимиты: ${LIMIT_KB} KB на файл, ${TOTAL_LIMIT_KB} KB суммарно).\n` +
        `Топ-${TOP_COUNT}:\n${topFiles}`,
);
