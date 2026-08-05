import React, { useRef } from "react";
import {
    ThemeProvider,
    ETriplexNextTheme,
    Button,
    EButtonTheme,
    EComponentSize,
    Text,
    ETextSize,
} from "@sberbusiness/triplex-next";

export const DarkTheme = () => {
    const scopeRef = useRef<HTMLDivElement>(null);

    return (
        <ThemeProvider theme={ETriplexNextTheme.DARK} scopeRef={scopeRef}>
            <div ref={scopeRef} style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 16 }}>
                <Text size={ETextSize.B1}>Тёмная тема.</Text>
                <Button theme={EButtonTheme.GENERAL} size={EComponentSize.MD}>
                    Button text
                </Button>
                <Button theme={EButtonTheme.SECONDARY} size={EComponentSize.MD}>
                    Button text
                </Button>
            </div>
        </ThemeProvider>
    );
};
