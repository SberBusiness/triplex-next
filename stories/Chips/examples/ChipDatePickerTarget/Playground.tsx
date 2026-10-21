import React from "react";
import moment from "moment";
import { action } from "storybook/actions";
import { ChipDatePickerTarget, DatePickerExtended, IChipDatePickerTargetProps } from "@sberbusiness/triplex-next";

const LIMIT_RANGE = {
    dateFrom: moment("19700101", "YYYYMMDD"),
    dateTo: moment("19701231", "YYYYMMDD"),
};

export const Playground = (props: IChipDatePickerTargetProps) => (
    <DatePickerExtended
        style={{ display: "inline-block" }}
        pickedDate={props.selected ? "19700115" : null}
        defaultViewDate="19700115"
        limitRange={LIMIT_RANGE}
        onDateChange={action("onDateChange")}
        renderTarget={() => <ChipDatePickerTarget aria-haspopup="dialog" {...props} />}
        renderDropdownHeaderTarget={() => <span>Выберите дату</span>}
    />
);
