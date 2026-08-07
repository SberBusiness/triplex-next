import React, { useRef, useState } from "react";
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
            {/* Подложку под тему даёт компонент с собственным токеном фона — ThemeProvider её не красит. */}
            <div ref={scopeRef}>
                <CardStatic>
                    <CardStatic.Content paddingSize={ECardContentPaddingSize.MD}>
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 16 }}>
                            <Text size={ETextSize.B1}>
                                Текущая тема: {theme === ETriplexNextTheme.LIGHT ? "светлая" : "тёмная"}
                            </Text>
                            <Button theme={EButtonTheme.GENERAL} size={EComponentSize.MD} onClick={handleToggleClick}>
                                Переключить тему
                            </Button>
                        </div>
                    </CardStatic.Content>
                </CardStatic>
            </div>
        </ThemeProvider>
    );
};
