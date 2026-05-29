import React from "react";
import clsx from "clsx";
import {
    ISelectExtendedFieldDropdownProvideProps,
    ISelectExtendedFieldTargetProvideProps,
    SelectExtendedField,
} from "../../SelectExtendedField";
import { IChipProps } from "../Chip";
import { SelectExtendedFieldDropdownDefault } from "../../SelectExtendedField/components/SelectExtendedFieldDropdownDefault";
import { ISelectFieldProps } from "../../SelectField";
import { ChipSelectTarget } from "./ChipSelectTarget";
import styles from "../styles/Chip.module.less";

export interface IChipSelectProps
    extends
        Pick<IChipProps, "className" | "disabled" | "type">,
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
    (
        {
            className,
            disabled,
            value,
            options,
            onChange,
            type,
            size,
            clearSelected,
            label,
            displayedValue,
            ...restProps
        },
        ref,
    ) => {
        const renderDropdown = (props: ISelectExtendedFieldDropdownProvideProps) => (
            <SelectExtendedFieldDropdownDefault
                {...props}
                mobileTitle={label}
                size={size}
                onChange={onChange}
                options={options}
                value={value}
            />
        );

        const renderTarget = ({ opened, setOpened }: ISelectExtendedFieldTargetProvideProps) => {
            const selected = value !== undefined;

            return (
                <ChipSelectTarget
                    type={type}
                    size={size}
                    selected={selected}
                    disabled={disabled}
                    onClear={clearSelected}
                    opened={opened}
                    setOpened={setOpened}
                >
                    {value ? (displayedValue ?? value.label) : label}
                </ChipSelectTarget>
            );
        };

        return (
            <SelectExtendedField
                className={clsx(styles.chipGroupItem, className)}
                renderTarget={renderTarget}
                {...restProps}
                ref={ref}
            >
                {renderDropdown}
            </SelectExtendedField>
        );
    },
);

ChipSelect.displayName = "ChipSelect";
