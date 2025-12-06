import React, { useState, useEffect, useRef } from "react";
import moment from "moment";
import { IDateFieldProps } from "./types";
import { DatePickerExtended } from "../DatePickerExtended/DatePickerExtended";
import { dateFormatYYYYMMDD, globalLimitRange } from "../../consts/DateConst";
import { DateFieldUtils } from "./utils";
import { DateFieldTarget } from "./DateFieldTarget";
import { inputDateFormat } from "./constants";
import { Tooltip } from "../Tooltip/Tooltip";
import { ETooltipSize } from "../Tooltip/enums";
import { MobileView } from "../MobileView/MobileView";
import { DropdownMobileMaskedInput } from "../Dropdown/mobile/DropdownMobileMaskedInput";
import { DateFieldContext } from "./DateFieldContext";
import { FormFieldMaskedInput } from "../FormField";

/** Компонент ввода и выбора даты. */
export const DateField = React.forwardRef<HTMLDivElement, IDateFieldProps>((props, ref) => {
    const {
        size,
        status,
        value,
        label,
        placeholderMask,
        "aria-label": ariaLabel,
        "aria-labelledby": ariaLabelledby,
        format = dateFormatYYYYMMDD,
        limitRange = globalLimitRange,
        disabledDays,
        onChange,
        onDropdownOpen,
        onDropdownClose,
        invalidDateHint,
        targetProps,
        ...rest
    } = props;
    const [pickerValues, setPickerValues] = useState(
        DateFieldUtils.getPickerValues(value, format, limitRange, disabledDays),
    );
    const tooltipTargetRef = useRef<HTMLDivElement | null>(null);
    const lastValidPickerValuesRef = useRef(pickerValues);
    const inputFocusedRef = useRef(false);
    const dropdownOpenRef = useRef(false);
    const dropdownClosedByCalendarRef = useRef(false); // Dropdown закрылся от выбора даты в календаре
    const tooltipOpened = useRef(false);

    useEffect(() => {
        const newPickerValues = DateFieldUtils.getPickerValues(value, format, limitRange, disabledDays);

        if (newPickerValues.inputString !== pickerValues.inputString) {
            setPickerValues(newPickerValues);
        }
        lastValidPickerValuesRef.current = newPickerValues;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value, format, limitRange, disabledDays]);

    /** Функция для хранения ссылки. */
    const setRef = (instance: HTMLDivElement | null) => {
        tooltipTargetRef.current = instance;
        if (typeof ref === "function") {
            ref(instance);
        } else if (ref) {
            ref.current = instance;
        }
    };

    /** Рендер-функция управляющего элемента. */
    const renderTarget = () => {
        const { maskedInputProps, ...restTargetProps } = targetProps || {};
        const { onChange: onInputChange, ...restMaskedInputProps } = maskedInputProps || {};

        return (
            <DateFieldContext.Provider value={{ inputFocusedRef, onChange, triggerChangeFromInput }}>
                <DateFieldTarget
                    size={size}
                    status={status}
                    label={label}
                    maskedInputProps={{
                        value: pickerValues.inputString,
                        mask: FormFieldMaskedInput.presets.masks.date,
                        placeholderMask,
                        "aria-label": ariaLabel,
                        "aria-labelledby": ariaLabelledby,
                        onChange: (event) => {
                            handleInputChange(event);
                            onInputChange?.(event);
                        },
                        ...restMaskedInputProps,
                    }}
                    {...restTargetProps}
                />
            </DateFieldContext.Provider>
        );
    };

    /** Рендер-функция управляющего элемента в заголовке DropdownMobile. */
    const renderDropdownHeaderTarget = () => (
        <DropdownMobileMaskedInput
            value={pickerValues.inputString}
            mask={DropdownMobileMaskedInput.presets.masks.date}
            placeholderMask={placeholderMask}
            onChange={handleInputChange}
            autoFocus={true}
        />
    );

    /** Обработчик изменения значения DatePickerTargetInput. */
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

            tooltipOpened.current = !date;
        } else {
            tooltipOpened.current = false;
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
            tooltipOpened.current = false;
            setPickerValues(lastValidPickerValuesRef.current);
        }
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
        } else if (
            !inputFocusedRef.current &&
            pickerValues.inputString !== lastValidPickerValuesRef.current.inputString
        ) {
            triggerChangeFromInput();
        }

        onDropdownClose?.();
    };

    /** Обработчик изменения даты. */
    const handleDateChange = (date: moment.Moment) => {
        dropdownClosedByCalendarRef.current = true;
        tooltipOpened.current = false;

        onChange(date.format(format));
    };

    const renderDatePickerExtended = () => (
        <DatePickerExtended
            renderTarget={renderTarget}
            renderDropdownHeaderTarget={renderDropdownHeaderTarget}
            pickedDate={pickerValues.calendarDate}
            format={format}
            limitRange={limitRange}
            disabledDays={disabledDays}
            onDropdownOpen={handleDropdownOpen}
            onDropdownClose={handleDropdownClose}
            onDateChange={handleDateChange}
            {...rest}
            ref={setRef}
        />
    );

    return (
        <MobileView
            fallback={
                <Tooltip targetRef={tooltipTargetRef} size={ETooltipSize.SM} isOpen={tooltipOpened.current}>
                    <Tooltip.Body>{invalidDateHint}</Tooltip.Body>
                    <Tooltip.Target>{renderDatePickerExtended()}</Tooltip.Target>
                </Tooltip>
            }
        >
            {renderDatePickerExtended()}
        </MobileView>
    );
});

DateField.displayName = "DatePicker";
