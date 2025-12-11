import React, { useContext } from "react";
import moment from "moment";
import { CalendarContext } from "@sberbusiness/triplex-next/components/Calendar/CalendarContext";
import { Button } from "@sberbusiness/triplex-next/components/Button/Button";
import { EButtonTheme } from "@sberbusiness/triplex-next/components/Button/enums";
import { ECalendarPickType, ECalendarViewMode } from "@sberbusiness/triplex-next/components/Calendar/enums";
import { isDateOutOfRange, isDayDisabled } from "@sberbusiness/triplex-next/components/Calendar/utils";
import { EComponentSize } from "@sberbusiness/triplex-next/enums/EComponentSize";

/** Свойства компонента CalendarFooterButton. */
export interface ICalendarFooterButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    /** Дата. */
    date: moment.Moment;
    /** Выбран текущий период. */
    currentPeriodSelected: boolean;
}

/** Кнопка футера "Вчера", "Сегодня", "Завтра", "К текущей дате" или "Текущий период". */
export const CalendarFooterButton = React.forwardRef<HTMLButtonElement, ICalendarFooterButtonProps>(
    ({ date, currentPeriodSelected, disabled, onClick, ...rest }, ref) => {
        const { format, limitRange, pickType, viewMode, disabledDays, onPageChange, onViewChange, onDateSelect } =
            useContext(CalendarContext);

        const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
            if (currentPeriodSelected) {
                onDateSelect(date);
            } else if (pickType === ECalendarPickType.datePick) {
                if (viewMode === ECalendarViewMode.DAYS) {
                    onPageChange(date, ECalendarViewMode.DAYS);
                } else {
                    onViewChange(date, ECalendarViewMode.DAYS);
                }
            } else {
                if (viewMode === ECalendarViewMode.MONTHS) {
                    onPageChange(date, ECalendarViewMode.MONTHS);
                } else {
                    onViewChange(date, ECalendarViewMode.MONTHS);
                }
            }

            onClick?.(event);
        };

        const isDisabled = () => {
            if (disabled !== undefined) {
                return disabled;
            } else if (pickType === ECalendarPickType.datePick) {
                return isDateOutOfRange(date, limitRange, "day") || isDayDisabled(date.format(format), disabledDays);
            } else {
                return isDateOutOfRange(date, limitRange, "month");
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

CalendarFooterButton.displayName = "CalendarFooterButton";
