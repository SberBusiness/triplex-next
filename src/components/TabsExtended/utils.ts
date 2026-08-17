import { ETabsExtendedType } from "./enums";
import { EComponentSize } from "@sberbusiness/triplex-next/enums/EComponentSize";
import { ETextSize } from "../Typography/enums";
import styles from "./styles/TabsExtendedTabButton.module.less";

/** Размер текста кнопки таба для каждого размера компонента. */
export const TABS_EXTENDED_SIZE_TO_TEXT_SIZE_MAP: Record<EComponentSize, ETextSize> = {
    [EComponentSize.LG]: ETextSize.B2,
    [EComponentSize.MD]: ETextSize.B3,
    [EComponentSize.SM]: ETextSize.B4,
};

/** CSS-класс оформления для каждого типа табов. */
export const TABS_EXTENDED_TYPE_TO_CLASS_NAME_MAP: Record<ETabsExtendedType, string> = {
    [ETabsExtendedType.TYPE_1]: styles.type1,
    [ETabsExtendedType.TYPE_2]: styles.type2,
};
