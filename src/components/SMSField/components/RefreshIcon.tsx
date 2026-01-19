import clsx from "clsx";
import React from "react";
import styles from "@sberbusiness/triplex-next/components/SMSField/styles/SMSField.module.less";
import { EComponentSize } from "@sberbusiness/triplex-next/enums/EComponentSize";

const iconPath =
    "M2 10c0-4.42 3.58-8 8-8 2.52 0 4.77 1.16 6.24 3H13.5c-.56 0-1 .44-1 1 0 .55.44 1 1 1h5c.55 0 1-.45 1-1V1c0-.56-.45-1-1-1-.56 0-1 .44-1 1v2.38A10.02 10.02 0 0 0 10 0C4.47 0 0 4.47 0 10c0 5.52 4.47 10 10 10 5.52 0 10-4.48 10-10 0-.56-.45-1-1-1-.56 0-1 .44-1 1 0 4.41-3.59 8-8 8-4.42 0-8-3.59-8-8";

const bigIconPath =
    "M27 16c0 .81-.09 1.61-.27 2.39a10.9 10.9 0 0 1-1.54 3.65c-.41.62-.88 1.2-1.42 1.73-.53.54-1.11 1.01-1.73 1.42a10.906 10.906 0 0 1-3.65 1.54c-.78.18-1.58.27-2.39.27q-1.23 0-2.4-.27a10.9 10.9 0 0 1-3.65-1.54c-.62-.41-1.2-.88-1.73-1.42-.54-.53-1.01-1.11-1.42-1.73a10.906 10.906 0 0 1-1.54-3.65C5.08 17.61 5 16.81 5 16c0-.82.08-1.62.26-2.4A10.9 10.9 0 0 1 6.8 9.95c.41-.62.88-1.2 1.42-1.73.53-.54 1.11-1.01 1.73-1.42a10.906 10.906 0 0 1 3.65-1.54C14.38 5.08 15.18 5 16 5a11.1 11.1 0 0 1 2.93.39c.44.12.86.27 1.27.44.47.19.93.42 1.37.68.39.23.75.47 1.1.74.4.31.78.64 1.14 1 .06.06.12.13.19.2V6c0-.57.44-1 1-1s1 .43 1 1v5c0 .66-.34 1-1 1h-5c-.56 0-1-.44-1-1 0-.57.44-1 1-1h2.7c-.1-.12-.21-.23-.31-.34-.3-.3-.61-.58-.95-.83-.28-.21-.57-.41-.88-.59a8.753 8.753 0 0 0-3-1.11C17.05 7.04 16.53 7 16 7c-.69 0-1.35.07-2 .22-.52.11-1.02.27-1.51.48-.5.21-.97.47-1.42.76a9 9 0 0 0-2.61 2.61c-.29.45-.55.92-.76 1.42-.21.49-.37.99-.48 1.51A8.8 8.8 0 0 0 7 16c0 .68.07 1.34.22 1.99.11.52.27 1.02.48 1.51.21.5.47.97.76 1.42q.51.78 1.17 1.44c.45.44.92.83 1.44 1.17.45.29.92.55 1.42.76.49.21.99.37 1.51.48a8.803 8.803 0 0 0 3.99 0c.52-.11 1.02-.27 1.51-.48.5-.21.97-.47 1.42-.76a9 9 0 0 0 2.61-2.61c.29-.45.55-.92.76-1.42.21-.49.37-.99.48-1.51.15-.65.23-1.31.23-1.99 0-.57.44-1 1-1s1 .43 1 1";

/** Внешние свойства компонента. */
interface IProps {
    /** Признак блокировки компонента. */
    disabled: boolean;
    /** Процент заполнения иконки (выражается в долях единицы от 0 до 1). */
    percent: number;
    /** Размер иконки */
    size: EComponentSize;
}

const radInOneDeg = Math.PI / 180; // Радиан в одном градусе.
const radiansInCircle = Math.PI * 2; // Радиан в окружности.
// Перевод градусов в радианы.
const deg2rad = (deg: number) => {
    deg = deg % 360; // У круга только 360 градусов.
    deg = deg < 0 ? 360 + deg : deg; // Отрицательный угол равносилен положительному получаемому прибавлением отрицательного угла к 360;
    return deg * radInOneDeg; // Ну и под конец нормализованный угол переводим в радианы.
};
const startAnge = deg2rad(-8); // Угол, с которого начинается отрисовка сектора - маски (иконка не строго горизонтально начинается, а на 8 градусов выше).
const endAngle = deg2rad(-19); // Угол, которым заканчивается отрисовка сектора - маски (выше горизонтали на 19 градусов).
const diff = endAngle < startAnge ? radiansInCircle - (startAnge - endAngle) : endAngle - startAnge; // Разница между углами в радианах.
const ra2X = (r: number, a: number) => Math.round(r * Math.cos(a) * 1000) / 1000; // По радиусу и углу определяем координату X.
const ra2Y = (r: number, a: number) => Math.round(r * Math.sin(a) * 1000) / 1000; // По радиусу и углу определяем координату Y.

/**
 * Рисует сектор средствами svg-path, начиная с правой горизонтали и далее по часовой стрелке в зависимости от процентажа (0.99 - Практически полный круг).
 *
 * @param {number} centerX Координата X центра окружности.
 * @param {number} centerY Координата Y центра окружности.
 * @param {number} radius Радиус окружности.
 * @param {number} percent На сколько процентов от окружности рисовать сектор.
 */
const calculateSectorPath = (centerX: number, centerY: number, radius: number, percent: number) =>
    "M" +
    centerX +
    " " +
    centerY + // Смещаем перо в центр окружности.
    "L" +
    // Рисуем горизонтальную линию вправо в начало сектора.
    (centerX + ra2X(radius, startAnge)) + // Координата X начала дуги.
    " " +
    (centerY + ra2Y(radius, startAnge)) + // Координата Y начала дуги.
    "A" + // Рисуем дугу.
    radius + // Радиус окружности дуги по оси X.
    " " +
    radius + // Радиус окружности дуги по оси Y.
    " 0 " + // Смещение центра по оси X.
    (percent > 0.5 ? "1" : "0") + // Флаг отрисовки длинной дуги (если 0 то короткой).
    " 1 " + // Рисовать по часовой стрелке.
    (centerX + ra2X(radius, (startAnge + percent * diff) % radiansInCircle)) + // Координата X конца дуги.
    " " +
    (centerY + ra2Y(radius, (startAnge + percent * diff) % radiansInCircle)) + // Координата Y конца дуги.
    "Z"; // Замыкаем линию.

/** Компонент для радиальной закраски иконки другим цветом. */
export const RefreshIcon: React.FC<IProps> = (props: IProps) => {
    const percent = Math.round(Math.min(props.percent, 0.999) * 1000) / 1000;
    const classNames = clsx({
        [styles.disabled]: props.disabled,
        [styles.empty]: !props.disabled,
    });

    if (props.size === EComponentSize.LG) {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" focusable="false">
                <clipPath id={`clipFrontLG${percent}`}>
                    <path d={calculateSectorPath(16, 16, 18, percent)} />
                </clipPath>

                <path className={classNames} d={bigIconPath} />
                <path className={styles.full} d={bigIconPath} clipPath={`url(#clipFrontLG${percent})`} />
            </svg>
        );
    }

    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" focusable="false">
            <clipPath id={`clipFront${percent}`}>
                <path d={calculateSectorPath(10, 10, 14, percent)} />
            </clipPath>

            <path className={classNames} d={iconPath} />
            <path className={styles.full} d={iconPath} clipPath={`url(#clipFront${percent})`} />
        </svg>
    );
};
