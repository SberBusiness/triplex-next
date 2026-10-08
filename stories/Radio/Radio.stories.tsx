import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { expect } from "storybook/test";
import { Title, Description, Primary, Controls, Stories, ArgTypes, Heading } from "@storybook/addon-docs/blocks";
import { Radio, EComponentSize } from "@sberbusiness/triplex-next";
import {
    Playground as PlaygroundRender,
    Default as DefaultRender,
    DefaultSource,
    Sizes as SizesRender,
    SizesSource,
    States as StatesRender,
    StatesSource,
    WithoutLabel as WithoutLabelRender,
    WithoutLabelSource,
    VisualTests as VisualTestsRender,
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

Компоновка вариантов в группы — см. RadioXGroup и RadioYGroup.
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
        // Размер MD покрыт Sizes.
        testRunner: { skip: true },
    },
    render: DefaultRender,
};

export const Sizes: TStory = {
    parameters: {
        controls: { disable: true },
        docs: { source: { code: SizesSource, language: "tsx" } },
    },
    render: SizesRender,
};

export const States: TStory = {
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                story: "Выбор задаётся через checked и onChange (или defaultChecked), недоступность — через disabled. Radio одной группы связываются общим name.",
            },
            source: { code: StatesSource, language: "tsx" },
        },
    },
    render: StatesRender,
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

export const VisualTests: TStory = {
    tags: ["!autodocs", "!dev"],
    parameters: {
        controls: { disable: true },
        docs: { canvas: { sourceState: "none" }, codePanel: false },
        // Play отправляет synthetic events; реальный :hover для снимка включает test-runner через Playwright.
        testRunner: { hoverSelector: '[data-testid="radio-hover-unchecked"]' },
    },
    render: VisualTestsRender,
    play: async ({ canvas, userEvent }) => {
        const radio = canvas.getByTestId("radio-focus");

        await userEvent.tab();
        await expect(radio).toHaveFocus();
        await expect(radio.matches(":focus-visible")).toBe(true);
    },
};

export const VisualTestsCheckedHover: TStory = {
    tags: ["!autodocs", "!dev"],
    parameters: {
        controls: { disable: true },
        docs: { canvas: { sourceState: "none" }, codePanel: false },
        testRunner: { hoverSelector: '[data-testid="radio-hover-checked"]' },
    },
    render: VisualTestsRender,
};
