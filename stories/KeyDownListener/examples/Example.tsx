import React, { useState } from "react";
import { ComposedKeyDownListener, EVENT_KEY_CODES } from "@sberbusiness/triplex-next";

export const Example = () => {
    const [result, setResult] = useState<string | null>(null);

    const keyDownListeners = [
        { eventKeyCode: EVENT_KEY_CODES.ENTER, onMatch: () => setResult("Подтверждено по Enter") },
        { eventKeyCode: EVENT_KEY_CODES.ESCAPE, onMatch: () => setResult("Отменено по Esc") },
    ];

    if (result !== null) {
        return (
            <div style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: "400px" }}>
                <div>{result}</div>
                <button type="button" onClick={() => setResult(null)}>
                    Показать панель снова
                </button>
            </div>
        );
    }

    return (
        <ComposedKeyDownListener keyDownListeners={keyDownListeners}>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: "400px" }}>
                <div>Панель с горячими клавишами: Enter подтверждает, Esc отменяет.</div>
                <div style={{ border: "1px dashed rgb(125, 131, 138)", borderRadius: "4px", padding: "16px" }}>
                    Ожидание нажатия клавиши.
                </div>
            </div>
        </ComposedKeyDownListener>
    );
};
