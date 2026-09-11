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
import { FormFieldMaskedInput } from "../FormField/components/FormFieldMaskedInput";

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
        onClear,
        onDropdownOpen,
        onDropdownClose,
        invalidDateHint,
        targetProps,
        ...restProps
    } = props;
    const [pickerValues, setPickerValues] = useState(
        DateFieldUtils.getPickerValues(value, format, limitRange, disabledDays),
    );
    const tooltipTargetRef = useRef<HTMLDivElement | null>(null);
    const dropdownTargetRef = useRef<HTMLDivElement | null>(null);
    const lastValidPickerValuesRef = useRef(pickerValues);
    const inputFocusedRef = useRef(false);
    const dropdownOpenRef = useRef(false);
    const dropdownClosedByCalendarRef = useRef(false); // Dropdown закрылся от выбора даты в календаре
    const tooltipOpenedRef = useRef(false);

    useEffect(() => {
        const newPickerValues = DateFieldUtils.getPickerValues(value, format, limitRange, disabledDays);

        if (newPickerValues.inputString !== pickerValues.inputString) {
            setPickerValues(newPickerValues);
        }
        lastValidPickerValuesRef.current = newPickerValues;
        // pickerValues намеренно не в зависимостях: эффект синхронизирует поле с внешним value,
        // а не реагирует на ввод пользователя — иначе он затирал бы промежуточный ввод.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value, format, limitRange, disabledDays]);

    const setRef = (instance: HTMLDivElement | null) => {
        tooltipTargetRef.current = instance;
        if (typeof ref === "function") {
            ref(instance);
        } else if (ref) {
            ref.current = instance;
        }
    };

    /** Обработчик изменения значения поля ввода с маской. */
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

            tooltipOpenedRef.current = !date;
        } else {
            tooltipOpenedRef.current = false;
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
            tooltipOpenedRef.current = false;
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
        tooltipOpenedRef.current = false;

        onChange(date.format(format));
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
                    onClear={onClear}
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
                    ref={dropdownTargetRef}
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

    /** Рендер-функция DatePickerExtended — поле ввода с выпадающим календарём. */
    const renderDatePickerExtended = () => (
        <DatePickerExtended
            dropdownTargetRef={dropdownTargetRef}
            renderTarget={renderTarget}
            renderDropdownHeaderTarget={renderDropdownHeaderTarget}
            pickedDate={pickerValues.calendarDate}
            format={format}
            limitRange={limitRange}
            disabledDays={disabledDays}
            onDropdownOpen={handleDropdownOpen}
            onDropdownClose={handleDropdownClose}
            onDateChange={handleDateChange}
            {...restProps}
            ref={setRef}
        />
    );

    return (
        <MobileView
            fallback={
                <Tooltip targetRef={tooltipTargetRef} size={ETooltipSize.SM} isOpen={tooltipOpenedRef.current}>
                    <Tooltip.Body>{invalidDateHint}</Tooltip.Body>
                    <Tooltip.Target>{renderDatePickerExtended()}</Tooltip.Target>
                </Tooltip>
            }
        >
            {renderDatePickerExtended()}
        </MobileView>
    );
});

DateField.displayName = "DateField";
