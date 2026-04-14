import moment from "moment";
import React, { useState } from "react";
import { Calendar, ECalendarDateMarkType } from "@sberbusiness/triplex-next";

export const PlaygroundExample = (args: React.ComponentProps<typeof Calendar>) => {
    const [pickedDate, setPickedDate] = useState(moment());

    const markedDays = {
        [moment().subtract(1, "days").format("YYYY-MM-DD")]: ECalendarDateMarkType.BASIC,
        [moment().subtract(2, "days").format("YYYY-MM-DD")]: ECalendarDateMarkType.STANDARD,
        [moment().add(1, "days").format("YYYY-MM-DD")]: ECalendarDateMarkType.ATTENTION,
        [moment().add(2, "days").format("YYYY-MM-DD")]: ECalendarDateMarkType.CRITICAL,
    };

    const disabledDays = [
        moment().subtract(3, "days").format("YYYY-MM-DD"),
        moment().subtract(4, "days").format("YYYY-MM-DD"),
        moment().add(3, "days").format("YYYY-MM-DD"),
        moment().add(4, "days").format("YYYY-MM-DD"),
    ];

    return (
        <Calendar
            {...args}
            pickedDate={pickedDate}
            onDateChange={setPickedDate}
            markedDays={markedDays}
            disabledDays={disabledDays}
            yesterdayButtonProps={{ children: "Вчера" }}
            todayButtonProps={({ currentPeriodSelected }) => ({
                children: currentPeriodSelected ? "Сегодня" : "К текущей дате",
            })}
            tomorrowButtonProps={{ children: "Завтра" }}
        />
    );
};
