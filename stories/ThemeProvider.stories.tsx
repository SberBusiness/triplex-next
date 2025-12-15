import React, { useState, useRef } from "react";
import { StoryObj } from "@storybook/react";
import { ETriplexNextTheme } from "../src/components/ThemeProvider/ETriplexNextTheme";
import { ThemeProvider } from "../src/components/ThemeProvider";
import { Button } from "../src/components/Button";
import { Title, Description, Primary, Controls, Stories } from "@storybook/addon-docs/blocks";

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
    args: {
        theme: ETriplexNextTheme.LIGHT,
    },
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                story: "ThemeProvider с темой по умолчанию (светлая тема).",
            },
        },
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
};

export const DarkTheme: StoryObj<typeof ThemeProvider> = {
    name: "Dark Theme",
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                story: "ThemeProvider с темной темой.",
            },
        },
    },
    render: function Render() {
        const scopeRef = useRef<HTMLDivElement>(null);

        return (
            <ThemeProvider theme={ETriplexNextTheme.DARK} scopeRef={scopeRef}>
                <div ref={scopeRef}>
                    <h2>Темная тема</h2>
                    <p>Это пример использования ThemeProvider с темной темой.</p>
                    <Button>Button name</Button>
                </div>
            </ThemeProvider>
        );
    },
};

export const CustomTokens: StoryObj<typeof ThemeProvider> = {
    name: "Custom Tokens",
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                story: "ThemeProvider с переопределенными токенами.",
            },
        },
    },
    render: function Render() {
        const scopeRef = useRef<HTMLDivElement>(null);

        return (
            <ThemeProvider
                theme={ETriplexNextTheme.LIGHT}
                tokens={{
                    ColorBrand: {
                        "30": { value: "grey" },
                    },
                }}
                scopeRef={scopeRef}
            >
                <div ref={scopeRef}>
                    <h2>Кастомные токены</h2>
                    <p>Этот пример демонстрирует переопределение токенов темы.</p>
                    <Button>Button name</Button>
                </div>
            </ThemeProvider>
        );
    },
};

export const ThemeSwitcher: StoryObj<typeof ThemeProvider> = {
    name: "Theme Switcher",
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                story: "Интерактивный пример переключения между темами.",
            },
        },
    },
    render: function Render() {
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
                    <Button onClick={handleThemeToggle}>
                        Переключить на {currentTheme === ETriplexNextTheme.LIGHT ? "темную" : "светлую"} тему
                    </Button>
                </div>
            </ThemeProvider>
        );
    },
};

export const ScopedTheme: StoryObj<typeof ThemeProvider> = {
    name: "Scoped Theme",
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                story: "Пример использования scopeRef для ограничения области действия темы.",
            },
        },
    },
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
};
