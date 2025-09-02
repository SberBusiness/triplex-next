import { EFontType } from "./enums";
import styles from "./styles/Typography.module.less";

/** Соответствие цвета шрифта стилевому классу. */
export const mapFontTypeToCssClass = {
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
};
