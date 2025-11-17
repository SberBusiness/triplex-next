/**
 * Генерирует шаблон файл с описанием токенов компонента.
 * Пример запуска скрипта npm run generateComponentTokensTemplate --component=Tooltip
 */

import { existsSync, writeFileSync } from "fs";
import path from "path";

const generateComponentTokensTemplate = () => {
    console.log(process.env.npm_config_component);
    let componentName = process.env.npm_config_component;

    if (!componentName) {
        console.log("Не указано имя компонента, например --component=Tooltip.");
        return;
    }

    // Установка заглавной первой буквы.
    componentName = componentName.charAt(0).toUpperCase() + componentName.slice(1);

    const filePath = path.resolve("src/components/DesignTokens/components/", componentName + ".ts");

    if (existsSync(filePath)) {
        console.log(`Файл с токенами для компонента ${componentName} уже создан.`);
        return;
    }

    const fileContent = `import { TDesignTokenValue, TDesignTokenValues } from "../types/DesignTokenTypes";

// Название токенов компонента ${componentName}.
export const designTokensComponents${componentName}Keys = ["Background"] as const;
// Тип, содержащий названия токенов компонента ${componentName}.
export type TDesignTokensComponents${componentName}Keys = (typeof designTokensComponents${componentName}Keys)[number];
// Тип, содержащий названия токенов компонента ${componentName} и их значения.
export type TDesignTokensComponents${componentName}Value = Record<TDesignTokensComponents${componentName}Keys, TDesignTokenValue>;
// Тип, содержащий названия токенов компонента ${componentName} и их значения в светлой и темной теме.
export type TDesignTokensComponents${componentName}Values = Record<TDesignTokensComponents${componentName}Keys, TDesignTokenValues>;
// Тип локальных токенов компонента ${componentName}.
export type TDesignTokensComponents${componentName} = { ${componentName}: TDesignTokensComponents${componentName}Value };

// Токены компонента ${componentName} в светлой и темной темах.
export const ${componentName}_Tokens: TDesignTokensComponents${componentName}Values = {
    Background: [{ ref: "ColorNeutral.100" }, { value: "#000000" }], // var(--triplex-next-${componentName}-Background)
};
`;

    writeFileSync(filePath, fileContent);

    console.log(`
        Сгенерирован файл с описанием токенов для компонента ${componentName}.
        Для примера токена добавлено свойство background.
        Нужно добавить export * from './${componentName}'; в index.ts, TDesignTokensComponents${componentName} в тип TDesignTokensComponents (src/components/DesignTokens/types/DesignTokensTypes.ts).
        Добавить импорты ${componentName}_Tokens в файлы src/components/DesignTokens/DesignTokensComponents.ts и src/components/DesignTokens/DesignTokensComponentsThemeDark.ts.
    `);
};

generateComponentTokensTemplate();
