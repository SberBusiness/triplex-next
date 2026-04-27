import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";
import {
    Title as DocsTitle,
    Description,
    Primary,
    Controls,
    Stories,
    ArgTypes,
    Heading,
    Subheading,
} from "@storybook/addon-docs/blocks";
import {
    IslandWidget,
    Button,
    ButtonIcon,
    EComponentSize,
    EButtonTheme,
    Link,
    Text,
    ETextSize,
    ETitleSize,
    Title,
    EFontType,
    DateField,
    EFormFieldStatus,
    IIslandWidgetBodyProps,
    IIslandWidgetFooterProps,
    IIslandWidgetHeaderProps,
} from "@sberbusiness/triplex-next";
import { SettingsStrokeSrvIcon20 } from "@sberbusiness/icons-next";
import {
    DefaultExample,
    DefaultExampleSource,
    WithoutFooterExample,
    WithoutFooterExampleSource,
    WithFooterAndExtraFooterExample,
    WithFooterAndExtraFooterExampleSource,
    WithoutFooterAndWithExtraFooterExample,
    WithoutFooterAndWithExtraFooterExampleSource,
    WithExtraFooterAndIslandWidgetHeightExample,
    WithExtraFooterAndIslandWidgetHeightExampleSource,
    SizesExample,
    SizesExampleSource,
} from "./examples";
import "./IslandWidget.less";

const meta = {
    title: "Components/IslandWidget",
    component: IslandWidget,
    tags: ["autodocs"],
    globals: {
        backgrounds: { value: "gray" },
    },
    parameters: {
        docs: {
            description: {
                component: `
Визуально обособленный блок, предназначенный для представления сгруппированной информации, набора связанных действий или определенной функциональности.

## Особенности

- В адаптивном режиме можно отключить сворачивание контента с помощью свойства **disableAdaptiveCollapsing**. По умолчанию контент отображается в свернутом состоянии.

## Состав

- Header — шапка контента
- Body — основной контент
- Footer — нижняя часть
- ExtraFooter — дополнительная нижняя часть
`,
            },
            codePanel: true,
            page: () => (
                <>
                    <DocsTitle />
                    <Description />
                    <Heading>Props</Heading>
                    <Subheading>IslandWidget</Subheading>
                    <ArgTypes of={IslandWidget} />
                    <Subheading>IslandWidget.ExtraFooter</Subheading>
                    <ArgTypes of={IslandWidget.ExtraFooter} />
                    <Heading>Playground</Heading>
                    <Primary />
                    <Controls of={Playground} />
                    <Stories />
                </>
            ),
        },
    },
    decorators: [
        (Story) => (
            <div className="island-widget-example">
                <Story />
            </div>
        ),
    ],
} satisfies Meta<typeof IslandWidget>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
    tags: ["!autodocs"],
    args: {
        disableAdaptiveCollapsing: false,
    },
    argTypes: {
        disableAdaptiveCollapsing: {
            control: { type: "boolean" },
            defaultValue: false,
            description: "Отключение возможности сворачивания контента в адаптиве",
        },
        renderBody: { table: { disable: true } },
        renderFooter: { table: { disable: true } },
        renderHeader: { table: { disable: true } },
    },
    parameters: {
        testRunner: { skip: true },
        controls: {
            include: ["disableAdaptiveCollapsing"],
        },
        docs: {
            canvas: {
                sourceState: "none",
            },
            codePanel: false,
        },
    },
    render: (args) => {
        const [value, setValue] = useState("");

        const renderBody = (props: IIslandWidgetBodyProps) => <IslandWidget.Body {...props}>Content</IslandWidget.Body>;

        const renderFooter = (props: IIslandWidgetFooterProps) => (
            <IslandWidget.Footer {...props}>
                <IslandWidget.Footer.Content>
                    <Text tag="div" size={ETextSize.B3} type={EFontType.SECONDARY}>
                        <Link>Link text</Link>
                    </Text>
                </IslandWidget.Footer.Content>
                <IslandWidget.Footer.Controls>
                    <Button theme={EButtonTheme.SECONDARY} size={EComponentSize.SM}>
                        Button text
                    </Button>
                    <Button theme={EButtonTheme.GENERAL} size={EComponentSize.SM}>
                        Button text
                    </Button>
                </IslandWidget.Footer.Controls>
            </IslandWidget.Footer>
        );

        const renderHeader = (props: IIslandWidgetHeaderProps) => (
            <IslandWidget.Header {...props}>
                <IslandWidget.Header.Content>
                    <Title size={ETitleSize.H3}>Title</Title>
                    <ButtonIcon>
                        <SettingsStrokeSrvIcon20 paletteIndex={5} />
                    </ButtonIcon>
                    <DateField
                        value={value}
                        onChange={setValue}
                        className="island-widget-date-field"
                        placeholderMask="дд.мм.гггг"
                        label="дд.мм.гггг"
                        invalidDateHint="Указана недоступная для выбора дата."
                        size={EComponentSize.SM}
                        status={EFormFieldStatus.DEFAULT}
                    />
                </IslandWidget.Header.Content>
                <IslandWidget.Header.Description>
                    <Text size={ETextSize.B4} type={EFontType.SECONDARY}>
                        Description
                    </Text>
                </IslandWidget.Header.Description>
            </IslandWidget.Header>
        );

        return (
            <IslandWidget {...args} renderBody={renderBody} renderFooter={renderFooter} renderHeader={renderHeader} />
        );
    },
};

export const Default: StoryObj<typeof IslandWidget> = {
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

export const Sizes: StoryObj<typeof IslandWidget> = {
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

export const WithoutFooter: StoryObj<typeof IslandWidget> = {
    name: "WithoutFooter",
    render: WithoutFooterExample,
    parameters: {
        docs: {
            controls: { disable: true },
            source: {
                code: WithoutFooterExampleSource,
                language: "tsx",
            },
        },
    },
};

export const WithFooterAndExtraFooter: StoryObj<typeof IslandWidget> = {
    name: "Example: Footer and ExtraFooter",
    render: WithFooterAndExtraFooterExample,
    parameters: {
        docs: {
            controls: { disable: true },
            source: {
                code: WithFooterAndExtraFooterExampleSource,
                language: "tsx",
            },
        },
    },
};

export const WithoutFooterAndWithExtraFooter: StoryObj<typeof IslandWidget> = {
    name: "Example: ExtraFooter without Footer",
    render: WithoutFooterAndWithExtraFooterExample,
    parameters: {
        docs: {
            controls: { disable: true },
            source: {
                code: WithoutFooterAndWithExtraFooterExampleSource,
                language: "tsx",
            },
        },
    },
};

export const WithExtraFooterAndIslandWidgetHeight: StoryObj<typeof IslandWidget> = {
    name: "Example: ExtraFooter with wrapper height",
    render: WithExtraFooterAndIslandWidgetHeightExample,
    parameters: {
        testRunner: { skip: true },
        docs: {
            controls: { disable: true },
            source: {
                code: WithExtraFooterAndIslandWidgetHeightExampleSource,
                language: "tsx",
            },
        },
    },
};
