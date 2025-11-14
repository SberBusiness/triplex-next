import React from "react";
import { CrossStrokeSrvIcon16, CrossStrokeSrvIcon20, CrossStrokeSrvIcon24 } from "@sberbusiness/icons-next";
import { EComponentSize } from "@sberbusiness/triplex-next/enums";
import styles from "./styles/ChipClearButton.module.less";

export interface IChipClearButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children?: never;
    size?: EComponentSize;
}

/**
 * Кнопка отмены выбора для Chip.
 */
export const ChipClearButton = React.forwardRef<HTMLButtonElement, IChipClearButtonProps>(
    ({ size = EComponentSize.MD, ...props }, ref) => {
        const getSizeIcon = (size: EComponentSize) => {
            switch (size) {
                case EComponentSize.SM:
                    return <CrossStrokeSrvIcon16 paletteIndex={6} />;
                case EComponentSize.MD:
                    return <CrossStrokeSrvIcon20 paletteIndex={6} />;
                case EComponentSize.LG:
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
