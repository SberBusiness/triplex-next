import React, { useContext, useState } from "react";
import moment from "moment";
import { action } from "storybook/actions";
import {
    Button,
    DatePickerExtended,
    DropdownMobileInput,
    ECalendarPickType,
    EButtonTheme,
    EComponentSize,
    EDropdownAlignment,
} from "@sberbusiness/triplex-next";
import { DatePickerExtendedContext } from "../../../src/components/DatePickerExtended/DatePickerExtendedContext";

const DATE_FORMAT = "YYYYMMDD";
const DISPLAY_FORMAT = "DD.MM.YYYY";

export interface IPlaygroundProps {
    /** Выравнивание выпадающего календаря относительно целевого элемента. */
    alignment: EDropdownAlignment;
    /** Вариант выбора даты. */
    pickType: ECalendarPickType;
    /** Обратный порядок выбора даты: год → месяц → день. */
    reversedPick: boolean;
    /** С кнопками «Вчера» / «Сегодня» / «Завтра» в футере календаря. */
    withFooterButtons: boolean;
}

const Target = ({ children }: { children: React.ReactNode }) => {
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

export const Playground = ({ alignment, pickType, reversedPick, withFooterButtons }: IPlaygroundProps) => {
    const [value, setValue] = useState("19700115");
    const displayedValue = moment(value, DATE_FORMAT).format(DISPLAY_FORMAT);

    const handleDateChange = (date: moment.Moment) => {
        setValue(date.format(DATE_FORMAT));
        action("onDateChange")(date.format(DATE_FORMAT));
    };

    return (
        <DatePickerExtended
            alignment={alignment}
            pickType={pickType}
            reversedPick={reversedPick}
            pickedDate={value}
            format={DATE_FORMAT}
            yesterdayButtonProps={withFooterButtons ? { children: "Вчера" } : undefined}
            todayButtonProps={withFooterButtons ? { children: "Сегодня" } : undefined}
            tomorrowButtonProps={withFooterButtons ? { children: "Завтра" } : undefined}
            onDateChange={handleDateChange}
            onDropdownOpen={action("onDropdownOpen")}
            onDropdownClose={action("onDropdownClose")}
            renderTarget={() => <Target>{displayedValue}</Target>}
            renderDropdownHeaderTarget={() => <DropdownMobileInput value={displayedValue} readOnly />}
        />
    );
};
