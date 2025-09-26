import { ETabsExtendedTabButtonSize } from "./enums";
import { ETextSize } from "../Typography/enums";
import styles from "./styles/TabsExtendedTabButton.module.less";

export const tabsExtendedSizeToCssClassMap = {
    [ETabsExtendedTabButtonSize.LG]: styles.lg,
    [ETabsExtendedTabButtonSize.MD]: styles.md,
    [ETabsExtendedTabButtonSize.SM]: styles.sm,
};

export const tabsExtendedSizeToTextSizeMap = {
    [ETabsExtendedTabButtonSize.LG]: ETextSize.B2,
    [ETabsExtendedTabButtonSize.MD]: ETextSize.B3,
    [ETabsExtendedTabButtonSize.SM]: ETextSize.B4,
};
