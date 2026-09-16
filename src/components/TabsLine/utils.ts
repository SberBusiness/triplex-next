import { EComponentSize } from "@sberbusiness/triplex-next/enums/EComponentSize";
import { ETextSize } from "../Typography/enums";

/** Соответствие размера таба размеру текста внутри него. */
export const tabsLineSizeToTextSizeMap = {
    [EComponentSize.LG]: ETextSize.B2,
    [EComponentSize.MD]: ETextSize.B3,
    [EComponentSize.SM]: ETextSize.B4,
} satisfies Record<EComponentSize, ETextSize>;

/**
 * Результат разделения табов между строкой и выпадающим списком.
 * Тип таба параметризован: utils не должен зависеть от модуля компонента —
 * TabsLineItem импортирует отсюда tabsLineSizeToTextSizeMap, и обратный импорт замкнул бы цикл.
 */
export interface ITabsLineSplit<T> {
    /** Табы, отображаемые в строке. */
    inlineTabs: T[];
    /** Табы, уехавшие в выпадающий список. */
    dropdownTabs: T[];
}

/**
 * Разделить табы на отображаемые в строке и уехавшие в выпадающий список.
 * maxVisible ограничивает общее число элементов строки вместе с кнопкой выпадающего списка,
 * поэтому в строке остаётся maxVisible - 1 табов. Пока табов не больше maxVisible, список не нужен
 * и все табы остаются в строке.
 */
export const splitTabsByMaxVisible = <T>(tabs: T[], maxVisible?: number): ITabsLineSplit<T> => {
    if (!maxVisible || tabs.length <= maxVisible) {
        return { inlineTabs: tabs, dropdownTabs: [] };
    }

    const inlineCount = Math.max(maxVisible - 1, 0);

    return { inlineTabs: tabs.slice(0, inlineCount), dropdownTabs: tabs.slice(inlineCount) };
};
