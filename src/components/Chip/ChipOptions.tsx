import React from "react";
import { OptionsStrokeSrvIcon24 } from "@sberbusiness/icons-next";
import { Chip, IChipProps } from "./Chip";
import { ChipClearButton } from "./ChipClearButton";
import styles from "./styles/ChipOptions.module.less";

export interface IChipOptionsProps extends Omit<IChipProps, "prefix" | "postfix"> {
    /** Функция отмены выбора. */
    clearSelected: () => void;
}

/**
 * Chip с иконкой выбора опций.
 */
export const ChipOptions = React.forwardRef<HTMLSpanElement, IChipOptionsProps>(
    ({ children, clearSelected, selected, ...rest }, ref) => {
        const handleClickClearButton = (event: React.MouseEvent<HTMLButtonElement>) => {
            // Предотвращение нажатия на родительский элемент Chip.
            event.stopPropagation();

            clearSelected();
        };

        return (
            <Chip
                prefix={
                    selected ? <OptionsStrokeSrvIcon24 paletteIndex={6} /> : <OptionsStrokeSrvIcon24 paletteIndex={5} />
                }
                postfix={selected ? <ChipClearButton onClick={handleClickClearButton} size={rest.size} /> : <span />}
                selected={selected}
                {...rest}
                ref={ref}
            >
                {typeof children !== "undefined" ? (
                    <span className={styles.chipOptionsContent}>{children}</span>
                ) : (
                    children
                )}
            </Chip>
        );
    },
);

ChipOptions.displayName = "ChipOptions";
