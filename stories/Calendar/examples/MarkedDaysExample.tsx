import React, { useState } from "react";
import moment from "moment";
import { Calendar, dateFormatYYYYMMDD, ECalendarDateMarkType } from "@sberbusiness/triplex-next";

export const MarkedDaysExample = () => {
    const [pickedDate, setPickedDate] = useState(moment());

    return (
        <Calendar
            pickedDate={pickedDate}
            markedDays={{
                [moment().subtract(2, "days").format(dateFormatYYYYMMDD)]: ECalendarDateMarkType.BASIC,
                [moment().subtract(4, "days").format(dateFormatYYYYMMDD)]: ECalendarDateMarkType.STANDARD,
                [moment().add(2, "days").format(dateFormatYYYYMMDD)]: ECalendarDateMarkType.ATTENTION,
                [moment().add(4, "days").format(dateFormatYYYYMMDD)]: ECalendarDateMarkType.CRITICAL,
            }}
            onDateChange={setPickedDate}
        />
    );
};
