import React from "react";
import { EComponentSize } from "../../enums/EComponentSize";

/** Значение контекста IslandWidget — состояние виджета для его составных частей. */
export interface IIslandWidgetContext {
    /** Виджет отображается в адаптиве (ширина экрана мобильного устройства). */
    adaptive: boolean;
    /** Сворачивание контента в адаптиве отключено. */
    disableAdaptiveCollapsing: boolean;
    /** Контент виджета раскрыт. Значимо только в адаптиве при включённом сворачивании. */
    open: boolean;
    /** Размер виджета — из него части берут свои отступы и размеры текста. */
    size: EComponentSize;
}

const contextInitial: IIslandWidgetContext = {
    adaptive: false,
    disableAdaptiveCollapsing: false,
    open: false,
    size: EComponentSize.MD,
};

/** Контекст IslandWidget. Внутренний: в публичный barrel не экспортируется. */
export const IslandWidgetContext = React.createContext(contextInitial);
