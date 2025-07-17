/** Скрипт для генерации package.json внутри dist на основе src/components/*. */
import path from "path";
import fs from "fs";
import { readFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const pkgStr = await readFile(resolve(__dirname, '../package.json'), 'utf8');
const pkg = JSON.parse(pkgStr);
const { name, scripts, ...rest } = pkg;
const componentsDir = path.resolve(__dirname, "../src/components");
const distDir = path.resolve(__dirname, "../dist");

// Соберём все компоненты, у которых есть index.ts
const components = fs
    .readdirSync(componentsDir).filter((name) => fs.existsSync(path.join(componentsDir, name, "index.ts")));

const exportsField = {
    ".": {
        import: "./index.js",
        types: "./index.d.ts",
    },
};

components.forEach((name) => {
    exportsField[`./components/${name}`] = {
        import: `./components/${name}/${name}.js`,
        types: `./components/${name}/${name}.d.ts`,
    };
});

const distPackageJson = {
    name: name,
    ...rest,
    exports: exportsField,
};

fs.writeFileSync(path.join(distDir, "package.json"), JSON.stringify(distPackageJson, null, 2));

console.log("✅ dist/package.json создан!");