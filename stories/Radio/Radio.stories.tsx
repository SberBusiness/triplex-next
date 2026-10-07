import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { expect } from "storybook/test";
import { Title, Description, Primary, Controls, Stories, ArgTypes, Heading } from "@storybook/addon-docs/blocks";
import { Radio, EComponentSize } from "@sberbusiness/triplex-next";
import {
    Playground as PlaygroundRender,
    Default as DefaultRender,
    DefaultSource,
    DifferentSizes as DifferentSizesRender,
    DifferentSizesSource,
    XGroup as XGroupRender,
    XGroupSource,
    YGroup as YGroupRender,
    YGroupSource,
    Selected as SelectedRender,
    SelectedSource,
    Disabled as DisabledRender,
    DisabledSource,
    WithoutLabel as WithoutLabelRender,
    WithoutLabelSource,
    Controlled as ControlledRender,
    ControlledSource,
    VisualTests as VisualTestsRender,
    VisualTestsHover as VisualTestsHoverRender,
    VisualTestsCheckedHover as VisualTestsCheckedHoverRender,
} from "./examples";

const meta = {
    title: "Components/Radio",
    component: Radio,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component: `
Радио-кнопка с описанием и размерами SM, MD и LG. По умолчанию — MD.

Общий name объединяет варианты в нативную группу. defaultChecked задаёт начальный выбор, а checked вместе с onChange — контролируемый.
Без видимого описания передавайте aria-label. labelAttributes применяются к label, остальные атрибуты и ref — к input.
                `,
            },
            page: () => (
                <>
                    <Title />
                    <Description />
                    <Heading>Props</Heading>
                    <ArgTypes of={Radio} />
                    <Heading>Playground</Heading>
                    <Primary />
                    <Controls of={Playground} />
                    <Stories />
                </>
            ),
        },
    },
} satisfies Meta<typeof Radio>;

export default meta;

const PLAYGROUND_ARGS = {
    children: "Radio text",
    checked: false,
    disabled: false,
    size: EComponentSize.MD,
};

type TStory = StoryObj<typeof Radio>;

export const Playground: TStory = {
    tags: ["!autodocs"],
    args: PLAYGROUND_ARGS,
    argTypes: {
        children: {
            control: "text",
            description: "Контент лейбла радио-кнопки.",
            table: { type: { summary: "React.ReactNode" } },
        },
        checked: {
            control: "boolean",
            description: "Выбранный вариант; изменение синхронизируется с Controls.",
            table: { type: { summary: "boolean" } },
        },
        disabled: {
            control: "boolean",
            description: "Радио-кнопка недоступна для выбора.",
            table: { type: { summary: "boolean" } },
        },
        size: {
            control: "select",
            options: Object.values(EComponentSize),
            description: "Размер радио-кнопки.",
            table: {
                type: { summary: "EComponentSize" },
                defaultValue: { summary: "EComponentSize.MD" },
            },
        },
    },
    parameters: {
        controls: { include: Object.keys(PLAYGROUND_ARGS) },
        testRunner: { skip: true },
        docs: { canvas: { sourceState: "none" }, codePanel: false },
    },
    render: PlaygroundRender,
};

export const Default: TStory = {
    parameters: {
        controls: { disable: true },
        docs: { source: { code: DefaultSource, language: "tsx" } },
        // Размер MD покрыт DifferentSizes.
        testRunner: { skip: true },
    },
    render: DefaultRender,
};

export const DifferentSizes: TStory = {
    name: "Sizes",
    parameters: {
        controls: { disable: true },
        docs: { source: { code: DifferentSizesSource, language: "tsx" } },
    },
    render: DifferentSizesRender,
};

export const XGroup: TStory = {
    name: "X Group",
    parameters: {
        controls: { disable: true },
        docs: {
            description: { story: "Группа радио-кнопок с направлением по оси X." },
            source: { code: XGroupSource, language: "tsx" },
        },
        testRunner: { skip: true },
    },
    render: XGroupRender,
};

export const YGroup: TStory = {
    name: "Y Group",
    parameters: {
        controls: { disable: true },
        docs: {
            description: { story: "Группа радио-кнопок с направлением по оси Y." },
            source: { code: YGroupSource, language: "tsx" },
        },
        testRunner: { skip: true },
    },
    render: YGroupRender,
};

export const Selected: TStory = {
    parameters: {
        controls: { disable: true },
        docs: {
            description: { story: "Начальный выбор задаётся через defaultChecked." },
            source: { code: SelectedSource, language: "tsx" },
        },
        // Выбранные Radio всех размеров покрыты VisualTests; композиции групп сохраняются как пример.
        testRunner: { skip: true },
    },
    render: SelectedRender,
};

export const Disabled: TStory = {
    parameters: {
        controls: { disable: true },
        docs: { source: { code: DisabledSource, language: "tsx" } },
        // Недоступные выбранные и невыбранные Radio всех размеров покрыты VisualTests.
        testRunner: { skip: true },
    },
    render: DisabledRender,
};

export const WithoutLabel: TStory = {
    name: "Without label",
    parameters: {
        controls: { disable: true },
        docs: {
            description: { story: "Без видимого лейбла нужен доступный текст через aria-label." },
            source: { code: WithoutLabelSource, language: "tsx" },
        },
    },
    render: WithoutLabelRender,
};

export const Controlled: TStory = {
    parameters: {
        controls: { disable: true },
        docs: { source: { code: ControlledSource, language: "tsx" } },
        testRunner: { skip: true },
    },
    render: ControlledRender,
};

export const VisualTests: TStory = {
    tags: ["!autodocs"],
    parameters: {
        controls: { disable: true },
        docs: { canvas: { sourceState: "none" }, codePanel: false },
    },
    render: VisualTestsRender,
    play: async ({ canvas, userEvent }) => {
        await userEvent.tab();
        const radio = canvas.getByRole("radio", { name: "Фокус с клавиатуры" });
        await expect(radio).toHaveFocus();
        await expect(radio.matches(":focus-visible")).toBe(true);
    },
};

export const VisualTestsHover: TStory = {
    tags: ["!autodocs"],
    parameters: {
        controls: { disable: true },
        docs: { canvas: { sourceState: "none" }, codePanel: false },
        // Play отправляет события; реальный :hover для снимка включает test-runner через Playwright.
        testRunner: { hoverSelector: '[data-testid="radio-hover"]' },
    },
    render: VisualTestsHoverRender,
    play: async ({ canvas, userEvent }) => {
        await userEvent.hover(canvas.getByTestId("radio-hover"));
    },
};

export const VisualTestsCheckedHover: TStory = {
    tags: ["!autodocs"],
    parameters: {
        controls: { disable: true },
        docs: { canvas: { sourceState: "none" }, codePanel: false },
        testRunner: { hoverSelector: '[data-testid="radio-checked-hover"]' },
    },
    render: VisualTestsCheckedHoverRender,
    play: async ({ canvas, userEvent }) => {
        await userEvent.hover(canvas.getByTestId("radio-checked-hover"));
    },
};
