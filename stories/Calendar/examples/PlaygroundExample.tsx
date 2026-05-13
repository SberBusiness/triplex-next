import React, { useState, useMemo } from "react";
import moment from "moment";
import { Calendar, ECalendarDateMarkType, dateFormatYYYYMMDD } from "@sberbusiness/triplex-next";

export interface PlaygroundArgs extends Pick<
    React.ComponentProps<typeof Calendar>,
    "defaultViewDate" | "pickType" | "reversedPick" | "adaptiveMode"
> {
    withMarkedDays: boolean;
    withDisabledDays: boolean;
    withButtons: boolean;
}

export const PlaygroundExample = ({ withMarkedDays, withDisabledDays, withButtons, ...restArgs }: PlaygroundArgs) => {
    const [pickedDate, setPickedDate] = useState(moment());

    const markedDays = useMemo(
        () =>
            withMarkedDays
                ? {
                      [moment().subtract(2, "days").format(dateFormatYYYYMMDD)]: ECalendarDateMarkType.BASIC,
                      [moment().subtract(4, "days").format(dateFormatYYYYMMDD)]: ECalendarDateMarkType.STANDARD,
                      [moment().add(2, "days").format(dateFormatYYYYMMDD)]: ECalendarDateMarkType.ATTENTION,
                      [moment().add(4, "days").format(dateFormatYYYYMMDD)]: ECalendarDateMarkType.CRITICAL,
                  }
                : undefined,
        [withMarkedDays],
    );

    const disabledDays = useMemo(
        () =>
            withDisabledDays
                ? [
                      moment().subtract(3, "days").format(dateFormatYYYYMMDD),
                      moment().subtract(5, "days").format(dateFormatYYYYMMDD),
                      moment().add(3, "days").format(dateFormatYYYYMMDD),
                      moment().add(5, "days").format(dateFormatYYYYMMDD),
                  ]
                : undefined,
        [withDisabledDays],
    );

    const buttonProps = useMemo(
        () =>
            withButtons
                ? {
                      yesterdayButtonProps: { children: "Вчера" },
                      tomorrowButtonProps: { children: "Завтра" },
                      todayButtonProps: ({ currentPeriodSelected }: { currentPeriodSelected: boolean }) => ({
                          children: currentPeriodSelected ? "Сегодня" : "К текущей дате",
                      }),
                  }
                : undefined,
        [withButtons],
    );

    return (
        <Calendar
            {...restArgs}
            pickedDate={pickedDate}
            markedDays={markedDays}
            disabledDays={disabledDays}
            onDateChange={setPickedDate}
            {...buttonProps}
        />
    );
};
