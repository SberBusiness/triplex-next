import { createHash } from "node:crypto";
import { version } from "../package.json";

const componentFileNameRE = /[/\\]src[/\\]components[/\\](\w+)[/\\]/;

function generateClassNameHash(input: string) {
    const hash = createHash("sha256").update(input).digest("hex");

    return hash.slice(0, 8);
}

function generateScopedName(name: string, fileName: string) {
    const matchResult = fileName.match(componentFileNameRE);

    if (matchResult === null) {
        return name;
    }

    const componentName = matchResult[1];

    return name + "__" + generateClassNameHash(componentName + name + version);
}

export default generateScopedName;
