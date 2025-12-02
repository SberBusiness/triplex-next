import React, { useContext } from "react";
import moment from "moment";
import { CalendarContext } from "@sberbusiness/triplex-next/components/Calendar/CalendarContext";
import { Button } from "@sberbusiness/triplex-next/components/Button/Button";
import { EButtonTheme } from "@sberbusiness/triplex-next/components/Button/enums";
import { ECalendarPickType, ECalendarViewMode } from "@sberbusiness/triplex-next/components/Calendar/enums";
import { isDateOutOfRange, isDayDisabled } from "@sberbusiness/triplex-next/components/Calendar/utils";
import { EComponentSize } from "@sberbusiness/triplex-next/enums/EComponentSize";

/** Свойства компонента CalendarTodayButton. */
export interface ICalendarTodayButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    /** Сегодняшняя дата. */
    todayDate: moment.Moment;
    /** Выбран текущий период. */
    currentPeriodSelected: boolean;
}

/** Кнопка "Сегодня". */
export const CalendarTodayButton = React.forwardRef<HTMLButtonElement, ICalendarTodayButtonProps>(
    ({ todayDate, currentPeriodSelected, disabled, onClick, ...rest }, ref) => {
        const { format, limitRange, pickType, viewMode, disabledDays, onPageChange, onViewChange, onDateSelect } =
            useContext(CalendarContext);

        const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
            if (currentPeriodSelected) {
                onDateSelect(todayDate);
            } else if (pickType === ECalendarPickType.datePick) {
                if (viewMode === ECalendarViewMode.DAYS) {
                    onPageChange(todayDate, ECalendarViewMode.DAYS);
                } else {
                    onViewChange(todayDate, ECalendarViewMode.DAYS);
                }
            } else {
                if (viewMode === ECalendarViewMode.MONTHS) {
                    onPageChange(todayDate, ECalendarViewMode.MONTHS);
                } else {
                    onViewChange(todayDate, ECalendarViewMode.MONTHS);
                }
            }

            onClick?.(event);
        };

        const isDisabled = () => {
            if (disabled !== undefined) {
                return disabled;
            } else if (pickType === ECalendarPickType.datePick) {
                return (
                    isDateOutOfRange(todayDate, limitRange, "day") ||
                    isDayDisabled(todayDate.format(format), disabledDays)
                );
            } else {
                return isDateOutOfRange(todayDate, limitRange, "month");
            }
        };

        return (
            <Button
                theme={EButtonTheme.SECONDARY}
                size={EComponentSize.SM}
                onClick={handleClick}
                disabled={isDisabled()}
                {...rest}
                ref={ref}
            />
        );
    },
);

CalendarTodayButton.displayName = "CalendarTodayButton";
