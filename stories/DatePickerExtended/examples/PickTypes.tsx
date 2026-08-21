import React, { useContext, useState } from "react";
import moment from "moment";
import {
    Button,
    DatePickerExtended,
    DropdownMobileInput,
    ECalendarPickType,
    EButtonTheme,
    EComponentSize,
} from "@sberbusiness/triplex-next";
// Целевой элемент открывает календарь через контекст DatePickerExtended.
// Контекст пока не входит в публичный barrel библиотеки, поэтому импортируется из исходников.
import { DatePickerExtendedContext } from "../../../src/components/DatePickerExtended/DatePickerExtendedContext";

const DATE_FORMAT = "YYYYMMDD";

/** Формат отображения даты для каждого варианта выбора. */
const PICK_TYPE_TO_DISPLAY_FORMAT = {
    [ECalendarPickType.DATE]: "DD.MM.YYYY",
    [ECalendarPickType.MONTH_YEAR]: "MMMM YYYY",
};

const PICK_TYPES = Object.values(ECalendarPickType);

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

interface IPickTypeItemProps {
    /** Вариант выбора даты. */
    pickType: ECalendarPickType;
}

const PickTypeItem = ({ pickType }: IPickTypeItemProps) => {
    const [value, setValue] = useState("19700115");
    const displayedValue = moment(value, DATE_FORMAT).format(PICK_TYPE_TO_DISPLAY_FORMAT[pickType]);

    return (
        <div>
            <div style={{ marginBottom: "8px", fontSize: "16px", fontWeight: "700" }}>{pickType.toUpperCase()}</div>
            <DatePickerExtended
                pickType={pickType}
                pickedDate={value}
                format={DATE_FORMAT}
                onDateChange={(date) => setValue(date.format(DATE_FORMAT))}
                renderTarget={() => <Target>{displayedValue}</Target>}
                renderDropdownHeaderTarget={() => <DropdownMobileInput value={displayedValue} readOnly />}
            />
        </div>
    );
};

export const PickTypes = () => (
    <div style={{ display: "flex", gap: "48px", flexWrap: "wrap" }}>
        {PICK_TYPES.map((pickType) => (
            <PickTypeItem key={pickType} pickType={pickType} />
        ))}
    </div>
);
