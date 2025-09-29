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
    ELineType,
    EFontWeightText,
    Link,
} from "@sberbusiness/triplex-next";

const CONTAINER_WIDTH = 232;

const meta = {
    title: "Components/Cards/CardStatic",
    component: CardStatic,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component: `
Статичная карточка. Поддерживает темы и размеры скругления. Контент собирается из Media и Content.

## Особенности

- **Темы**: General, Secondary
- **Размеры внутреннего отступа**: small (SM), medium (MD)
- **Размеры скругления карточки**: small (SM), medium (MD)
- **Состояния**: selected

## Использование

\`\`\`tsx
import { CardAction, ECardTheme, ECardRoundingSize, ECardContentPaddingSize } from '@sberbusiness/triplex-next';

<CardStatic
    roundingSize={ECardRoundingSize.MD}
    theme={ECardTheme.GENERAL}
    style={{ width: "232px" }}
>
    <CardStatic.Content paddingSize={ECardContentPaddingSize.MD}>
        <CardStatic.Content.Header>
            Subtitle text
        </CardStatic.Content.Header>
        <CardStatic.Content.Body>
            Body content
        </CardStatic.Content.Body>
    </CardStatic.Content>
</CardStatic>
\`\`\`
                `,
            },
        },
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
        className: { table: { disable: true } },
        children: { table: { disable: true } },
    },
} satisfies Meta<typeof CardStatic>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    name: "General",
    args: {
        paddingSize: ECardContentPaddingSize.MD,
        roundingSize: ECardRoundingSize.MD,
        theme: ECardTheme.GENERAL,
    },
    render: (args) => {
        const { paddingSize, ...cardArgs } = args as typeof args & {
            paddingSize?: ECardContentPaddingSize;
        };

        return (
            <CardStatic {...cardArgs} style={{ width: CONTAINER_WIDTH }}>
                <CardStatic.Content paddingSize={paddingSize ?? ECardContentPaddingSize.MD}>
                    <CardStatic.Content.Header>
                        <Text size={ETextSize.B3}>Subtitle text</Text>
                    </CardStatic.Content.Header>
                    <CardStatic.Content.Body>
                        <Text tag="div" size={ETextSize.B3} line={ELineType.EXTRA}>
                            This message provides context or highlights important information to note.
                        </Text>
                        <Text tag="div" type={EFontType.SECONDARY} size={ETextSize.B3} style={{ marginTop: "8px" }}>
                            This message provides additional context or highlights important information to note.
                        </Text>
                        <div style={{ marginTop: "8px", lineHeight: "100%" }}>
                            <Text tag="div" size={ETextSize.B2} weight={EFontWeightText.SEMIBOLD}>
                                1234567,00
                            </Text>
                            <Text tag="div" type={EFontType.SECONDARY} size={ETextSize.B4}>
                                Текст пояснения
                            </Text>
                        </div>
                        <div style={{ marginTop: "8px", lineHeight: "100%" }}>
                            <Text tag="div" size={ETextSize.B2} weight={EFontWeightText.SEMIBOLD}>
                                1234567,00
                            </Text>
                            <Text tag="div" type={EFontType.SECONDARY} size={ETextSize.B4}>
                                Текст пояснения
                            </Text>
                        </div>
                        <div style={{ marginTop: "8px", lineHeight: "100%" }}>
                            <Text tag="div" size={ETextSize.B2} weight={EFontWeightText.SEMIBOLD}>
                                1234567,00
                            </Text>
                            <Text tag="div" type={EFontType.SECONDARY} size={ETextSize.B4}>
                                Текст пояснения
                            </Text>
                        </div>

                        <div style={{ marginTop: "8px", lineHeight: "100%" }}>
                            <Text tag="div" type={EFontType.PRIMARY} size={ETextSize.B4}>
                                <Link onClick={() => {}}>Link text</Link>
                            </Text>
                        </div>
                    </CardStatic.Content.Body>
                </CardStatic.Content>
            </CardStatic>
        );
    },
};

export const Secondary: Story = {
    name: "Secondary",
    args: {
        roundingSize: ECardRoundingSize.MD,
        theme: ECardTheme.SECONDARY,
    },
    render: (args) => {
        const { paddingSize, ...cardArgs } = args as typeof args & {
            paddingSize?: ECardContentPaddingSize;
        };

        return (
            <CardStatic {...cardArgs} style={{ width: CONTAINER_WIDTH }}>
                <CardStatic.Content paddingSize={paddingSize ?? ECardContentPaddingSize.MD}>
                    <CardStatic.Content.Header>
                        <Text size={ETextSize.B3}>Subtitle text</Text>
                    </CardStatic.Content.Header>
                    <CardStatic.Content.Body>
                        <Text tag="div" size={ETextSize.B3} line={ELineType.EXTRA}>
                            This message provides context or highlights important information to note.
                        </Text>
                        <Text tag="div" type={EFontType.SECONDARY} size={ETextSize.B3} style={{ marginTop: "8px" }}>
                            This message provides additional context or highlights important information to note.
                        </Text>
                        <div style={{ marginTop: "8px", lineHeight: "100%" }}>
                            <Text tag="div" size={ETextSize.B2} weight={EFontWeightText.SEMIBOLD}>
                                1234567,00
                            </Text>
                            <Text tag="div" type={EFontType.SECONDARY} size={ETextSize.B4}>
                                Текст пояснения
                            </Text>
                        </div>
                        <div style={{ marginTop: "8px", lineHeight: "100%" }}>
                            <Text tag="div" size={ETextSize.B2} weight={EFontWeightText.SEMIBOLD}>
                                1234567,00
                            </Text>
                            <Text tag="div" type={EFontType.SECONDARY} size={ETextSize.B4}>
                                Текст пояснения
                            </Text>
                        </div>
                        <div style={{ marginTop: "8px", lineHeight: "100%" }}>
                            <Text tag="div" size={ETextSize.B2} weight={EFontWeightText.SEMIBOLD}>
                                1234567,00
                            </Text>
                            <Text tag="div" type={EFontType.SECONDARY} size={ETextSize.B4}>
                                Текст пояснения
                            </Text>
                        </div>

                        <div style={{ marginTop: "8px", lineHeight: "100%" }}>
                            <Text tag="div" type={EFontType.PRIMARY} size={ETextSize.B4}>
                                <Link onClick={() => {}}>Link text</Link>
                            </Text>
                        </div>
                    </CardStatic.Content.Body>
                </CardStatic.Content>
            </CardStatic>
        );
    },
};

