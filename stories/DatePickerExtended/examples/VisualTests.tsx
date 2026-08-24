import React from "react";
import moment from "moment";
import {
    Button,
    DatePickerExtended,
    DatePickerExtendedContext,
    DropdownMobileInput,
    ECalendarDateMarkType,
    EButtonTheme,
    EComponentSize,
} from "@sberbusiness/triplex-next";

// Данные захардкожены: календарь всегда открывается на январе 1970 года,
// иначе скриншот менялся бы вместе с текущей датой.
const PICKED_DATE = "19700115";
const DATE_FORMAT = "YYYYMMDD";

const MARKED_DAYS = {
    "19700108": ECalendarDateMarkType.STANDARD,
    "19700109": ECalendarDateMarkType.ATTENTION,
    "19700112": ECalendarDateMarkType.CRITICAL,
};

const DISABLED_DAYS = ["19700120", "19700121"];

const LIMIT_RANGE = {
    dateFrom: moment("19700105", DATE_FORMAT),
    dateTo: moment("19700125", DATE_FORMAT),
};

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

export const VisualTests = () => (
    <div style={{ width: "320px" }}>
        <DatePickerExtended
            pickedDate={PICKED_DATE}
            format={DATE_FORMAT}
            limitRange={LIMIT_RANGE}
            markedDays={MARKED_DAYS}
            disabledDays={DISABLED_DAYS}
            todayButtonProps={{ children: "Сегодня" }}
            onDateChange={() => {}}
            renderTarget={() => <Target />}
            renderDropdownHeaderTarget={() => <DropdownMobileInput value="15.01.1970" readOnly />}
        />
    </div>
);
