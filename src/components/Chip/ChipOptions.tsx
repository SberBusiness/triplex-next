import React from "react";
import { OptionsStrokeSrvIcon24 } from "@sberbusiness/icons-next";
import { isKey } from "../../utils/keyboard";
import { Chip, IChipProps } from "./Chip";
import { ChipClearButton, IChipClearButtonProps } from "./ChipClearButton";
import styles from "./styles/ChipOptions.module.less";

/** Свойства компонента ChipOptions. */
export interface IChipOptionsProps extends Omit<IChipProps, "prefix" | "postfix"> {
    /** Функция отмены выбора. */
    clearSelected: () => void;
    /**
     * Свойства кнопки сброса выбора, например aria-label для её доступного имени.
     * Размер задаётся размером чипса. Переданные onClick и onKeyDown не заменяют
     * собственные обработчики компонента, а вызываются после них.
     */
    clearButtonProps?: Omit<IChipClearButtonProps, "size">;
}

/**
 * Chip с иконкой выбора опций.
 * В выбранном состоянии в postfix отображается кнопка сброса выбора.
 */
export const ChipOptions = React.forwardRef<HTMLSpanElement, IChipOptionsProps>(
    ({ children, clearButtonProps, clearSelected, selected, size, ...restProps }, ref) => {
        const {
            onClick: onClickClearButton,
            onKeyDown: onKeyDownClearButton,
            ...restClearButtonProps
        } = clearButtonProps ?? {};

        const handleClickClearButton = (event: React.MouseEvent<HTMLButtonElement>) => {
            // Предотвращение нажатия на родительский элемент Chip.
            event.stopPropagation();

            clearSelected();
            onClickClearButton?.(event);
        };

        const handleKeyDownClearButton = (event: React.KeyboardEvent<HTMLButtonElement>) => {
            if (isKey(event.code, "ENTER") || isKey(event.code, "SPACE")) {
                // Без гашения всплытия Chip вызовет preventDefault() на SPACE (гасит прокрутку
                // страницы) и заодно отменит нативную активацию кнопки, а на ENTER отработает
                // потребительский onKeyDown чипса одновременно со сбросом.
                event.stopPropagation();
            }

            onKeyDownClearButton?.(event);
        };

        return (
            <Chip
                prefix={<OptionsStrokeSrvIcon24 paletteIndex={selected ? 6 : 5} />}
                // Вне выбранного состояния в postfix уходит пустой span, а не undefined: класс
                // withPostfix (обнуляет правый padding) Chip выставляет по postfix !== undefined,
                // поэтому отступы у выбранного и невыбранного чипса должны совпадать. Пустой span
                // при этом реально рендерится в обёртке IconWrapper — убрать его нельзя.
                postfix={
                    selected ? (
                        <ChipClearButton
                            {...restClearButtonProps}
                            size={size}
                            onClick={handleClickClearButton}
                            onKeyDown={handleKeyDownClearButton}
                        />
                    ) : (
                        <span />
                    )
                }
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
