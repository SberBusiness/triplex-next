import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
    CardStatic,
    ECardTheme,
    ECardRoundingSize,
    ECardContentPaddingSize,
    Text,
    EFontType,
    ETextSize,
    EFontWeightText,
    Link,
    Gap,
} from "@sberbusiness/triplex-next";
import {
    Title as DocsTitle,
    Description,
    Primary,
    Controls,
    Stories,
    Heading,
    ArgTypes,
} from "@storybook/addon-docs/blocks";
import {
    CardStaticDefaultExample,
    CardStaticDefaultExampleSource,
    CardStaticPaddingSizesExample,
    CardStaticPaddingSizesExampleSource,
    CardStaticRoundingSizesExample,
    CardStaticRoundingSizesExampleSource,
    CardStaticThemesExample,
    CardStaticThemesExampleSource,
} from "./examples/CardStatic";

const meta = {
    title: "Components/Cards/CardStatic",
    component: CardStatic,
    globals: {
        backgrounds: { value: "gray" },
    },
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component: `
Статичная карточка.
                `,
            },
            page: () => (
                <>
                    <DocsTitle />
                    <Description />
                    <Heading>Props</Heading>
                    <ArgTypes of={CardStatic} />
                    <Heading>Playground</Heading>
                    <Primary />
                    <Controls of={Playground} />
                    <Stories />
                </>
            ),
        },
    },
} satisfies Meta<typeof CardStatic>;

export default meta;

export const Playground: StoryObj<typeof CardStatic> = {
    tags: ["!autodocs"],
    parameters: {
        controls: {
            include: ["paddingSize", "roundingSize", "theme"],
        },
        docs: {
            canvas: {
                sourceState: "none",
            },
            codePanel: false,
        },
        testRunner: { skip: true },
    },
    argTypes: {
        paddingSize: {
            control: { type: "select" },
            options: Object.values(ECardContentPaddingSize),
            desciption: "Возможные размеры внутреннего отступа",
            table: { defaultValue: { summary: ECardContentPaddingSize.MD } },
        },
        roundingSize: {
            control: { type: "select" },
            options: Object.values(ECardRoundingSize),
            description: "Размер скругления карточки",
            table: { defaultValue: { summary: ECardRoundingSize.MD } },
        },
        theme: {
            control: { type: "select" },
            options: Object.values(ECardTheme),
            description: "Тема карточки",
            table: { defaultValue: { summary: ECardTheme.GENERAL } },
        },
    },
    args: {
        paddingSize: ECardContentPaddingSize.MD,
        roundingSize: ECardRoundingSize.MD,
        theme: ECardTheme.GENERAL,
    },
    render: (args) => {
        return (
            <div style={{ width: "216px" }}>
                <CardStatic roundingSize={args.roundingSize} theme={args.theme}>
                    <CardStatic.Content paddingSize={args.paddingSize}>
                        <CardStatic.Content.Header>
                            <Text size={ETextSize.B3}>Subtitle text</Text>
                        </CardStatic.Content.Header>
                        <CardStatic.Content.Body>
                            <Text tag="div" size={ETextSize.B3}>
                                This message provides context or highlights important information to note.
                            </Text>
                            <Gap size={8} />
                            <Text tag="div" size={ETextSize.B4} type={EFontType.SECONDARY}>
                                This message provides additional context or highlights important information to note.
                            </Text>
                            <Gap size={8} />
                            <Text tag="div" size={ETextSize.B2} weight={EFontWeightText.SEMIBOLD}>
                                1234567,00
                            </Text>
                            <Text tag="div" size={ETextSize.B4} type={EFontType.SECONDARY}>
                                Текст пояснения
                            </Text>
                            <Gap size={8} />
                            <Text tag="div" size={ETextSize.B2} weight={EFontWeightText.SEMIBOLD}>
                                1234567,00
                            </Text>
                            <Text tag="div" size={ETextSize.B4} type={EFontType.SECONDARY}>
                                Текст пояснения
                            </Text>
                            <Gap size={8} />
                            <Text tag="div" size={ETextSize.B2} weight={EFontWeightText.SEMIBOLD}>
                                1234567,00
                            </Text>
                            <Text tag="div" type={EFontType.SECONDARY} size={ETextSize.B4}>
                                Текст пояснения
                            </Text>
                            <Gap size={8} />
                            <Text tag="div" type={EFontType.PRIMARY} size={ETextSize.B4}>
                                <Link onClick={() => {}}>Link text</Link>
                            </Text>
                        </CardStatic.Content.Body>
                    </CardStatic.Content>
                </CardStatic>
            </div>
        );
    },
};

export const Default: StoryObj<typeof CardStatic> = {
    parameters: {
        controls: { disable: true },
        docs: {
            source: {
                code: CardStaticDefaultExampleSource,
                language: "tsx",
            },
        },
    },
    render: CardStaticDefaultExample,
};

export const Themes: StoryObj<typeof CardStatic> = {
    parameters: {
        controls: { disable: true },
        docs: {
            source: {
                code: CardStaticThemesExampleSource,
                language: "tsx",
            },
        },
    },
    render: CardStaticThemesExample,
};

export const PaddingSizes: StoryObj<typeof CardStatic> = {
    parameters: {
        controls: { disable: true },
        docs: {
            source: {
                code: CardStaticPaddingSizesExampleSource,
                language: "tsx",
            },
        },
    },
    render: CardStaticPaddingSizesExample,
};

export const RoundingSizes: StoryObj<typeof CardStatic> = {
    parameters: {
        controls: { disable: true },
        docs: {
            source: {
                code: CardStaticRoundingSizesExampleSource,
                language: "tsx",
            },
        },
    },
    render: CardStaticRoundingSizesExample,
};
