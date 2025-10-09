import path from "node:path";
import fs from "node:fs";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rootPkgPath = path.resolve(__dirname, "../package.json");
const srcComponentsDir = path.resolve(__dirname, "../src/components");
const distDir = path.resolve(__dirname, "../dist");

const exists = (p) => fs.existsSync(p);
const readJSON = async (p) => JSON.parse(await readFile(p, "utf8"));

function getComponentNames() {
    if (!exists(srcComponentsDir)) return [];
    return fs
        .readdirSync(srcComponentsDir, { withFileTypes: true })
        .filter((d) => d.isDirectory())
        .filter((d) =>
            ["index.ts", "index.tsx", "index.js", "index.jsx"].some((f) =>
                exists(path.join(srcComponentsDir, d.name, f)),
            ),
        )
        .map((d) => d.name);
}

function buildExports(componentNames) {
    const exportsField = {
        ".": { import: "./index.js", types: "./index.d.ts" },
    };
    for (const name of componentNames) {
        exportsField[`./components/${name}`] = {
            import: `./components/${name}/${name}.js`,
            types: `./components/${name}/${name}.d.ts`,
        };
    }
    return exportsField;
}

function stripDevFields(pkg) {
    const clone = { ...pkg };
    delete clone.scripts;
    delete clone.devDependencies;
    delete clone["lint-staged"];
    delete clone.husky;
    delete clone.overrides;
    delete clone.publishConfig;
    delete clone.workspaces;
    delete clone.engines;
    delete clone.packageManager;
    delete clone.volta;
    return clone;
}

(async function main() {
    const rootPkg = await readJSON(rootPkgPath);
    const components = getComponentNames();
    const exportsField = buildExports(components);

    const {
        name,
        version,
        description,
        license,
        repository,
        author,
        keywords,
        peerDependencies, // External
        dependencies, // Vendor chunk
    } = rootPkg;

    const distPkg = stripDevFields({
        name,
        version,
        description,
        license,
        repository,
        author,
        keywords,
        type: "module",
        main: "./index.js",
        module: "./index.js",
        types: "./index.d.ts",
        exports: exportsField,
        sideEffects: ["*.css", "*.less"],
        files: ["**/*.js", "**/*.d.ts", "**/*.css", "**/*.less", "!**/*.map", "README.md"],
        peerDependencies,
        dependencies,
    });

    if (!exists(distDir)) fs.mkdirSync(distDir, { recursive: true });
    fs.writeFileSync(path.join(distDir, "package.json"), JSON.stringify(distPkg, null, 2));
    console.log("✅ dist/package.json создан!");
})();
