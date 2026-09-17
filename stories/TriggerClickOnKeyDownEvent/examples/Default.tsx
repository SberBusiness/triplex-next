import React, { useRef, useState } from "react";
import { Button, EButtonTheme, EVENT_KEY_CODES, TriggerClickOnKeyDownEvent } from "@sberbusiness/triplex-next";

export const Default = () => {
    const closeButtonRef = useRef<HTMLButtonElement>(null);
    const [visible, setVisible] = useState(true);

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: "400px" }}>
            <div>Нажмите Esc или кнопку «Закрыть» — панель скроется.</div>
            {visible && (
                <div style={{ border: "1px dashed rgb(125, 131, 138)", borderRadius: "4px", padding: "16px" }}>
                    <TriggerClickOnKeyDownEvent eventKeyCode={EVENT_KEY_CODES.ESCAPE} targetRef={closeButtonRef}>
                        <Button ref={closeButtonRef} onClick={() => setVisible(false)} theme={EButtonTheme.SECONDARY}>
                            Закрыть
                        </Button>
                    </TriggerClickOnKeyDownEvent>
                </div>
            )}
        </div>
    );
};
