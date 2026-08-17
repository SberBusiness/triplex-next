import React, { useState } from "react";
import { EComponentSize, SliderExtended } from "@sberbusiness/triplex-next";

export const Reverse = () => {
    const [value, setValue] = useState(35);

    return (
        <div style={{ maxWidth: "750px", padding: "30px" }}>
            <div>value = {value}</div>
            <br />
            <SliderExtended min={0} max={100} step={1} size={EComponentSize.MD} reverse>
                <SliderExtended.Rail />
                <SliderExtended.Dot value={value} onChange={setValue}>
                    <SliderExtended.Tooltip value={value}>{value}</SliderExtended.Tooltip>
                </SliderExtended.Dot>
                <SliderExtended.Track />
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
