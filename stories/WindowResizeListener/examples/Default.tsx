import React, { useCallback, useState } from "react";
import { WindowResizeListener } from "@sberbusiness/triplex-next";

const getWindowSize = () =>
    typeof window === "undefined" ? { width: 0, height: 0 } : { width: window.innerWidth, height: window.innerHeight };

export const Default = () => {
    // При рендере на сервере window недоступен — стартовое значение берётся только в браузере.
    const [windowSize, setWindowSize] = useState(getWindowSize);

    // Стабильная ссылка на обработчик: при её смене слушатель переподписывается заново.
    const handleResize = useCallback(() => {
        setWindowSize(getWindowSize());
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
