import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Description, Stories, Title } from "@storybook/addon-docs/blocks";
import { expect } from "storybook/test";
import { NotificationGrouped } from "@sberbusiness/triplex-next";
import {
    Default as DefaultRender,
    DefaultSource,
    WithFooter as WithFooterRender,
    WithFooterSource,
    DarkTheme as DarkThemeRender,
    DarkThemeSource,
    VisualTests as VisualTestsRender,
} from "./examples";

const meta = {
    title: "Components/NotificationGrouped",
    component: NotificationGrouped,
    args: { children: null },
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component:
                    "Обёртка для визуального представления группы уведомлений: добавляет два декоративных слоя под содержимым. " +
                    "Обычно содержит один Notification; содержимое и действия задаются дочернему уведомлению.",
            },
            page: () => (
                <>
                    <Title />
                    <Description />
                    <Stories />
                </>
            ),
        },
    },
} satisfies Meta<typeof NotificationGrouped>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: DefaultRender,
    parameters: {
        controls: { disable: true },
        docs: { source: { code: DefaultSource, language: "tsx" } },
    },
};

export const WithFooter: Story = {
    render: WithFooterRender,
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                story: "Действие, кнопка закрытия и время добавлены в дочерний Notification.",
            },
            source: { code: WithFooterSource, language: "tsx" },
        },
    },
};

export const DarkTheme: Story = {
    globals: { theme: "dark" },
    render: DarkThemeRender,
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                story: "ThemeProvider применяет тёмную тему к группе уведомлений внутри заданной области.",
            },
            source: { code: DarkThemeSource, language: "tsx" },
        },
    },
};

export const VisualTests: Story = {
    tags: ["!autodocs"],
    render: VisualTestsRender,
    parameters: {
        controls: { disable: true },
        docs: { canvas: { sourceState: "none" }, codePanel: false },
        testRunner: { hoverSelector: '[data-testid="notification-grouped-hover"]' },
    },
    play: async ({ canvas, userEvent }) => {
        canvas.getByTestId("notification-grouped-focus").focus();
        await userEvent.tab();
        await expect(canvas.getByRole("button", { name: "Открыть платежи" })).toHaveFocus();
    },
};
