import React from "react";
import { EComponentSize, SliderRange } from "@sberbusiness/triplex-next";

const MARKS = [
    { value: 0, label: "0" },
    { value: 35, label: "35" },
    { value: 66, label: "66" },
    { value: 100, label: "100" },
];

const STEP_MARKS = [
    { value: 0, label: "0" },
    { value: 25, label: "25" },
    { value: 50, label: "50" },
    { value: 75, label: "75" },
    { value: 100, label: "100" },
];

const STEPS = [0, 25, 50, 75, 100];

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

export const VisualTests = () => (
    <div style={{ width: "500px", padding: "30px", display: "flex", flexDirection: "column", gap: "32px" }}>
        <Case title="MD, фокус на левом ползунке и подсказка">
            <SliderRange
                min={0}
                max={100}
                size={EComponentSize.MD}
                marks={MARKS}
                values={[35, 66]}
                onChange={() => {}}
                renderTooltipContent={(value) => `${value} %`}
            />
        </Case>

        <Case title="LG">
            <SliderRange
                min={0}
                max={100}
                size={EComponentSize.LG}
                marks={MARKS}
                values={[35, 66]}
                onChange={() => {}}
            />
        </Case>

        <Case title="Шаги массивом">
            <SliderRange
                min={0}
                max={100}
                step={STEPS}
                size={EComponentSize.MD}
                marks={STEP_MARKS}
                values={[25, 75]}
                onChange={() => {}}
            />
        </Case>

        <Case title="Ползунки в одной точке">
            <SliderRange
                min={0}
                max={100}
                size={EComponentSize.MD}
                marks={MARKS}
                values={[50, 50]}
                onChange={() => {}}
            />
        </Case>

        <Case title="Реверсивный">
            <SliderRange
                min={0}
                max={100}
                size={EComponentSize.MD}
                marks={MARKS}
                values={[35, 66]}
                onChange={() => {}}
                reverse
            />
        </Case>

        <Case title="Неактивный">
            <SliderRange
                min={0}
                max={100}
                size={EComponentSize.MD}
                marks={MARKS}
                values={[35, 66]}
                onChange={() => {}}
                disabled
            />
        </Case>
    </div>
);
