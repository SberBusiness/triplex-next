import React from "react";
import { OptionsStrokeSrvIcon24 } from "@sberbusiness/icons-next";
import { Chip, IChipProps } from "./Chip";
import { ChipClearButton } from "./ChipClearButton";
import styles from "./styles/ChipOptions.module.less";

/** Свойства компонента ChipOptions. */
export interface IChipOptionsProps extends Omit<IChipProps, "prefix" | "postfix"> {
    /** Функция отмены выбора. */
    clearSelected: () => void;
}

/**
 * Chip с иконкой выбора опций.
 * В выбранном состоянии в postfix отображается кнопка сброса выбора.
 */
export const ChipOptions = React.forwardRef<HTMLSpanElement, IChipOptionsProps>(
    ({ children, clearSelected, selected, size, ...restProps }, ref) => {
        const handleClickClearButton = (event: React.MouseEvent<HTMLButtonElement>) => {
            // Предотвращение нажатия на родительский элемент Chip.
            event.stopPropagation();

            clearSelected();
        };

        return (
            <Chip
                prefix={<OptionsStrokeSrvIcon24 paletteIndex={selected ? 6 : 5} />}
                // Вне выбранного состояния в postfix уходит пустой span, а не undefined: класс
                // withPostfix (обнуляет правый padding) Chip выставляет по postfix !== undefined,
                // поэтому отступы у выбранного и невыбранного чипса должны совпадать. Пустой span
                // при этом реально рендерится в обёртке IconWrapper — убрать его нельзя.
                postfix={selected ? <ChipClearButton size={size} onClick={handleClickClearButton} /> : <span />}
                selected={selected}
                size={size}
                {...restProps}
                ref={ref}
            >
                {children !== undefined ? <span className={styles.chipOptionsContent}>{children}</span> : children}
            </Chip>
        );
    },
);

ChipOptions.displayName = "ChipOptions";
