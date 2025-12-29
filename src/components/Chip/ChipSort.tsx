import React from "react";
import { isEqual } from "lodash";
import { ChipIcon } from "./ChipIcon";
import { IChipSelectProps } from "./ChipSelect/ChipSelect";
import { SortStrokeSrvIcon24 } from "@sberbusiness/icons-next";
import {
    ISelectExtendedFieldDropdownProvideProps,
    ISelectExtendedFieldTargetProvideProps,
    SelectExtendedField,
} from "../../components/SelectExtendedField";
import { SelectExtendedFieldDropdownDefault } from "../../components/SelectExtendedField/components/SelectExtendedFieldDropdownDefault";
import { ISelectExtendedFieldDefaultOption } from "../../components/SelectExtendedField";
import clsx from "clsx";
import styles from "./styles/Chip.module.less";

export interface IChipSortProps extends Omit<IChipSelectProps, "targetProps" | "clearSelected" | "defaultValue"> {
    /** Дефолтное значение, если текущее значение равно дефолтному, элемент не будет подсвечен как измененный. */
    defaultValue?: ISelectExtendedFieldDefaultOption;
}

/**
 * ChipSelect с иконкой выбора сортировки.
 */
export const ChipSort = React.forwardRef<HTMLDivElement, IChipSortProps>(
    ({ className, defaultValue, disabled, label, onChange, options, value, size, ...rest }, ref) => {
        const selected = Boolean(value) && !isEqual(defaultValue, value);

        const renderTarget = ({ opened, setOpened }: ISelectExtendedFieldTargetProvideProps) => (
            <ChipIcon
                className={clsx("hoverable", {
                    active: Boolean(opened),
                })}
                ref={ref}
                disabled={disabled}
                selected={selected}
                onClick={() => setOpened(true)}
                size={size}
                role="combobox"
                aria-expanded={opened}
            >
                {selected ? <SortStrokeSrvIcon24 paletteIndex={6} /> : <SortStrokeSrvIcon24 paletteIndex={5} />}
            </ChipIcon>
        );

        const renderDropdown = (props: ISelectExtendedFieldDropdownProvideProps) => (
            <SelectExtendedFieldDropdownDefault
                {...props}
                size={size}
                mobileTitle={label}
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

ChipSort.displayName = "ChipSort";
