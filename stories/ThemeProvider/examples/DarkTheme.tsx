import React, { useRef } from "react";
import {
    ThemeProvider,
    ETriplexNextTheme,
    Button,
    EButtonTheme,
    EComponentSize,
    CardStatic,
    ECardContentPaddingSize,
    Text,
    ETextSize,
} from "@sberbusiness/triplex-next";

export const DarkTheme = () => {
    const scopeRef = useRef<HTMLDivElement>(null);

    return (
        <ThemeProvider theme={ETriplexNextTheme.DARK} scopeRef={scopeRef}>
            {/*
                ThemeProvider задаёт только css-переменные и не красит подложку — фон под тёмную тему
                даёт компонент с собственным токеном фона, иначе светлый текст темы будет не виден.
            */}
            <div ref={scopeRef}>
                <CardStatic>
                    <CardStatic.Content paddingSize={ECardContentPaddingSize.MD}>
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 16 }}>
                            <Text size={ETextSize.B1}>Тёмная тема.</Text>
                            <Button theme={EButtonTheme.GENERAL} size={EComponentSize.MD}>
                                Button text
                            </Button>
                            <Button theme={EButtonTheme.SECONDARY} size={EComponentSize.MD}>
                                Button text
                            </Button>
                        </div>
                    </CardStatic.Content>
                </CardStatic>
            </div>
        </ThemeProvider>
    );
};
