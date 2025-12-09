import React from "react";
import moment from "moment";
import { RangeSrvIcon24 } from "@sberbusiness/icons/RangeSrvIcon24";
import { classnames } from "@sber-business/triplex/utils/classnames/classnames";
import { dateFormatYYYYMMDD } from "@sber-business/triplex/consts/DateConst";
import { EDateRangeShiftUnit } from "./enums";
import { TabfoldercarouselleftSrvxIcon32 } from "@sberbusiness/icons/TabfoldercarouselleftSrvxIcon32";
import { TabfoldercarouselrightSrvxIcon32 } from "@sberbusiness/icons/TabfoldercarouselrightSrvxIcon32";

/** Свойства функции рендеринга кнопки сдвига диапазона дат. */
export interface IDateRangeButtonProvideProps {
    children: React.ReactNode;
    className: string;
    onClick: () => void;
    disabled: boolean;
}

/** Свойства функции рендеринга поля выбора даты. */
export interface IDateRangePickerProvideProps {
    value: string;
    onChange: (value: string) => void;
}

/** Значение компонента DateRange. */
export type TDateRangeValue = [string, string];

/** Свойства компонента DateRange. */
export interface IDateRangeProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "defaultValue" | "onChange"> {
    /** Диапазон дат. */
    value: TDateRangeValue;
    /** Функция, вызывающаяся при изменении диапазона дат. */
    onChange: (value: TDateRangeValue) => void;
    /** Численная величина сдвига диапазона дат. */
    shiftAmount?: number;
    /** Единица измерения сдвига диапазона дат. */
    shiftUnit?: EDateRangeShiftUnit;
    /** Управление отображением/скрытием кнопок сдвига диапазона дат. */
    hideNavigation?: boolean;
    /** Функция рендеринга поля выбора даты "от". */
    renderPickerFrom: (props: IDateRangePickerProvideProps) => React.ReactNode;
    /** Функция рендеринга поля выбора даты "до". */
    renderPickerTo: (props: IDateRangePickerProvideProps) => React.ReactNode;
    /** Функция рендеринга кнопки сдвига диапазона дат "назад". */
    renderButtonBack: (props: IDateRangeButtonProvideProps) => React.ReactNode;
    /** Функция рендеринга кнопки сдвига диапазона дат "вперёд". */
    renderButtonForward: (props: IDateRangeButtonProvideProps) => React.ReactNode;
}

/** Выбор диапазона дат. */
export const DateRange: React.FC<IDateRangeProps> = ({
    children,
    className,
    value,
    onChange,
    shiftAmount = 1,
    shiftUnit = EDateRangeShiftUnit.MONTH,
    hideNavigation,
    renderPickerFrom,
    renderPickerTo,
    renderButtonForward,
    renderButtonBack,
    ...rest
}) => {
    const [start, end] = value;
    const classNames = classnames("cssClass[dateRange]", className);

    /** Обработчик изменения значения в поле выбора даты "от". */
    const handleChangePickerFrom = (date: string) => {
        if (!date || !end || date <= end) {
            onChange([date, end]);
        } else {
            onChange([date, ""]);
        }
    };

    /** Обработчик изменения значения в поле выбора даты "до". */
    const handleChangePickerTo = (date: string) => {
        if (!date || !start || date >= start) {
            onChange([start, date]);
        } else {
            onChange(["", date]);
        }
    };

    /** Функция, смещающая диапазон дат назад. */
    const shiftRangeBack = () => {
        if (!start || !end) {
            return;
        }

        const momentStart = moment(start, dateFormatYYYYMMDD);
        const momentEnd = moment(end, dateFormatYYYYMMDD);

        onChange([
            momentStart.subtract(shiftAmount, shiftUnit).format(dateFormatYYYYMMDD),
            momentEnd.subtract(shiftAmount, shiftUnit).format(dateFormatYYYYMMDD),
        ]);
    };

    /** Функция, смещающая диапазон дат вперёд. */
    const shiftRangeForward = () => {
        if (!start || !end) {
            return;
        }

        const momentStart = moment(start, dateFormatYYYYMMDD);
        const momentEnd = moment(end, dateFormatYYYYMMDD);

        onChange([
            momentStart.add(shiftAmount, shiftUnit).format(dateFormatYYYYMMDD),
            momentEnd.add(shiftAmount, shiftUnit).format(dateFormatYYYYMMDD),
        ]);
    };

    return (
        <div className={classNames} {...rest}>
            {!hideNavigation &&
                renderButtonBack({
                    children: <TabfoldercarouselleftSrvxIcon32 />,
                    className: classnames("cssClass[dateRangeButton]", { disabled: !(start && end) }),
                    disabled: !(start && end),
                    onClick: shiftRangeBack,
                })}
            {renderPickerFrom({
                onChange: handleChangePickerFrom,
                value: start,
            })}
            <RangeSrvIcon24 />
            {renderPickerTo({
                onChange: handleChangePickerTo,
                value: end,
            })}
            {!hideNavigation &&
                renderButtonForward({
                    children: <TabfoldercarouselrightSrvxIcon32 />,
                    className: classnames("cssClass[dateRangeButton]", { disabled: !(start && end) }),
                    disabled: !(start && end),
                    onClick: shiftRangeForward,
                })}
        </div>
    );
};

DateRange.displayName = "DateRange";
