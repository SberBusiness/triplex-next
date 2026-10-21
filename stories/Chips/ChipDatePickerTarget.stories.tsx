import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Title, Description, ArgTypes, Heading, Primary, Controls, Stories } from "@storybook/addon-docs/blocks";
import { action } from "storybook/actions";
import { ChipDatePickerTarget, EChipType, EComponentSize } from "@sberbusiness/triplex-next";
import {
    PlaygroundRender,
    DefaultRender,
    DefaultSource,
    WithPrefixAndPostfixRender,
    WithPrefixAndPostfixSource,
    VisualTestsRender,
} from "./examples/ChipDatePickerTarget";

const meta = {
    title: "Components/Chips/ChipDatePickerTarget",
    component: ChipDatePickerTarget,
    args: { onClear: action("onClear") },
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component:
                    "Публичный target для DatePickerExtended.renderTarget. Выбор даты хранит потребитель; готовый фильтр — ChipDatePicker.",
            },
            page: () => (
                <>
                    <Title />
                    <Description />
                    <Heading>Props</Heading>
                    <ArgTypes of={ChipDatePickerTarget} />
                    <Heading>Playground</Heading>
                    <Primary />
                    <Controls of={Playground} />
                    <Stories />
                </>
            ),
        },
    },
} satisfies Meta<typeof ChipDatePickerTarget>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
    tags: ["!autodocs"],
    args: {
        children: "Выберите дату",
        type: EChipType.TYPE_1,
        size: EComponentSize.MD,
        selected: false,
        disabled: false,
        showNotificationIcon: false,
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
    },
    parameters: {
        controls: { include: ["children", "type", "size", "selected", "disabled", "showNotificationIcon"] },
        testRunner: { skip: true },
        docs: { canvas: { sourceState: "none" }, codePanel: false },
    },
    render: PlaygroundRender,
};

export const Default: Story = {
    render: DefaultRender,
    parameters: {
        controls: { disable: true },
        testRunner: { skip: true },
        docs: { source: { code: DefaultSource, language: "tsx" } },
    },
};

export const WithPrefixAndPostfix: Story = {
    render: WithPrefixAndPostfixRender,
    parameters: {
        controls: { disable: true },
        docs: { source: { code: WithPrefixAndPostfixSource, language: "tsx" } },
    },
};

export const VisualTests: Story = {
    tags: ["!autodocs", "!dev"],
    render: VisualTestsRender,
    parameters: {
        controls: { disable: true },
        testRunner: { hoverSelector: '[data-testid="hover-target"]' },
        docs: { canvas: { sourceState: "none" }, codePanel: false },
    },
    play: async ({ canvasElement, canvas, userEvent }) => {
        await userEvent.click(canvasElement);
        await userEvent.tab();

        if (canvasElement.ownerDocument.activeElement !== canvas.getByTestId("focus-target")) {
            throw new Error("ChipDatePickerTarget must receive keyboard focus");
        }
    },
};
