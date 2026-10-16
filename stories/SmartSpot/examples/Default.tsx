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
const DEFAULT_BLUR = 200;
const MAX_BLUR = 300;
const MAX_DISTANCE = 500;
const MAX_DURATION = 16000;

// Значения пресетов по умолчанию.
const PRESET_MOTION: Record<ESmartSpotAnimation, { distance: number; duration: number }> = {
    [ESmartSpotAnimation.DRIFT]: { distance: 50, duration: 8000 },
    [ESmartSpotAnimation.WAVE]: { distance: 30, duration: 3000 },
    [ESmartSpotAnimation.ORBIT]: { distance: 250, duration: 10000 },
    [ESmartSpotAnimation.BREATHING]: { distance: 0, duration: 8000 },
    [ESmartSpotAnimation.NONE]: { distance: 0, duration: 8000 },
};

export const Default = () => {
    const [animation, setAnimation] = useState<string>(ESmartSpotAnimation.DRIFT);
    const [blur, setBlur] = useState(DEFAULT_BLUR);
    const [distance, setDistance] = useState(PRESET_MOTION[ESmartSpotAnimation.DRIFT].distance);
    const [duration, setDuration] = useState(PRESET_MOTION[ESmartSpotAnimation.DRIFT].duration);
    const [hideBackground, setHideBackground] = useState(false);

    const handleAnimationSelect = (value: string) => {
        const motion = PRESET_MOTION[value as ESmartSpotAnimation];

        setAnimation(value);
        setDistance(motion.distance);
        setDuration(motion.duration);
    };

    const isStatic = animation === ESmartSpotAnimation.NONE;
    const hasDistance = !isStatic && animation !== ESmartSpotAnimation.BREATHING;

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <div
                style={{
                    display: "flex",
                    flexWrap: "wrap",
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
                        onSelect={handleAnimationSelect}
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
                        max={MAX_BLUR}
                        step={1}
                        value={blur}
                        onChange={(event) => setBlur(Number(event.target.value))}
                        style={{ width: 180 }}
                    />
                    <output>{blur}px</output>
                </label>
                <label style={{ display: "flex", alignItems: "center", gap: 10, opacity: hasDistance ? 1 : 0.4 }}>
                    Дистанция
                    <input
                        type="range"
                        min={0}
                        max={MAX_DISTANCE}
                        step={1}
                        value={distance}
                        disabled={!hasDistance}
                        onChange={(event) => setDistance(Number(event.target.value))}
                        style={{ width: 180 }}
                    />
                    <output>{distance}px</output>
                </label>
                <label style={{ display: "flex", alignItems: "center", gap: 10, opacity: isStatic ? 0.4 : 1 }}>
                    Длительность
                    <input
                        type="range"
                        min={500}
                        max={MAX_DURATION}
                        step={100}
                        value={duration}
                        disabled={isStatic}
                        onChange={(event) => setDuration(Number(event.target.value))}
                        style={{ width: 180 }}
                    />
                    <output>{duration}ms</output>
                </label>
                <label style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <input
                        type="checkbox"
                        checked={hideBackground}
                        onChange={(event) => setHideBackground(event.target.checked)}
                    />
                    Без фона
                </label>
            </div>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 24,
                }}
            >
                {STATUSES.map((status) => (
                    <div key={status} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                        {status}
                        <div style={{ height: 500, borderRadius: 16, overflow: "hidden" }}>
                            <SmartSpot
                                status={status}
                                animation={animation as ESmartSpotAnimation}
                                blur={blur}
                                distance={distance}
                                duration={duration}
                                hideBackground={hideBackground}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
