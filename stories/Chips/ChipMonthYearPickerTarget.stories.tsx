import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Title, Description, ArgTypes, Heading, Primary, Controls, Stories } from "@storybook/addon-docs/blocks";
import { action } from "storybook/actions";
import { expect } from "storybook/test";
import { ChipMonthYearPickerTarget, EChipType, EComponentSize } from "@sberbusiness/triplex-next";
import {
    PlaygroundRender,
    DefaultRender,
    DefaultSource,
    WithPrefixAndPostfixRender,
    WithPrefixAndPostfixSource,
    VisualTestsRender,
} from "./examples/ChipMonthYearPickerTarget";

const meta = {
    title: "Components/Chips/ChipMonthYearPickerTarget",
    component: ChipMonthYearPickerTarget,
    tags: ["autodocs"],
    args: { onClear: action("onClear") },
    parameters: {
        docs: {
            description: {
                component:
                    "Публичный чипс-таргет для renderTarget компонента DatePickerExtended. Дату, selected и текст синхронизирует потребитель. Размеры, типы и открытый календарь также показаны в ChipMonthYearPicker.",
            },
            page: () => (
                <>
                    <Title />
                    <Description />
                    <Heading>Props</Heading>
                    <ArgTypes of={ChipMonthYearPickerTarget} />
                    <Heading>Playground</Heading>
                    <Primary />
                    <Controls of={Playground} />
                    <Stories />
                </>
            ),
        },
    },
} satisfies Meta<typeof ChipMonthYearPickerTarget>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
    tags: ["!autodocs"],
    args: {
        children: "Выберите месяц",
        type: EChipType.TYPE_1,
        size: EComponentSize.MD,
        selected: false,
        disabled: false,
        showNotificationIcon: false,
        clearButtonProps: { "aria-label": "Очистить месяц" },
        onClear: action("onClear"),
        onClick: action("onClick"),
        onKeyDown: action("onKeyDown"),
    },
    argTypes: {
        children: { control: "text" },
        type: { control: "select", options: Object.values(EChipType) },
        size: { control: "select", options: Object.values(EComponentSize) },
        selected: { control: "boolean" },
        disabled: { control: "boolean" },
        showNotificationIcon: { control: "boolean" },
        clearButtonProps: { control: "object" },
    },
    parameters: {
        controls: {
            include: ["children", "type", "size", "selected", "disabled", "showNotificationIcon", "clearButtonProps"],
        },
        docs: { canvas: { sourceState: "none" }, codePanel: false },
        testRunner: { skip: true },
    },
    render: PlaygroundRender,
};

export const Default: Story = {
    render: DefaultRender,
    parameters: {
        controls: { disable: true },
        docs: { source: { code: DefaultSource, language: "tsx" } },
        testRunner: { skip: true },
    },
};

export const WithPrefixAndPostfix: Story = {
    render: WithPrefixAndPostfixRender,
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                story: "Явный postfix заменяет стрелку и кнопку очистки даже при selected. Пример оставляет выбор месяца в календаре и показывает собственную правую иконку.",
            },
            source: { code: WithPrefixAndPostfixSource, language: "tsx" },
        },
    },
};

export const VisualTests: Story = {
    tags: ["!autodocs", "!dev"],
    render: VisualTestsRender,
    parameters: {
        controls: { disable: true },
        docs: { canvas: { sourceState: "none" }, codePanel: false },
        testRunner: { hoverSelector: '[data-testid="month-target-hover"]' },
    },
    play: async ({ canvas, userEvent }) => {
        await userEvent.tab();
        await expect(canvas.getByRole("button", { name: "Фокус" })).toHaveFocus();
        await expect(canvas.getByRole("button", { name: "Очистить disabled" })).toBeDisabled();
        await expect(canvas.queryByRole("grid")).not.toBeInTheDocument();
    },
};
