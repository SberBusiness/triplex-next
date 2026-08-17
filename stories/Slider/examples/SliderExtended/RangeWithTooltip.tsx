import React, { useState } from "react";
import { EComponentSize, SliderExtended } from "@sberbusiness/triplex-next";

export const RangeWithTooltip = () => {
    const [firstValue, setFirstValue] = useState(35);
    const [secondValue, setSecondValue] = useState(60);

    return (
        <div style={{ maxWidth: "750px", padding: "30px" }}>
            <div>values = {`[${firstValue}, ${secondValue}]`}</div>
            <br />
            <SliderExtended min={0} max={100} step={1} size={EComponentSize.MD}>
                <SliderExtended.Rail />
                <SliderExtended.Dot value={firstValue} onChange={setFirstValue} aria-label="Начальное значение">
                    <SliderExtended.Tooltip value={firstValue}>{firstValue}</SliderExtended.Tooltip>
                </SliderExtended.Dot>
                <SliderExtended.Track />
                <SliderExtended.Dot value={secondValue} onChange={setSecondValue} aria-label="Конечное значение">
                    <SliderExtended.Tooltip value={secondValue}>{secondValue}</SliderExtended.Tooltip>
                </SliderExtended.Dot>
                <SliderExtended.Marks>
                    <SliderExtended.Mark value={0}>0</SliderExtended.Mark>
                    <SliderExtended.Mark value={35}>35</SliderExtended.Mark>
                    <SliderExtended.Mark value={66}>66</SliderExtended.Mark>
                    <SliderExtended.Mark value={100}>100</SliderExtended.Mark>
                </SliderExtended.Marks>
            </SliderExtended>
        </div>
    );
};
