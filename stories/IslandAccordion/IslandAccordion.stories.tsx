import React, { useState } from "react";
import { IslandAccordion, IslandAccordionItem } from "../../src/components/IslandAccordion";
import { StoryObj } from "@storybook/react";
import { EComponentSize } from "../../src/enums/EComponentSize";
import { Button } from "../../src/components/Button";
import { EButtonTheme } from "../../src/components/Button/enums";
import { EIslandType } from "../../src/components/Island";
import { EStepStatus } from "../../src/components/Step";
import "./IslandAccordion.less";

export default {
    title: "Components/IslandAccordion",
    component: IslandAccordion,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component: `
Интерактивный компонент для организации контента, который позволяет пользователям раскрывать и скрывать разделы логически сгруппированной информации внутри ограниченного пространства.
                
## Особенности

- Позволяет использовать **статусы** success, wait, error, disabled, warning, с возможностью добавления подсказок при наведении курсора

## Состав

- Title — заголовок контента
- Content — основной контент
- Footer — нижняя часть
`,
            },
        },
    },
};

type IIslandAccordionStoryType = React.ComponentProps<typeof IslandAccordion> & {
    type: EIslandType;
    removable: boolean;
    disabled: boolean;
    size: EComponentSize;
    status: EStepStatus;
};

export const Playground: StoryObj<IIslandAccordionStoryType> = {
    name: "Playground",
    args: {
        size: EComponentSize.SM,
        type: EIslandType.TYPE_1,
        removable: true,
        disabled: false,
        status: EStepStatus.DEFAULT,
    },
    argTypes: {
        size: {
            control: { type: "select" },
            options: Object.values(EComponentSize),
            description: "Размер компонента",
            table: { type: { summary: "EComponentSize" }, defaultValue: { summary: EComponentSize.SM } },
        },
        type: {
            control: { type: "select" },
            options: Object.values(EIslandType),
            description: "Тип визуального оформления острова",
            table: { type: { summary: "EIslandType" }, defaultValue: { summary: EIslandType.TYPE_1 } },
        },
        status: {
            control: { type: "select" },
            options: Object.values(EStepStatus),
            description: "Статус компонента",
            table: { type: { summary: "EStepStatus" }, defaultValue: { summary: EStepStatus.DEFAULT } },
        },
        removable: {
            control: { type: "boolean" },
        },
        disabled: {
            control: { type: "boolean" },
        },
    },
    render: (args) => {
        const title = <IslandAccordionItem.Title>Title</IslandAccordionItem.Title>;

        const handleRemove = (id: string) => document!.getElementById(id)!.remove();

        return (
            <div className="island-accordion-example">
                <IslandAccordion size={args.size} type={args.type}>
                    <IslandAccordion.Item
                        id="island-accordion-item-example-playground"
                        num={1}
                        title={title}
                        disabled={args.disabled}
                        onRemove={args.removable ? handleRemove : undefined}
                        status={args.status}
                    >
                        <IslandAccordion.Item.Content>Content</IslandAccordion.Item.Content>
                        <IslandAccordion.Item.Footer>
                            <Button theme={EButtonTheme.LINK} size={EComponentSize.SM}>
                                Button link text
                            </Button>
                            <Button theme={EButtonTheme.SECONDARY} size={EComponentSize.SM}>
                                Button text
                            </Button>
                            <Button theme={EButtonTheme.GENERAL} size={EComponentSize.SM}>
                                Button text
                            </Button>
                        </IslandAccordion.Item.Footer>
                    </IslandAccordion.Item>
                </IslandAccordion>
            </div>
        );
    },
};

