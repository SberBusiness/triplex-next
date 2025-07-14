import { existsSync, mkdirSync, writeFileSync } from "fs";
import { DesignTokensCore } from "../src/components/DesignTokens/DesignTokensCore";
import { TDesignTokensCoreWithIndex } from "../src/components/DesignTokens/types/DesignTokensTypes";

// Папка со сгенерированными файлами.
const generatedDirName = "src/generated";
// Файл со списком ref токенов.
const refTokenTypesFileName = "refTokenTypes.ts";

/**
 * Генерирует массив названий токенов(ref токены), на которые можно ссылаться из других токенов.
 */
const generateRefTokenTypes = () => {
    if (!existsSync(generatedDirName)) {
        mkdirSync(generatedDirName);
    }

    const content: Array<string> = [];

    Object.keys(DesignTokensCore).forEach((tokenGroup) => {
        Object.keys((DesignTokensCore as TDesignTokensCoreWithIndex)[tokenGroup]).forEach((tokenTitle) => {
            content.push(`'${tokenGroup}.${tokenTitle}'`);
        });
    });

    writeFileSync(
        `${generatedDirName}/${refTokenTypesFileName}`,
        `export const designTokensRefs = [${content.join()}] as const;`,
    );
};

generateRefTokenTypes();
