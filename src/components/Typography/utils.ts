import {ECaptionSize, EFontType, EFontWeightText, EFontWeightTitle, ELineType, ETextSize, ETitleSize} from './enums';
import styles from './styles/Typography.module.less';

/** Соответствие размера текста стилевому классу. */
export const mapTextSizeToCssClass = {
    [ETextSize.B1]: styles.b1,
    [ETextSize.B2]: styles.b2,
    [ETextSize.B3]: styles.b3,
    [ETextSize.B4]: styles.b4,
};

/** Соответствие размера заголовка стилевому классу. */
export const mapTitleSizeToCssClass = {
    [ETitleSize.H1]: styles.h1,
    [ETitleSize.H2]: styles.h2,
    [ETitleSize.H3]: styles.h3,
};

/** Соответствие размера подписи стилевому классу. */
export const mapCaptionSizeToCssClass = {
    [ECaptionSize.C1]: styles.c1,
    [ECaptionSize.C2]: styles.c2,
    [ECaptionSize.D1]: styles.d1,
};

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
};

/** Соответствие цвета шрифта стилевому классу. */
export const mapFontWeightTextToCssClass = {
    [EFontWeightText.REGULAR]: styles.regular,
    [EFontWeightText.SEMIBOLD]: styles.semibold,
};


/** Соответствие цвета шрифта стилевому классу. */
export const mapFontWeightTitleToCssClass = {
    [EFontWeightTitle.MEDIUM]: styles.medium,
    [EFontWeightTitle.REGULAR]: styles.regular,
    [EFontWeightTitle.SEMIBOLD]: styles.semibold,
    [EFontWeightTitle.BOLD]: styles.bold,
};

/** Соответствие типа высоты блока строки стилевому классу. */
export const mapTextLineTypeToCssClass = {
    [ELineType.NORMAL]: '',
    [ELineType.COMPACT]: styles.compact,
};
