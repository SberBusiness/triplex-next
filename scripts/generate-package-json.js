/** Скрипт для генерации package.json внутри dist на основе src/components/*. */
import path from "node:path";
import fs from "node:fs";
import { name, version, peerDependencies } from "../package.json";

const componentsDir = path.resolve(__dirname, "../src/components");
const distDir = path.resolve(__dirname, "../dist");

// Соберём все компоненты, у которых есть index.ts
const components = fs
    .readdirSync(componentsDir)
    .filter((name) => fs.existsSync(path.join(componentsDir, name, "index.ts")));

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
    version: version,
    main: "./index.js",
    module: "./index.js",
    types: "./index.d.ts",
    exports: exportsField,
    peerDependencies: peerDependencies || {},
};

fs.writeFileSync(path.join(distDir, "package.json"), JSON.stringify(distPackageJson, null, 2));

console.log("✅ dist/package.json создан!");
