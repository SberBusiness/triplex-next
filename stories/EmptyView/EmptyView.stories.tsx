import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Title, Description, Primary, Controls, Stories, ArgTypes, Heading } from "@storybook/addon-docs/blocks";
import { EmptyView, EEmptyViewSize, Button, EButtonTheme, EComponentSize } from "@sberbusiness/triplex-next";
import WaitgradientStsIcon96 from "@sberbusiness/icons-next/WaitgradientStsIcon96";
import WaitgradientStsIcon128 from "@sberbusiness/icons-next/WaitgradientStsIcon128";
import ServicesetupSysIcon96 from "@sberbusiness/icons-next/ServicesetupSysIcon96";
import ServicesetupSysIcon128 from "@sberbusiness/icons-next/ServicesetupSysIcon128";
import NodocumentsMrkIcon96 from "@sberbusiness/icons-next/NodocumentsMrkIcon96";
import NodocumentsMrkIcon128 from "@sberbusiness/icons-next/NodocumentsMrkIcon128";
import {
    DefaultExample,
    DefaultExampleSource,
    SizesExample,
    SizesExampleSource,
    WithoutTitleExample,
    WithoutTitleExampleSource,
    WithButtonsExample,
    WithButtonsExampleSource,
} from "./examples";

const meta = {
    title: "Components/EmptyView",
    component: EmptyView,
    parameters: {
        docs: {
            page: () => (
                <>
                    <Title />
                    <Description />
                    <Heading>Props</Heading>
                    <ArgTypes of={EmptyView} />
                    <Heading>Playground</Heading>
                    <Primary />
                    <Controls of={Playground} />
                    <Stories />
                </>
            ),
        },
    },
    tags: ["autodocs"],
} satisfies Meta<typeof EmptyView>;

export default meta;

const ICONS_SM = {
    Status: <WaitgradientStsIcon96 />,
    System: <ServicesetupSysIcon96 />,
    Marketing: <NodocumentsMrkIcon96 />,
    None: undefined,
} as const;

const ICONS_MD = {
    Status: <WaitgradientStsIcon128 />,
    System: <ServicesetupSysIcon128 />,
    Marketing: <NodocumentsMrkIcon128 />,
    None: undefined,
} as const;

type PlaygroundArgs = React.ComponentProps<typeof EmptyView> & {
    /** С кнопками. */
    withButtons: boolean;
    /** Тип иконки. */
    iconType: keyof typeof ICONS_SM;
};

export const Playground: StoryObj<PlaygroundArgs> = {
    tags: ["!autodocs"],
    args: {
        size: EEmptyViewSize.SM,
        title: "Title text",
        description: "This message provides additional context or highlights important information to note.",
        caption: "Caption",
        withButtons: true,
        iconType: "Status",
    },
    argTypes: {
        size: {
            control: { type: "select" },
            options: Object.values(EEmptyViewSize),
            description: "Размер компонента.",
            table: {
                type: { summary: "EEmptyViewSize" },
                defaultValue: { summary: "EEmptyViewSize.SM" },
            },
        },
        title: {
            control: { type: "text" },
            description: "Заголовок.",
        },
        description: {
            control: { type: "text" },
            description: "Описание.",
        },
        caption: {
            control: { type: "text" },
            description: "Подпись.",
        },
        withButtons: {
            control: "boolean",
            description: "С кнопками.",
            table: { category: "Settings" },
        },
        iconType: {
            control: { type: "select" },
            options: ["Status", "System", "Marketing", "None"],
            description: "Тип иконки.",
            table: { category: "Settings" },
        },
    },
    render: ({ withButtons, iconType, size, ...args }) => {
        const buttonSize = size === EEmptyViewSize.SM ? EComponentSize.SM : EComponentSize.MD;
        const iconsMap = size === EEmptyViewSize.SM ? ICONS_SM : ICONS_MD;

        return (
            <div style={{ maxWidth: "380px" }}>
                <EmptyView
                    size={size}
                    icon={iconsMap[iconType]}
                    buttons={
                        withButtons ? (
                            <>
                                <Button theme={EButtonTheme.SECONDARY} size={buttonSize}>
                                    Button text
                                </Button>
                                <Button theme={EButtonTheme.GENERAL} size={buttonSize}>
                                    Button text
                                </Button>
                            </>
                        ) : undefined
                    }
                    {...args}
                />
            </div>
        );
    },
    parameters: {
        testRunner: { skip: true },
        docs: {
            canvas: { sourceState: "none" },
        },
    },
};

export const Default: StoryObj<typeof EmptyView> = {
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

export const Sizes: StoryObj<typeof EmptyView> = {
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

export const WithoutTitle: StoryObj<typeof EmptyView> = {
    name: "WithoutTitle",
    render: WithoutTitleExample,
    parameters: {
        docs: {
            controls: { disable: true },
            source: {
                code: WithoutTitleExampleSource,
                language: "tsx",
            },
        },
    },
};

export const WithButtons: StoryObj<typeof EmptyView> = {
    name: "WithButtons",
    render: WithButtonsExample,
    parameters: {
        docs: {
            controls: { disable: true },
            source: {
                code: WithButtonsExampleSource,
                language: "tsx",
            },
        },
    },
};
