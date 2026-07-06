import React, { useState } from "react";
import {
    ESegmentedControlSize,
    ESegmentedControlTheme,
    ESegmentedControlType,
    SegmentedControl,
} from "../../../src/components/SegmentedControl";
import { ESmartSpotAnimation, ESmartSpotStatus, SmartSpot } from "../../../src/components/SmartSpot";

const STATUSES = Object.values(ESmartSpotStatus);
const ANIMATIONS = Object.values(ESmartSpotAnimation);
const DEFAULT_BLUR = 116;

export const Default = () => {
    const [animation, setAnimation] = useState<string>(ESmartSpotAnimation.DRIFT);
    const [blur, setBlur] = useState(DEFAULT_BLUR);

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 16,
                }}
            >
                <div style={{ width: 700, maxWidth: "100%" }}>
                    <SegmentedControl
                        type={ESegmentedControlType.SINGLE}
                        theme={ESegmentedControlTheme.GENERAL_1}
                        size={ESegmentedControlSize.MD}
                        value={animation}
                        onSelect={setAnimation}
                    >
                        {ANIMATIONS.map((item) => (
                            <SegmentedControl.Segment key={item} value={item}>
                                {item}
                            </SegmentedControl.Segment>
                        ))}
                    </SegmentedControl>
                </div>
                <label style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    Размытие
                    <input
                        type="range"
                        min={0}
                        max={116}
                        step={1}
                        value={blur}
                        onChange={(event) => setBlur(Number(event.target.value))}
                        style={{ width: 180 }}
                    />
                    <output>{blur}px</output>
                </label>
            </div>
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 240px), 1fr))",
                    gap: 16,
                }}
            >
                {STATUSES.map((status) => (
                    <div key={status} style={{ height: 300, borderRadius: 16, overflow: "hidden" }}>
                        <SmartSpot status={status} animation={animation as ESmartSpotAnimation} blur={blur} />
                    </div>
                ))}
            </div>
        </div>
    );
};
