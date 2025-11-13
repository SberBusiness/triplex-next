import { EMarkerSize, EMarkerStatus } from "./enums";

export const statusToClassNameMap = {
    [EMarkerStatus.SUCCESS]: (styles: Record<string, string>) => styles.success,
    [EMarkerStatus.ERROR]: (styles: Record<string, string>) => styles.error,
    [EMarkerStatus.WARNING]: (styles: Record<string, string>) => styles.warning,
    [EMarkerStatus.WAITING]: (styles: Record<string, string>) => styles.waiting,
};

export const markerSizeToClassNameMap = {
    [EMarkerSize.MD]: (styles: Record<string, string>) => styles.md,
    [EMarkerSize.LG]: (styles: Record<string, string>) => styles.lg,
};
