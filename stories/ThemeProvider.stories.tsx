import React, { useState, useRef } from "react";
import { StoryObj } from "@storybook/react";
import { ETriplexNextTheme } from "../src/components/ThemeProvider/ETriplexNextTheme";
import { ThemeProvider } from "../src/components/ThemeProvider";
import { Button } from "../src/components/Button";

export default {
    title: "Components/ThemeProvider",
    component: ThemeProvider,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component:
                    "ThemeProvider - компонент для управления темами в приложении. Позволяет переключаться между светлой и темной темами, а также переопределять дизайн-токены.",
            },
        },
        test: {
            async preRender(page) {
                await page.waitForFunction(() => document.fonts.ready);
            },
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
    name: "ThemeProvider Default",
    args: {
        theme: ETriplexNextTheme.LIGHT,
    },
    render: function Render(args) {
        const scopeRef = useRef<HTMLDivElement>(null);

        return (
            <ThemeProvider {...args} scopeRef={scopeRef}>
                <div ref={scopeRef}>
                    <h2>Тема по умолчанию</h2>
                    <p>Это пример использования ThemeProvider с темой по умолчанию.</p>
                    <Button>Button name</Button>
                </div>
            </ThemeProvider>
        );
    },
    parameters: {
        docs: {
            description: {
                story: "ThemeProvider с темой по умолчанию (светлая тема).",
            },
        },
    },
};

export const DarkTheme: StoryObj<typeof ThemeProvider> = {
    name: "Dark Theme",
    args: {
        theme: ETriplexNextTheme.DARK,
    },
    render: function Render(args) {
        const scopeRef = useRef<HTMLDivElement>(null);

        return (
            <ThemeProvider {...args} scopeRef={scopeRef}>
                <div ref={scopeRef}>
                    <h2>Темная тема</h2>
                    <p>Это пример использования ThemeProvider с темной темой.</p>
                    <Button>Button name</Button>
                </div>
            </ThemeProvider>
        );
    },
    parameters: {
        docs: {
            description: {
                story: "ThemeProvider с темной темой.",
            },
        },
    },
};

export const CustomTokens: StoryObj<typeof ThemeProvider> = {
    name: "Custom Tokens",
    args: {
        theme: ETriplexNextTheme.LIGHT,
        tokens: {
            ColorBrand: {
                "30": { value: "grey" },
            },
        },
    },
    render: function Render(args) {
        const scopeRef = useRef<HTMLDivElement>(null);

        return (
            <ThemeProvider {...args} scopeRef={scopeRef}>
                <div ref={scopeRef}>
                    <h2>Кастомные токены</h2>
                    <p>Этот пример демонстрирует переопределение токенов темы.</p>
                    <Button>Button name</Button>
                </div>
            </ThemeProvider>
        );
    },
    parameters: {
        docs: {
            description: {
                story: "ThemeProvider с переопределенными токенами.",
            },
        },
    },
};

export const ThemeSwitcher: StoryObj<typeof ThemeProvider> = {
    name: "Theme Switcher",
    args: {
        theme: ETriplexNextTheme.LIGHT,
    },
    render: function Render(args) {
        const [currentTheme, setCurrentTheme] = useState(args.theme);

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
                    <Button onClick={handleThemeToggle}>
                        Переключить на {currentTheme === ETriplexNextTheme.LIGHT ? "темную" : "светлую"} тему
                    </Button>
                </div>
            </ThemeProvider>
        );
    },
    parameters: {
        docs: {
            description: {
                story: "Интерактивный пример переключения между темами.",
            },
        },
    },
};

export const ScopedTheme: StoryObj<typeof ThemeProvider> = {
    name: "Scoped Theme",
    render: function Render() {
        const scopeRef = useRef<HTMLDivElement>(null);

        return (
            <div>
                <h2>Область вне ThemeProvider</h2>
                <p>Этот контент использует стандартные стили браузера.</p>
                <Button>Button name</Button>

                <ThemeProvider theme={ETriplexNextTheme.DARK} scopeRef={scopeRef}>
                    <div ref={scopeRef}>
                        <h2>Область с темной темой</h2>
                        <p>Этот контент использует темную тему через scopeRef.</p>
                        <Button>Button name</Button>
                    </div>
                </ThemeProvider>
            </div>
        );
    },
    parameters: {
        docs: {
            description: {
                story: "Пример использования scopeRef для ограничения области действия темы.",
            },
        },
    },
};
