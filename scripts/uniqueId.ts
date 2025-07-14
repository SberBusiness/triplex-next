export const uniqueId = (prefix?: string): string =>
    `${prefix ? prefix : ""}${Date.now()}${Math.floor(Math.random() * 1000000)}`;
