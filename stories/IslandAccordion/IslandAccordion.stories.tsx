import React from "react";
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

                `,
            },
        },
    },
};

type IIslandAccordionStoryType = React.ComponentProps<typeof IslandAccordion> & {
    type: EIslandType;
    removable: boolean;
    disabled: boolean;
};

export const Playground: StoryObj<IIslandAccordionStoryType> = {
    name: "Playground",
    args: {
        size: EComponentSize.SM,
        type: EIslandType.TYPE_1,
        removable: true,
        disabled: false,
    },
    argTypes: {
        size: {
            control: { type: "select" },
            options: Object.values(EComponentSize),
        },
        type: {
            control: { type: "select" },
            options: Object.values(EIslandType),
            description: "Тип визуального оформления острова",
            table: { type: { summary: "EIslandType" }, defaultValue: { summary: EIslandType.TYPE_1 } },
        },
        removable: {
            control: { type: "boolean" },
        },
        disabled: {
            control: { type: "boolean" },
        },
        onToggle: {
            table: {
                disable: true,
            },
        },
        onRemove: {
            table: {
                disable: true,
            },
        },
    },
    render: (args) => {
        const title = <IslandAccordionItem.Title>Title</IslandAccordionItem.Title>;

        const handleRemove = (id: string) => document!.getElementById(id)!.remove();

        return (
            <div className="island-accordion-example">
                <IslandAccordion size={args.size}>
                    <IslandAccordion.Item
                        id="island-accordion-item-removable"
                        title={title}
                        type={args.type}
                        disabled={args.disabled}
                        onRemove={args.removable ? handleRemove : undefined}
                    >
                        <IslandAccordion.Item.Content>Content</IslandAccordion.Item.Content>
                        <IslandAccordion.Item.Footer>
                            <div className="island-accordion-item-footer">
                                <Button theme={EButtonTheme.LINK} size={EComponentSize.SM}>
                                    Button link text
                                </Button>
                                <Button theme={EButtonTheme.SECONDARY} size={EComponentSize.SM}>
                                    Button text
                                </Button>
                                <Button theme={EButtonTheme.GENERAL} size={EComponentSize.SM}>
                                    Button text
                                </Button>
                            </div>
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
        onToggle: {
            table: {
                disable: true,
            },
        },
        onRemove: {
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
                    <IslandAccordion.Item title={title}>
                        <IslandAccordion.Item.Content>Content</IslandAccordion.Item.Content>
                        <IslandAccordion.Item.Footer>
                            <div className="island-accordion-item-footer">
                                <Button theme={EButtonTheme.LINK} size={EComponentSize.SM}>
                                    Button link text
                                </Button>
                                <Button theme={EButtonTheme.SECONDARY} size={EComponentSize.SM}>
                                    Button text
                                </Button>
                                <Button theme={EButtonTheme.GENERAL} size={EComponentSize.SM}>
                                    Button text
                                </Button>
                            </div>
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
        onToggle: {
            table: {
                disable: true,
            },
        },
        onRemove: {
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
                    <IslandAccordion.Item title={title} disabled>
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
        onToggle: {
            table: {
                disable: true,
            },
        },
        onRemove: {
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
                    <IslandAccordion.Item id="island-accordion-item-removable-1" title={title} onRemove={handleRemove}>
                        <IslandAccordion.Item.Content>Контент аккордеона</IslandAccordion.Item.Content>
                        <IslandAccordion.Item.Footer>
                            <div className="island-accordion-item-footer">
                                <Button theme={EButtonTheme.LINK} size={EComponentSize.SM}>
                                    Button link text
                                </Button>
                                <Button theme={EButtonTheme.SECONDARY} size={EComponentSize.SM}>
                                    Button text
                                </Button>
                                <Button theme={EButtonTheme.GENERAL} size={EComponentSize.SM}>
                                    Button text
                                </Button>
                            </div>
                        </IslandAccordion.Item.Footer>
                    </IslandAccordion.Item>
                </IslandAccordion>
            </div>
        );
    },
};

export const WithStatus: StoryObj<IIslandAccordionStoryType> = {
    name: "With Status",
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
        onToggle: {
            table: {
                disable: true,
            },
        },
        onRemove: {
            table: {
                disable: true,
            },
        },
    },
    render: (args) => {
        const title = <IslandAccordionItem.Title>Title</IslandAccordionItem.Title>;

        const items = [
            {
                id: "accordion-form-item-1",
                status: EStepStatus.SUCCESS,
            },
            {
                id: "accordion-form-item-2",
                status: EStepStatus.WAIT,
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

        const renderIslandAccordionItem = ({ id, status }) => (
            <IslandAccordion.Item key={id} id={id} status={status} title={title}>
                <IslandAccordion.Item.Content>Content</IslandAccordion.Item.Content>
                <IslandAccordion.Item.Footer>
                    <div className="island-accordion-item-footer">
                        <Button theme={EButtonTheme.LINK} size={EComponentSize.SM}>
                            Button link text
                        </Button>
                        <Button theme={EButtonTheme.SECONDARY} size={EComponentSize.SM}>
                            Button text
                        </Button>
                        <Button theme={EButtonTheme.GENERAL} size={EComponentSize.SM}>
                            Button text
                        </Button>
                    </div>
                </IslandAccordion.Item.Footer>
            </IslandAccordion.Item>
        );

        return (
            <div className="island-accordion-example">
                <IslandAccordion size={args.size}>
                    {items.map((item) => renderIslandAccordionItem(item))}
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
        onToggle: {
            table: {
                disable: true,
            },
        },
        onRemove: {
            table: {
                disable: true,
            },
        },
    },
    render: () => {
        const title = <IslandAccordionItem.Title>Title</IslandAccordionItem.Title>;

        const items = [
            {
                id: "accordion-form-item-1",
                status: EStepStatus.SUCCESS,
            },
            {
                id: "accordion-form-item-2",
                status: EStepStatus.WAIT,
            },
        ];

        const renderIslandAccordionItem = ({ id, status }) => (
            <IslandAccordion.Item key={id} id={id} status={status} title={title} stepHint="Текст подсказки.">
                <IslandAccordion.Item.Content>Content</IslandAccordion.Item.Content>
                <IslandAccordion.Item.Footer>
                    <div className="island-accordion-item-footer">
                        <Button theme={EButtonTheme.LINK} size={EComponentSize.SM}>
                            Button link text
                        </Button>
                        <Button theme={EButtonTheme.SECONDARY} size={EComponentSize.SM}>
                            Button text
                        </Button>
                        <Button theme={EButtonTheme.GENERAL} size={EComponentSize.SM}>
                            Button text
                        </Button>
                    </div>
                </IslandAccordion.Item.Footer>
            </IslandAccordion.Item>
        );

        return (
            <div className="island-accordion-example">
                <IslandAccordion>{items.map((item) => renderIslandAccordionItem(item))}</IslandAccordion>
            </div>
        );
    },
};
