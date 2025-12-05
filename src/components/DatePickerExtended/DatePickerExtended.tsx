import React, { useState, useEffect, useRef } from "react";
import moment from "moment";
import { FocusTrapProps } from "focus-trap-react";
import { isKey } from "../../utils/keyboard";
import { Calendar, ICalendarSingleProps } from "../Calendar";
import { EDropdownAlignment, IDropdownProps } from "../Dropdown";
import { DatePickerExtendedContext } from "./DatePickerExtendedContext";
import { DatePickerExtendedDropdown } from "./DatePickerExtendedDropdown";
import { EComponentSize } from "../../enums";

/** Свойства компонента DatePickerExtended. */
export interface IDatePickerExtendedProps
    extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange">,
        Pick<IDropdownProps, "alignment">,
        ICalendarSingleProps {
    /** Рендер-функция целевого элемента. */
    renderTarget: () => React.ReactNode;
    /** Рендер-функция целевого элемента в заголовке DropdownMobile. */
    renderDropdownHeaderTarget: () => React.ReactNode;
    /** Callback на открытие Dropdown. */
    onDropdownOpen?: () => void;
    /** Callback на закрытие Dropdown. */
    onDropdownClose?: () => void;
    /** Свойства FocusTrap. Используется npm-пакет focus-trap-react. */
    focusTrapProps?: FocusTrapProps;
}

/** База для компонента DatePicker. */
export const DatePickerExtended = React.forwardRef<HTMLDivElement, IDatePickerExtendedProps>((props, ref) => {
    const {
        // Dropdown props
        alignment = EDropdownAlignment.LEFT,
        focusTrapProps,
        // Calendar props
        pickType,
        format,
        defaultViewDate,
        onViewChange,
        onPageChange,
        pickedDate,
        limitRange,
        markedDays,
        disabledDays,
        reversedPick,
        dayHtmlAttributes,
        monthHtmlAttributes,
        yearHtmlAttributes,
        prevButtonProps,
        nextButtonProps,
        viewButtonProps,
        todayButtonProps,
        onDateChange,
        // Other
        renderTarget,
        renderDropdownHeaderTarget,
        onKeyDown,
        onMouseDown,
        onDropdownOpen,
        onDropdownClose,
        ...restProps
    } = props;
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);
    // Пользователь взаимодействует мышью.
    const mouseUsedRef = useRef(false);

    useEffect(() => {
        /** Обработчик нажатия мыши вне компонента. */
        const handleOutsideMouseDown = (event: MouseEvent) => {
            if (
                !containerRef.current?.contains(event.target as Node) &&
                !dropdownRef.current?.contains(event.target as Node)
            ) {
                setDropdownOpen(false);
            }
        };

        if (dropdownOpen) {
            document.addEventListener("mousedown", handleOutsideMouseDown);

            return () => {
                document.removeEventListener("mousedown", handleOutsideMouseDown);
            };
        } else {
            mouseUsedRef.current = false;
        }
    }, [dropdownOpen]);

    /** Обработчик нажатия клавиши. */
    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        const key = event.code || event.keyCode;

        if (isKey(key, "ESCAPE")) {
            if (dropdownOpen) {
                setDropdownOpen(false);
            }
        }

        onKeyDown?.(event);
    };

    /** Обработчик нажатия мыши. */
    const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
        mouseUsedRef.current = true;

        onMouseDown?.(event);
    };

    /** Рендер календаря. */
    const renderCalendar = (adaptiveMode: boolean) => (
        <Calendar
            defaultViewDate={defaultViewDate}
            pickedDate={pickedDate}
            pickType={pickType}
            format={format}
            limitRange={limitRange}
            markedDays={markedDays}
            disabledDays={disabledDays}
            reversedPick={reversedPick}
            adaptiveMode={adaptiveMode}
            onDateChange={handleChangeDate}
            onPageChange={onPageChange}
            onViewChange={onViewChange}
            dayHtmlAttributes={dayHtmlAttributes}
            monthHtmlAttributes={monthHtmlAttributes}
            yearHtmlAttributes={yearHtmlAttributes}
            prevButtonProps={prevButtonProps}
            nextButtonProps={nextButtonProps}
            viewButtonProps={viewButtonProps}
            todayButtonProps={todayButtonProps}
        />
    );

    /** Обработчик изменения даты. */
    const handleChangeDate = (date: moment.Moment) => {
        setDropdownOpen(false);

        onDateChange(date);
    };

    /** Функция для хранения ссылки. */
    const setRef = (node: HTMLDivElement | null) => {
        containerRef.current = node;
        if (typeof ref === "function") {
            ref(node);
        } else if (ref) {
            ref.current = node;
        }
    };

    return (
        <div
            onKeyDown={handleKeyDown}
            onMouseDown={handleMouseDown}
            {...restProps}
            data-tx={process.env.npm_package_version}
            ref={setRef}
        >
            <DatePickerExtendedContext.Provider value={{ dropdownOpen, mouseUsedRef, setDropdownOpen }}>
                {renderTarget()}
                <DatePickerExtendedDropdown
                    opened={dropdownOpen}
                    size={EComponentSize.MD}
                    alignment={alignment}
                    targetRef={containerRef}
                    focusTrapProps={focusTrapProps}
                    renderCalendar={renderCalendar}
                    renderHeaderTarget={renderDropdownHeaderTarget}
                    setOpened={setDropdownOpen}
                    onOpen={onDropdownOpen}
                    onClose={onDropdownClose}
                    ref={dropdownRef}
                />
            </DatePickerExtendedContext.Provider>
        </div>
    );
});

DatePickerExtended.displayName = "DatePickerExtended";
