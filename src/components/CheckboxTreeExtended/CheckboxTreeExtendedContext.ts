import React from "react";
import { EComponentSize } from "../../enums/EComponentSize";

/** Контекст дерева чекбоксов. */
export interface ICheckboxTreeExtendedContext {
    /** Размер дерева чекбоксов. */
    size: EComponentSize;
}

export const initialCheckboxTreeExtendedContext: ICheckboxTreeExtendedContext = {
    size: EComponentSize.MD,
};

/**
 * Контекст дерева чекбоксов.
 */
export const CheckboxTreeExtendedContext = React.createContext<ICheckboxTreeExtendedContext>(
    initialCheckboxTreeExtendedContext,
);
