import { EFontType } from "./enums";
import styles from "./styles/Typography.module.less";

/** Соответствие цвета шрифта имени класса. */
export const FONT_TYPE_TO_CLASS_NAME_MAP: Record<EFontType, string> = {
    [EFontType.PRIMARY]: styles.primary,
    [EFontType.COMPLEMENTARY]: styles.complementary,
    [EFontType.SECONDARY]: styles.secondary,
    [EFontType.TERTIARY]: styles.tertiary,
    [EFontType.DISABLED]: styles.disabled,
    [EFontType.BRAND]: styles.brand,
    [EFontType.INFO]: styles.info,
    [EFontType.SUCCESS]: styles.success,
    [EFontType.ERROR]: styles.error,
    [EFontType.WARNING]: styles.warning,
    [EFontType.SYSTEM]: styles.system,

    [EFontType.PRIMARY_INVERT]: styles.primaryInvert,
    [EFontType.COMPLEMENTARY_INVERT]: styles.complementaryInvert,
    [EFontType.SECONDARY_INVERT]: styles.secondaryInvert,
    [EFontType.TERTIARY_INVERT]: styles.tertiaryInvert,
    [EFontType.DISABLED_INVERT]: styles.disabledInvert,
    [EFontType.BRAND_INVERT]: styles.brandInvert,
    [EFontType.INFO_INVERT]: styles.infoInvert,
    [EFontType.SUCCESS_INVERT]: styles.successInvert,
    [EFontType.WARNING_INVERT]: styles.warningInvert,
    [EFontType.ERROR_INVERT]: styles.errorInvert,
    [EFontType.SYSTEM_INVERT]: styles.systemInvert,
};
