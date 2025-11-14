import { createHash } from "node:crypto";
import { version } from "../package.json";

/**
 * Все классы, которые не должны хешироваться.
 * Можно расширить список или использовать паттерны.
 */
const NON_HASHED_CLASS_RE = /^(global-)/;

const componentFileNameRE = /[/\\]src[/\\]components[/\\](\w+)[/\\]/;

function generateClassNameHash(input: string) {
    const hash = createHash("sha256").update(input).digest("hex");
    return hash.slice(0, 8);
}

/**
 * generateScopedName
 *
 * 1. Классы начинающиеся с `global-` — **не хешируются**, остаются глобальными.
 *    Используется для тех CSS-селекторов, которые должны быть едиными между модулями.
 *
 * 2. Если файл не находится в папке src/components/* — класс **не хешируется**
 *
 * 3. Иначе создаётся хеш: `localName__abcdef01`
 *    Хеш основан на имени компонента + имени класса + версии библиотеки.
 */
function generateScopedName(name: string, fileName: string) {
    if (NON_HASHED_CLASS_RE.test(name)) {
        return name;
    }

    const matchResult = fileName.match(componentFileNameRE);
    if (matchResult === null) {
        return name;
    }

    const componentName = matchResult[1];
    const hash = generateClassNameHash(componentName + name + version);

    return `${name}__${hash}`;
}

export default generateScopedName;
