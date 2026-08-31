import React from "react";
import { clsx } from "clsx";
import styles from "./styles/ChipPanelLinks.module.less";
import { IChipPanelLinksProps } from "@sberbusiness/triplex-next/components/Table/TableBasic/types";
import { Text } from "@sberbusiness/triplex-next/components/Typography/Text";
import { EFontWeightText, ETextSize } from "@sberbusiness/triplex-next/components/Typography/enums";

/** Компонент ChipPanelLinks. */
export const ChipPanelLinks = React.forwardRef<HTMLDivElement, IChipPanelLinksProps>(
    ({ children, className, ...htmlDivAttributes }, ref) => (
        <Text
            tag="div"
            size={ETextSize.B3}
            weight={EFontWeightText.SEMIBOLD}
            className={clsx(className, styles.chipPanelLinks)}
            {...htmlDivAttributes}
            ref={ref}
        >
            {children}
        </Text>
    ),
);

ChipPanelLinks.displayName = "ChipPanelLinks";
