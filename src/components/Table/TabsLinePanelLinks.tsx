import React from "react";
import { clsx } from "clsx";
import styles from "./styles/TabsLinePanelLinks.module.less";
import { ITabsLinePanelLinksProps } from "@sberbusiness/triplex-next/components/Table/TableBasic/types";
import { Text } from "@sberbusiness/triplex-next/components/Typography/Text";
import { EFontWeightText, ETextSize } from "@sberbusiness/triplex-next/components/Typography/enums";

/** Компонент TabsLinePanelLinks. */
export const TabsLinePanelLinks: React.FC<ITabsLinePanelLinksProps> = ({
    children,
    className,
    ...htmlDivAttributes
}) => (
    <Text
        tag="div"
        size={ETextSize.B3}
        weight={EFontWeightText.SEMIBOLD}
        className={clsx(className, styles.tabsLinePanelLinks)}
        {...htmlDivAttributes}
    >
        {children}
    </Text>
);

TabsLinePanelLinks.displayName = "TabsLinePanelLinks";
