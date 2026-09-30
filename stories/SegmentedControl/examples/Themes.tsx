import React, { useState } from "react";
import {
    SegmentedControl,
    ESegmentedControlSize,
    ESegmentedControlTheme,
    ESegmentedControlType,
} from "@sberbusiness/triplex-next";

interface IThemeItemProps {
    theme: ESegmentedControlTheme;
}

const ThemeItem = ({ theme }: IThemeItemProps) => {
    const [value, setValue] = useState("segment_3");

    return (
        <div>
            <div style={{ marginBottom: 8, fontSize: 16, fontWeight: 700 }}>{theme.toUpperCase()}</div>
            <SegmentedControl
                type={ESegmentedControlType.SINGLE}
                theme={theme}
                size={ESegmentedControlSize.LG}
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

const THEMES = Object.values(ESegmentedControlTheme);

export const Themes = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {THEMES.map((theme) => (
            <ThemeItem key={theme} theme={theme} />
        ))}
    </div>
);
