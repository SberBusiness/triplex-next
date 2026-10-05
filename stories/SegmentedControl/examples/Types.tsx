import React, { useState } from "react";
import {
    SegmentedControl,
    ESegmentedControlSize,
    ESegmentedControlTheme,
    ESegmentedControlType,
} from "@sberbusiness/triplex-next";

export const Types = () => {
    const [singleValue, setSingleValue] = useState("segment_3");
    const [multipleValue, setMultipleValue] = useState(["segment_2", "segment_4"]);

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div>
                <div style={{ marginBottom: 8, fontSize: 16, fontWeight: 700 }}>SINGLE</div>
                <SegmentedControl
                    type={ESegmentedControlType.SINGLE}
                    theme={ESegmentedControlTheme.GENERAL_1}
                    size={ESegmentedControlSize.LG}
                    value={singleValue}
                    onSelect={setSingleValue}
                >
                    <SegmentedControl.Segment value="segment_1">Segment</SegmentedControl.Segment>
                    <SegmentedControl.Segment value="segment_2">Segment</SegmentedControl.Segment>
                    <SegmentedControl.Segment value="segment_3">Segment</SegmentedControl.Segment>
                    <SegmentedControl.Segment value="segment_4">Segment</SegmentedControl.Segment>
                    <SegmentedControl.Segment value="segment_5">Segment</SegmentedControl.Segment>
                </SegmentedControl>
            </div>
            <div>
                <div style={{ marginBottom: 8, fontSize: 16, fontWeight: 700 }}>MULTIPLE</div>
                <SegmentedControl
                    type={ESegmentedControlType.MULTIPLE}
                    theme={ESegmentedControlTheme.GENERAL_1}
                    size={ESegmentedControlSize.LG}
                    value={multipleValue}
                    onSelect={setMultipleValue}
                >
                    <SegmentedControl.Segment value="segment_1">Segment</SegmentedControl.Segment>
                    <SegmentedControl.Segment value="segment_2">Segment</SegmentedControl.Segment>
                    <SegmentedControl.Segment value="segment_3">Segment</SegmentedControl.Segment>
                    <SegmentedControl.Segment value="segment_4">Segment</SegmentedControl.Segment>
                    <SegmentedControl.Segment value="segment_5">Segment</SegmentedControl.Segment>
                </SegmentedControl>
            </div>
        </div>
    );
};
