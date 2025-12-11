import clsx from "clsx";
import React from "react";
import { uniqueId } from "lodash-es";
import moment from "moment";
import { dateFormatYYYYMMDD, globalLimitRange } from "@sberbusiness/triplex-next/consts/DateConst";
import { ICalendarProps, TPickedDate } from "@sberbusiness/triplex-next/components/Calendar/types";
import { ECalendarPickType, ECalendarViewMode } from "@sberbusiness/triplex-next/components/Calendar/enums";
import { CalendarContext } from "@sberbusiness/triplex-next/components/Calendar/CalendarContext";
import { CalendarControls } from "@sberbusiness/triplex-next/components/Calendar/components/CalendarControls";
import { CalendarView } from "@sberbusiness/triplex-next/components/Calendar/components/CalendarView";
import { CalendarFooter } from "@sberbusiness/triplex-next/components/Calendar/components/CalendarFooter";
import { CalendarFooterButton } from "@sberbusiness/triplex-next/components/Calendar/components/CalendarFooterButton";
import { formatDate, getHeader, parsePickedDate } from "@sberbusiness/triplex-next/components/Calendar/utils";
import styles from "./styles/Calendar.module.less";

/** Состояния компонента Calendar. */
interface ICalendarState {
    /** Вид отображения. */
    viewMode: ECalendarViewMode;
    /** Дата, являющая курсором для навигации по интерфейсу. */
    viewDate: moment.Moment;
    /** Выбранная дата в формате Moment. */
    pickedDate: TPickedDate;
    /** Заголовок календаря. */
    header: string;
}

/** Календарь. */
export class Calendar extends React.PureComponent<ICalendarProps, ICalendarState> {
    public static defaultProps = {
        format: dateFormatYYYYMMDD,
        limitRange: globalLimitRange,
        pickType: ECalendarPickType.datePick,
    };

    static contextType = CalendarContext;
    declare context: React.ContextType<typeof CalendarContext>;

    // Уникальный идентификатор для связи периода с таблицей.
    private periodId = `calendar-period-${uniqueId()}`;

    constructor(props: Readonly<ICalendarProps>) {
        super(props);

        const { format, pickType, reversedPick } = this.props;
        const pickedDate = parsePickedDate(this.props.pickedDate, format);
        const viewDate = this.getInitialViewDate(pickedDate);

        let viewMode: ECalendarViewMode;

        if (reversedPick) {
            viewMode = ECalendarViewMode.YEARS;
        } else if (pickType == ECalendarPickType.monthYearPick) {
            viewMode = ECalendarViewMode.MONTHS;
        } else {
            viewMode = ECalendarViewMode.DAYS;
        }

        const header = formatDate(viewDate, viewMode);

        this.state = {
            header,
            pickedDate,
            viewDate,
            viewMode,
        };
    }

    /** Получить изначальную дату для навигации. */
    private getInitialViewDate(pickedDate: TPickedDate) {
        const { defaultViewDate, format, limitRange } = this.props;

        if (pickedDate && pickedDate.isValid()) {
            return pickedDate.clone();
        }

        if (defaultViewDate) {
            const parsedDate = parsePickedDate(defaultViewDate, format);

            if (parsedDate && parsedDate.isValid()) {
                return parsedDate.clone();
            }
        }

        const todayDate = moment().startOf("day");

        if (limitRange) {
            if (limitRange.dateFrom && todayDate.isBefore(limitRange.dateFrom)) {
                return limitRange.dateFrom.clone();
            } else if (limitRange.dateTo && todayDate.isAfter(limitRange.dateTo)) {
                return limitRange.dateTo.clone();
            }
        }

        return todayDate;
    }

    public componentDidUpdate(prevProps: ICalendarProps, prevState: ICalendarState): void {
        const { format } = this.props;
        const { viewDate } = this.state;
        const { viewDate: prevViewDate } = prevState;

        const pickedDateState = parsePickedDate(this.props.pickedDate, format);
        const pickedDateValid = pickedDateState?.isValid();
        const resultDate = pickedDateValid ? pickedDateState : prevViewDate;

        const prevPickedDate = parsePickedDate(prevProps.pickedDate, format);

        if (!(!pickedDateValid || prevPickedDate?.isSame(resultDate, "day"))) {
            let newDateContext = {};

            if (viewDate && !viewDate.isSame(pickedDateState, "month")) {
                newDateContext = {
                    currentTab: ECalendarViewMode.DAYS,
                    header: getHeader(resultDate),
                    viewDate: resultDate!.clone(),
                };
            }

            this.setState({
                ...newDateContext,
                pickedDate: pickedDateState,
            });
        }
    }

