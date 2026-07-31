import React, { useState } from "react";
import { Portal } from "@sberbusiness/triplex-next";

export const Example = () => {
    const [container, setContainer] = useState<HTMLDivElement | null>(null);

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: "400px" }}>
            <div
                style={{
                    border: "1px solid rgb(125, 131, 138)",
                    borderRadius: "4px",
                    padding: "16px",
                    height: "48px",
                    overflow: "hidden",
                }}
            >
                <div>Контейнер с overflow: hidden и фиксированной высотой.</div>
                {container && (
                    <Portal container={container}>
                        <div>
                            Это содержимое объявлено внутри контейнера с overflow: hidden, но через Portal отрендерено
                            во внешний узел с пунктирной рамкой, поэтому не обрезается и видно полностью.
                        </div>
                    </Portal>
                )}
            </div>
            <div
                ref={setContainer}
                style={{ border: "1px dashed rgb(125, 131, 138)", borderRadius: "4px", padding: "16px" }}
            />
        </div>
    );
};
