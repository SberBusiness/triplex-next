import React, { useCallback, useState } from "react";
import { WindowResizeListener } from "@sberbusiness/triplex-next";

/** Свойства Playground-примера WindowResizeListener. */
export interface IPlaygroundProps {
    /** Обработчик изменения размеров окна. */
    onResize: (event: UIEvent) => void;
    /** Задержка throttle между вызовами onResize, в миллисекундах. */
    throttleDelay?: number;
}

export const Playground = ({ onResize, throttleDelay }: IPlaygroundProps) => {
    const [resizeCount, setResizeCount] = useState(0);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    const handleResize = useCallback(
        (event: UIEvent) => {
            setResizeCount((prevCount) => prevCount + 1);
            setWindowWidth(window.innerWidth);
            onResize(event);
        },
        [onResize],
    );

    return (
        <WindowResizeListener onResize={handleResize} throttleDelay={throttleDelay}>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: "400px" }}>
                <div>Измените размер окна браузера — слушатель работает на уровне window.</div>
                <div style={{ border: "1px dashed rgb(125, 131, 138)", borderRadius: "4px", padding: "16px" }}>
                    <div>Ширина окна: {windowWidth}px</div>
                    <div>Срабатываний onResize: {resizeCount}</div>
                </div>
            </div>
        </WindowResizeListener>
    );
};
