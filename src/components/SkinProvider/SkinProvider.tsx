import React from "react";
import { SkinContext, TSkin } from "./SkinContext";

/** Свойства провайдера скина. */
export interface ISkinProviderProps {
    /** WordArt для Button, FormField, Checkbox, Radio, Chip, Tag, SegmentedControl, CardStatic, CardAction, Island TYPE_1, Dropdown, Tabs, TabsExtended, TabsLine, ModalWindowContent, TableBasic, Tooltip, Notification, NotificationGrouped, Stepper и StepperExtended. null отключает скин в этой ветке. */
    skin: TSkin;
    /** Компоненты, которым передаётся скин, в том числе через React-порталы. */
    children: React.ReactNode;
}

/**
 * Выбирает оформление для поддерживаемых компонентов Triplex.
 * Не создаёт DOM-обёртку и не меняет тему: ref и className не требуются.
 * Палитра настраивается токенами SkinProvider.WordArt_* через обычный ThemeProvider.
 */
export const SkinProvider: React.FC<ISkinProviderProps> = ({ skin, children }) => (
    <SkinContext.Provider value={skin}>{children}</SkinContext.Provider>
);

SkinProvider.displayName = "SkinProvider";
