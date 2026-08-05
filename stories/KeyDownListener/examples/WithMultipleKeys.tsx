import React, { useState } from "react";
import { KeyDownListener, EVENT_KEY_CODES } from "@sberbusiness/triplex-next";

export const WithMultipleKeys = () => {
    const [value, setValue] = useState(0);

    const handleMatch = (event: KeyboardEvent) => {
        setValue((prevValue) => (event.keyCode === EVENT_KEY_CODES.ARROW_LEFT ? prevValue - 1 : prevValue + 1));
    };

    return (
        <KeyDownListener eventKeyCode={[EVENT_KEY_CODES.ARROW_LEFT, EVENT_KEY_CODES.ARROW_RIGHT]} onMatch={handleMatch}>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: "400px" }}>
                <div>Один слушатель реагирует на несколько клавиш: стрелка влево и стрелка вправо.</div>
                <div style={{ border: "1px dashed rgb(125, 131, 138)", borderRadius: "4px", padding: "16px" }}>
                    Значение: {value}
                </div>
            </div>
        </KeyDownListener>
    );
};
