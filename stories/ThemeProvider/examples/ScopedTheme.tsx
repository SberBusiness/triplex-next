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

export const ScopedTheme = () => {
    const darkScopeRef = useRef<HTMLDivElement>(null);

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 16 }}>
                <Text size={ETextSize.B1}>Область вне ThemeProvider — тема приложения.</Text>
                <Button theme={EButtonTheme.GENERAL} size={EComponentSize.MD}>
                    Button text
                </Button>
            </div>

            <ThemeProvider theme={ETriplexNextTheme.DARK} scopeRef={darkScopeRef}>
                <div
                    ref={darkScopeRef}
                    style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 16 }}
                >
                    <Text size={ETextSize.B1}>Область с тёмной темой — css-переменные действуют только здесь.</Text>
                    <Button theme={EButtonTheme.GENERAL} size={EComponentSize.MD}>
                        Button text
                    </Button>
                </div>
            </ThemeProvider>
        </div>
    );
};
