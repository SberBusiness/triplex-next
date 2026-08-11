import React, { useState } from "react";
import { ComposedKeyDownListener } from "@sberbusiness/triplex-next";

/** Свойства Playground-примера ComposedKeyDownListener. */
export interface IPlaygroundProps {
    /** Коды клавиш, на каждый из которых создаётся отдельный слушатель. */
    eventKeyCodes: number[];
    /** Обработчик совпадения нужной клавиши. */
    onMatch: (event: KeyboardEvent) => void;
}

export const Playground = ({ eventKeyCodes, onMatch }: IPlaygroundProps) => {
    const [matchedKeyCodes, setMatchedKeyCodes] = useState<number[]>([]);

    const keyDownListeners = eventKeyCodes.map((eventKeyCode) => ({
        eventKeyCode,
        onMatch: (event: KeyboardEvent) => {
            setMatchedKeyCodes((prevKeyCodes) => [...prevKeyCodes, eventKeyCode]);
            onMatch(event);
        },
    }));

    return (
        <ComposedKeyDownListener keyDownListeners={keyDownListeners}>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: "400px" }}>
                <div>
                    Выберите клавиши в Controls — на каждую создаётся свой слушатель. Нажатия ловятся на уровне window.
                </div>
                <input
                    type="text"
                    placeholder="Введите текст и смените набор клавиш"
                    style={{ padding: "8px", width: "100%" }}
                />
                <div style={{ border: "1px dashed rgb(125, 131, 138)", borderRadius: "4px", padding: "16px" }}>
                    Сработавшие клавиши: {matchedKeyCodes.length > 0 ? matchedKeyCodes.join(", ") : "—"}
                </div>
            </div>
        </ComposedKeyDownListener>
    );
};
