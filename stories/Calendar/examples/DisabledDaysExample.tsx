import React, { useState } from "react";
import moment from "moment";
import { Calendar, dateFormatYYYYMMDD } from "@sberbusiness/triplex-next";

export const DisabledDaysExample = () => {
    const [pickedDate, setPickedDate] = useState(moment());

    return (
        <Calendar
            pickedDate={pickedDate}
            disabledDays={[
                moment().subtract(3, "days").format(dateFormatYYYYMMDD),
                moment().subtract(5, "days").format(dateFormatYYYYMMDD),
                moment().add(3, "days").format(dateFormatYYYYMMDD),
                moment().add(5, "days").format(dateFormatYYYYMMDD),
            ]}
            onDateChange={setPickedDate}
        />
    );
};
