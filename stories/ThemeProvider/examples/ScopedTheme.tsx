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

export const ScopedTheme = () => {
    const darkScopeRef = useRef<HTMLDivElement>(null);

    // Обе области — одинаковая разметка. Отличается только тема: вторая обёрнута в ThemeProvider.
    const content = (label: string) => (
        <CardStatic>
            <CardStatic.Content paddingSize={ECardContentPaddingSize.MD}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 16 }}>
                    <Text size={ETextSize.B1}>{label}</Text>
                    <Button theme={EButtonTheme.SECONDARY} size={EComponentSize.MD}>
                        Button text
                    </Button>
                </div>
            </CardStatic.Content>
        </CardStatic>
    );

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            {content("Область вне ThemeProvider — тема приложения.")}

            <ThemeProvider theme={ETriplexNextTheme.DARK} scopeRef={darkScopeRef}>
                <div ref={darkScopeRef}>
                    {content("Область с тёмной темой — css-переменные действуют только здесь.")}
                </div>
            </ThemeProvider>
        </div>
    );
};
