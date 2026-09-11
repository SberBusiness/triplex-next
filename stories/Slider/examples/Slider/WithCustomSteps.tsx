import React, { useState } from "react";
import { EComponentSize, Slider } from "@sberbusiness/triplex-next";

// Массив шагов вынесен из JSX: инлайновый массив пересчитывает шаги на каждом рендере.
const STEPS = [0, 25, 50, 75, 100];

const MARKS = STEPS.map((step) => ({ value: step, label: String(step) }));

export const WithCustomSteps = () => {
    const [value, setValue] = useState(50);

    return (
        <div style={{ maxWidth: "750px", padding: "30px" }}>
            <div>value = {value}</div>
            <br />
            <Slider
                min={0}
                max={100}
                step={STEPS}
                size={EComponentSize.MD}
                marks={MARKS}
                value={value}
                onChange={setValue}
            />
        </div>
    );
};