    public render() {
        const {
            format,
            pickType,
            limitRange,
            markedDays,
            disabledDays,
            dayHtmlAttributes,
            monthHtmlAttributes,
            yearHtmlAttributes,
            prevButtonProps,
            nextButtonProps,
            viewButtonProps,
            todayButtonProps,
        } = this.props;
        const { viewMode, viewDate, header } = this.state;
        const classNames = clsx(styles.calendar, {
            [styles.adaptive]: !!this.props.adaptiveMode,
        });

        const pickedDate = parsePickedDate(this.props.pickedDate, format);

        return (
            <div className={classNames} data-tx={process.env.npm_package_version}>
                <CalendarContext.Provider
                    value={{
                        format: format,
                        limitRange: limitRange!,
                        pickType: pickType!,
                        markedDays: markedDays,
                        disabledDays: disabledDays,
                        viewDate: viewDate,
                        viewMode: viewMode,
                        periodId: this.periodId,
                        onDateSelect: this.handleDateSelect,
                        onPageChange: this.handlePageChange,
                        onViewChange: this.handleViewChange,
                    }}
                >
                    <CalendarControls
                        prevButtonProps={prevButtonProps}
                        nextButtonProps={nextButtonProps}
                        viewButtonProps={viewButtonProps}
                    >
                        {header}
                    </CalendarControls>
                    <CalendarView
                        pickedDate={pickedDate}
                        dayHtmlAttributes={dayHtmlAttributes}
                        monthHtmlAttributes={monthHtmlAttributes}
                        yearHtmlAttributes={yearHtmlAttributes}
                    />
                    {todayButtonProps && this.renderFooter()}
                </CalendarContext.Provider>
            </div>
        );
    }

    /** Обработчик выбора даты. */
    private handleDateSelect = (date: moment.Moment) => {
        this.props.onDateChange(date);
    };

    /** Обработчик смены страницы. */
    private handlePageChange = (nextViewDate: moment.Moment, viewMode: ECalendarViewMode) => {
        const { onPageChange } = this.props;

        this.setState({
            header: formatDate(nextViewDate, viewMode),
            viewDate: nextViewDate,
        });

        onPageChange?.(nextViewDate, viewMode);
    };

    /** Обработчик изменения вида отображения. */
    private handleViewChange = (nextViewDate: moment.Moment, nextViewMode: ECalendarViewMode) => {
        const { onViewChange } = this.props;

        this.setState({
            header: formatDate(nextViewDate, nextViewMode),
            viewDate: nextViewDate,
            viewMode: nextViewMode,
        });

        onViewChange?.(nextViewDate, nextViewMode);
    };

    /** Рендер футера. */
    private renderFooter = () => {
        const { pickType, yesterdayButtonProps, todayButtonProps, tomorrowButtonProps } = this.props;
        const { viewDate, viewMode } = this.state;
        let todayDate: moment.Moment;
        let currentPeriodSelected: boolean;

        if (pickType === ECalendarPickType.datePick) {
            todayDate = moment().startOf("day");
            currentPeriodSelected = viewMode === ECalendarViewMode.DAYS && viewDate.isSame(todayDate, "month");
        } else {
            todayDate = moment().startOf("month");
            currentPeriodSelected = viewMode === ECalendarViewMode.MONTHS && viewDate.isSame(todayDate, "year");
        }

        const needShowAsideButtons = currentPeriodSelected && viewMode === ECalendarViewMode.DAYS;

        return (
            <CalendarFooter>
                {/* Вчера */}
                {needShowAsideButtons && yesterdayButtonProps && (
                    <CalendarFooterButton
                        date={todayDate.clone().subtract(1, "day")}
                        currentPeriodSelected={currentPeriodSelected}
                        {...(typeof yesterdayButtonProps === "function"
                            ? yesterdayButtonProps(viewMode)
                            : yesterdayButtonProps)}
                    />
                )}
                {/* Сегодня / К текущей дате */}
                <CalendarFooterButton
                    date={todayDate}
                    currentPeriodSelected={currentPeriodSelected}
                    {...(typeof todayButtonProps === "function"
                        ? todayButtonProps({ viewMode, currentPeriodSelected })
                        : todayButtonProps)}
                />
                {/* Завтра */}
                {needShowAsideButtons && tomorrowButtonProps && (
                    <CalendarFooterButton
                        date={todayDate.clone().add(1, "day")}
                        currentPeriodSelected={currentPeriodSelected}
                        {...(typeof tomorrowButtonProps === "function"
                            ? tomorrowButtonProps(viewMode)
                            : tomorrowButtonProps)}
                    />
                )}
            </CalendarFooter>
        );
    };
}
