import React, { useState } from "react";
import { action } from "storybook/actions";
import { ISliderProps, Slider } from "@sberbusiness/triplex-next";

export const Playground = (args: ISliderProps) => {
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
            <Slider
                {...args}
                min={min}
                max={max}
                value={currentValue}
                onChange={handleChange}
                renderTooltipContent={(tooltipValue) => tooltipValue}
            />
        </div>
    );
};
