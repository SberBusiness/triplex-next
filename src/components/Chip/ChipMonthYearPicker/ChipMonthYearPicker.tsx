import React from "react";
import clsx from "clsx";
import moment from "moment";
import { IMonthYearFieldProps } from "../../MonthYearField/types";
import { MonthYearPickerUtils } from "../../MonthYearField/utils";
import { IChipProps } from "../Chip";
import { ChipMonthYearPickerTarget, IChipMonthYearPickerTargetProps } from "./ChipMonthYearPickerTarget";
import { dateFormatYYYYMMDD, globalLimitRange } from "../../../consts/DateConst";
import { DatePickerExtended } from "../../DatePickerExtended/DatePickerExtended";
import { DropdownMobileInput } from "../../Dropdown/mobile/DropdownMobileInput";
import { ECalendarPickType } from "../../Calendar/enums";
import styles from "../styles/Chip.module.less";

/** Свойства компонента ChipMonthYearPicker. */
export interface IChipMonthYearPickerProps
    extends
        Omit<IMonthYearFieldProps, "status" | "label" | "onClear" | "targetProps" | "pickType">,
        Pick<IChipProps, "type" | "disabled"> {
    /** Название поля, когда не выбрано значение. */
    label: React.ReactNode;
    /** Лейбл, отображаемый вместо выбранного значения. */
    displayedValue?: React.ReactNode;
    /** Свойства кнопки очищения значения, например aria-label. */
    clearButtonProps?: IChipMonthYearPickerTargetProps["clearButtonProps"];
}

/** MonthYearPicker с видом компонента Chip. */
export const ChipMonthYearPicker = React.forwardRef<HTMLDivElement, IChipMonthYearPickerProps>((props, ref) => {
    const {
        className,
        size,
        value,
        placeholder,
        format = dateFormatYYYYMMDD,
        limitRange = globalLimitRange,
        type,
        label,
        displayedValue,
        disabled,
        clearButtonProps,
        onChange,
        ...rest
    } = props;
    const pickerValues = MonthYearPickerUtils.getPickerValues(value, format, limitRange);

    const handleClear = () => {
        onChange("");
    };

    const renderTarget = () => {
        const selected = pickerValues.calendarDate !== null;

        return (
            <ChipMonthYearPickerTarget
                type={type}
                size={size}
                selected={selected}
                disabled={disabled}
                clearButtonProps={clearButtonProps}
                onClear={handleClear}
            >
                {selected ? (displayedValue ?? pickerValues.inputString) : label}
            </ChipMonthYearPickerTarget>
        );
    };

    const renderDropdownHeaderTarget = () => (
        <DropdownMobileInput value={pickerValues.inputString} placeholder={placeholder} readOnly />
    );

    const handleDateChange = (date: moment.Moment) => {
        onChange(date.format(format));
    };

    return (
        <DatePickerExtended
            className={clsx(styles.chipGroupItem, className)}
            renderTarget={renderTarget}
            renderDropdownHeaderTarget={renderDropdownHeaderTarget}
            pickedDate={pickerValues.calendarDate}
            pickType={ECalendarPickType.MONTH_YEAR}
            format={format}
            limitRange={limitRange}
            onDateChange={handleDateChange}
            {...rest}
            ref={ref}
        />
    );
});

ChipMonthYearPicker.displayName = "ChipMonthYearPicker";
