import { ETabsExtendedType } from "./enums";
import { EComponentSize } from "@sberbusiness/triplex-next/enums/EComponentSize";
import styles from "./styles/TabsExtendedTabButton.module.less";
import { ETextSize } from "../Typography/enums";

export const TABS_EXTENDED_SIZE_TO_TEXT_SIZE_MAP: Record<EComponentSize, ETextSize> = {
    [EComponentSize.LG]: ETextSize.B2,
    [EComponentSize.MD]: ETextSize.B3,
    [EComponentSize.SM]: ETextSize.B4,
};

export const TABS_EXTENDED_TYPE_TO_CLASS_NAME_MAP: Record<ETabsExtendedType, string> = {
    [ETabsExtendedType.TYPE_1]: styles.type1,
    [ETabsExtendedType.TYPE_2]: styles.type2,
};