export const Default: StoryObj<IIslandAccordionStoryType> = {
    name: "Default",
    argTypes: {
        size: {
            table: {
                disable: true,
            },
        },
        type: {
            table: {
                disable: true,
            },
        },
    },
    render: () => {
        const title = <IslandAccordionItem.Title>Title</IslandAccordionItem.Title>;

        return (
            <div className="island-accordion-example">
                <IslandAccordion>
                    <IslandAccordion.Item id="island-accordion-item-example-default" num={1} title={title}>
                        <IslandAccordion.Item.Content>Content</IslandAccordion.Item.Content>
                        <IslandAccordion.Item.Footer>
                            <Button theme={EButtonTheme.LINK} size={EComponentSize.SM}>
                                Button link text
                            </Button>
                            <Button theme={EButtonTheme.SECONDARY} size={EComponentSize.SM}>
                                Button text
                            </Button>
                            <Button theme={EButtonTheme.GENERAL} size={EComponentSize.SM}>
                                Button text
                            </Button>
                        </IslandAccordion.Item.Footer>
                    </IslandAccordion.Item>
                </IslandAccordion>
            </div>
        );
    },
};

export const Disabled: StoryObj<IIslandAccordionStoryType> = {
    name: "Disabled",
    argTypes: {
        size: {
            table: {
                disable: true,
            },
        },
        type: {
            table: {
                disable: true,
            },
        },
    },
    render: () => {
        const title = <IslandAccordionItem.Title>Title</IslandAccordionItem.Title>;

        return (
            <div className="island-accordion-example">
                <IslandAccordion>
                    <IslandAccordion.Item id="island-accordion-item-example-disabled" num={1} title={title} disabled>
                        <IslandAccordion.Item.Content>Контент аккордеона</IslandAccordion.Item.Content>
                        <IslandAccordion.Item.Footer>
                            <Button theme={EButtonTheme.GENERAL} size={EComponentSize.SM}>
                                Button Name
                            </Button>
                        </IslandAccordion.Item.Footer>
                    </IslandAccordion.Item>
                </IslandAccordion>
            </div>
        );
    },
};

export const Removable: StoryObj<IIslandAccordionStoryType> = {
    name: "Removable",
    argTypes: {
        size: {
            table: {
                disable: true,
            },
        },
        type: {
            table: {
                disable: true,
            },
        },
    },
    render: () => {
        const title = <IslandAccordionItem.Title>Title</IslandAccordionItem.Title>;

        const handleRemove = (id: string) => document!.getElementById(id)!.remove();

        return (
            <div className="island-accordion-example">
                <IslandAccordion>
                    <IslandAccordion.Item
                        id="island-accordion-item-example-removable"
                        num={1}
                        title={title}
                        onRemove={handleRemove}
                    >
                        <IslandAccordion.Item.Content>Контент аккордеона</IslandAccordion.Item.Content>
                        <IslandAccordion.Item.Footer>
                            <Button theme={EButtonTheme.LINK} size={EComponentSize.SM}>
                                Button link text
                            </Button>
                            <Button theme={EButtonTheme.SECONDARY} size={EComponentSize.SM}>
                                Button text
                            </Button>
                            <Button theme={EButtonTheme.GENERAL} size={EComponentSize.SM}>
                                Button text
                            </Button>
                        </IslandAccordion.Item.Footer>
                    </IslandAccordion.Item>
                </IslandAccordion>
            </div>
        );
    },
};

export const WithStatus: StoryObj<IIslandAccordionStoryType> = {
    name: "With Status",
    args: {
        size: EComponentSize.SM,
    },
    argTypes: {
        size: {
            control: { type: "select" },
            options: Object.values(EComponentSize),
        },
        type: {
            table: {
                disable: true,
            },
        },
    },
    render: (args) => {
        const title = <IslandAccordionItem.Title>Title</IslandAccordionItem.Title>;

        const items = [
            {
                id: "accordion-form-item-0",
                status: EStepStatus.DEFAULT,
            },
            {
                id: "accordion-form-item-1",
                status: EStepStatus.DONE,
            },
            {
                id: "accordion-form-item-2",
                status: EStepStatus.ACTIVE,
            },
            {
                id: "accordion-form-item-3",
                status: EStepStatus.ERROR,
            },
            {
                id: "accordion-form-item-4",
                status: EStepStatus.DISABLED,
            },
            {
                id: "accordion-form-item-5",
                status: EStepStatus.WARNING,
            },
        ];

        const renderIslandAccordionItem = ({ id, status }, index: number) => (
            <IslandAccordion.Item key={id} id={id} num={index + 1} status={status} title={title}>
                <IslandAccordion.Item.Content>Content</IslandAccordion.Item.Content>
                <IslandAccordion.Item.Footer>
                    <Button theme={EButtonTheme.LINK} size={EComponentSize.SM}>
                        Button link text
                    </Button>
                    <Button theme={EButtonTheme.SECONDARY} size={EComponentSize.SM}>
                        Button text
                    </Button>
                    <Button theme={EButtonTheme.GENERAL} size={EComponentSize.SM}>
                        Button text
                    </Button>
                </IslandAccordion.Item.Footer>
            </IslandAccordion.Item>
        );

        return (
            <div className="island-accordion-example">
                <IslandAccordion size={args.size}>
                    {items.map((item, index) => renderIslandAccordionItem(item, index))}
                </IslandAccordion>
            </div>
        );
    },
};

