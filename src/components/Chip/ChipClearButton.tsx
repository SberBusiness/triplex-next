import React from "react";
import { CrossStrokeSrvIcon16, CrossStrokeSrvIcon20, CrossStrokeSrvIcon24 } from "@sberbusiness/icons-next";
import styles from "./styles/ChipClearButton.module.less";
import { EChipSize } from "./enums";

export interface IChipClearButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children?: never;
    size?: EChipSize;
}

/**
 * Кнопка отмены выбора для Chip.
 */
export const ChipClearButton = React.forwardRef<HTMLButtonElement, IChipClearButtonProps>(
    ({ size = EChipSize.MD, ...props }, ref) => {
        const getSizeIcon = (size: EChipSize) => {
            switch (size) {
                case EChipSize.SM:
                    return <CrossStrokeSrvIcon16 paletteIndex={6} />;
                case EChipSize.MD:
                    return <CrossStrokeSrvIcon20 paletteIndex={6} />;
                case EChipSize.LG:
                    return <CrossStrokeSrvIcon24 paletteIndex={6} />;
                default:
                    return null;
            }
        };
        return (
            <button className={styles.chipClearButton} type="button" {...props} ref={ref}>
                {getSizeIcon(size)}
            </button>
        );
    },
);

ChipClearButton.displayName = "ChipClearButton";
