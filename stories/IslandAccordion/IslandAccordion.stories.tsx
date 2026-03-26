import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import {
    Title,
    Description,
    Controls,
    Stories,
    Primary,
    ArgTypes,
    Heading,
    Subheading,
} from "@storybook/addon-docs/blocks";
import {
    IslandAccordion,
    Button,
    EButtonTheme,
    EComponentSize,
    EIslandType,
    EStepStatus,
} from "@sberbusiness/triplex-next";
import {
    DefaultExample,
    DefaultExampleSource,
    SizesExample,
    SizesExampleSource,
    DisabledExample,
    DisabledExampleSource,
    RemovableExample,
    RemovableExampleSource,
    WithStatusExample,
    WithStatusExampleSource,
    WithStepHintExample,
    WithStepHintExampleSource,
    OnlyOneOpenAtATimeExample,
    OnlyOneOpenAtATimeExampleSource,
} from "./examples";
import "./IslandAccordion.less";

interface IIslandAccordionPlaygroundProps extends React.ComponentProps<typeof IslandAccordion> {
    type: EIslandType;
    removable: boolean;
    disabled: boolean;
    size: EComponentSize;
    status: EStepStatus;
}

const meta = {
    title: "Components/IslandAccordion",
    component: IslandAccordion,
    decorators: [
        (Story) => (
            <div className="island-accordion-wrapper">
                <div className="island-accordion-wrapper-content">
                    <Story />
                </div>
            </div>
        ),
    ],
    parameters: {
        layout: "fullscreen",
        docs: {
            description: {
                component:
                    "Интерактивный компонент для организации контента, который позволяет пользователям раскрывать и скрывать разделы логически сгруппированной информации внутри ограниченного пространства.\n\n- Позволяет использовать **статусы** success, wait, error, disabled, warning, с возможностью добавления подсказок при наведении курсора",
            },
            page: () => (
                <>
                    <Title />
                    <Description />
                    <Heading>Props</Heading>
                    <Subheading>IslandAccordion</Subheading>
                    <ArgTypes of={IslandAccordion} />
                    <Subheading>IslandAccordion.Item</Subheading>
                    <ArgTypes of={IslandAccordion.Item} />
                    <Heading>Playground</Heading>
                    <Primary />
                    <Controls of={Playground} />
                    <Stories />
                </>
            ),
        },
    },
    tags: ["autodocs"],
} satisfies Meta<typeof IslandAccordion>;

export default meta;

export const Playground: StoryObj<IIslandAccordionPlaygroundProps> = {
    tags: ["!autodocs"],
    args: {
        size: EComponentSize.MD,
        type: EIslandType.TYPE_1,
        removable: true,
        disabled: false,
        status: EStepStatus.DEFAULT,
        title: "Title",
    },
    argTypes: {
        title: {
            control: { type: "text" },
            description: "Текст заголовка",
            table: { type: { summary: "string" }, defaultValue: { summary: "Title" } },
        },
        size: {
            control: { type: "select" },
            options: Object.values(EComponentSize),
            description: "Размер компонента",
            table: {
                type: { summary: "EComponentSize" },
                defaultValue: { summary: "EComponentSize.MD" },
            },
        },
        type: {
            control: { type: "select" },
            options: Object.values(EIslandType),
            description: "Тип визуального оформления острова",
            table: {
                type: { summary: "EIslandType" },
                defaultValue: { summary: "EIslandType.TYPE_1" },
            },
        },
        status: {
            control: "select",
            if: { arg: "disabled", truthy: false },
            options: Object.values(EStepStatus),
            description: "Статус компонента",
            table: {
                type: { summary: "EStepStatus" },
                defaultValue: { summary: "EStepStatus.DEFAULT" },
            },
        },
        removable: {
            control: { type: "boolean" },
            table: { category: "Settings" },
        },
        disabled: {
            control: { type: "boolean" },
            table: { category: "Settings" },
        },
    },
    parameters: {
        testRunner: { skip: true },
        controls: {
            include: ["size", "type", "status", "removable", "disabled", "title"],
        },
        docs: {
            canvas: { sourceState: "none" },
            codePanel: false,
        },
    },
    render: (args) => {
        const handleRemove = (id: string) => document.getElementById(id)?.remove();

        return (
            <IslandAccordion size={args.size} type={args.type}>
                <IslandAccordion.Item
                    id="island-accordion-item-playground"
                    num={1}
                    title={args.title}
                    disabled={args.disabled}
                    onRemove={args.removable ? handleRemove : undefined}
                    status={args.disabled ? EStepStatus.DISABLED : args.status}
                >
                    <IslandAccordion.Item.Content>Content</IslandAccordion.Item.Content>
                    <IslandAccordion.Item.Footer>
                        <Button theme={EButtonTheme.LINK} size={EComponentSize.MD}>
                            Button link text
                        </Button>
                        <Button theme={EButtonTheme.SECONDARY} size={EComponentSize.MD}>
                            Button text
                        </Button>
                        <Button theme={EButtonTheme.GENERAL} size={EComponentSize.MD}>
                            Button text
                        </Button>
                    </IslandAccordion.Item.Footer>
                </IslandAccordion.Item>
            </IslandAccordion>
        );
    },
};