export const WithStepHint: StoryObj<IIslandAccordionStoryType> = {
    name: "With Step Hint",
    argTypes: {
        size: {
            table: {
                disable: true,
            },
        },
        type: {
            table: {
                disable: true,
            },
        },
    },
    render: () => {
        const title = <IslandAccordionItem.Title>Title</IslandAccordionItem.Title>;

        return (
            <div className="island-accordion-example">
                <IslandAccordion>
                    {
                        <IslandAccordion.Item
                            id="island-accordion-item-with-step-hint"
                            num={1}
                            status={EStepStatus.DONE}
                            title={title}
                            stepHint="Текст подсказки."
                        >
                            <IslandAccordion.Item.Content>Content</IslandAccordion.Item.Content>
                            <IslandAccordion.Item.Footer>
                                <Button theme={EButtonTheme.LINK} size={EComponentSize.SM}>
                                    Button link text
                                </Button>
                                <Button theme={EButtonTheme.SECONDARY} size={EComponentSize.SM}>
                                    Button text
                                </Button>
                                <Button theme={EButtonTheme.GENERAL} size={EComponentSize.SM}>
                                    Button text
                                </Button>
                            </IslandAccordion.Item.Footer>
                        </IslandAccordion.Item>
                    }
                </IslandAccordion>
            </div>
        );
    },
};

export const OnlyOneOpenAtATime: StoryObj<IIslandAccordionStoryType> = {
    args: {
        size: EComponentSize.SM,
    },
    argTypes: {
        size: {
            table: {
                disable: true,
            },
        },
        type: {
            table: {
                disable: true,
            },
        },
    },
    render: (args) => {
        const [openItemId, setOpenItemId] = useState();

        const items = [
            {
                id: "accordion-form-item-0",
                status: EStepStatus.DEFAULT,
            },
            {
                id: "accordion-form-item-1",
                status: EStepStatus.DONE,
            },
            {
                id: "accordion-form-item-2",
                status: EStepStatus.ACTIVE,
            },
        ];

        const handleToggle = (open, id) => setOpenItemId(open ? id : undefined);

        const title = <IslandAccordionItem.Title>Title</IslandAccordionItem.Title>;

        const renderIslandAccordionItem = ({ id, status }, index: number) => (
            <IslandAccordion.Item
                key={id}
                id={id}
                num={index + 1}
                status={status}
                title={title}
                opened={id == openItemId}
                onToggle={handleToggle}
            >
                <IslandAccordion.Item.Content>Content</IslandAccordion.Item.Content>
                <IslandAccordion.Item.Footer>
                    <Button theme={EButtonTheme.LINK} size={EComponentSize.SM}>
                        Button link text
                    </Button>
                    <Button theme={EButtonTheme.SECONDARY} size={EComponentSize.SM}>
                        Button text
                    </Button>
                    <Button theme={EButtonTheme.GENERAL} size={EComponentSize.SM}>
                        Button text
                    </Button>
                </IslandAccordion.Item.Footer>
            </IslandAccordion.Item>
        );

        return (
            <div className="island-accordion-example">
                <IslandAccordion size={args.size}>
                    {items.map((item, index) => renderIslandAccordionItem(item, index))}
                </IslandAccordion>
            </div>
        );
    },
};
