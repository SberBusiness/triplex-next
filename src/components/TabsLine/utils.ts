import { EComponentSize } from "@sberbusiness/triplex-next/enums/EComponentSize";
import { ETextSize } from "../Typography/enums";
import { ITabsLineItemProps } from "./components/TabsLineItem";

/** Соответствие размера таба размеру текста внутри него. */
export const tabsLineSizeToTextSizeMap = {
    [EComponentSize.LG]: ETextSize.B2,
    [EComponentSize.MD]: ETextSize.B3,
    [EComponentSize.SM]: ETextSize.B4,
} satisfies Record<EComponentSize, ETextSize>;

/** Результат разделения табов между строкой и выпадающим списком. */
export interface ITabsLineSplit {
    /** Табы, отображаемые в строке. */
    inlineTabs: ITabsLineItemProps[];
    /** Табы, уехавшие в выпадающий список. */
    dropdownTabs: ITabsLineItemProps[];
}

/**
 * Разделить табы на отображаемые в строке и уехавшие в выпадающий список.
 * maxVisible ограничивает общее число элементов строки вместе с кнопкой выпадающего списка,
 * поэтому в строке остаётся maxVisible - 1 табов. Пока табов не больше maxVisible, список не нужен
 * и все табы остаются в строке.
 */
export const splitTabsByMaxVisible = (tabs: ITabsLineItemProps[], maxVisible?: number): ITabsLineSplit => {
    if (!maxVisible || tabs.length <= maxVisible) {
        return { inlineTabs: tabs, dropdownTabs: [] };
    }

    const inlineCount = Math.max(maxVisible - 1, 0);

    return { inlineTabs: tabs.slice(0, inlineCount), dropdownTabs: tabs.slice(inlineCount) };
};
