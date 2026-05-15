import React, { useContext, useRef } from "react";
import { ICalendarViewProps } from "../types";
import { CalendarContext } from "../CalendarContext";
import { CalendarViewContext } from "../CalendarViewContext";
import { ECalendarViewMode } from "../enums";
import { CalendarViewDays } from "./CalendarViewDays";
import { CalendarViewMonths } from "./CalendarViewMonths";
import { CalendarViewYears } from "./CalendarViewYears";

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