export const SmallPaddingSize: Story = {
    name: "Small padding size",
    args: {
        roundingSize: ECardRoundingSize.MD,
        theme: ECardTheme.GENERAL,
    },
    render: (args) => (
        <CardStatic {...args} style={{ width: CONTAINER_WIDTH }}>
            <CardStatic.Content paddingSize={ECardContentPaddingSize.SM}>
                <CardStatic.Content.Header>
                    <Text size={ETextSize.B3}>Subtitle text</Text>
                </CardStatic.Content.Header>
                <CardStatic.Content.Body>
                    <Text tag="div" size={ETextSize.B3} line={ELineType.EXTRA}>
                        This message provides context or highlights important information to note.
                    </Text>
                    <Text tag="div" type={EFontType.SECONDARY} size={ETextSize.B3} style={{ marginTop: "8px" }}>
                        This message provides additional context or highlights important information to note.
                    </Text>
                    <div style={{ marginTop: "8px", lineHeight: "100%" }}>
                        <Text tag="div" size={ETextSize.B2} weight={EFontWeightText.SEMIBOLD}>
                            1234567,00
                        </Text>
                        <Text tag="div" type={EFontType.SECONDARY} size={ETextSize.B4}>
                            Текст пояснения
                        </Text>
                    </div>
                    <div style={{ marginTop: "8px", lineHeight: "100%" }}>
                        <Text tag="div" size={ETextSize.B2} weight={EFontWeightText.SEMIBOLD}>
                            1234567,00
                        </Text>
                        <Text tag="div" type={EFontType.SECONDARY} size={ETextSize.B4}>
                            Текст пояснения
                        </Text>
                    </div>
                    <div style={{ marginTop: "8px", lineHeight: "100%" }}>
                        <Text tag="div" size={ETextSize.B2} weight={EFontWeightText.SEMIBOLD}>
                            1234567,00
                        </Text>
                        <Text tag="div" type={EFontType.SECONDARY} size={ETextSize.B4}>
                            Текст пояснения
                        </Text>
                    </div>

                    <div style={{ marginTop: "8px", lineHeight: "100%" }}>
                        <Text tag="div" type={EFontType.PRIMARY} size={ETextSize.B4}>
                            <Link onClick={() => {}}>Link text</Link>
                        </Text>
                    </div>
                </CardStatic.Content.Body>
            </CardStatic.Content>
        </CardStatic>
    ),
};

export const SmallRoundingSize: Story = {
    name: "Small rounding size",
    args: {
        roundingSize: ECardRoundingSize.SM,
        theme: ECardTheme.GENERAL,
    },
    render: (args) => (
        <CardStatic {...args} style={{ width: CONTAINER_WIDTH }}>
            <CardStatic.Content paddingSize={ECardContentPaddingSize.MD}>
                <CardStatic.Content.Header>
                    <Text size={ETextSize.B3}>Subtitle text</Text>
                </CardStatic.Content.Header>
                <CardStatic.Content.Body>
                    <Text tag="div" size={ETextSize.B3} line={ELineType.EXTRA}>
                        This message provides context or highlights important information to note.
                    </Text>
                    <Text tag="div" type={EFontType.SECONDARY} size={ETextSize.B3} style={{ marginTop: "8px" }}>
                        This message provides additional context or highlights important information to note.
                    </Text>
                    <div style={{ marginTop: "8px", lineHeight: "100%" }}>
                        <Text tag="div" size={ETextSize.B2} weight={EFontWeightText.SEMIBOLD}>
                            1234567,00
                        </Text>
                        <Text tag="div" type={EFontType.SECONDARY} size={ETextSize.B4}>
                            Текст пояснения
                        </Text>
                    </div>
                    <div style={{ marginTop: "8px", lineHeight: "100%" }}>
                        <Text tag="div" size={ETextSize.B2} weight={EFontWeightText.SEMIBOLD}>
                            1234567,00
                        </Text>
                        <Text tag="div" type={EFontType.SECONDARY} size={ETextSize.B4}>
                            Текст пояснения
                        </Text>
                    </div>
                    <div style={{ marginTop: "8px", lineHeight: "100%" }}>
                        <Text tag="div" size={ETextSize.B2} weight={EFontWeightText.SEMIBOLD}>
                            1234567,00
                        </Text>
                        <Text tag="div" type={EFontType.SECONDARY} size={ETextSize.B4}>
                            Текст пояснения
                        </Text>
                    </div>

                    <div style={{ marginTop: "8px", lineHeight: "100%" }}>
                        <Text tag="div" type={EFontType.PRIMARY} size={ETextSize.B4}>
                            <Link onClick={() => {}}>Link text</Link>
                        </Text>
                    </div>
                </CardStatic.Content.Body>
            </CardStatic.Content>
        </CardStatic>
    ),
};
