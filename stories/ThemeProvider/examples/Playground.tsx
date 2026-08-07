import React, { useRef } from "react";
import { ThemeProvider, Button, EButtonTheme, EComponentSize, Text, ETextSize } from "@sberbusiness/triplex-next";

export type PlaygroundArgs = Pick<React.ComponentProps<typeof ThemeProvider>, "theme" | "scopeClassName" | "tokens">;

export const Playground = ({ theme, scopeClassName, tokens }: PlaygroundArgs) => {
    const scopeRef = useRef<HTMLDivElement>(null);

    return (
        <ThemeProvider theme={theme} scopeClassName={scopeClassName} tokens={tokens} scopeRef={scopeRef}>
            <div ref={scopeRef} style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 16 }}>
                <Text size={ETextSize.B1}>Контент внутри области видимости темы.</Text>
                <Button theme={EButtonTheme.GENERAL} size={EComponentSize.MD}>
                    Button text
                </Button>
            </div>
        </ThemeProvider>
    );
};
