import React, { useContext } from "react";
import moment from "moment";
import { CalendarContext } from "../CalendarContext";
import { Button, IButtonSecondaryProps } from "../../Button/Button";
import { EButtonTheme } from "../../Button/enums";
import { ECalendarPickType, ECalendarViewMode } from "../enums";
import { isDateOutOfRange, isDayDisabled } from "../utils";

/** Свойства компонента CalendarFooterButton. */
export interface ICalendarFooterButtonProps extends Omit<IButtonSecondaryProps, "theme"> {
    /** Дата. */
    date: moment.Moment;
    /** Выбран текущий период. */
    currentPeriodSelected: boolean;
}

/** Кнопка футера "Вчера", "Сегодня", "Завтра", "К текущей дате" или "Текущий период". */
export const CalendarFooterButton = React.forwardRef<HTMLButtonElement, ICalendarFooterButtonProps>(
    ({ date, currentPeriodSelected, disabled, onClick, ...restProps }, ref) => {
        const { format, limitRange, pickType, viewMode, disabledDays, onPageChange, onViewChange, onDateSelect } =
            useContext(CalendarContext);

        const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
            if (currentPeriodSelected) {
                onDateSelect(date);
            } else if (pickType === ECalendarPickType.DATE) {
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
            } else if (pickType === ECalendarPickType.DATE) {
                return isDateOutOfRange(date, limitRange, "day") || isDayDisabled(date.format(format), disabledDays);
            } else {
                return isDateOutOfRange(date, limitRange, "month");
            }
        };

        return (
            <Button
                theme={EButtonTheme.SECONDARY}
                {...restProps}
                disabled={isDisabled()}
                onClick={handleClick}
                ref={ref}
            />
        );
    },
);

CalendarFooterButton.displayName = "CalendarFooterButton";
