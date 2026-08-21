import React, { useState } from "react";
import { action } from "storybook/actions";
import { ISliderExtendedProps, SliderExtended } from "@sberbusiness/triplex-next";

export const Playground = (args: ISliderExtendedProps) => {
    const [value, setValue] = useState(35);

    const handleChange = (nextValue: number) => {
        setValue(nextValue);
        action("onChange")(nextValue);
    };

    // Границы задаются контролами и могут прийти перевёрнутыми, а значение — оказаться вне
    // нового диапазона. Нормализуем и то, и другое, чтобы Playground показывал выбранную конфигурацию.
    const min = Math.min(args.min, args.max);
    const max = Math.max(args.min, args.max);
    const currentValue = Math.min(max, Math.max(min, value));

    return (
        <div style={{ maxWidth: "750px", padding: "30px" }}>
            <div>value = {currentValue}</div>
            <br />
            <SliderExtended {...args} min={min} max={max}>
                <SliderExtended.Rail />
                <SliderExtended.Dot value={currentValue} onChange={handleChange} aria-label="Значение">
                    <SliderExtended.Tooltip value={currentValue}>{currentValue}</SliderExtended.Tooltip>
                </SliderExtended.Dot>
                <SliderExtended.Track />
                <SliderExtended.Marks>
                    <SliderExtended.Mark value={min}>{min}</SliderExtended.Mark>
                    <SliderExtended.Mark value={max}>{max}</SliderExtended.Mark>
                </SliderExtended.Marks>
            </SliderExtended>
        </div>
    );
};
