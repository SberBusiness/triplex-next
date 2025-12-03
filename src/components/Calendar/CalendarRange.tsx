import React from "react";
import moment from "moment";
import {
    ICalendarCommonProps,
    ICalendarProvideProps,
    TPickedRange,
    TPickedRangeProp,
} from "@sberbusiness/triplex-next/components/Calendar/types";

export interface ICalendarRangeProps extends ICalendarCommonProps {
    children: [(props: ICalendarProvideProps) => React.ReactNode, (props: ICalendarProvideProps) => React.ReactNode];
    /** Дата календаря по умолчанию. */
    defaultDate?: moment.Moment;
    /** Обработчик изменения периода. */
    onRangeChange: (date: TPickedRange) => void;
    /** Выбранный период. */
    pickedRange: TPickedRangeProp;
}

export const CalendarRange: React.FC<ICalendarRangeProps> = ({
    children,
    defaultDate,
    onRangeChange,
    pickedRange,
    ...commonProps
}) => (
    <>
        {children[0]({
            ...commonProps,
            isRange: true,
            defaultDate: defaultDate ?? moment(),
            onDateChange: onRangeChange,
            pickedDate: pickedRange,
        })}
        {children[1]({
            ...commonProps,
            isRange: true,
            defaultDate: (defaultDate ?? moment()).add(1, "month"),
            onDateChange: onRangeChange,
            pickedDate: pickedRange,
        })}
    </>
);
