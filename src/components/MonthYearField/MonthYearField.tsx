import React, { useState, useEffect } from "react";
import moment from "moment";
import { IMonthYearFieldProps } from "./types";
import { DatePickerExtended } from "../DatePickerExtended/DatePickerExtended";
import { dateFormatYYYYMMDD, globalLimitRange } from "../../consts/DateConst";
import { MonthYearPickerUtils } from "./utils";
import { DropdownMobileInput } from "../Dropdown/mobile/DropdownMobileInput";
import { ECalendarPickType } from "../Calendar/enums";
import { MonthYearFieldContext } from "./MonthYearFieldContext";
import { MonthYearFieldTarget } from "./MonthYearFieldTarget";

/** Поле для выбора месяца. */
export const MonthYearField = React.forwardRef<HTMLDivElement, IMonthYearFieldProps>((props, ref) => {
    const {
        size,
        status,
        value,
        label,
        placeholder,
        format = dateFormatYYYYMMDD,
        limitRange = globalLimitRange,
        onChange,
        targetProps,
        ...restProps
    } = props;
    const [pickerValues, setPickerValues] = useState(MonthYearPickerUtils.getPickerValues(value, format, limitRange));

    useEffect(() => {
        const newPickerValues = MonthYearPickerUtils.getPickerValues(value, format, limitRange);

        if (newPickerValues.inputString !== pickerValues.inputString) {
            setPickerValues(newPickerValues);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value, format, limitRange]);

    const renderTarget = () => {
        const { inputProps, ...restTargetProps } = targetProps || {};

        return (
            <MonthYearFieldContext.Provider value={{ onChange }}>
                <MonthYearFieldTarget
                    size={size}
                    status={status}
                    label={label}
                    inputProps={{
                        value: pickerValues.inputString,
                        placeholder: placeholder,
                        readOnly: true,
                        ...inputProps,
                    }}
                    {...restTargetProps}
                />
            </MonthYearFieldContext.Provider>
        );
    };

    const renderDropdownHeaderTarget = () => {
        return <DropdownMobileInput value={pickerValues.inputString} placeholder={placeholder} readOnly />;
    };

    const handleDateChange = (date: moment.Moment) => {
        onChange(date.format(format));
    };

    return (
        <DatePickerExtended
            renderTarget={renderTarget}
            renderDropdownHeaderTarget={renderDropdownHeaderTarget}
            pickedDate={pickerValues.calendarDate}
            pickType={ECalendarPickType.monthYearPick}
            format={format}
            limitRange={limitRange}
            onDateChange={handleDateChange}
            {...restProps}
            ref={ref}
        />
    );
});

MonthYearField.displayName = "MonthYearPicker";
