import React, { useContext, useRef } from "react";
import { ICalendarCommonProps } from "@sberbusiness/triplex-next/components/Calendar/Calendar";
import { TPickedDate, TPickedRange } from "@sberbusiness/triplex-next/components/Calendar/types";
import { CalendarContext } from "@sberbusiness/triplex-next/components/Calendar/CalendarContext";
import { CalendarViewContext } from "@sberbusiness/triplex-next/components/Calendar/CalendarViewContext";
import { ECalendarViewMode } from "@sberbusiness/triplex-next/components/Calendar/enums";
import { CalendarViewDays } from "@sberbusiness/triplex-next/components/Calendar/components/CalendarViewDays";
import { CalendarViewMonths } from "@sberbusiness/triplex-next/components/Calendar/components/CalendarViewMonths";
import { CalendarViewYears } from "@sberbusiness/triplex-next/components/Calendar/components/CalendarViewYears";

/** Свойства компонента CalendarView. */
export interface ICalendarViewProps
    extends Pick<ICalendarCommonProps, "dayHtmlAttributes" | "monthHtmlAttributes" | "yearHtmlAttributes"> {
    /** Выбранная дата. */
    pickedDate?: TPickedDate;
    /** Выбранный период. */
    pickedRange?: TPickedRange;
}

/** Вид календаря. */
export const CalendarView: React.FC<ICalendarViewProps> = ({
    dayHtmlAttributes,
    monthHtmlAttributes,
    yearHtmlAttributes,
    ...rest
}) => {
    const { viewMode } = useContext(CalendarContext);
    const viewItemFocusedRef = useRef(false);

    /** Рендер текущего вида календаря. */
    const renderCurrentView = () => {
        switch (viewMode) {
            case ECalendarViewMode.DAYS:
                return <CalendarViewDays dayHtmlAttributes={dayHtmlAttributes} {...rest} />;
            case ECalendarViewMode.MONTHS:
                return <CalendarViewMonths monthHtmlAttributes={monthHtmlAttributes} {...rest} />;
            case ECalendarViewMode.YEARS:
                return <CalendarViewYears yearHtmlAttributes={yearHtmlAttributes} {...rest} />;
        }
    };

    return (
        <CalendarViewContext.Provider value={{ viewItemFocusedRef }}>
            {renderCurrentView()}
        </CalendarViewContext.Provider>
    );
};
