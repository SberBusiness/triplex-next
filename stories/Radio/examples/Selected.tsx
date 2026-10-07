import React from "react";
import { Radio, RadioXGroup, RadioYGroup, Gap } from "@sberbusiness/triplex-next";

export const Selected = () => (
    <>
        <RadioYGroup aria-label="Начальный выбор, вертикальная группа">
            {[1, 2, 3, 4].map((value) => (
                <Radio key={value} name="radio-group" value={value} defaultChecked={value === 2}>
                    Radio text
                </Radio>
            ))}
        </RadioYGroup>
        <Gap size={32} />
        <RadioXGroup aria-label="Начальный выбор, горизонтальная группа" indent={16}>
            {[1, 2, 3].map((value) => (
                <Radio key={value} name="radio-x-group" value={value} defaultChecked={value === 2}>
                    Radio text
                </Radio>
            ))}
        </RadioXGroup>
    </>
);
