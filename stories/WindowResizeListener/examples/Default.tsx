import React, { useCallback, useState } from "react";
import { WindowResizeListener } from "@sberbusiness/triplex-next";

export const Default = () => {
    const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });

    // Стабильная ссылка на обработчик: при её смене слушатель переподписывается заново.
    const handleResize = useCallback(() => {
        setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    }, []);

    return (
        <WindowResizeListener onResize={handleResize}>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: "400px" }}>
                <div>Измените размер окна браузера, чтобы обновить значения.</div>
                <div style={{ border: "1px dashed rgb(125, 131, 138)", borderRadius: "4px", padding: "16px" }}>
                    Размер окна: {windowSize.width} × {windowSize.height}
                </div>
            </div>
        </WindowResizeListener>
    );
};
