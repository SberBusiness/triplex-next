import React from "react";
import { EComponentSize, SliderExtended } from "@sberbusiness/triplex-next";

const MARKS = [0, 35, 66, 100];

interface ICaseProps {
    children: React.ReactNode;
    title: string;
}

const Case = ({ children, title }: ICaseProps) => (
    <div>
        <div style={{ marginBottom: "8px", fontSize: "16px", fontWeight: "700" }}>{title}</div>
        {children}
    </div>
);

const Marks = () => (
    <SliderExtended.Marks>
        {MARKS.map((mark) => (
            <SliderExtended.Mark key={mark} value={mark}>
                {mark}
            </SliderExtended.Mark>
        ))}
    </SliderExtended.Marks>
);

export const VisualTests = () => (
    <div style={{ width: "500px", padding: "30px", display: "flex", flexDirection: "column", gap: "32px" }}>
        <Case title="MD, фокус на ползунке">
            <SliderExtended min={0} max={100} step={1} size={EComponentSize.MD}>
                <SliderExtended.Rail />
                <SliderExtended.Dot value={35} onChange={() => {}} aria-label="Значение">
                    <SliderExtended.Tooltip value={35}>35</SliderExtended.Tooltip>
                </SliderExtended.Dot>
                <SliderExtended.Track />
                <Marks />
            </SliderExtended>
        </Case>

        <Case title="LG">
            <SliderExtended min={0} max={100} step={1} size={EComponentSize.LG}>
                <SliderExtended.Rail />
                <SliderExtended.Dot value={66} onChange={() => {}} aria-label="Значение">
                    <SliderExtended.Tooltip value={66}>66</SliderExtended.Tooltip>
                </SliderExtended.Dot>
                <SliderExtended.Track />
                <Marks />
            </SliderExtended>
        </Case>

        <Case title="Диапазон">
            <SliderExtended min={0} max={100} step={1} size={EComponentSize.MD}>
                <SliderExtended.Rail />
                <SliderExtended.Dot value={35} onChange={() => {}} aria-label="Начальное значение" />
                <SliderExtended.Track />
                <SliderExtended.Dot value={66} onChange={() => {}} aria-label="Конечное значение" />
                <Marks />
            </SliderExtended>
        </Case>

        <Case title="Реверсивный">
            <SliderExtended min={0} max={100} step={1} size={EComponentSize.MD} reverse>
                <SliderExtended.Rail />
                <SliderExtended.Dot value={35} onChange={() => {}} aria-label="Значение" />
                <SliderExtended.Track />
                <Marks />
            </SliderExtended>
        </Case>

        <Case title="Неактивный">
            <SliderExtended min={0} max={100} step={1} size={EComponentSize.MD} disabled>
                <SliderExtended.Rail />
                <SliderExtended.Dot value={35} onChange={() => {}} aria-label="Значение" />
                <SliderExtended.Track />
                <Marks />
            </SliderExtended>
        </Case>
    </div>
);
