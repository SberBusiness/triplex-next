import clsx from "clsx";
import React from "react";
import { uniqueId } from "lodash-es";
import moment, { Moment } from "moment";
import { dateFormatYYYYMMDD, globalLimitRange } from "@sberbusiness/triplex-next/consts/DateConst";
import {
    ICalendarNestedProps,
    TCalendarMarkedDays,
    TPickedDate,
    TPickedDateProp,
    TPickedRange,
    TPickedRangeProp,
} from "@sberbusiness/triplex-next/components/Calendar/types";
import { ECalendarPickType, ECalendarViewMode } from "@sberbusiness/triplex-next/components/Calendar/enums";
import { IDateLimitRange } from "@sberbusiness/triplex-next/types/DateTypes";
import { CalendarContext } from "@sberbusiness/triplex-next/components/Calendar/CalendarContext";
import { CalendarControls } from "@sberbusiness/triplex-next/components/Calendar/components/CalendarControls";
import { CalendarView } from "@sberbusiness/triplex-next/components/Calendar/components/CalendarView";
import { CalendarFooter } from "@sberbusiness/triplex-next/components/Calendar/components/CalendarFooter";
import { CalendarTodayButton } from "@sberbusiness/triplex-next/components/Calendar/components/CalendarTodayButton";
import { CalendarRange } from "@sberbusiness/triplex-next/components/Calendar/CalendarRange";
import { formatDate, getHeader, parsePickedDate } from "@sberbusiness/triplex-next/components/Calendar/utils";
import styles from "./styles/Calendar.module.less";

/** Общие свойства компонента календаря. */
export interface ICalendarCommonProps extends ICalendarNestedProps {
    /** Отображаемая по умолчанию дата. */
    defaultViewDate?: string | Moment;
    /** Формат для значения. */
    format?: string;
    /** Вариант выбора даты. */
    pickType?: ECalendarPickType;
    /** Ограничение выбираемого периода. */
    limitRange?: IDateLimitRange;
    /** Отмеченные дни. */
    markedDays?: TCalendarMarkedDays;
    /** Дни недоступные для выбора. */
    disabledDays?: string[];
    /** Обратный порядок выбора даты. */
    reversedPick?: boolean;
    /** Обработчик изменения страницы. */
    onPageChange?: (viewDate: Moment, viewMode: ECalendarViewMode) => void;
    /** Обработчик изменения вида. */
    onViewChange?: (viewDate: Moment, viewMode: ECalendarViewMode) => void;
}

/** Свойства обычного календаря. */
export interface ICalendarSingleProps extends ICalendarCommonProps {
    isRange?: false;
    /** Выбранная дата. */
    pickedDate: TPickedDateProp;
    /** Адаптированный режим. */
    adaptiveMode?: boolean;
    /** Обработчик изменения даты. */
    onDateChange: (date: Moment) => void;
}

/** Свойства календаря для выбора периода. */
export interface ICalendarRangeProps extends ICalendarCommonProps {
    isRange: true;
    /** Выбранный период. */
    pickedDate: TPickedRangeProp;
    /** Дата календаря по умолчанию. */
    defaultDate?: TPickedDateProp;
    /** Обработчик изменения периода. */
    onDateChange: (date: TPickedRange) => void;
}

/** Свойства компонента Calendar. */
export type TCalendarProps = ICalendarSingleProps | ICalendarRangeProps;

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
export class Calendar extends React.PureComponent<TCalendarProps, ICalendarState> {
    public static Range = CalendarRange;

    public static defaultProps = {
        format: dateFormatYYYYMMDD,
        limitRange: globalLimitRange,
        pickType: ECalendarPickType.datePick,
    };

    static contextType = CalendarContext;
    declare context: React.ContextType<typeof CalendarContext>;

    // Уникальный идентификатор для связи периода с таблицей.
    private periodId = `calendar-period-${uniqueId()}`;

    constructor(props: Readonly<TCalendarProps>) {
        super(props);

        const { format, pickType, reversedPick } = this.props;
        const pickedDate = this.props.isRange
            ? parsePickedDate(this.props.defaultDate, format)
            : parsePickedDate(this.props.pickedDate, format);
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

    public componentDidUpdate(prevProps: TCalendarProps, prevState: ICalendarState): void {
        const { format } = this.props;
        const { viewDate } = this.state;
        const { viewDate: prevViewDate } = prevState;

        const pickedDateState = this.props.isRange
            ? parsePickedDate(this.state.viewDate, format)
            : parsePickedDate(this.props.pickedDate, format);
        const pickedDateValid = pickedDateState?.isValid();
        const resultDate = pickedDateValid ? pickedDateState : prevViewDate;

        const prevPickedDate = prevProps.isRange
            ? parsePickedDate(prevState.viewDate, format)
            : parsePickedDate(prevProps.pickedDate, format);

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
            [styles.adaptive]: !this.props.isRange && !!this.props.adaptiveMode,
        });

        let pickedDate: TPickedDate | undefined;
        let pickedRange: TPickedRange | undefined;

        if (this.props.isRange) {
            pickedRange = [
                parsePickedDate(this.props.pickedDate[0], format),
                parsePickedDate(this.props.pickedDate[1], format),
            ] as TPickedRange;
        } else {
            pickedDate = parsePickedDate(this.props.pickedDate, format);
        }

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
                        pickedRange={pickedRange}
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
        if (this.props.isRange) {
            let newRange: TPickedRange;
            if (this.props.pickedDate[0] && !this.props.pickedDate[1]) {
                const firstDate = parsePickedDate(this.props.pickedDate[0], this.props.format);
                newRange = date.isBefore(firstDate) ? [date, firstDate] : [firstDate, date];
            } else {
                newRange = [date, null];
            }
            this.props.onDateChange(newRange);
        } else {
            this.props.onDateChange(date);
        }
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
        const { pickType, todayButtonProps } = this.props;
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

        return (
            <CalendarFooter>
                <CalendarTodayButton
                    todayDate={todayDate}
                    currentPeriodSelected={currentPeriodSelected}
                    {...(typeof todayButtonProps === "function"
                        ? todayButtonProps({ viewMode, currentPeriodSelected })
                        : todayButtonProps)}
                />
            </CalendarFooter>
        );
    };
}
