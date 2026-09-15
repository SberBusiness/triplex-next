import React, { useState } from "react";
import { action } from "storybook/actions";
import { ISliderRangeProps, SliderRange, TSliderRangeValues } from "@sberbusiness/triplex-next";

export const Playground = (args: ISliderRangeProps) => {
    const [values, setValues] = useState<TSliderRangeValues>([35, 66]);

    const handleChange = (nextValues: TSliderRangeValues) => {
        setValues(nextValues);
        action("onChange")(nextValues);
    };

    // Границы задаются контролами и могут прийти перевёрнутыми, а значения — оказаться вне
    // нового диапазона. Нормализуем и то, и другое, чтобы Playground показывал выбранную конфигурацию.
    const min = Math.min(args.min, args.max);
    const max = Math.max(args.min, args.max);
    const clampValue = (value: number) => Math.min(max, Math.max(min, value));
    const currentValues: TSliderRangeValues = [clampValue(values[0]), clampValue(values[1])];

    return (
        <div style={{ maxWidth: "750px", padding: "30px" }}>
            <div>values = [{currentValues.join(", ")}]</div>
            <br />
            <SliderRange
                {...args}
                min={min}
                max={max}
                values={currentValues}
                onChange={handleChange}
                renderTooltipContent={(tooltipValue) => tooltipValue}
            />
        </div>
    );
};
