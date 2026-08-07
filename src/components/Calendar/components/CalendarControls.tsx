import React, { useContext } from "react";
import { CaretleftStrokeSrvIcon24, CaretrightStrokeSrvIcon24 } from "@sberbusiness/icons-next";
import { CalendarContext } from "../CalendarContext";
import { ICalendarProps } from "../types";
import { ICalendarNavigationStep, TCalendarShiftOperation, shiftDate } from "../utils";
import { Button } from "../../Button/Button";
import { ButtonIcon } from "../../Button/ButtonIcon";
import { EButtonTheme, EButtonIconShape } from "../../Button/enums";
import { ECalendarViewMode } from "../enums";
import { globalLimitRange } from "../../../consts/DateConst";
import { EComponentSize } from "../../../enums/EComponentSize";
import styles from "../styles/CalendarControls.module.less";

/** Свойства компонента CalendarControls. */
export interface ICalendarControlsProps extends Pick<
    ICalendarProps,
    "prevButtonProps" | "nextButtonProps" | "viewButtonProps"
> {
    /** Заголовок календаря — текущий период. */
    children: React.ReactNode;
}

/** Величина сдвига страницы календаря для каждого вида отображения. */
const PAGE_SHIFT_BY_VIEW_MODE: Record<ECalendarViewMode, ICalendarNavigationStep> = {
    [ECalendarViewMode.DAYS]: { amount: 1, unit: "month" },
    [ECalendarViewMode.MONTHS]: { amount: 1, unit: "year" },
    [ECalendarViewMode.YEARS]: { amount: 12, unit: "year" },
};

/** Элементы управления календаря. */
export const CalendarControls: React.FC<ICalendarControlsProps> = ({
    children,
    prevButtonProps = {},
    nextButtonProps = {},
    viewButtonProps = {},
}): JSX.Element => {
    const { viewDate, viewMode, limitRange, periodId, onPageChange, onViewChange } = useContext(CalendarContext);

    /** Рендер кнопки "назад". */
    const renderPrevButton = () => {
        const { disabled, onClick, ...rest } =
            typeof prevButtonProps === "function" ? prevButtonProps(viewMode) : prevButtonProps;

        return (
            <ButtonIcon
                shape={EButtonIconShape.CIRCLE}
                disabled={disabled || isPrevButtonDisabled()}
                onClick={handlePageButtonClick("subtract", onClick)}
                {...rest}
            >
                <CaretleftStrokeSrvIcon24 paletteIndex={5} />
            </ButtonIcon>
        );
    };

    /** Рендер кнопки "вперед". */
    const renderNextButton = () => {
        const { disabled, onClick, ...rest } =
            typeof nextButtonProps === "function" ? nextButtonProps(viewMode) : nextButtonProps;

        return (
            <ButtonIcon
                shape={EButtonIconShape.CIRCLE}
                disabled={disabled || isNextButtonDisabled()}
                onClick={handlePageButtonClick("add", onClick)}
                {...rest}
            >
                <CaretrightStrokeSrvIcon24 paletteIndex={5} />
            </ButtonIcon>
        );
    };

    /** Рендер кнопки "изменить вид". */
    const renderViewButton = () => {
        const { onClick, ...rest } =
            typeof viewButtonProps === "function" ? viewButtonProps(viewMode) : viewButtonProps;

        return (
            <Button
                id={periodId}
                aria-live="polite"
                theme={EButtonTheme.LINK}
                size={EComponentSize.SM}
                onClick={handleViewButtonClick(onClick)}
                {...rest}
            >
                {children}
            </Button>
        );
    };

    /** Проверяет, является ли кнопка "назад" отключенной. */
    const isPrevButtonDisabled = () => {
        const date = viewDate.clone();

        if (viewMode === ECalendarViewMode.DAYS) {
            date.startOf("month");
        } else if (viewMode === ECalendarViewMode.MONTHS) {
            date.startOf("year");
        } else if (viewMode === ECalendarViewMode.YEARS) {
            date.startOf("year").subtract(5, "years");
        }

        return date.subtract(1, "day").isBefore(limitRange.dateFrom || globalLimitRange.dateFrom, "day");
    };

    /** Проверяет, является ли кнопка "вперёд" отключенной. */
    const isNextButtonDisabled = () => {
        const date = viewDate.clone();

        if (viewMode === ECalendarViewMode.DAYS) {
            date.endOf("month");
        } else if (viewMode === ECalendarViewMode.MONTHS) {
            date.endOf("year");
        } else if (viewMode === ECalendarViewMode.YEARS) {
            date.endOf("year").add(6, "years");
        }

        return date.add(1, "day").isAfter(limitRange.dateTo || globalLimitRange.dateTo, "day");
    };

    /** Обработчик клика на кнопку переключения страницы ("назад" / "вперёд"). */
    const handlePageButtonClick =
        (operation: TCalendarShiftOperation, onClick?: React.MouseEventHandler<HTMLButtonElement>) =>
        (event: React.MouseEvent<HTMLButtonElement>) => {
            const date = shiftDate(viewDate.clone(), { operation, ...PAGE_SHIFT_BY_VIEW_MODE[viewMode] });

            onPageChange(date, viewMode);
            onClick?.(event);
        };

    /** Обработчик клика на кнопку "изменить вид". */
    const handleViewButtonClick =
        (onClick?: React.MouseEventHandler<HTMLButtonElement>) => (event: React.MouseEvent<HTMLButtonElement>) => {
            if (viewMode === ECalendarViewMode.DAYS) {
                onViewChange(viewDate, ECalendarViewMode.MONTHS);
            } else if (viewMode === ECalendarViewMode.MONTHS) {
                onViewChange(viewDate, ECalendarViewMode.YEARS);
            }

            onClick?.(event);
        };

    return (
        <div className={styles.calendarControls}>
            {renderPrevButton()}
            {viewMode === ECalendarViewMode.YEARS ? (
                <span id={periodId} tabIndex={-1} aria-live="polite">
                    {children}
                </span>
            ) : (
                renderViewButton()
            )}
            {renderNextButton()}
        </div>
    );
};

CalendarControls.displayName = "CalendarControls";
