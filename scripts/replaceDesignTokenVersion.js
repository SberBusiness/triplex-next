import { uniq } from "lodash";
import { version } from "../package.json";

// Текущая версия npm пакета. Точки заменены на '-'. Например 10-0-5.
const currentPackageVersion = version.replace(/\./g, "-");

function replaceDesignTokenVersion(content, id) {
    if (!id.includes(".css")) {
        return {
            code: content,
            map: null, // provide source map if available
        };
    }

    // Содержимое css-файла с добавленной версией npm пакета.
    let contentNext = content;
    // Регулярное выражение, для поиска css-переменных.
    const cssVariableRegexp = /(--)[^,:)]+/g;
    // Массив css-переменных файла.
    const cssVariableMatch = content.match(cssVariableRegexp);

    if (cssVariableMatch) {
        // Массив css-переменных файла без повторений, содержащие подстроку -triplex.
        const cssVariableUniq = uniq(cssVariableMatch).filter((cssVariable) => cssVariable.includes("--triplex"));

        if (cssVariableUniq.length) {
            // Замена 'version' на текущую версию npm пакета.
            cssVariableUniq.forEach((cssVariable) => {
                // Добавление версии npm пакета в конец переменной.
                const cssVariableNameWithVersion = `var(${cssVariable}-${currentPackageVersion})`;
                // Название css-переменной без версии npm пакета.
                const regex = new RegExp(`var\\(${cssVariable}\\)`, "g");
                contentNext = contentNext.replace(regex, cssVariableNameWithVersion);
            });
        }
    }

    return {
        code: contentNext,
        map: null, // provide source map if available
    };
}

export default function replaceDesignTokenVersionPlugin() {
    return {
        name: "replaceDesignTokenVersionPlugin",
        transform: replaceDesignTokenVersion,
    };
}
