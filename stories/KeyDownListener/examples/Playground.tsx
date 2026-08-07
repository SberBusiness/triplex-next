import React, { useState } from "react";
import { KeyDownListener } from "@sberbusiness/triplex-next";

/** Свойства Playground-примера KeyDownListener. */
export interface IPlaygroundProps {
    /** Код клавиши или массив кодов, на которые реагирует слушатель. */
    eventKeyCode: number | number[];
    /** Обработчик совпадения нужной клавиши. */
    onMatch: (event: KeyboardEvent) => void;
}

export const Playground = ({ eventKeyCode, onMatch }: IPlaygroundProps) => {
    const [matchCount, setMatchCount] = useState(0);

    const handleMatch = (event: KeyboardEvent) => {
        setMatchCount((prevCount) => prevCount + 1);
        onMatch(event);
    };

    return (
        <KeyDownListener eventKeyCode={eventKeyCode} onMatch={handleMatch}>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: "400px" }}>
                <div>Нажмите выбранную в Controls клавишу — слушатель работает на уровне window.</div>
                <div style={{ border: "1px dashed rgb(125, 131, 138)", borderRadius: "4px", padding: "16px" }}>
                    Срабатываний onMatch: {matchCount}
                </div>
            </div>
        </KeyDownListener>
    );
};