export const Default: StoryObj<typeof IslandAccordion> = {
    name: "Default",
    render: DefaultExample,
    parameters: {
        docs: {
            controls: { disable: true },
            source: {
                code: DefaultExampleSource,
                language: "tsx",
            },
        },
    },
};

export const Sizes: StoryObj<typeof IslandAccordion> = {
    name: "Sizes",
    render: SizesExample,
    parameters: {
        docs: {
            controls: { disable: true },
            source: {
                code: SizesExampleSource,
                language: "tsx",
            },
        },
    },
};

export const Disabled: StoryObj<typeof IslandAccordion> = {
    name: "Disabled",
    render: DisabledExample,
    parameters: {
        docs: {
            controls: { disable: true },
            source: {
                code: DisabledExampleSource,
                language: "tsx",
            },
        },
    },
};

export const Removable: StoryObj<typeof IslandAccordion> = {
    name: "Removable",
    render: RemovableExample,
    parameters: {
        docs: {
            controls: { disable: true },
            source: {
                code: RemovableExampleSource,
                language: "tsx",
            },
        },
    },
};

export const WithStatus: StoryObj<typeof IslandAccordion> = {
    name: "WithStatus",
    render: WithStatusExample,
    parameters: {
        docs: {
            controls: { disable: true },
            source: {
                code: WithStatusExampleSource,
                language: "tsx",
            },
        },
    },
};

export const WithStepHint: StoryObj<typeof IslandAccordion> = {
    name: "WithStepHint",
    render: WithStepHintExample,
    parameters: {
        testRunner: { skip: true },
        docs: {
            controls: { disable: true },
            source: {
                code: WithStepHintExampleSource,
                language: "tsx",
            },
        },
    },
};

export const OnlyOneOpenAtATime: StoryObj<typeof IslandAccordion> = {
    name: "OnlyOneOpenAtATime",
    render: OnlyOneOpenAtATimeExample,
    parameters: {
        testRunner: { skip: true },
        docs: {
            controls: { disable: true },
            source: {
                code: OnlyOneOpenAtATimeExampleSource,
                language: "tsx",
            },
        },
    },
};

export const VisualTests: StoryObj<typeof IslandAccordion> = {
    tags: ["!autodocs"],
    parameters: {
        controls: { disable: true },
        docs: {
            canvas: { sourceState: "none" },
            codePanel: false,
        },
    },
    render: () => (
        <IslandAccordion>
            <IslandAccordion.Item
                id="island-accordion-vt-open"
                num={1}
                title="Title"
                opened
                onRemove={(id: string) => document.getElementById(id)?.remove()}
            >
                <IslandAccordion.Item.Content>
                    Раскрытое содержимое аккордеона с контентом и кнопками в футере.
                </IslandAccordion.Item.Content>
                <IslandAccordion.Item.Footer>
                    <Button theme={EButtonTheme.LINK} size={EComponentSize.MD}>
                        Button link text
                    </Button>
                    <Button theme={EButtonTheme.SECONDARY} size={EComponentSize.MD}>
                        Button text
                    </Button>
                    <Button theme={EButtonTheme.GENERAL} size={EComponentSize.MD}>
                        Button text
                    </Button>
                </IslandAccordion.Item.Footer>
            </IslandAccordion.Item>
            <IslandAccordion.Item id="island-accordion-vt-closed" num={2} title="Title (collapsed)">
                <IslandAccordion.Item.Content>Content</IslandAccordion.Item.Content>
            </IslandAccordion.Item>
        </IslandAccordion>
    ),
};
