import React, { useState } from "react";
import { Portal } from "@sberbusiness/triplex-next";

export const Default = () => {
    const [container, setContainer] = useState<HTMLDivElement | null>(null);

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: "400px" }}>
            <div>Компонент Portal объявлен здесь, но его содержимое рендерится в контейнер с пунктирной рамкой.</div>
            <div
                ref={setContainer}
                style={{ border: "1px dashed rgb(125, 131, 138)", borderRadius: "4px", padding: "16px" }}
            />
            {container && <Portal container={container}>Содержимое, отрендеренное через Portal.</Portal>}
        </div>
    );
};
