import React, { useState } from "react";
import { KeyDownListener, EVENT_KEY_CODES } from "@sberbusiness/triplex-next";

export const Default = () => {
    const [visible, setVisible] = useState(true);

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: "400px" }}>
            <KeyDownListener eventKeyCode={EVENT_KEY_CODES.ESCAPE} onMatch={() => setVisible(false)} />
            <div>Нажмите Esc, чтобы скрыть панель.</div>
            {visible && (
                <div style={{ border: "1px dashed rgb(125, 131, 138)", borderRadius: "4px", padding: "16px" }}>
                    Панель скрывается по нажатию Esc в любом месте страницы.
                </div>
            )}
        </div>
    );
};
