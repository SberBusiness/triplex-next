import React, { useState, useRef } from "react";
import { StoryObj } from "@storybook/react";
import { ETriplexNextTheme } from "../src/components/ThemeProvider/ETriplexNextTheme";
import { ThemeProvider } from "../src/components/ThemeProvider";
import { Button, EButtonTheme } from "../src/components/Button";
import { Title, Description, Primary, Controls, Stories } from "@storybook/addon-docs/blocks";
import { EComponentSize } from "../src/enums/EComponentSize";

export default {
    title: "Components/ThemeProvider",
    component: ThemeProvider,
    tags: ["autodocs"],
    parameters: {
        docs: {
            page: () => (
                <>
                    <Title />
                    <Description />
                    <Controls of={Default} />
                    <Primary />
                    <Stories />
                </>
            ),
        },
    },
    argTypes: {
        theme: {
            control: { type: "select" },
            options: [ETriplexNextTheme.LIGHT, ETriplexNextTheme.DARK],
            description: "Дизайн-тема Triplex Next",
        },
        scopeClassName: {
            control: { type: "text" },
            description: "Класс для области видимости CSS-переменных",
        },
        tokens: {
            control: { type: "object" },
            description: "Переопределяемые токены",
        },
        children: {
            control: false,
        },
        scopeRef: {
            control: false,
        },
    },
};

export const Default: StoryObj<typeof ThemeProvider> = {
    name: "Default",
    parameters: {
        controls: { disable: true },
        testRunner: { skip: true },
    },
    render: function Render() {
        const scopeRef = useRef<HTMLDivElement>(null);

        return (
            <ThemeProvider theme={ETriplexNextTheme.LIGHT} scopeRef={scopeRef}>
                <div ref={scopeRef}>
                    <h2>Тема по умолчанию</h2>
                    <p>Это пример использования ThemeProvider с темой по умолчанию.</p>
                    <Button theme={EButtonTheme.SECONDARY} size={EComponentSize.MD}>
                        Button text
                    </Button>
                </div>
            </ThemeProvider>
        );
    },
};

export const DarkTheme: StoryObj<typeof ThemeProvider> = {
    name: "Dark theme",
    parameters: {
        controls: { disable: true },
    },
    render: () => {
        const scopeRef = useRef<HTMLDivElement>(null);

        return (
            <ThemeProvider theme={ETriplexNextTheme.DARK} scopeRef={scopeRef}>
                <div ref={scopeRef}>
                    <h2>Темная тема</h2>
                    <p>Это пример использования ThemeProvider с темной темой.</p>
                    <Button theme={EButtonTheme.SECONDARY} size={EComponentSize.MD}>
                        Button text
                    </Button>
                </div>
            </ThemeProvider>
        );
    },
};

export const CustomTokens: StoryObj<typeof ThemeProvider> = {
    name: "Custom tokens",
    parameters: {
        controls: { disable: true },
    },
    render: function Render() {
        const scopeRef = useRef<HTMLDivElement>(null);

        return (
            <ThemeProvider
                theme={ETriplexNextTheme.LIGHT}
                tokens={{
                    ColorBrand: {
                        "50": { value: "blue" },
                    },
                }}
                scopeRef={scopeRef}
            >
                <div ref={scopeRef}>
                    <h2>Кастомные токены</h2>
                    <p>Этот пример демонстрирует переопределение токенов темы.</p>
                    <Button theme={EButtonTheme.GENERAL} size={EComponentSize.MD}>
                        Button text
                    </Button>
                </div>
            </ThemeProvider>
        );
    },
};

export const ThemeSwitcher: StoryObj<typeof ThemeProvider> = {
    name: "Theme switcher",
    parameters: {
        controls: { disable: true },
        testRunner: { skip: true },
    },
    render: () => {
        const [currentTheme, setCurrentTheme] = useState(ETriplexNextTheme.LIGHT);

        const handleThemeToggle = () => {
            setCurrentTheme(
                currentTheme === ETriplexNextTheme.LIGHT ? ETriplexNextTheme.DARK : ETriplexNextTheme.LIGHT,
            );
        };

        const scopeRef = useRef<HTMLDivElement>(null);

        return (
            <ThemeProvider theme={currentTheme} scopeRef={scopeRef}>
                <div ref={scopeRef}>
                    <h2>Переключатель тем</h2>
                    <p>Текущая тема: {currentTheme === ETriplexNextTheme.LIGHT ? "Светлая" : "Темная"}</p>
                    <Button theme={EButtonTheme.SECONDARY} size={EComponentSize.MD} onClick={() => handleThemeToggle()}>
                        Переключить на {currentTheme === ETriplexNextTheme.LIGHT ? "темную" : "светлую"} тему
                    </Button>
                </div>
            </ThemeProvider>
        );
    },
};

export const ScopedTheme: StoryObj<typeof ThemeProvider> = {
    name: "Scoped theme",
    parameters: {
        controls: { disable: true },
    },
    render: function Render() {
        const scopeRef = useRef<HTMLDivElement>(null);

        return (
            <div>
                <h2>Область вне ThemeProvider</h2>
                <p>Этот контент использует стандартные стили браузера.</p>
                <Button theme={EButtonTheme.SECONDARY} size={EComponentSize.MD}>
                    Button text
                </Button>

                <ThemeProvider theme={ETriplexNextTheme.DARK} scopeRef={scopeRef}>
                    <div ref={scopeRef}>
                        <h2>Область с темной темой</h2>
                        <p>Этот контент использует темную тему через scopeRef.</p>
                        <Button theme={EButtonTheme.SECONDARY} size={EComponentSize.MD}>
                            Button text
                        </Button>
                    </div>
                </ThemeProvider>
            </div>
        );
    },
};
