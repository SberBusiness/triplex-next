import React from "react";
import { Button, EButtonTheme, Island, ISkinProviderProps, SkinProvider, TextField } from "@sberbusiness/triplex-next";

export type TPlaygroundArgs = Pick<ISkinProviderProps, "skin">;

export const Playground = ({ skin }: TPlaygroundArgs) => (
    <SkinProvider skin={skin}>
        <div style={{ display: "grid", gap: 28, maxWidth: 420, padding: 24 }}>
            <TextField label="Название проекта" inputProps={{ defaultValue: "Большие планы" }} />
            <Button theme={EButtonTheme.GENERAL}>Запустить проект</Button>
            <Island>Один провайдер для всей области.</Island>
        </div>
    </SkinProvider>
);
