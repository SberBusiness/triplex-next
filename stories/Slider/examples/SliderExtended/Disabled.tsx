import React from "react";
import { EComponentSize, SliderExtended } from "@sberbusiness/triplex-next";

export const Disabled = () => (
    <div style={{ maxWidth: "750px", padding: "30px" }}>
        <SliderExtended min={0} max={100} step={1} size={EComponentSize.MD} disabled>
            <SliderExtended.Rail />
            <SliderExtended.Dot value={35} onChange={() => {}}>
                <SliderExtended.Tooltip value={35}>35</SliderExtended.Tooltip>
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
