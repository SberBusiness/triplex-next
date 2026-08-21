import React, { useState } from "react";
import { Button, EButtonTheme, EComponentSize, ETextSize, ExpandAnimation, Text } from "@sberbusiness/triplex-next";

const ANIMATION_TIMES = [100, 300, 1000];

interface IAnimationTimeItemProps {
    animationTime: number;
}

const AnimationTimeItem = ({ animationTime }: IAnimationTimeItemProps) => {
    const [expanded, setExpanded] = useState(true);

    return (
        <div style={{ maxWidth: 480 }}>
            <div style={{ marginBottom: "8px", fontSize: "16px", fontWeight: "700" }}>{animationTime} мс</div>

            <Button
                theme={EButtonTheme.SECONDARY}
                size={EComponentSize.MD}
                onClick={() => setExpanded((prev) => !prev)}
            >
                {expanded ? "Свернуть" : "Развернуть"}
            </Button>

            <ExpandAnimation expanded={expanded} animationTime={animationTime}>
                <Text tag="div" size={ETextSize.B1} style={{ paddingTop: 16 }}>
                    Скорость раскрытия задаётся свойством animationTime.
                </Text>
            </ExpandAnimation>
        </div>
    );
};

export const AnimationTime = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        {ANIMATION_TIMES.map((animationTime) => (
            <AnimationTimeItem key={animationTime} animationTime={animationTime} />
        ))}
    </div>
);
