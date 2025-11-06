import { ETabsExtendedType } from "./enums";
import { EComponentSize } from "@sberbusiness/triplex-next/enums/EComponentSize";
import styles from "./styles/TabsExtendedTabButton.module.less";
import { ETextSize } from "../Typography/enums";

export const tabsExtendedSizeToClassNameMap = {
    [EComponentSize.LG]: styles.lg,
    [EComponentSize.MD]: styles.md,
    [EComponentSize.SM]: styles.sm,
};

export const tabsExtendedSizeToTextSizeMap = {
    [EComponentSize.LG]: ETextSize.B2,
    [EComponentSize.MD]: ETextSize.B3,
    [EComponentSize.SM]: ETextSize.B4,
};

export const typeToClassNameKeyMap = {
    [ETabsExtendedType.TYPE_1]: "type1",
    [ETabsExtendedType.TYPE_2]: "type2",
} as const;
