import React, { useState } from "react";
import { action } from "storybook/actions";
import { ISliderExtendedProps, SliderExtended } from "@sberbusiness/triplex-next";

export const Playground = (args: ISliderExtendedProps) => {
    const [value, setValue] = useState(35);

    const handleChange = (nextValue: number) => {
        setValue(nextValue);
        action("onChange")(nextValue);
    };

    return (
        <div style={{ maxWidth: "750px", padding: "30px" }}>
            <div>value = {value}</div>
            <br />
            <SliderExtended {...args}>
                <SliderExtended.Rail />
                <SliderExtended.Dot value={value} onChange={handleChange}>
                    <SliderExtended.Tooltip value={value}>{value}</SliderExtended.Tooltip>
                </SliderExtended.Dot>
                <SliderExtended.Track />
                <SliderExtended.Marks>
                    <SliderExtended.Mark value={args.min}>{args.min}</SliderExtended.Mark>
                    <SliderExtended.Mark value={args.max}>{args.max}</SliderExtended.Mark>
                </SliderExtended.Marks>
            </SliderExtended>
        </div>
    );
};
