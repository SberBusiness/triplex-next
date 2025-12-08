import React from "react";
import { IMultiselectProps, Multiselect } from "../Multiselect";
import { Chip, ChipClearButton, ChipDropdownArrow } from ".";
import { ISelectExtendedFieldTargetProvideProps } from "../SelectExtendedField";
import styles from "./Chip.module.less";
import clsx from "clsx";

export interface IChipMultiselectProps extends Omit<IMultiselectProps, "renderTarget"> {
    /** Функция отмены выбора. */
    clearSelected: () => void;
    /** Состояние disabled. */
    disabled?: boolean;
    /** Флаг, выбран хоть один вариант. */
    selected?: boolean;
    /** Название поля или число выбранных вариантов. */
    label: React.ReactNode;
    /** Лейбл, отображаемый вместо выбранного значения. */
    displayedValue?: React.ReactNode;
}

/**
 * Компонент выбора нескольких значений из списка.
 * Количество выбранных значений отображается компонентом Chip.
 */
export const ChipMultiselect = React.forwardRef<HTMLDivElement, IChipMultiselectProps>(
    ({ children, className, clearSelected, disabled, label, displayedValue, selected, ...rest }, ref) => {
        const handleClickClearButton = (event: React.MouseEvent<HTMLButtonElement>) => {
            // Предотвращение нажатия на родительский элемент Chip.
            event.stopPropagation();

            clearSelected();
        };

        const renderTarget = ({ opened, setOpened }: ISelectExtendedFieldTargetProvideProps) => (
            <Chip
                aria-expanded={opened}
                disabled={disabled}
                onClick={() => setOpened(true)}
                postfix={
                    selected ? (
                        <ChipClearButton onClick={handleClickClearButton} />
                    ) : (
                        <ChipDropdownArrow rotated={opened} />
                    )
                }
                ref={ref}
                role="listbox"
                selected={Boolean(selected)}
            >
                {selected ? (displayedValue ?? label) : label}
            </Chip>
        );

        return (
            <Multiselect renderTarget={renderTarget} className={clsx(styles.chipGroupItem, className)} {...rest}>
                {children}
            </Multiselect>
        );
    },
);

ChipMultiselect.displayName = "ChipMultiselect";
