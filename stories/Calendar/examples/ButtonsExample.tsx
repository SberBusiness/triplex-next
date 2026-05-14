import React, { useState } from "react";
import moment from "moment";
import { Calendar } from "@sberbusiness/triplex-next";

export const ButtonsExample = () => {
    const [pickedDate, setPickedDate] = useState(moment());

    return (
        <Calendar
            pickedDate={pickedDate}
            onDateChange={setPickedDate}
            todayButtonProps={({ currentPeriodSelected }) => ({
                children: currentPeriodSelected ? "Сегодня" : "К текущей дате",
            })}
            yesterdayButtonProps={{ children: "Вчера" }}
            tomorrowButtonProps={{ children: "Завтра" }}
        />
    );
};
