import React, { useRef, useState } from "react";
import { Button, EButtonTheme, EVENT_KEY_CODES, TriggerClickOnKeyDownEvent } from "@sberbusiness/triplex-next";

export const WithMultipleKeys = () => {
    const nextButtonRef = useRef<HTMLButtonElement>(null);
    const [step, setStep] = useState(1);

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: "400px" }}>
            <div>Кнопка кликается и по Enter, и по стрелке вправо — в eventKeyCode передан массив кодов.</div>
            <TriggerClickOnKeyDownEvent
                eventKeyCode={[EVENT_KEY_CODES.ENTER, EVENT_KEY_CODES.ARROW_RIGHT]}
                targetRef={nextButtonRef}
            >
                <Button
                    ref={nextButtonRef}
                    onClick={() => setStep((prevStep) => prevStep + 1)}
                    theme={EButtonTheme.GENERAL}
                >
                    Дальше
                </Button>
            </TriggerClickOnKeyDownEvent>
            <div style={{ border: "1px dashed rgb(125, 131, 138)", borderRadius: "4px", padding: "16px" }}>
                Шаг: {step}
            </div>
        </div>
    );
};
