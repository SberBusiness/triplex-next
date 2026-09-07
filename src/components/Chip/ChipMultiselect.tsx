import React, { useCallback } from "react";
import clsx from "clsx";
import { IMultiselectFieldProps, MultiselectField } from "../MultiselectField";
import { ISelectExtendedFieldTargetProvideProps } from "../SelectExtendedField";
import { isKey } from "../../utils/keyboard";
import { Chip, IChipProps } from "./Chip";
import { ChipClearButton } from "./ChipClearButton";
import { ChipDropdownArrow } from "./ChipDropdownArrow";
import styles from "./styles/Chip.module.less";

/** Свойства компонента ChipMultiselect. */
export interface IChipMultiselectProps extends Omit<IMultiselectFieldProps, "renderTarget">, Pick<IChipProps, "type"> {
    /** Функция отмены выбора. Вызывается по нажатию на кнопку сброса. */
    clearSelected: () => void;
    /** Состояние disabled. */
    disabled?: boolean;
    /** Флаг, выбран хоть один вариант. */
    selected?: boolean;
    /** Название поля или число выбранных вариантов. */
    label: React.ReactNode;
    /** Лейбл, отображаемый вместо выбранного значения. Показывается только при selected. */
    displayedValue?: React.ReactNode;
}

/**
 * Компонент выбора нескольких значений из списка.
 * Количество выбранных значений отображается компонентом Chip.
 *
 * Надстройка над MultiselectField: состоянием открытости и выпадающим блоком владеет
 * MultiselectField, а полем выбора выступает Chip. Внешний ref уходит на этот Chip,
 * а не на корневой элемент MultiselectField.
 */
export const ChipMultiselect = React.forwardRef<HTMLDivElement, IChipMultiselectProps>(
    (
        { children, className, clearSelected, disabled, displayedValue, label, selected, size, type, ...restProps },
        ref,
    ) => {
        const handleKeyDownClearButton = useCallback((event: React.KeyboardEvent<HTMLButtonElement>) => {
            if (isKey(event.code, "ENTER") || isKey(event.code, "SPACE")) {
                // Предотвращаем всплытие события до Chip, иначе сброс выбора заодно открыл бы список.
                event.stopPropagation();
            }
        }, []);

        const handleClickClearButton = useCallback(
            (event: React.MouseEvent<HTMLButtonElement>) => {
                // Предотвращаем всплытие события до Chip, иначе сброс выбора заодно открыл бы список.
                event.stopPropagation();

                clearSelected();
            },
            [clearSelected],
        );

        const renderTarget = ({ opened, setOpened }: ISelectExtendedFieldTargetProvideProps) => {
            const handleKeyDown = (event: React.KeyboardEvent<HTMLSpanElement>) => {
                if (isKey(event.code, "ENTER") || isKey(event.code, "SPACE")) {
                    setOpened(!opened);
                }
            };

            return (
                <Chip
                    aria-expanded={opened}
                    disabled={disabled}
                    size={size}
                    type={type}
                    onClick={() => setOpened(!opened)}
                    onKeyDown={handleKeyDown}
                    postfix={
                        selected ? (
                            <ChipClearButton
                                size={size}
                                onKeyDown={handleKeyDownClearButton}
                                onClick={handleClickClearButton}
                            />
                        ) : (
                            <ChipDropdownArrow size={size} rotated={opened} />
                        )
                    }
                    ref={ref}
                    role="listbox"
                    selected={selected}
                >
                    {selected ? (displayedValue ?? label) : label}
                </Chip>
            );
        };

        return (
            <MultiselectField
                size={size}
                renderTarget={renderTarget}
                className={clsx(styles.chipGroupItem, className)}
                {...restProps}
            >
                {children}
            </MultiselectField>
        );
    },
);

ChipMultiselect.displayName = "ChipMultiselect";
