declare module "*?raw" {
    const content: string;
    export default content;
}

/**
 * Иконки `@sberbusiness/icons-next`, помеченные `@deprecated`: имя → имя иконки на замену
 * (`null`, если замена не указана). См. `.storybook/deprecated-icons-plugin.ts`.
 */
declare module "virtual:deprecated-icons" {
    const deprecatedIcons: ReadonlyMap<string, string | null>;
    export default deprecatedIcons;
}
