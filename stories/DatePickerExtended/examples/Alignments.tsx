import React, { useContext, useState } from "react";
import moment from "moment";
import {
    Button,
    DatePickerExtended,
    DatePickerExtendedContext,
    DropdownMobileInput,
    EButtonTheme,
    EComponentSize,
    EDropdownAlignment,
} from "@sberbusiness/triplex-next";

const DATE_FORMAT = "YYYYMMDD";
const DISPLAY_FORMAT = "DD.MM.YYYY";

const ALIGNMENTS = Object.values(EDropdownAlignment);

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

interface IAlignmentItemProps {
    /** Выравнивание выпадающего календаря относительно целевого элемента. */
    alignment: EDropdownAlignment;
}

const AlignmentItem = ({ alignment }: IAlignmentItemProps) => {
    const [value, setValue] = useState("19700115");
    const displayedValue = moment(value, DATE_FORMAT).format(DISPLAY_FORMAT);

    return (
        <div>
            <div style={{ marginBottom: "8px", fontSize: "16px", fontWeight: "700" }}>{alignment.toUpperCase()}</div>
            <DatePickerExtended
                alignment={alignment}
                pickedDate={value}
                format={DATE_FORMAT}
                onDateChange={(date) => setValue(date.format(DATE_FORMAT))}
                renderTarget={() => <Target>{displayedValue}</Target>}
                renderDropdownHeaderTarget={() => <DropdownMobileInput value={displayedValue} readOnly />}
            />
        </div>
    );
};

export const Alignments = () => (
    <div style={{ display: "flex", gap: "48px", flexWrap: "wrap" }}>
        {ALIGNMENTS.map((alignment) => (
            <AlignmentItem key={alignment} alignment={alignment} />
        ))}
    </div>
);
