import React, { useState, useEffect, useRef } from "react";
import moment from "moment";
import { FocusTrapProps } from "focus-trap-react";
import { isKey } from "../../utils/keyboard";
import { Calendar, ICalendarProps } from "../Calendar";
import { EDropdownAlignment, IDropdownProps } from "../Dropdown";
import { DatePickerExtendedContext } from "./DatePickerExtendedContext";
import { DatePickerExtendedDropdown } from "./DatePickerExtendedDropdown";
import { EComponentSize } from "../../enums";

/**
 * Свойства компонента DatePickerExtended.
 * adaptiveMode исключён из props календаря: адаптивный режим компонент определяет сам по версии дропдауна.
 */
export interface IDatePickerExtendedProps
    extends
        Omit<React.HTMLAttributes<HTMLDivElement>, "onChange">,
        Pick<IDropdownProps, "alignment">,
        Omit<ICalendarProps, "adaptiveMode"> {
    /** Ссылка на целевой элемент для Dropdown. По умолчанию — корневой элемент компонента. */
    dropdownTargetRef?: React.RefObject<HTMLElement>;
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

/**
 * База для компонентов выбора даты (DateField, MonthYearField, ChipDatePicker).
 * Рендерит переданный целевым элемент и выпадающий Calendar, хранит состояние открытости
 * дропдауна и отдаёт его целевому элементу через DatePickerExtendedContext.
 */
export const DatePickerExtended = React.forwardRef<HTMLDivElement, IDatePickerExtendedProps>((props, ref) => {
    const {
        // Dropdown props
        dropdownTargetRef,
        alignment = EDropdownAlignment.LEFT,
        focusTrapProps,
        // Calendar props — перечислены явно, иначе они попадут в restProps и осядут на корневом div.
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
        yesterdayButtonProps,
        todayButtonProps,
        tomorrowButtonProps,
        onDateChange,
        // Other
        renderTarget,
        renderDropdownHeaderTarget,
        onKeyDown,
        onMouseDown,
        onDropdownOpen,
        onDropdownClose,
        // adaptiveMode исключён из публичного типа, но JS-потребитель и старый скомпилированный код
        // всё ещё могут его передать. Снимаем значение здесь, иначе оно уйдёт на корневой div.
        adaptiveMode,
        ...restProps
    } = props as IDatePickerExtendedProps & Pick<ICalendarProps, "adaptiveMode">;
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);
    /** Флаг взаимодействия пользователя мышью. */
    const mouseUsedRef = useRef(false);

    useEffect(() => {
        if (!dropdownOpen) {
            mouseUsedRef.current = false;

            return;
        }

        /** Обработчик нажатия мыши вне компонента. */
        const handleOutsideMouseDown = (event: MouseEvent) => {
            if (
                !containerRef.current?.contains(event.target as Node) &&
                !dropdownRef.current?.contains(event.target as Node)
            ) {
                setDropdownOpen(false);
            }
        };

        document.addEventListener("mousedown", handleOutsideMouseDown);

        return () => {
            document.removeEventListener("mousedown", handleOutsideMouseDown);
        };
    }, [dropdownOpen]);

    /** Обработчик нажатия клавиши. */
    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        const key = event.code || event.keyCode;

        if (dropdownOpen && isKey(key, "ESCAPE")) {
            setDropdownOpen(false);
        }

        onKeyDown?.(event);
    };

    /** Обработчик нажатия мыши. */
    const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
        mouseUsedRef.current = true;

        onMouseDown?.(event);
    };

    /** Обработчик изменения даты. Выбор даты закрывает дропдаун. */
    const handleDateChange = (date: moment.Moment) => {
        setDropdownOpen(false);

        onDateChange(date);
    };

    /** Рендер календаря. Адаптивный режим включает мобильная версия дропдауна. */
    const renderCalendar = (adaptive: boolean) => (
        <Calendar
            defaultViewDate={defaultViewDate}
            pickedDate={pickedDate}
            pickType={pickType}
            format={format}
            limitRange={limitRange}
            markedDays={markedDays}
            disabledDays={disabledDays}
            reversedPick={reversedPick}
            adaptiveMode={adaptive}
            onDateChange={handleDateChange}
            onPageChange={onPageChange}
            onViewChange={onViewChange}
            dayHtmlAttributes={dayHtmlAttributes}
            monthHtmlAttributes={monthHtmlAttributes}
            yearHtmlAttributes={yearHtmlAttributes}
            prevButtonProps={prevButtonProps}
            nextButtonProps={nextButtonProps}
            viewButtonProps={viewButtonProps}
            yesterdayButtonProps={yesterdayButtonProps}
            todayButtonProps={todayButtonProps}
            tomorrowButtonProps={tomorrowButtonProps}
        />
    );

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
                    targetRef={dropdownTargetRef || containerRef}
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
