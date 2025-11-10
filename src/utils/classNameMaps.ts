import { EComponentSize } from "@sberbusiness/triplex-next/enums/EComponentSize";

export const createSizeToClassNameMap = (styles: Record<string, string>): Record<EComponentSize, string> => ({
    [EComponentSize.SM]: styles.sm,
    [EComponentSize.MD]: styles.md,
    [EComponentSize.LG]: styles.lg,
});
