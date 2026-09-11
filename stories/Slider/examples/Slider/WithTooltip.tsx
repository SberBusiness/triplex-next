import React, { useState } from "react";
import { EComponentSize, Slider } from "@sberbusiness/triplex-next";

const MARKS = [
    { value: 0, label: "0" },
    { value: 35, label: "35" },
    { value: 66, label: "66" },
    { value: 100, label: "100" },
];

export const WithTooltip = () => {
    const [value, setValue] = useState(35);

    return (
        <div style={{ maxWidth: "750px", padding: "30px" }}>
            <div>value = {value}</div>
            <br />
            <Slider
                min={0}
                max={100}
                size={EComponentSize.MD}
                marks={MARKS}
                value={value}
                onChange={setValue}
                renderTooltipContent={(tooltipValue) => `${tooltipValue} %`}
            />
        </div>
    );
};
