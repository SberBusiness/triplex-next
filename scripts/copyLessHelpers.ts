import { existsSync, mkdirSync, readdirSync, copyFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sourceDir = path.resolve(__dirname, "../src/helpers/less");
const distDir = path.resolve(__dirname, "../dist/helpers/less");

const copyLessHelpers = (): void => {
    if (!existsSync(distDir)) {
        mkdirSync(distDir, { recursive: true });
    }

    const lessHelpers = readdirSync(sourceDir);

    lessHelpers.forEach((file) => {
        const sourcePath = path.join(sourceDir, file);
        const destinationPath = path.join(distDir, file);

        copyFileSync(sourcePath, destinationPath);
    });
};

copyLessHelpers();
