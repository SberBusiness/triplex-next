import React, { useState } from "react";
import {
    Button,
    EButtonTheme,
    EComponentSize,
    ETextSize,
    Island,
    SkinProvider,
    Text,
    TextField,
} from "@sberbusiness/triplex-next";

export const Default = () => {
    const [name, setName] = useState("Большие планы");
    const [launches, setLaunches] = useState(0);

    return (
        <SkinProvider skin="wordart">
            <div style={{ display: "grid", gap: 28, maxWidth: 420, padding: 24 }}>
                <Text size={ETextSize.B1}>WordArt / Triplex</Text>
                <TextField
                    label="Название проекта"
                    inputProps={{ value: name, onChange: (event) => setName(event.target.value) }}
                />
                <Button
                    theme={EButtonTheme.GENERAL}
                    size={EComponentSize.LG}
                    block
                    onClick={() => setLaunches((value) => value + 1)}
                >
                    Запустить проект
                </Button>
                <Island>
                    <Island.Header>
                        <Text size={ETextSize.B1}>{name || "Без названия"}</Text>
                    </Island.Header>
                    <Island.Body>
                        <Text size={ETextSize.B2}>
                            Идея сегодня. Легенда завтра. Читаемый текст и объёмные радужные грани.
                        </Text>
                    </Island.Body>
                    <Island.Footer>
                        <Text size={ETextSize.B2}>12 экранов · 3 участника</Text>
                    </Island.Footer>
                </Island>
                <Text size={ETextSize.B2} role="status">
                    {launches ? `Запусков: ${launches}` : "Готов к большим делам"}
                </Text>
            </div>
        </SkinProvider>
    );
};
