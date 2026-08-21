import React, { useContext, useState } from "react";
import moment from "moment";
import {
    Button,
    DatePickerExtended,
    DropdownMobileInput,
    ECalendarDateMarkType,
    EButtonTheme,
    EComponentSize,
} from "@sberbusiness/triplex-next";
// Целевой элемент открывает календарь через контекст DatePickerExtended.
// Контекст пока не входит в публичный barrel библиотеки, поэтому импортируется из исходников.
import { DatePickerExtendedContext } from "../../../src/components/DatePickerExtended/DatePickerExtendedContext";

const DATE_FORMAT = "YYYYMMDD";
const DISPLAY_FORMAT = "DD.MM.YYYY";

/** Отмеченные дни: тип отметки задаёт цвет маркера под числом. */
const MARKED_DAYS = {
    "19700108": ECalendarDateMarkType.STANDARD,
    "19700109": ECalendarDateMarkType.ATTENTION,
    "19700112": ECalendarDateMarkType.CRITICAL,
};

/** Дни, недоступные для выбора. */
const DISABLED_DAYS = ["19700120", "19700121"];

/** Ограничение выбираемого периода. */
const LIMIT_RANGE = {
    dateFrom: moment("19700105", DATE_FORMAT),
    dateTo: moment("19700125", DATE_FORMAT),
};

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

export const WithMarkedAndDisabledDays = () => {
    const [value, setValue] = useState("19700115");
    const displayedValue = moment(value, DATE_FORMAT).format(DISPLAY_FORMAT);

    return (
        <DatePickerExtended
            pickedDate={value}
            format={DATE_FORMAT}
            limitRange={LIMIT_RANGE}
            markedDays={MARKED_DAYS}
            disabledDays={DISABLED_DAYS}
            onDateChange={(date) => setValue(date.format(DATE_FORMAT))}
            renderTarget={() => <Target>{displayedValue}</Target>}
            renderDropdownHeaderTarget={() => <DropdownMobileInput value={displayedValue} readOnly />}
        />
    );
};
