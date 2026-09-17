import React, { useState } from "react";
import { EComponentSize, SliderRange, TSliderRangeValues } from "@sberbusiness/triplex-next";

// Массив шагов вынесен из JSX: инлайновый массив пересчитывает шаги на каждом рендере.
const STEPS = [0, 25, 50, 75, 100];

const MARKS = STEPS.map((step) => ({ value: step, label: String(step) }));

export const WithCustomSteps = () => {
    const [values, setValues] = useState<TSliderRangeValues>([25, 75]);

    return (
        <div style={{ maxWidth: "750px", padding: "30px" }}>
            <div>values = [{values.join(", ")}]</div>
            <br />
            <SliderRange
                min={0}
                max={100}
                step={STEPS}
                size={EComponentSize.MD}
                marks={MARKS}
                values={values}
                onChange={setValues}
            />
        </div>
    );
};
