import React, { useState } from "react";
import moment from "moment";
import { ChipDatePickerTarget, DatePickerExtended } from "@sberbusiness/triplex-next";

const LIMIT_RANGE = {
    dateFrom: moment("19700101", "YYYYMMDD"),
    dateTo: moment("19701231", "YYYYMMDD"),
};

export const Default = () => {
    const [pickedDate, setPickedDate] = useState<string | null>(null);

    return (
        <DatePickerExtended
            style={{ display: "inline-block" }}
            pickedDate={pickedDate}
            defaultViewDate="19700115"
            limitRange={LIMIT_RANGE}
            onDateChange={(date) => setPickedDate(date.format("YYYYMMDD"))}
            renderTarget={() => (
                <ChipDatePickerTarget
                    selected={pickedDate !== null}
                    onClear={() => setPickedDate(null)}
                    aria-haspopup="dialog"
                >
                    {pickedDate ? moment(pickedDate, "YYYYMMDD").format("DD.MM.YYYY") : "Выберите дату"}
                </ChipDatePickerTarget>
            )}
            renderDropdownHeaderTarget={() => <span>Выберите дату</span>}
        />
    );
};
