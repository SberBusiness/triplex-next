import React, { useContext } from "react";
import { CaretleftStrokeSrvIcon24, CaretrightStrokeSrvIcon24 } from "@sberbusiness/icons-next";
import { CalendarContext } from "@sberbusiness/triplex-next/components/Calendar/CalendarContext";
import { ICalendarProps } from "@sberbusiness/triplex-next/components/Calendar/types";
import { Button } from "@sberbusiness/triplex-next/components/Button/Button";
import { ButtonIcon } from "@sberbusiness/triplex-next/components/Button/ButtonIcon";
import { EButtonIconShape, EButtonTheme } from "@sberbusiness/triplex-next/components/Button/enums";
import { ECalendarViewMode } from "@sberbusiness/triplex-next/components/Calendar/enums";
import { globalLimitRange } from "@sberbusiness/triplex-next/consts/DateConst";
import { EComponentSize } from "@sberbusiness/triplex-next/enums/EComponentSize";
import styles from "../styles/CalendarControls.module.less";

/** Свойства компонента CalendarControls. */
export interface ICalendarControlsProps
    extends Pick<ICalendarProps, "prevButtonProps" | "nextButtonProps" | "viewButtonProps"> {
    children: React.ReactNode;
}

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
                onClick={handlePrevButtonClick(onClick)}
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
                onClick={handleNextButtonClick(onClick)}
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

    /** Обработчик клика на кнопку "назад". */
    const handlePrevButtonClick =
        (onClick?: React.MouseEventHandler<HTMLButtonElement>) => (event: React.MouseEvent<HTMLButtonElement>) => {
            const shiftUnit = getPageShiftUnit();
            const shiftAmount = getPageShiftAmount();
            const date = viewDate.clone().subtract(shiftAmount, shiftUnit);

            onPageChange(date, viewMode);
            onClick?.(event);
        };

    /** Обработчик клика на кнопку "вперёд". */
    const handleNextButtonClick =
        (onClick?: React.MouseEventHandler<HTMLButtonElement>) => (event: React.MouseEvent<HTMLButtonElement>) => {
            const shiftUnit = getPageShiftUnit();
            const shiftAmount = getPageShiftAmount();
            const date = viewDate.clone().add(shiftAmount, shiftUnit);

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

    /** Получить единицу измерения сдвига. */
    const getPageShiftUnit = () => {
        switch (viewMode) {
            case ECalendarViewMode.DAYS:
                return "month";
            case ECalendarViewMode.MONTHS:
            case ECalendarViewMode.YEARS:
                return "year";
        }
    };

    /** Получить количество единиц сдвига. */
    const getPageShiftAmount = () => {
        switch (viewMode) {
            case ECalendarViewMode.DAYS:
            case ECalendarViewMode.MONTHS:
                return 1;
            case ECalendarViewMode.YEARS:
                return 12;
        }
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
