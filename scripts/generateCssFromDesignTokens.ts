import { existsSync, mkdirSync, writeFileSync } from "fs";
import { DesignTokenUtils } from "../src/components/DesignTokens/DesignTokenUtils";
import { ETriplexNextTheme } from "../src/components/ThemeProvider/ETriplexNextTheme";

// Папка со сгенерированными файлами.
const generatedDirName = "src/generated";
// Файл со сгенерированными css-переменными.
const cssVariablesFileName = "themesCssVariables.css";

/**
 * Генерирует файл с css-переменными на основе дизайн-токенов.
 */
const generateCssFromDesignTokens = () => {
    // eslint-disable @typescript-eslint/no-unsafe-member-access
    const lightThemeCssVariables = DesignTokenUtils.getStyle(ETriplexNextTheme.LIGHT, {});

    if (!existsSync(generatedDirName)) {
        mkdirSync(generatedDirName);
    }

    const themesVariables = `html {${lightThemeCssVariables}}`;

    writeFileSync(`${generatedDirName}/${cssVariablesFileName}`, themesVariables);
};

generateCssFromDesignTokens();
