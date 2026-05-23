import React, { forwardRef } from "react";
import { EFontWeightText, ETextSize } from "../../Typography/enums";
import { Text, TTextProps } from "../../Typography/Text";

/** Свойства CollapsibleTreeNodeLabel. */
export type TCollapsibleTreeNodeLabelProps = Omit<TTextProps<"span">, "tag" | "size"> & {
    /** Размер текста. По умолчанию `B1`. */
    size?: ETextSize;
};

/**
 * Лейбл ноды CollapsibleTree.
 * Обёртка над {@link Text} с дефолтами `size=B1` и `weight=SEMIBOLD`.
 * Используй как `label` в {@link ICollapsibleTreeNodeBranch} или внутри `CollapsibleTreeNodeHeader`,
 * когда нужно переопределить размер/толщину шрифта (например, в кастомном `renderHeader` у `CollapsibleTreeExtended`).
 */
export const CollapsibleTreeNodeLabel = forwardRef<HTMLSpanElement, TCollapsibleTreeNodeLabelProps>(
    ({ size = ETextSize.B1, weight = EFontWeightText.SEMIBOLD, children, ...props }, ref) => (
        <Text ref={ref} tag="span" size={size} weight={weight} {...props}>
            {children}
        </Text>
    ),
);

CollapsibleTreeNodeLabel.displayName = "CollapsibleTreeNodeLabel";
