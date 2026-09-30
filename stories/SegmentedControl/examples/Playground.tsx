import React, { useState } from "react";
import { action } from "storybook/actions";
import {
    SegmentedControl,
    ESegmentedControlSize,
    ESegmentedControlTheme,
    ESegmentedControlType,
} from "@sberbusiness/triplex-next";

export interface PlaygroundArgs {
    type: ESegmentedControlType;
    theme: ESegmentedControlTheme;
    size: ESegmentedControlSize;
    disabled: boolean;
}

export const Playground = ({ type, ...restArgs }: PlaygroundArgs) => {
    const [singleValue, setSingleValue] = useState("segment_3");
    const [multipleValue, setMultipleValue] = useState(["segment_3"]);

    const handleSingleSelect = (value: string) => {
        action("onSelect")(value);
        setSingleValue(value);
    };

    const handleMultipleSelect = (value: string[]) => {
        action("onSelect")(value);
        setMultipleValue(value);
    };

    const segments = (
        <>
            <SegmentedControl.Segment value="segment_1">Segment</SegmentedControl.Segment>
            <SegmentedControl.Segment value="segment_2">Segment</SegmentedControl.Segment>
            <SegmentedControl.Segment value="segment_3">Segment</SegmentedControl.Segment>
            <SegmentedControl.Segment value="segment_4">Segment</SegmentedControl.Segment>
            <SegmentedControl.Segment value="segment_5">Segment</SegmentedControl.Segment>
        </>
    );

    if (type === ESegmentedControlType.MULTIPLE) {
        return (
            <SegmentedControl
                {...restArgs}
                type={ESegmentedControlType.MULTIPLE}
                value={multipleValue}
                onSelect={handleMultipleSelect}
            >
                {segments}
            </SegmentedControl>
        );
    }

    return (
        <SegmentedControl
            {...restArgs}
            type={ESegmentedControlType.SINGLE}
            value={singleValue}
            onSelect={handleSingleSelect}
        >
            {segments}
        </SegmentedControl>
    );
};
