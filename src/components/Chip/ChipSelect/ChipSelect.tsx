import React from "react";
import {
    ISelectExtendedFieldDropdownProvideProps,
    ISelectExtendedFieldTargetProvideProps,
    SelectExtendedField,
} from "@sberbusiness/triplex-next/components/SelectExtendedField";
import { IChipProps } from "../Chip";
import { SelectExtendedFieldDropdownDefault } from "@sberbusiness/triplex-next/components/SelectExtendedField/components/SelectExtendedFieldDropdownDefault";
import { ISelectFieldProps } from "@sberbusiness/triplex-next/components/SelectField";
import { ChipSelectTarget } from "./ChipSelectTarget";
import styles from "../styles/Chip.module.less";
import clsx from "clsx";

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

        const renderTarget = ({ opened, setOpened }: ISelectExtendedFieldTargetProvideProps) => {
            const selected = value !== undefined;

            return (
                <ChipSelectTarget
                    selected={selected}
                    disabled={disabled}
                    onClear={clearSelected}
                    size={size}
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
                {...rest}
                ref={ref}
            >
                {renderDropdown}
            </SelectExtendedField>
        );
    },
);

ChipSelect.displayName = "ChipSelect";
