import React from "react";
import clsx from "clsx";
import { IUnorderedListExtendedItemProps } from "./types";
import { Text, ETextSize } from "../Typography";
import { UnorderedListExtendedItemMarker } from "./UnorderedListExtendedItemMarker";
import styles from "./styles/UnorderedListExtendedItem.module.less";

const UnorderedListExtendedItemRoot = React.forwardRef<HTMLLIElement, IUnorderedListExtendedItemProps>(
    ({ className, size = ETextSize.B3, ...restProps }, ref) => (
        <Text
            className={clsx(styles.unorderedListExtendedItem, className)}
            size={size}
            tag="li"
            {...restProps}
            data-tx={process.env.npm_package_version}
            ref={ref}
        />
    ),
);

UnorderedListExtendedItemRoot.displayName = "UnorderedListExtendedItem";

/**
 * Элемент расширенного маркированного списка. Рендерится как Text с tag="li",
 * размер текста по умолчанию — ETextSize.B3. Маркер добавляется явно,
 * первым потомком — UnorderedListExtended.Item.Marker.
 */
export const UnorderedListExtendedItem = Object.assign(UnorderedListExtendedItemRoot, {
    Marker: UnorderedListExtendedItemMarker,
});
