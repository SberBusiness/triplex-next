import React, { useRef, useState } from "react";
import {
    Button,
    ComposedKeyDownListener,
    EButtonTheme,
    EComponentSize,
    EVENT_KEY_CODES,
} from "@sberbusiness/triplex-next";

export const Example = () => {
    const [opened, setOpened] = useState(true);
    const [status, setStatus] = useState("Черновик не сохранён");
    const panelRef = useRef<HTMLDivElement>(null);

    const handleSave = () => {
        setStatus("Черновик сохранён");
        setOpened(false);
    };

    const handleCancel = () => {
        setStatus("Сохранение отменено");
        setOpened(false);
    };

    // Слушатели глобальные, поэтому Enter на сфокусированной кнопке панели дошёл бы
    // и до onMatch, и до её onClick. Отфильтровываем такие события по event.target —
    // действие кнопки должно выигрывать у горячей клавиши.
    const handleSaveOnEnter = (event: KeyboardEvent) => {
        if (event.target instanceof HTMLButtonElement && panelRef.current?.contains(event.target)) {
            return;
        }

        handleSave();
    };

    // Слушатели монтируются только вместе с панелью, поэтому горячие клавиши
    // работают лишь пока она открыта.
    const keyDownListeners = [
        { eventKeyCode: EVENT_KEY_CODES.ENTER, onMatch: handleSaveOnEnter },
        { eventKeyCode: EVENT_KEY_CODES.ESCAPE, onMatch: handleCancel },
    ];

    if (!opened) {
        return (
            <div style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: "400px" }}>
                <div>{status}</div>
                <Button theme={EButtonTheme.SECONDARY} size={EComponentSize.MD} onClick={() => setOpened(true)}>
                    Открыть панель снова
                </Button>
            </div>
        );
    }

    return (
        <ComposedKeyDownListener keyDownListeners={keyDownListeners}>
            <div
                ref={panelRef}
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "16px",
                    maxWidth: "400px",
                    border: "1px solid rgb(125, 131, 138)",
                    borderRadius: "8px",
                    padding: "16px",
                }}
            >
                <div>Сохранить черновик? Enter — сохранить, Esc — отменить.</div>
                <div style={{ display: "flex", gap: "8px" }}>
                    <Button theme={EButtonTheme.GENERAL} size={EComponentSize.MD} onClick={handleSave}>
                        Сохранить
                    </Button>
                    <Button theme={EButtonTheme.SECONDARY} size={EComponentSize.MD} onClick={handleCancel}>
                        Отменить
                    </Button>
                </div>
            </div>
        </ComposedKeyDownListener>
    );
};
