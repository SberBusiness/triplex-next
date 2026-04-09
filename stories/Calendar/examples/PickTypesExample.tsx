import moment from "moment";
import React, { useState } from "react";
import { Calendar, ECalendarPickType } from "@sberbusiness/triplex-next";

export const PickTypesExample = () => {
    const [pickedDateDatePick, setPickedDateDatePick] = useState(moment());
    const [pickedDateMonthYearPick, setPickedDateMonthYearPick] = useState(moment());

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div>
                <div style={{ marginBottom: "8px", fontSize: "16px", fontWeight: "700" }}>DATEPICK</div>
                <Calendar
                    pickType={ECalendarPickType.datePick}
                    pickedDate={pickedDateDatePick}
                    onDateChange={setPickedDateDatePick}
                />
            </div>
            <div>
                <div style={{ marginBottom: "8px", fontSize: "16px", fontWeight: "700" }}>MONTHYEARPICK</div>
                <Calendar
                    pickType={ECalendarPickType.monthYearPick}
                    pickedDate={pickedDateMonthYearPick}
                    onDateChange={setPickedDateMonthYearPick}
                />
            </div>
        </div>
    );
};
