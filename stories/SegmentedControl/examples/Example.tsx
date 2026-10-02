import React, { useState } from "react";
import { DefaulticonStrokePrdIcon20 } from "@sberbusiness/icons-next";
import {
    SegmentedControl,
    ESegmentedControlSize,
    ESegmentedControlTheme,
    ESegmentedControlType,
} from "@sberbusiness/triplex-next";

/** Индекс палитры иконки: выбранный сегмент рисует иконку на контрастном фоне. */
const SELECTED_ICON_PALETTE_INDEX = 10;
const ICON_PALETTE_INDEX = 5;

const SEGMENTS = [
    { value: "segment_1", label: "segment 1" },
    { value: "segment_2", label: "segment 2" },
    { value: "segment_3", label: "segment 3" },
];

export const Example = () => {
    const [value, setValue] = useState("segment_2");

    return (
        <div style={{ width: 144 }}>
            <SegmentedControl
                type={ESegmentedControlType.SINGLE}
                theme={ESegmentedControlTheme.GENERAL_1}
                size={ESegmentedControlSize.LG}
                value={value}
                onSelect={setValue}
            >
                {SEGMENTS.map((segment) => (
                    <SegmentedControl.Segment key={segment.value} value={segment.value} aria-label={segment.label}>
                        <DefaulticonStrokePrdIcon20
                            paletteIndex={value === segment.value ? SELECTED_ICON_PALETTE_INDEX : ICON_PALETTE_INDEX}
                            style={{ display: "block" }}
                        />
                    </SegmentedControl.Segment>
                ))}
            </SegmentedControl>
        </div>
    );
};
