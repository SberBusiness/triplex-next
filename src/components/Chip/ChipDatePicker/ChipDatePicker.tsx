import React, { useState, useEffect, useRef } from "react";
import moment from "moment";
import { IDateFieldProps } from "../../DateField";
import { IChipProps } from "../Chip";
import { dateFormatYYYYMMDD, globalLimitRange } from "../../../consts/DateConst";
import { DateFieldUtils } from "../../DateField/utils";
import { DatePickerExtended } from "../../DatePickerExtended/DatePickerExtended";
import { ChipDatePickerTarget } from "./components/ChipDatePickerTarget";
import { inputDateFormat } from "../../DateField/constants";
import { DropdownMobileMaskedInput } from "../../Dropdown/mobile/DropdownMobileMaskedInput";
import styles from "../styles/Chip.module.less";

/** Свойства компонента ChipDatePicker. */
export interface IChipDatePickerProps extends Omit<IDateFieldProps, "invalidDateHint">, Pick<IChipProps, "disabled"> {
    /** Название поля, когда не выбрано значение. */
    label: React.ReactNode;
    /** Лейбл, отображаемый вместо выбранного значения. */
    displayedValue?: React.ReactNode;
}

/** DatePicker с видом компонента Chip. */
export const ChipDatePicker = React.forwardRef<HTMLDivElement, IChipDatePickerProps>((props, ref) => {
    const {
        value,
        label,
        placeholderMask,
        format = dateFormatYYYYMMDD,
        limitRange = globalLimitRange,
        disabledDays,
        disabled,
        displayedValue,
        onChange,
        onDropdownOpen,
        onDropdownClose,
        ...rest
    } = props;
    const [pickerValues, setPickerValues] = useState(
        DateFieldUtils.getPickerValues(value, format, limitRange, disabledDays),
    );
    const lastValidPickerValuesRef = useRef(pickerValues);
    const dropdownOpenRef = useRef(false);
    const dropdownClosedByCalendarRef = useRef(false); // Dropdown закрылся от выбора даты в календаре

    useEffect(() => {
        const newPickerValues = DateFieldUtils.getPickerValues(value, format, limitRange, disabledDays);

        lastValidPickerValuesRef.current = newPickerValues;

        if (newPickerValues.inputString !== pickerValues.inputString) {
            setPickerValues(newPickerValues);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value, format, limitRange, disabledDays]);

    /** Рендер управляющего элемента. */
    const renderTarget = () => {
        // При открытом Dropdown фиксируем отображаемое значение, чтобы при работе с полем ввода оно не менялось.
        const currentPickerValues = dropdownOpenRef.current ? lastValidPickerValuesRef.current : pickerValues;
        const selected = currentPickerValues.calendarDate !== null;

        return (
            <ChipDatePickerTarget selected={selected} disabled={disabled} onClear={handleClear}>
                {selected ? (displayedValue ?? currentPickerValues.inputString) : label}
            </ChipDatePickerTarget>
        );
    };

    /** Обработчик сброса значения. */
    const handleClear = () => {
        onChange("");
    };

    /** Обработчик открытия Dropdown. */
    const handleDropdownOpen = () => {
        dropdownOpenRef.current = true;

        onDropdownOpen?.();
    };

    /** Обработчик закрытия Dropdown. */
    const handleDropdownClose = () => {
        dropdownOpenRef.current = false;

        if (dropdownClosedByCalendarRef.current) {
            dropdownClosedByCalendarRef.current = false;
        } else if (pickerValues.inputString !== lastValidPickerValuesRef.current.inputString) {
            triggerChangeFromInput();
        }

        onDropdownClose?.();
    };

    const renderDropdownHeaderTarget = () => (
        <DropdownMobileMaskedInput
            value={pickerValues.inputString}
            mask={DropdownMobileMaskedInput.presets.masks.date}
            placeholderMask={placeholderMask}
            onChange={handleInputChange}
            autoFocus={true}
        />
    );

    /** Обработчик изменения значения ChipDatePickerHeaderTarget. */
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let date: moment.Moment | null = null;

        if (event.target.value.length === inputDateFormat.length) {
            date = moment(event.target.value, inputDateFormat, true);

            if (
                !date.isValid() ||
                !DateFieldUtils.isAvailableDate(date, date.format(format), limitRange, disabledDays)
            ) {
                date = null;
            }
        }

        setPickerValues({ calendarDate: date, inputString: event.target.value });
    };

    /** Триггер изменения значения из поля ввода. */
    const triggerChangeFromInput = () => {
        if (pickerValues.inputString.length === 0 && value.length !== 0) {
            return onChange(pickerValues.inputString);
        }

        const date = moment(pickerValues.inputString, inputDateFormat, true);

        if (date.isValid()) {
            const newValue = date.format(format);

            if (newValue === value) {
                return;
            }

            if (DateFieldUtils.isAvailableDate(date, newValue, limitRange, disabledDays)) {
                return onChange(newValue);
            }
        }

        // Текущее значение в поле невалидно, возвращаем последнее валидное.
        if (pickerValues.inputString !== lastValidPickerValuesRef.current.inputString) {
            setPickerValues(lastValidPickerValuesRef.current);
        }
    };

    /** Обработчик изменения даты. */
    const handleDateChange = (date: moment.Moment) => {
        dropdownClosedByCalendarRef.current = true;

        onChange(date.format(format));
    };

    return (
        <DatePickerExtended
            className={styles.chipGroupItem}
            renderTarget={renderTarget}
            pickedDate={pickerValues.calendarDate}
            renderDropdownHeaderTarget={renderDropdownHeaderTarget}
            format={format}
            limitRange={limitRange}
            onDropdownOpen={handleDropdownOpen}
            onDropdownClose={handleDropdownClose}
            onDateChange={handleDateChange}
            {...rest}
            ref={ref}
        />
    );
});

ChipDatePicker.displayName = "ChipDatePicker";
