import React from "react";
import { Radio, RadioXGroup, Gap, EComponentSize } from "@sberbusiness/triplex-next";

export const XGroup = () => (
    <>
        <RadioXGroup aria-label="Группа размера SM" indent={16}>
            {[1, 2, 3].map((value) => (
                <Radio key={value} name="radio-x-group-sm" value={value} size={EComponentSize.SM}>
                    Radio text
                </Radio>
            ))}
        </RadioXGroup>
        <Gap size={16} />
        <RadioXGroup aria-label="Группа размера MD" indent={16}>
            {[1, 2, 3].map((value) => (
                <Radio key={value} name="radio-x-group-md" value={value}>
                    Radio text
                </Radio>
            ))}
        </RadioXGroup>
        <Gap size={16} />
        <RadioXGroup aria-label="Группа размера LG" indent={20}>
            {[1, 2, 3].map((value) => (
                <Radio key={value} name="radio-x-group-lg" value={value} size={EComponentSize.LG}>
                    Radio text
                </Radio>
            ))}
        </RadioXGroup>
    </>
);
