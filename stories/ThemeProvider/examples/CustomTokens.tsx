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

export const CustomTokens = () => {
    const scopeRef = useRef<HTMLDivElement>(null);

    return (
        <ThemeProvider
            theme={ETriplexNextTheme.LIGHT}
            tokens={{
                ColorBrand: {
                    50: { value: "blue" },
                },
            }}
            scopeRef={scopeRef}
        >
            <div ref={scopeRef} style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 16 }}>
                <Text size={ETextSize.B1}>Токен ColorBrand.50 переопределён — кнопка перекрашена.</Text>
                <Button theme={EButtonTheme.GENERAL} size={EComponentSize.MD}>
                    Button text
                </Button>
            </div>
        </ThemeProvider>
    );
};
