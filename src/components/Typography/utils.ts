/** Возвращает имя класса оформления текста (подчёркивание/зачёркивание) для компонентов типографики. */
export const getTextDecorationClassName = (
    typographyStyles: Record<string, string>,
    underline?: boolean,
    strikethrough?: boolean,
): string | undefined => {
    if (underline && strikethrough) {
        return typographyStyles.underlineStrikethrough;
    }
    if (underline) {
        return typographyStyles.underline;
    }
    if (strikethrough) {
        return typographyStyles.strikethrough;
    }
    return undefined;
};
