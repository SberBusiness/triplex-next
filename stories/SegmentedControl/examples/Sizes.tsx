import React, { useState } from "react";
import {
    SegmentedControl,
    ESegmentedControlSize,
    ESegmentedControlTheme,
    ESegmentedControlType,
} from "@sberbusiness/triplex-next";

interface ISizeItemProps {
    size: ESegmentedControlSize;
}

const SizeItem = ({ size }: ISizeItemProps) => {
    const [value, setValue] = useState("segment_3");

    return (
        <div>
            <div style={{ marginBottom: 8, fontSize: 16, fontWeight: 700 }}>{size.toUpperCase()}</div>
            <SegmentedControl
                type={ESegmentedControlType.SINGLE}
                theme={ESegmentedControlTheme.GENERAL_1}
                size={size}
                value={value}
                onSelect={setValue}
            >
                <SegmentedControl.Segment value="segment_1">Segment</SegmentedControl.Segment>
                <SegmentedControl.Segment value="segment_2">Segment</SegmentedControl.Segment>
                <SegmentedControl.Segment value="segment_3">Segment</SegmentedControl.Segment>
                <SegmentedControl.Segment value="segment_4">Segment</SegmentedControl.Segment>
                <SegmentedControl.Segment value="segment_5">Segment</SegmentedControl.Segment>
            </SegmentedControl>
        </div>
    );
};

const SIZES = Object.values(ESegmentedControlSize);

export const Sizes = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {SIZES.map((size) => (
            <SizeItem key={size} size={size} />
        ))}
    </div>
);
