import React, { useState } from "react";
import { Portal } from "@sberbusiness/triplex-next";

/** Свойства Playground-примера Portal. */
export interface IPlaygroundProps {
    /** Содержимое, рендерящееся в container. */
    children?: React.ReactNode;
    /** DOM-узел, в который рендерится содержимое. Задаётся обёрткой Playground, через Controls не настраивается. */
    container?: Element | DocumentFragment;
}

export const Playground = ({ children }: IPlaygroundProps) => {
    const [container, setContainer] = useState<HTMLDivElement | null>(null);

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: "400px" }}>
            <div>Компонент Portal объявлен здесь, но его содержимое рендерится в контейнер с пунктирной рамкой.</div>
            <div
                ref={setContainer}
                style={{ border: "1px dashed rgb(125, 131, 138)", borderRadius: "4px", padding: "16px" }}
            />
            {container && <Portal container={container}>{children}</Portal>}
        </div>
    );
};
