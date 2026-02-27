import { existsSync, mkdirSync, writeFileSync } from "fs";
import { DesignTokenUtils } from "../src/components/DesignTokens/DesignTokenUtils";
import { ETriplexNextTheme } from "../src/components/ThemeProvider/ETriplexNextTheme";

// Папка со сгенерированными файлами.
const generatedDirName = "src/generated";
// Файл со сгенерированными less-переменными.
const lessVariablesFileName = "colors.less";

/**
 * Генерирует файл с less-переменными на основе дизайн-токенов.
 */
const generateLessFromDesignTokens = () => {
    const lightThemeCssVariables = DesignTokenUtils.getStyle(ETriplexNextTheme.LIGHT, {});

    if (!existsSync(generatedDirName)) {
        mkdirSync(generatedDirName, { recursive: true });
    }

    const lessVariables = lightThemeCssVariables
        .split("\n")
        .map((line) => line.trim())
        .filter((line) => line.startsWith("--triplex-next-Color"))
        .map((line) => line.replace(/^--/, "@"))
        .map((line) => line.replace(/-\d+(?:-\d+){2}(?=:)/, ""))
        .join("\n");

    writeFileSync(`${generatedDirName}/${lessVariablesFileName}`, lessVariables);
};

generateLessFromDesignTokens();
