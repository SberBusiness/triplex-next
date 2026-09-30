import React, { useState } from "react";
import {
    SegmentedControl,
    ESegmentedControlSize,
    ESegmentedControlTheme,
    ESegmentedControlType,
} from "@sberbusiness/triplex-next";

export const Disabled = () => {
    const [value, setValue] = useState("segment_3");

    return (
        <SegmentedControl
            type={ESegmentedControlType.SINGLE}
            theme={ESegmentedControlTheme.GENERAL_1}
            size={ESegmentedControlSize.LG}
            value={value}
            onSelect={setValue}
            disabled
        >
            <SegmentedControl.Segment value="segment_1">Segment</SegmentedControl.Segment>
            <SegmentedControl.Segment value="segment_2">Segment</SegmentedControl.Segment>
            <SegmentedControl.Segment value="segment_3">Segment</SegmentedControl.Segment>
            <SegmentedControl.Segment value="segment_4">Segment</SegmentedControl.Segment>
            <SegmentedControl.Segment value="segment_5">Segment</SegmentedControl.Segment>
        </SegmentedControl>
    );
};
