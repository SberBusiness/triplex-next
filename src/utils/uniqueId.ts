export const uniqueId = (prefix?: string): string =>
    `${prefix ? prefix : ""}${Date.now()}${Math.ceil(Math.random() * 1000000)}`;
