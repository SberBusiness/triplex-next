import React, { useCallback, useState } from "react";
import { WindowResizeListener } from "@sberbusiness/triplex-next";

interface IResizeCounterProps {
    throttleDelay: number;
}

const ResizeCounter = ({ throttleDelay }: IResizeCounterProps) => {
    const [resizeCount, setResizeCount] = useState(0);

    const handleResize = useCallback(() => {
        setResizeCount((prevCount) => prevCount + 1);
    }, []);

    return (
        <WindowResizeListener onResize={handleResize} throttleDelay={throttleDelay}>
            <div>
                <div style={{ marginBottom: "8px", fontSize: "16px", fontWeight: "700" }}>
                    throttleDelay: {throttleDelay}ms
                </div>
                <div style={{ border: "1px dashed rgb(125, 131, 138)", borderRadius: "4px", padding: "16px" }}>
                    Срабатываний onResize: {resizeCount}
                </div>
            </div>
        </WindowResizeListener>
    );
};

export const ThrottleDelay = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: "400px" }}>
        <div>Измените размер окна браузера — чем больше задержка, тем реже вызывается обработчик.</div>
        <ResizeCounter throttleDelay={100} />
        <ResizeCounter throttleDelay={1000} />
    </div>
);
