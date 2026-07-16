import { version } from "../package.json";

// Текущая версия npm пакета. Точки заменены на '-'. Например 10-0-5.
const currentPackageVersion = version.replace(/\./g, "-");

function replaceDesignTokenVersion(content, id) {
    // Обрабатываем только less-файлы
    if (!id.includes(".less")) {
        return {
            code: content,
            map: null,
        };
    }

    // Ищем только переменные, которые начинаются с --triplex-next-
    const varRegex = /--triplex-next-([^\s):,]+)/g;

    const contentNext = content.replace(varRegex, (match, tokenTail) => {
        // Пропускаем переменные runtime, возвращая их как есть
        if (tokenTail.startsWith("runtime")) {
            return match;
        }
        // Для остальных токенов просто дописываем версию к найденному совпадению
        return `${match}-${currentPackageVersion}`;
    });

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
