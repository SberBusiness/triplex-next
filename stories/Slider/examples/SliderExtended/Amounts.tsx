import React, { useState } from "react";
import { EComponentSize, SliderExtended } from "@sberbusiness/triplex-next";

/** Возвращает значения от from до to (не включая), с шагом step. */
const range = (from: number, to: number, step: number): number[] => {
    const values: number[] = [];

    for (let value = from; value < to; value += step) {
        values.push(value);
    }

    return values;
};

/**
 * Шкала сумм с неравномерным шагом: чем больше сумма, тем крупнее шаг.
 * Слайдер работает с индексами шкалы, поэтому шаги равны визуально.
 */
const AMOUNTS = [
    0,
    10000,
    ...range(20000, 240000, 20000),
    ...range(240000, 1000000, 40000),
    ...range(1000000, 2150000, 50000),
    ...range(2150000, 2600000, 75000),
    ...range(2600000, 3000000, 100000),
    ...range(3000000, 3800000, 200000),
    ...range(3800000, 9000000, 400000),
    ...range(9000000, 10000000, 500000),
    ...range(10000000, 25000000, 2500000),
    ...range(25000000, 40000000, 5000000),
    ...range(40000000, 90000001, 10000000),
    100000000,
];

const amountFormat = new Intl.NumberFormat("ru-RU");

export const Amounts = () => {
    const [amountIndex, setAmountIndex] = useState(AMOUNTS.indexOf(1000000));

    return (
        <div style={{ maxWidth: "750px", padding: "30px" }}>
            <div>{amountFormat.format(AMOUNTS[amountIndex])}</div>
            <br />
            <SliderExtended min={0} max={AMOUNTS.length - 1} step={1} size={EComponentSize.MD}>
                <SliderExtended.Rail />
                <SliderExtended.Dot value={amountIndex} onChange={setAmountIndex} aria-label="Сумма" />
                <SliderExtended.Track />
                <SliderExtended.Marks>
                    <SliderExtended.Mark value={0}>0 млн</SliderExtended.Mark>
                    <SliderExtended.Mark value={AMOUNTS.indexOf(1000000)}>1 млн</SliderExtended.Mark>
                    <SliderExtended.Mark value={AMOUNTS.indexOf(3000000)}>3 млн</SliderExtended.Mark>
                    <SliderExtended.Mark value={AMOUNTS.length - 1}>100 млн</SliderExtended.Mark>
                </SliderExtended.Marks>
            </SliderExtended>
        </div>
    );
};
