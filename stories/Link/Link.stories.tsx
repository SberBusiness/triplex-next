import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Title, Description, Primary, Controls, Stories, ArgTypes, Heading } from "@storybook/addon-docs/blocks";
import { Link, Text, ETextSize, EFontType } from "@sberbusiness/triplex-next";
import { DefaultExample, DefaultExampleSource, ExamplesExample, ExamplesExampleSource } from "./examples";

const meta = {
    title: "Components/Link",
    component: Link,
    parameters: {
        docs: {
            page: () => (
                <>
                    <Title />
                    <Description />
                    <Heading>Props</Heading>
                    <ArgTypes of={Link} />
                    <Heading>Playground</Heading>
                    <Primary />
                    <Controls of={Playground} />
                    <Stories />
                </>
            ),
        },
    },
    tags: ["autodocs"],
} satisfies Meta<typeof Link>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
    tags: ["!autodocs"],
    args: {
        children: "Link text",
    },
    argTypes: {
        children: {
            control: { type: "text" },
            description: "Текст ссылки",
        },
        href: {
            control: { type: "text" },
            description: "URL для перехода",
        },
        target: {
            control: { type: "select" },
            options: ["_self", "_blank", "_parent", "_top"],
            description: "Цель для открытия ссылки",
        },
        onClick: {
            action: "clicked",
            description: "Обработчик клика",
        },
        contentAfter: {
            control: false,
            description: "Функция рендера дополнительного контента после текста",
        },
    },
    parameters: {
        testRunner: { skip: true },
        controls: {
            include: ["children"],
        },
        docs: {
            canvas: { sourceState: "none" },
            codePanel: false,
        },
    },
    render: (args) => {
        const handleClick: React.MouseEventHandler<HTMLAnchorElement> = (event) => {
            args.onClick?.(event);
            event.preventDefault();
        };

        return (
            <Text size={ETextSize.B3} type={EFontType.PRIMARY}>
                <Link {...args} onClick={handleClick}>
                    {args.children}
                </Link>
            </Text>
        );
    },
};

export const Default: StoryObj<typeof Link> = {
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

export const Examples: StoryObj<typeof Link> = {
    name: "Examples",
    render: ExamplesExample,
    parameters: {
        docs: {
            controls: { disable: true },
            source: {
                code: ExamplesExampleSource,
                language: "tsx",
            },
        },
    },
};
