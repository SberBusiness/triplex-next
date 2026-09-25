import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { ArgTypes, Controls, Description, Heading, Primary, Stories, Title } from "@storybook/addon-docs/blocks";
import { Spoiler, EComponentSize } from "@sberbusiness/triplex-next";
import {
    IPlaygroundArgs,
    Playground as PlaygroundRender,
    Default as DefaultRender,
    DefaultSource,
    DifferentSizes as DifferentSizesRender,
    DifferentSizesSource,
    WithRightBlock as WithRightBlockRender,
    WithRightBlockSource,
    Controlled as ControlledRender,
    ControlledSource,
    VisualTests as VisualTestsRender,
} from "./examples";

const meta = {
    title: "Components/Spoiler",
    component: Spoiler,
    tags: ["autodocs"],
    parameters: {
        docs: {
            page: () => (
                <>
                    <Title />
                    <Description />
                    <Heading>Props</Heading>
                    <ArgTypes of={Spoiler} />
                    <Heading>Playground</Heading>
                    <Primary />
                    <Controls of={Playground} />
                    <Stories />
                </>
            ),
        },
    },
} satisfies Meta<typeof Spoiler>;

export default meta;
type Story = StoryObj<typeof Spoiler>;

const PLAYGROUND_ARGS: IPlaygroundArgs = {
    size: EComponentSize.MD,
    labelExpand: "Развернуть",
    labelCollapse: "Свернуть",
};

export const Playground: StoryObj<IPlaygroundArgs> = {
    tags: ["!autodocs"],
    args: PLAYGROUND_ARGS,
    argTypes: {
        size: {
            control: "select",
            options: Object.values(EComponentSize),
            table: {
                category: "Props",
                type: { summary: "EComponentSize" },
                defaultValue: { summary: "EComponentSize.MD" },
            },
        },
        labelExpand: {
            control: "text",
            table: { category: "Props" },
        },
        labelCollapse: {
            control: "text",
            table: { category: "Props" },
        },
    },
    parameters: {
        controls: { include: Object.keys(PLAYGROUND_ARGS) },
        testRunner: { skip: true },
        docs: {
            canvas: { sourceState: "none" },
            codePanel: false,
        },
    },
    render: PlaygroundRender,
};

export const Default: Story = {
    name: "Default",
    render: DefaultRender,
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                story:
                    "Неконтролируемый спойлер: состояние раскрытия хранит сам компонент. " +
                    "Обязателен только `labelExpand`, но без `labelCollapse` в раскрытом состоянии у кнопки останется одна иконка.",
            },
            source: { code: DefaultSource, language: "tsx" },
        },
        // Состояние MD в свёрнутом виде уже покрыто стори Different sizes — отдельный скриншот не нужен.
        testRunner: { skip: true },
    },
};

export const DifferentSizes: Story = {
    name: "Different sizes",
    render: DifferentSizesRender,
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                story: "Размер задаёт типографику кнопки и размер иконки раскрытия: 16px для SM, 20px для MD и LG.",
            },
            source: { code: DifferentSizesSource, language: "tsx" },
        },
    },
};

export const WithRightBlock: Story = {
    name: "With right block",
    render: WithRightBlockRender,
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                story:
                    "`rightBlock` рендерится в заголовке сразу после кнопки раскрытия и вне неё, поэтому по нему нельзя " +
                    "раскрыть содержимое. Заголовок не является flex-контейнером — выравнивание блока задаёт потребитель.",
            },
            source: { code: WithRightBlockSource, language: "tsx" },
        },
    },
};

export const Controlled: Story = {
    name: "Controlled",
    render: ControlledRender,
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                story:
                    "Контролируемый режим: `expanded` задаёт состояние, `toggle` получает следующее значение. " +
                    "Сам компонент состояние не меняет — пока потребитель не обновит `expanded`, спойлер останется в прежнем виде.",
            },
            source: { code: ControlledSource, language: "tsx" },
        },
        // Визуально совпадает со стори Default — отдельный скриншот не нужен.
        testRunner: { skip: true },
    },
};

export const VisualTests: Story = {
    tags: ["!autodocs", "!dev"],
    render: VisualTestsRender,
    parameters: {
        controls: { disable: true },
        docs: {
            canvas: { sourceState: "none" },
            codePanel: false,
        },
    },
};
