import React, { useRef, useState } from "react";
import {
    ThemeProvider,
    ETriplexNextTheme,
    Button,
    EButtonTheme,
    EComponentSize,
    Text,
    ETextSize,
} from "@sberbusiness/triplex-next";

export const ThemeSwitcher = () => {
    const scopeRef = useRef<HTMLDivElement>(null);
    const [theme, setTheme] = useState(ETriplexNextTheme.LIGHT);

    const handleToggleClick = () => {
        setTheme((prevTheme) =>
            prevTheme === ETriplexNextTheme.LIGHT ? ETriplexNextTheme.DARK : ETriplexNextTheme.LIGHT,
        );
    };

    return (
        <ThemeProvider theme={theme} scopeRef={scopeRef}>
            <div ref={scopeRef} style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 16 }}>
                <Text size={ETextSize.B1}>Текущая тема: {theme}</Text>
                <Button theme={EButtonTheme.GENERAL} size={EComponentSize.MD} onClick={handleToggleClick}>
                    Переключить тему
                </Button>
            </div>
        </ThemeProvider>
    );
};
