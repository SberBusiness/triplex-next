import React, { useState } from "react";
import { IslandAccordion } from "../../src/components/IslandAccordion";
import { StoryObj } from "@storybook/react";
import { EComponentSize } from "../../src/enums/EComponentSize";
import { Button } from "../../src/components/Button";
import { EButtonTheme } from "../../src/components/Button/enums";
import { EIslandType } from "../../src/components/Island";
import { EStepStatus } from "../../src/components/Step";
import { Title, Description, Controls, Stories, Primary, ArgTypes } from "@storybook/addon-docs/blocks";
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
`,
            },
            codePanel: true,
            page: () => (
                <>
                    <Title />
                    <Description />
                    <h2>Props</h2>
                    <h3>IslandAccordion</h3>
                    <ArgTypes of={IslandAccordion} />
                    <h3>IslandAccordion.Item</h3>
                    <ArgTypes of={IslandAccordion.Item} />
                    <h2>Playground</h2>
                    <Primary />
                    <Controls of={Playground} />
                    <Stories />
                </>
            ),
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
            table: { type: { summary: "EComponentSize" }, defaultValue: { summary: EComponentSize.MD } },
        },
        type: {
            control: { type: "select" },
            options: Object.values(EIslandType),
            description: "Тип визуального оформления острова",
            table: { type: { summary: "EIslandType" }, defaultValue: { summary: EIslandType.TYPE_1 } },
        },
        status: {
            control: "select",
            if: { arg: "disabled", truthy: false },
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
    parameters: {
        controls: {
            include: ["size", "type", "status", "removable", "disabled", "title"],
        },
        docs: {
            canvas: {
                sourceState: "none",
            },
            codePanel: false,
        },
    },
    render: (args) => {
        const handleRemove = (id: string) => document!.getElementById(id)!.remove();

        return (
            <div className="island-accordion-example">
                <IslandAccordion size={args.size} type={args.type}>
                    <IslandAccordion.Item
                        id="island-accordion-item-example-playground"
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
            </div>
        );
    },
};

export const Default: StoryObj<IIslandAccordionStoryType> = {
    parameters: {
        controls: { disable: true },
    },
    render: () => {
        return (
            <div className="island-accordion-example">
                <IslandAccordion>
                    <IslandAccordion.Item id="island-accordion-item-example-default" num={1} title={"Title"}>
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
            </div>
        );
    },
};

export const Sizes: StoryObj<IIslandAccordionStoryType> = {
    parameters: {
        controls: { disable: true },
    },
    render: () => {
        return (
            <div className="island-accordion-example sizes-example">
                <IslandAccordion size={EComponentSize.SM}>
                    <IslandAccordion.Item id="island-accordion-item-example-default" num={1} title={"Title"}>
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
                <IslandAccordion size={EComponentSize.MD}>
                    <IslandAccordion.Item id="island-accordion-item-example-default" num={1} title={"Title"}>
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
                <IslandAccordion size={EComponentSize.LG}>
                    <IslandAccordion.Item id="island-accordion-item-example-default" num={1} title={"Title"}>
                        <IslandAccordion.Item.Content>Content</IslandAccordion.Item.Content>
                        <IslandAccordion.Item.Footer>
                            <Button theme={EButtonTheme.LINK} size={EComponentSize.LG}>
                                Button link text
                            </Button>
                            <Button theme={EButtonTheme.SECONDARY} size={EComponentSize.LG}>
                                Button text
                            </Button>
                            <Button theme={EButtonTheme.GENERAL} size={EComponentSize.LG}>
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
    parameters: {
        controls: { disable: true },
    },
    render: () => {
        return (
            <div className="island-accordion-example">
                <IslandAccordion>
                    <IslandAccordion.Item id="island-accordion-item-example-disabled" num={1} title={"Title"} disabled>
                        <IslandAccordion.Item.Content>Контент аккордеона</IslandAccordion.Item.Content>
                        <IslandAccordion.Item.Footer>
                            <Button theme={EButtonTheme.GENERAL} size={EComponentSize.MD}>
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
    parameters: {
        controls: { disable: true },
    },
    render: () => {
        const handleRemove = (id: string) => document!.getElementById(id)!.remove();

        return (
            <div className="island-accordion-example">
                <IslandAccordion>
                    <IslandAccordion.Item
                        id="island-accordion-item-example-removable"
                        num={1}
                        title={"Title"}
                        onRemove={handleRemove}
                    >
                        <IslandAccordion.Item.Content>Контент аккордеона</IslandAccordion.Item.Content>
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
            </div>
        );
    },
};

export const WithStatus: StoryObj<IIslandAccordionStoryType> = {
    parameters: {
        controls: { disable: true },
    },
    render: () => {
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
            <IslandAccordion.Item key={id} id={id} num={index + 1} status={status} title={"Title"}>
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
        );

        return (
            <div className="island-accordion-example">
                <IslandAccordion>{items.map((item, index) => renderIslandAccordionItem(item, index))}</IslandAccordion>
            </div>
        );
    },
};

export const WithStepHint: StoryObj<IIslandAccordionStoryType> = {
    parameters: {
        controls: { disable: true },
    },
    render: () => {
        return (
            <div className="island-accordion-example">
                <IslandAccordion>
                    {
                        <IslandAccordion.Item
                            id="island-accordion-item-with-step-hint"
                            num={1}
                            status={EStepStatus.DONE}
                            title={"Title"}
                            stepHint="Текст подсказки."
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
                    }
                </IslandAccordion>
            </div>
        );
    },
};

export const OnlyOneOpenAtATime: StoryObj<IIslandAccordionStoryType> = {
    parameters: {
        controls: { disable: true },
    },
    render: () => {
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

        const renderIslandAccordionItem = ({ id, status }, index: number) => (
            <IslandAccordion.Item
                key={id}
                id={id}
                num={index + 1}
                status={status}
                title={"Title"}
                opened={id == openItemId}
                onToggle={handleToggle}
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
        );

        return (
            <div className="island-accordion-example">
                <IslandAccordion>{items.map((item, index) => renderIslandAccordionItem(item, index))}</IslandAccordion>
            </div>
        );
    },
};
