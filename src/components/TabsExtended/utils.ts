import { ETabsExtendedTabButtonSize, ETabsExtendedType } from "./enums";
import styles from "./styles/TabsExtendedTabButton.module.less";

export const tabsExtendedSizeToCssClassMap = {
    [ETabsExtendedTabButtonSize.LG]: styles.lg,
    [ETabsExtendedTabButtonSize.MD]: styles.md,
    [ETabsExtendedTabButtonSize.SM]: styles.sm,
};

export const mapTypeToClassName = (type: ETabsExtendedType, styles: Record<string, string>) => {
    switch (type) {
        case ETabsExtendedType.TYPE_1:
            return styles.type1;
        case ETabsExtendedType.TYPE_2:
            return styles.type2;
    }
};
