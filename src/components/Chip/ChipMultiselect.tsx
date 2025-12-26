import React from "react";
import { IMultiselectFieldProps, MultiselectField } from "../MultiselectField";
import { Chip } from "./Chip";
import { ChipClearButton } from "./ChipClearButton";
import { ChipDropdownArrow } from "./ChipDropdownArrow";
import { ISelectExtendedFieldTargetProvideProps } from "../SelectExtendedField";
import { isKey } from "../../utils/keyboard";
import styles from "./styles/Chip.module.less";
import clsx from "clsx";

export interface IChipMultiselectProps extends Omit<IMultiselectFieldProps, "renderTarget"> {
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
    ({ children, className, clearSelected, disabled, label, displayedValue, selected, size, ...rest }, ref) => {
        const handleKeyDownClearButton = (event: React.KeyboardEvent<HTMLButtonElement>) => {
            if (isKey(event.code, "ENTER") || isKey(event.code, "SPACE")) {
                // Предотвращаем всплытие события до Chip
                event.stopPropagation();
            }
        };

        const handleClickClearButton = (event: React.MouseEvent<HTMLButtonElement>) => {
            // Предотвращаем всплытие события до Chip
            event.stopPropagation();

            clearSelected();
        };

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
                    onClick={() => setOpened(!opened)}
                    onKeyDown={handleKeyDown}
                    postfix={
                        selected ? (
                            <ChipClearButton onKeyDown={handleKeyDownClearButton} onClick={handleClickClearButton} />
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
        };

        return (
            <MultiselectField
                size={size}
                renderTarget={renderTarget}
                className={clsx(styles.chipGroupItem, className)}
                {...rest}
            >
                {children}
            </MultiselectField>
        );
    },
);

ChipMultiselect.displayName = "ChipMultiselect";
