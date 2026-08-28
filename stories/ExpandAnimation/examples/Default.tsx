import React, { useState } from "react";
import { Button, EButtonTheme, EComponentSize, ETextSize, ExpandAnimation, Text } from "@sberbusiness/triplex-next";

export const Default = () => {
    const [expanded, setExpanded] = useState(true);

    return (
        <div style={{ maxWidth: 480 }}>
            <Button
                theme={EButtonTheme.SECONDARY}
                size={EComponentSize.MD}
                aria-expanded={expanded}
                aria-controls="expand-animation-default"
                onClick={() => setExpanded((prev) => !prev)}
            >
                {expanded ? "Свернуть" : "Развернуть"}
            </Button>

            <ExpandAnimation id="expand-animation-default" expanded={expanded}>
                <Text tag="div" size={ETextSize.B1} style={{ paddingTop: 16 }}>
                    Содержимое разворачивается и сворачивается по высоте. В свёрнутом состоянии блок скрыт через
                    visibility, поэтому не получает фокус по Tab.
                </Text>
            </ExpandAnimation>
        </div>
    );
};
