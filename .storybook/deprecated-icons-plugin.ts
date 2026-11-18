import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import type { Plugin } from "vite";

const VIRTUAL_MODULE_ID = "virtual:deprecated-icons";
const RESOLVED_VIRTUAL_MODULE_ID = `\0${VIRTUAL_MODULE_ID}`;

/** Пометка в JSDoc `.d.ts`: `@deprecated` или `@deprecated use <Замена> …` (регистр `use` не важен). */
const DEPRECATED_PATTERN = /@deprecated(?:\s+use\s+(\w+))?/i;

/** Файл декларации иконки, например `DefaulticonStrokePrdIcon32.d.ts`; группа — имя иконки. */
const ICON_DTS_PATTERN = /^(\w+Icon\d+)\.d\.ts$/;

const require = createRequire(import.meta.url);

/**
 * Отдаёт виртуальный модуль `virtual:deprecated-icons` — имена иконок `@sberbusiness/icons-next`,
 * помеченных `@deprecated`, с именем иконки на замену (`null`, если замена не указана).
 * В рантайме пакет признака не даёт: пометка есть только в JSDoc `.d.ts`.
 */
export const deprecatedIconsPlugin = (): Plugin => ({
    name: "triplex:deprecated-icons",
    resolveId: (id) => (id === VIRTUAL_MODULE_ID ? RESOLVED_VIRTUAL_MODULE_ID : undefined),
    load: (id) => {
        if (id !== RESOLVED_VIRTUAL_MODULE_ID) {
            return undefined;
        }

        const iconsDir = path.dirname(require.resolve("@sberbusiness/icons-next/package.json"));
        const entries = fs.readdirSync(iconsDir).flatMap((file) => {
            const iconName = ICON_DTS_PATTERN.exec(file)?.[1];

            if (!iconName) {
                return [];
            }

            const match = DEPRECATED_PATTERN.exec(fs.readFileSync(path.join(iconsDir, file), "utf-8"));

            return match ? [[iconName, match[1] ?? null]] : [];
        });

        return `export default new Map(${JSON.stringify(entries)});`;
    },
});
