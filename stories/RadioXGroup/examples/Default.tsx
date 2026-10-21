import React from "react";
import { Radio, RadioXGroup } from "@sberbusiness/triplex-next";

export const Default = () => {
    const name = React.useId();

    return (
        <RadioXGroup aria-label="Способ доставки">
            <Radio name={name} value="courier" defaultChecked>
                Radio text
            </Radio>
            <Radio name={name} value="pickup">
                Radio text
            </Radio>
            <Radio name={name} value="post">
                Radio text
            </Radio>
        </RadioXGroup>
    );
};
