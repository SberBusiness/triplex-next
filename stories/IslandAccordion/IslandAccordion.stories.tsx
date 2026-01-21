import React, { useState } from "react";
import { IslandAccordion } from "../../src/components/IslandAccordion";
import { StoryObj } from "@storybook/react";
import { EComponentSize } from "../../src/enums/EComponentSize";
import { Button } from "../../src/components/Button";
import { EButtonTheme } from "../../src/components/Button/enums";
import { EIslandType } from "../../src/components/Island";
import { EStepStatus } from "../../src/components/Step";
import { Title as DocsTitle, Description, Controls, Stories, Primary, ArgTypes } from "@storybook/addon-docs/blocks";
import { EFontType, ETitleSize, Title } from "../../src/components/Typography";
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
                    <DocsTitle />
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

const sizeToTitleSizeMap = {
    [EComponentSize.SM]: ETitleSize.H3,
    [EComponentSize.MD]: ETitleSize.H2,
    [EComponentSize.LG]: ETitleSize.H2,
};

export const Playground: StoryObj<IIslandAccordionStoryType> = {
    name: "Playground",
    tags: ["!autodocs"],
    args: {
        size: EComponentSize.SM,
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
            table: { type: { summary: "EComponentSize" }, defaultValue: { summary: EComponentSize.SM } },
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
        const titleType = args.disabled ? EFontType.DISABLED : EFontType.PRIMARY;
        const title = (
            <Title size={sizeToTitleSizeMap[args.size]} type={titleType}>
                {args.title}
            </Title>
        );

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
                        status={args.disabled ? EStepStatus.DISABLED : args.status}
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
    parameters: {
        controls: { disable: true },
    },
    render: () => {
        const title = (
            <Title size={ETitleSize.H2} type={EFontType.PRIMARY}>
                Title
            </Title>
        );

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
    parameters: {
        controls: { disable: true },
    },
    render: () => {
        const title = (
            <Title size={ETitleSize.H2} type={EFontType.DISABLED}>
                Title
            </Title>
        );

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
    parameters: {
        controls: { disable: true },
    },
    render: () => {
        const title = (
            <Title size={ETitleSize.H2} type={EFontType.PRIMARY}>
                Title
            </Title>
        );

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
    parameters: {
        controls: { disable: true },
    },
    render: () => {
        const title = (
            <Title size={ETitleSize.H2} type={EFontType.PRIMARY}>
                Title
            </Title>
        );

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
                <IslandAccordion>{items.map((item, index) => renderIslandAccordionItem(item, index))}</IslandAccordion>
            </div>
        );
    },
};

export const WithStepHint: StoryObj<IIslandAccordionStoryType> = {
    name: "With Step Hint",
    parameters: {
        controls: { disable: true },
    },
    render: () => {
        const title = (
            <Title size={ETitleSize.H2} type={EFontType.PRIMARY}>
                Title
            </Title>
        );

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
    name: "Only One Open At A Time",
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

        const title = (
            <Title size={ETitleSize.H2} type={EFontType.PRIMARY}>
                Title
            </Title>
        );

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
                <IslandAccordion>{items.map((item, index) => renderIslandAccordionItem(item, index))}</IslandAccordion>
            </div>
        );
    },
};
