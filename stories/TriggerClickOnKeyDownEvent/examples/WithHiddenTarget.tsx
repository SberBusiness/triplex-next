import React, { useRef, useState } from "react";
import { Button, EButtonTheme, EVENT_KEY_CODES, TriggerClickOnKeyDownEvent } from "@sberbusiness/triplex-next";

export const WithHiddenTarget = () => {
    const visibleButtonRef = useRef<HTMLButtonElement>(null);
    const hiddenButtonRef = useRef<HTMLButtonElement>(null);
    const [lastClicked, setLastClicked] = useState("—");

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: "400px" }}>
            <div>
                Два триггера на одну клавишу: по Esc кликается только видимая кнопка, скрытая через display: none
                пропускается.
            </div>
            <TriggerClickOnKeyDownEvent eventKeyCode={EVENT_KEY_CODES.ESCAPE} targetRef={visibleButtonRef}>
                <TriggerClickOnKeyDownEvent eventKeyCode={EVENT_KEY_CODES.ESCAPE} targetRef={hiddenButtonRef}>
                    <>
                        <Button
                            ref={visibleButtonRef}
                            onClick={() => setLastClicked("видимая кнопка")}
                            theme={EButtonTheme.SECONDARY}
                        >
                            Видимая кнопка
                        </Button>
                        <Button
                            ref={hiddenButtonRef}
                            onClick={() => setLastClicked("скрытая кнопка")}
                            theme={EButtonTheme.SECONDARY}
                            style={{ display: "none" }}
                        >
                            Скрытая кнопка
                        </Button>
                    </>
                </TriggerClickOnKeyDownEvent>
            </TriggerClickOnKeyDownEvent>
            <div style={{ border: "1px dashed rgb(125, 131, 138)", borderRadius: "4px", padding: "16px" }}>
                Последний клик: {lastClicked}
            </div>
        </div>
    );
};
