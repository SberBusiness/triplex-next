import React, { useState } from "react";
import { ComposedKeyDownListener, EVENT_KEY_CODES } from "@sberbusiness/triplex-next";

export const WithDynamicListeners = () => {
    const [arrowsEnabled, setArrowsEnabled] = useState(false);
    const [result, setResult] = useState("Ожидание нажатия клавиши");

    const keyDownListeners = [
        { eventKeyCode: EVENT_KEY_CODES.ESCAPE, onMatch: () => setResult("Отменено по Esc") },
        ...(arrowsEnabled
            ? [
                  {
                      eventKeyCode: [EVENT_KEY_CODES.ARROW_LEFT, EVENT_KEY_CODES.ARROW_RIGHT],
                      onMatch: (event: KeyboardEvent) =>
                          setResult(event.keyCode === EVENT_KEY_CODES.ARROW_LEFT ? "Стрелка влево" : "Стрелка вправо"),
                  },
              ]
            : []),
    ];

    return (
        <ComposedKeyDownListener keyDownListeners={keyDownListeners}>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: "400px" }}>
                <div>Набор слушателей меняется на лету — содержимое при этом не перемонтируется.</div>
                <input type="text" placeholder="Введите текст" style={{ padding: "8px", width: "100%" }} />
                <label style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <input
                        type="checkbox"
                        checked={arrowsEnabled}
                        onChange={(event) => setArrowsEnabled(event.target.checked)}
                    />
                    Добавить слушатель стрелок — введённый текст и фокус сохранятся
                </label>
                <div style={{ border: "1px dashed rgb(125, 131, 138)", borderRadius: "4px", padding: "16px" }}>
                    {result}
                </div>
            </div>
        </ComposedKeyDownListener>
    );
};
