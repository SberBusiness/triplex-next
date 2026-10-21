import React from "react";
import moment from "moment";
import { action } from "storybook/actions";
import {
    ChipMonthYearPickerTarget,
    DatePickerExtended,
    ECalendarPickType,
    IChipMonthYearPickerTargetProps,
} from "@sberbusiness/triplex-next";

const LIMIT_RANGE = { dateFrom: moment("20230101"), dateTo: moment("20251231") };

export const Playground = (props: IChipMonthYearPickerTargetProps) => (
    <div style={{ width: 320 }}>
        <DatePickerExtended
            pickType={ECalendarPickType.MONTH_YEAR}
            defaultViewDate="20240101"
            pickedDate={props.selected ? "20240101" : null}
            limitRange={LIMIT_RANGE}
            onDateChange={action("onDateChange")}
            renderTarget={() => <ChipMonthYearPickerTarget {...props} />}
            renderDropdownHeaderTarget={() => props.children}
        />
    </div>
);
