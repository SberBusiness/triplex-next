import type { ISuggestFieldOption } from "@sberbusiness/triplex-next";

export const SUGGEST_STORY_FRUITS = [
    "Hot Pepper",
    "Corn",
    "Tomato",
    "Eggplant",
    "Grapes",
    "Melon",
    "Watermelon",
    "Tangerine",
    "Lemon",
    "Banana",
    "Pineapple",
    "Red Apple",
    "Green Apple",
    "Pear",
    "Peach",
    "Cherries",
    "Strawberry",
    "Avocado",
    "Cucumber",
    "Kiwi",
    "Coconut",
    "Mango",
    "Blueberries",
    "Bell Pepper",
    "Olive",
    "Pea Pod",
] as const;

export const SUGGEST_STORY_FRUITS_SHORT = ["Hot Pepper", "Corn", "Tomato", "Eggplant", "Grapes", "Melon"] as const;

export function mapFruitsToSuggestOptions(fruits: readonly string[]): ISuggestFieldOption[] {
    return fruits.map((fruit, index) => ({
        id: `suggest-option-${index}`,
        label: fruit,
    }));
}

export function mapFruitsToOptionsWithNotification(
    fruits: readonly string[],
    notificationIndex: number,
): ISuggestFieldOption[] {
    return fruits.map((fruit, index) => ({
        id: `suggest-option-${index}`,
        label: fruit,
        showNotificationIcon: index === notificationIndex,
    }));
}
