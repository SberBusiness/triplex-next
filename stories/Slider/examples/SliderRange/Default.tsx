import React, { useState } from "react";
import { EComponentSize, SliderRange, TSliderRangeValues } from "@sberbusiness/triplex-next";

const MARKS = [
    { value: 0, label: "0" },
    { value: 30, label: "30" },
    { value: 70, label: "70" },
    { value: 100, label: "100" },
];

export const Default = () => {
    const [values, setValues] = useState<TSliderRangeValues>([30, 70]);

    return (
        <div style={{ maxWidth: "750px", padding: "30px" }}>
            <div>values = [{values.join(", ")}]</div>
            <br />
            <SliderRange
                min={0}
                max={100}
                size={EComponentSize.MD}
                marks={MARKS}
                values={values}
                onChange={setValues}
            />
        </div>
    );
};
