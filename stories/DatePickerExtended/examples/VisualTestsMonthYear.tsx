import React from "react";
import {
    Button,
    DatePickerExtended,
    DatePickerExtendedContext,
    DropdownMobileInput,
    ECalendarPickType,
    EButtonTheme,
    EComponentSize,
} from "@sberbusiness/triplex-next";

// Данные захардкожены: календарь всегда открывается на 1970 годе,
// иначе скриншот менялся бы вместе с текущей датой.
const PICKED_DATE = "19700115";
const DATE_FORMAT = "YYYYMMDD";

const Target = () => {
    const { dropdownOpen, setDropdownOpen } = React.useContext(DatePickerExtendedContext);

    return (
        <Button
            theme={EButtonTheme.SECONDARY}
            size={EComponentSize.MD}
            aria-haspopup="dialog"
            aria-expanded={dropdownOpen}
            onClick={() => setDropdownOpen(!dropdownOpen)}
        >
            Открыть календарь
        </Button>
    );
};

export const VisualTestsMonthYear = () => (
    <div style={{ width: "320px" }}>
        <DatePickerExtended
            pickType={ECalendarPickType.MONTH_YEAR}
            pickedDate={PICKED_DATE}
            format={DATE_FORMAT}
            onDateChange={() => {}}
            renderTarget={() => <Target />}
            renderDropdownHeaderTarget={() => <DropdownMobileInput value="январь 1970" readOnly />}
        />
    </div>
);
