import React, { useState } from "react";
import { EComponentSize, SliderExtended } from "@sberbusiness/triplex-next";

/** Шаги задаются массивом: ползунок останавливается только на этих значениях. */
const STEPS = [0, 25, 50, 75, 100];

export const WithCustomSteps = () => {
    const [value, setValue] = useState(50);

    return (
        <div style={{ maxWidth: "750px", padding: "30px" }}>
            <div>value = {value}</div>
            <br />
            <SliderExtended min={0} max={100} step={STEPS} size={EComponentSize.MD}>
                <SliderExtended.Rail />
                <SliderExtended.Dot value={value} onChange={setValue}>
                    <SliderExtended.Tooltip value={value}>{value}</SliderExtended.Tooltip>
                </SliderExtended.Dot>
                <SliderExtended.Track />
                <SliderExtended.Marks>
                    {STEPS.map((step) => (
                        <SliderExtended.Mark key={step} value={step}>
                            {step}
                        </SliderExtended.Mark>
                    ))}
                </SliderExtended.Marks>
            </SliderExtended>
        </div>
    );
};
