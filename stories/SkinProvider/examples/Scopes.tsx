import React, { useState } from "react";
import { Button, EButtonTheme, Island, SkinProvider, TextField } from "@sberbusiness/triplex-next";

export const Scopes = () => {
    const [enabled, setEnabled] = useState(true);
    return (
        <div style={{ display: "grid", gap: 28, maxWidth: 420, padding: 24 }}>
            <label>
                <input type="checkbox" checked={enabled} onChange={(event) => setEnabled(event.target.checked)} />{" "}
                WordArt включён
            </label>
            <Button theme={EButtonTheme.GENERAL}>Вне провайдера</Button>
            <SkinProvider skin={enabled ? "wordart" : null}>
                <TextField
                    label="Текст сохраняется при переключении"
                    inputProps={{ defaultValue: "Попробуйте изменить" }}
                />
                <Button theme={EButtonTheme.GENERAL}>Внутри провайдера</Button>
                <SkinProvider skin={null}>
                    <Island>Вложенная область без скина</Island>
                    <Button theme={EButtonTheme.GENERAL}>Скин отключён локально</Button>
                </SkinProvider>
            </SkinProvider>
        </div>
    );
};
