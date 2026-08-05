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

export const Default = () => {
    const scopeRef = useRef<HTMLDivElement>(null);

    return (
        <ThemeProvider theme={ETriplexNextTheme.LIGHT} scopeRef={scopeRef}>
            <div ref={scopeRef} style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 16 }}>
                <Text size={ETextSize.B1}>Светлая тема — значение по умолчанию.</Text>
                <Button theme={EButtonTheme.GENERAL} size={EComponentSize.MD}>
                    Button text
                </Button>
            </div>
        </ThemeProvider>
    );
};
