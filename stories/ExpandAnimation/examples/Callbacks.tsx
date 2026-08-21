import React, { useState } from "react";
import { Button, EButtonTheme, EComponentSize, ETextSize, ExpandAnimation, Text } from "@sberbusiness/triplex-next";

export const Callbacks = () => {
    const [expanded, setExpanded] = useState(true);
    const [animating, setAnimating] = useState(false);

    return (
        <div style={{ maxWidth: 480 }}>
            <Button
                theme={EButtonTheme.SECONDARY}
                size={EComponentSize.MD}
                onClick={() => setExpanded((prev) => !prev)}
            >
                {expanded ? "Свернуть" : "Развернуть"}
            </Button>

            <Text tag="div" size={ETextSize.B1} style={{ paddingTop: 8 }}>
                Состояние: {animating ? "анимация идёт" : "анимация завершена"}
            </Text>

            <ExpandAnimation expanded={expanded} onStart={() => setAnimating(true)} onEnd={() => setAnimating(false)}>
                <Text tag="div" size={ETextSize.B1} style={{ paddingTop: 16 }}>
                    onStart вызывается в начале анимации, onEnd — в конце. Оба коллбэка срабатывают и при
                    разворачивании, и при сворачивании.
                </Text>
            </ExpandAnimation>
        </div>
    );
};
