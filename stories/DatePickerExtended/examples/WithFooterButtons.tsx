import React, { useContext, useState } from "react";
import moment from "moment";
import {
    Button,
    DatePickerExtended,
    DropdownMobileInput,
    EButtonTheme,
    EComponentSize,
} from "@sberbusiness/triplex-next";
// Целевой элемент открывает календарь через контекст DatePickerExtended.
// Контекст пока не входит в публичный barrel библиотеки, поэтому импортируется из исходников.
import { DatePickerExtendedContext } from "../../../src/components/DatePickerExtended/DatePickerExtendedContext";

const DATE_FORMAT = "YYYYMMDD";
const DISPLAY_FORMAT = "DD.MM.YYYY";

interface ITargetProps {
    /** Отображаемое значение даты. */
    children: React.ReactNode;
}

const Target = ({ children }: ITargetProps) => {
    const { dropdownOpen, setDropdownOpen } = useContext(DatePickerExtendedContext);

    return (
        <Button
            theme={EButtonTheme.SECONDARY}
            size={EComponentSize.MD}
            aria-haspopup="dialog"
            aria-expanded={dropdownOpen}
            onClick={() => setDropdownOpen(!dropdownOpen)}
        >
            {children}
        </Button>
    );
};

// Кнопки «Вчера» и «Завтра» календарь показывает только на странице текущего месяца,
// кнопку «Сегодня» — всегда. Текст кнопок задаёт потребитель.
export const WithFooterButtons = () => {
    const [value, setValue] = useState(moment().format(DATE_FORMAT));
    const displayedValue = moment(value, DATE_FORMAT).format(DISPLAY_FORMAT);

    return (
        <DatePickerExtended
            pickedDate={value}
            format={DATE_FORMAT}
            yesterdayButtonProps={{ children: "Вчера" }}
            todayButtonProps={{ children: "Сегодня" }}
            tomorrowButtonProps={{ children: "Завтра" }}
            onDateChange={(date) => setValue(date.format(DATE_FORMAT))}
            renderTarget={() => <Target>{displayedValue}</Target>}
            renderDropdownHeaderTarget={() => <DropdownMobileInput value={displayedValue} readOnly />}
        />
    );
};
