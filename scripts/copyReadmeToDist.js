/**
 * Копирует README.md в папку dist перед публикацией.
 * Используется для того, чтобы npm-пакет содержал описание,
 * которое отображается на странице npmjs.com.
 */

import fs from "node:fs";
import path from "node:path";

const rootReadme = path.resolve("./README.md");
const distDir = path.resolve("./dist");
const distReadme = path.join(distDir, "README.md");

try {
    if (!fs.existsSync(rootReadme)) {
        console.warn("⚠️  README.md не найден в корне проекта. Пропускаем копирование.");
        process.exit(0);
    }

    if (!fs.existsSync(distDir)) {
        fs.mkdirSync(distDir, { recursive: true });
    }

    fs.copyFileSync(rootReadme, distReadme);
    console.log("✅ README.md успешно скопирован в dist/");
} catch (err) {
    console.error("❌ Ошибка при копировании README.md:", err);
    process.exit(1);
}
