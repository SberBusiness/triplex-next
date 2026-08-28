import React, { useContext, useState } from "react";
import moment from "moment";
import {
    Button,
    DatePickerExtended,
    DatePickerExtendedContext,
    DropdownMobileInput,
    EButtonTheme,
    EComponentSize,
} from "@sberbusiness/triplex-next";

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

export const Default = () => {
    const [value, setValue] = useState("19700115");
    const displayedValue = moment(value, DATE_FORMAT).format(DISPLAY_FORMAT);

    return (
        <DatePickerExtended
            pickedDate={value}
            format={DATE_FORMAT}
            onDateChange={(date) => setValue(date.format(DATE_FORMAT))}
            renderTarget={() => <Target>{displayedValue}</Target>}
            renderDropdownHeaderTarget={() => <DropdownMobileInput value={displayedValue} readOnly />}
        />
    );
};
