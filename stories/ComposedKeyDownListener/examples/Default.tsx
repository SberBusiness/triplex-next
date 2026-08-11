import React, { useState } from "react";
import { ComposedKeyDownListener, EVENT_KEY_CODES } from "@sberbusiness/triplex-next";

export const Default = () => {
    const [result, setResult] = useState("Ожидание нажатия клавиши");

    const keyDownListeners = [
        { eventKeyCode: EVENT_KEY_CODES.ENTER, onMatch: () => setResult("Подтверждено по Enter") },
        { eventKeyCode: EVENT_KEY_CODES.ESCAPE, onMatch: () => setResult("Отменено по Esc") },
    ];

    return (
        <ComposedKeyDownListener keyDownListeners={keyDownListeners}>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: "400px" }}>
                <div>Две горячие клавиши с разными обработчиками: Enter подтверждает, Esc отменяет.</div>
                <div style={{ border: "1px dashed rgb(125, 131, 138)", borderRadius: "4px", padding: "16px" }}>
                    {result}
                </div>
            </div>
        </ComposedKeyDownListener>
    );
};
