import React from "react";
import {
    Button,
    DatePickerExtended,
    DatePickerExtendedContext,
    DropdownMobileInput,
    EButtonTheme,
    EComponentSize,
    EDropdownAlignment,
} from "@sberbusiness/triplex-next";

// Данные захардкожены: календарь всегда открывается на январе 1970 года,
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

// Выравнивание RIGHT: правый край календаря совпадает с правым краем целевого элемента.
export const VisualTestsAlignmentRight = () => (
    <div style={{ width: "320px", display: "flex", justifyContent: "flex-end" }}>
        <DatePickerExtended
            alignment={EDropdownAlignment.RIGHT}
            pickedDate={PICKED_DATE}
            format={DATE_FORMAT}
            onDateChange={() => {}}
            renderTarget={() => <Target />}
            renderDropdownHeaderTarget={() => <DropdownMobileInput value="15.01.1970" readOnly />}
        />
    </div>
);
