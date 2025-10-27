import React from "react";
import isEqual from "lodash-es/isEqual";
import { ChipIcon, IChipSelectProps } from "@sber-business/triplex/components/Chip/index";
import { ListsortingoffSrvxIcon24 } from "@sberbusiness/icons/ListsortingoffSrvxIcon24";
import { ListsortingonSrvxIcon24 } from "@sberbusiness/icons/ListsortingonSrvxIcon24";
import {
    ISelectExtendedDropdownProvideProps,
    ISelectExtendedTargetProvideProps,
    SelectExtended,
} from "@sber-business/triplex/components/SelectExtended/SelectExtended";
import { SelectExtendedDropdownDefault } from "@sber-business/triplex/components/SelectExtended/components/SelectExtendedDropdownDefault";
import { classnames } from "@sber-business/triplex/utils/classnames/classnames";
import { ISelectBaseOption } from "@sber-business/triplex/components/SelectBase/SelectBase";

export interface IChipSortProps extends Omit<IChipSelectProps, "targetProps" | "clearSelected" | "defaultValue"> {
    /** Дефолтное значение, если текущее значение равно дефолтному, элемент не будет подсвечен как измененный. */
    defaultValue?: ISelectBaseOption;
}

/**
 * ChipSelect с иконкой выбора сортировки.
 */
export const ChipSort = React.forwardRef<HTMLDivElement, IChipSortProps>(
    ({ className, defaultValue, disabled, label, onChange, options, value, ...rest }, ref) => {
        const selected = Boolean(value) && !isEqual(defaultValue, value);

        const renderTarget = ({ opened, setOpened }: ISelectExtendedTargetProvideProps) => (
            <ChipIcon
                ref={ref}
                disabled={disabled}
                selected={selected}
                onClick={() => setOpened(true)}
                role="combobox"
                aria-expanded={opened}
            >
                {selected ? <ListsortingonSrvxIcon24 /> : <ListsortingoffSrvxIcon24 />}
            </ChipIcon>
        );

        const renderDropdown = (props: ISelectExtendedDropdownProvideProps) => (
            <SelectExtendedDropdownDefault
                {...props}
                mobileTitle={label}
                onChange={onChange}
                options={options}
                value={value}
                fixedWidth={false}
            />
        );

        return (
            <SelectExtended
                className={classnames("cssClass[chipGroupItem]", className)}
                renderTarget={renderTarget}
                {...rest}
            >
                {renderDropdown}
            </SelectExtended>
        );
    },
);

ChipSort.displayName = "ChipSort";
