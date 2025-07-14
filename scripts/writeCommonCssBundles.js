import fs from "fs";

// Папка со сгенерированными файлами.
const generatedDirName = "src/generated";
// Файл со сгенерированными css-переменными.
const cssVariablesSourceFileName = "themesCssVariables.css";

export default function writeCommonCssBundlesPlugin() {
    let cssVariablesContent = "";

    return {
        name: "writeCommonCssBundlesPlugin",

        buildStart() {
            cssVariablesContent = fs.readFileSync(`${generatedDirName}/${cssVariablesSourceFileName}`, "utf8");
        },

        generateBundle(options, bundle) {
            Object.keys(bundle).forEach((file) => {
                bundle[file].source = bundle[file].fileName.endsWith(".css")
                    ? `${cssVariablesContent}\n${bundle[file].source}`
                    : "";
            });
        },
    };
}
