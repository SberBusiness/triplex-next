import React from "react";
import {
    ISelectExtendedFieldDropdownProvideProps,
    ISelectExtendedFieldTargetProvideProps,
    SelectExtendedField,
} from "@sberbusiness/triplex-next/components/SelectExtendedField";
import { ChipClearButton } from "./ChipClearButton";
import { Chip, IChipProps } from "./Chip";
import { ChipDropdownArrow } from "./ChipDropdownArrow";
import styles from "./styles/Chip.module.less";
import { SelectExtendedFieldDropdownDefault } from "@sberbusiness/triplex-next/components/SelectExtendedField/components/SelectExtendedFieldDropdownDefault";
import clsx from "clsx";
import { ISelectFieldProps } from "@sberbusiness/triplex-next/components/SelectField";

export interface IChipSelectProps
    extends Pick<IChipProps, "disabled" | "className">,
        Omit<
            ISelectFieldProps,
            | "children"
            | "targetProps"
            | "dropdownListItemClassName"
            | "mobileTitle"
            | "loading"
            | "status"
            | "placeholder"
        > {
    /* Функция отмены выбора. */
    clearSelected: () => void;
    /* Название поля. */
    label?: React.ReactNode;
    /* Лейбл, отображаемый вместо выбранного значения. */
    displayedValue?: React.ReactNode;
}

/**
 * Компонент выбора одного значения из списка.
 * Выбранное значение отображается компонентом Chip.
 */
export const ChipSelect = React.forwardRef<HTMLDivElement, IChipSelectProps>(
    ({ className, clearSelected, disabled, size, label, displayedValue, onChange, options, value, ...rest }, ref) => {
        const handleClickClearButton = (event: React.MouseEvent<HTMLButtonElement>) => {
            // Предотвращение нажатия на родительский элемент Chip.
            event.stopPropagation();

            clearSelected();
        };

        const renderTarget = ({ opened, setOpened }: ISelectExtendedFieldTargetProvideProps) => (
            <Chip
                aria-expanded={opened}
                disabled={disabled}
                size={size}
                onClick={() => setOpened(true)}
                postfix={
                    value ? (
                        <ChipClearButton onClick={handleClickClearButton} />
                    ) : (
                        <ChipDropdownArrow rotated={opened} />
                    )
                }
                role="combobox"
                ref={ref}
                selected={Boolean(value)}
            >
                {value ? (displayedValue ?? value.label) : label}
            </Chip>
        );

        const renderDropdown = (props: ISelectExtendedFieldDropdownProvideProps) => (
            <SelectExtendedFieldDropdownDefault
                {...props}
                mobileTitle={label}
                size={size}
                onChange={onChange}
                options={options}
                value={value}
                fixedWidth={false}
            />
        );

        return (
            <SelectExtendedField
                className={clsx(styles.chipGroupItem, className)}
                renderTarget={renderTarget}
                {...rest}
            >
                {renderDropdown}
            </SelectExtendedField>
        );
    },
);

ChipSelect.displayName = "ChipSelect";
