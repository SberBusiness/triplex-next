import { EComponentSize, EFormFieldStatus, EFontType, ETextSize } from "../../../src";

const sizeToMarginTopMap: Record<EComponentSize, string> = {
    [EComponentSize.SM]: "-13px", // 6px from top
    [EComponentSize.MD]: "-8px", // 12px from top
    [EComponentSize.LG]: "-4px", // 20px from top
};

export const getTextareaPostfixInnerStyles = (size: EComponentSize): React.CSSProperties => ({
    display: "flex",
    marginTop: sizeToMarginTopMap[size],
    alignSelf: "flex-start",
    alignItems: "center",
    gap: "8px",
});

const statusToFontTypeMap: Record<EFormFieldStatus, EFontType> = {
    [EFormFieldStatus.DEFAULT]: EFontType.SECONDARY,
    [EFormFieldStatus.DISABLED]: EFontType.SECONDARY,
    [EFormFieldStatus.ERROR]: EFontType.ERROR,
    [EFormFieldStatus.WARNING]: EFontType.WARNING,
};

export const getTextareaDescriptionTextProps = (status: EFormFieldStatus) => ({
    size: ETextSize.B4,
    type: statusToFontTypeMap[status],
});
