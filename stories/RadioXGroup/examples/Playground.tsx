import React from "react";
import { action } from "storybook/actions";
import { Radio, RadioXGroup, EComponentSize, IRadioXGroupProps } from "@sberbusiness/triplex-next";

export interface IPlaygroundArgs extends Pick<IRadioXGroupProps, "indent"> {
    radioSize: EComponentSize;
    disabled: boolean;
}

export const Playground = ({ indent, radioSize, disabled }: IPlaygroundArgs) => {
    const name = React.useId();

    return (
        <RadioXGroup indent={indent} aria-label="Способ доставки">
            <Radio
                name={name}
                value="courier"
                size={radioSize}
                disabled={disabled}
                defaultChecked
                onChange={action("onChange")}
            >
                Radio text
            </Radio>
            <Radio name={name} value="pickup" size={radioSize} disabled={disabled} onChange={action("onChange")}>
                Radio text
            </Radio>
            <Radio name={name} value="post" size={radioSize} disabled={disabled} onChange={action("onChange")}>
                Radio text
            </Radio>
        </RadioXGroup>
    );
};
