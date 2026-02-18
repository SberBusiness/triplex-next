import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import {
    PercentsmallStrokeSrvIcon16,
    PercentsmallStrokeSrvIcon20,
    PercentsmallStrokeSrvIcon24,
    NewsmallFilledSrvIcon20,
} from "@sberbusiness/icons-next";
import { Title, Description, ArgTypes, Primary, Controls, Stories, Heading } from "@storybook/addon-docs/blocks";
import {
    Badge,
    Text,
    EComponentSize,
    EFontType,
    ETextSize,
    EFontWeightText,
    ECaptionSize,
    EFontWeightCaption,
    Caption,
} from "../src";
import { BadgeDot } from "../src/components/Badge/BadgeDot";

const meta = {
    title: "Components/Badge",
    component: Badge,
    parameters: {
        docs: {
            page: () => (
                <>
                    <Title />
                    <Description />
                    <Heading>Props</Heading>
                    <ArgTypes of={Badge} />
                    <Heading>Playground</Heading>
                    <Primary />
                    <Controls of={Playground} />
                    <Stories />
                </>
            ),
        },
    },
    tags: ["autodocs"],
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
    parameters: {
        docs: {
            description: { story: "Интерактивная демонстрация." },
            canvas: { sourceState: "none" },
        },
    },
    tags: ["!autodocs"],
    argTypes: {
        size: {
            control: { type: "select" },
            options: Object.values(EComponentSize),
            table: {
                type: { summary: "EComponentSize" },
            },
        },
    },
    args: {
        size: EComponentSize.LG,
        children: "",
    },
    render: (args) => <Badge {...args} />,
};

export const Default: StoryObj<typeof Badge> = {
    parameters: {
        controls: { disable: true },
        docs: {
            description: { story: "Базовый пример." },
        },
    },
    render: () => (
        <Badge size={EComponentSize.MD}>
            <Text size={ETextSize.B4} weight={EFontWeightText.REGULAR} type={EFontType.PRIMARY_INVERT}>
                Badge text
            </Text>
        </Badge>
    ),
};

export const SizesBadge: StoryObj<typeof Badge> = {
    parameters: {
        controls: { disable: true },
        docs: { description: { story: "Размеры" } },
    },
    render: () => (
        <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
            <Badge size={EComponentSize.SM}>
                <Caption size={ECaptionSize.C1} weight={EFontWeightCaption.REGULAR} type={EFontType.PRIMARY_INVERT}>
                    Badge text SM
                </Caption>
            </Badge>
            <Badge size={EComponentSize.MD}>
                <Text size={ETextSize.B4} weight={EFontWeightText.REGULAR} type={EFontType.PRIMARY_INVERT}>
                    Badge text MD
                </Text>
            </Badge>
            <Badge size={EComponentSize.LG}>
                <Text size={ETextSize.B3} weight={EFontWeightText.REGULAR} type={EFontType.PRIMARY_INVERT}>
                    Badge text LG
                </Text>
            </Badge>
        </div>
    ),
};

export const WithPrefixAndPostfix: StoryObj<typeof Badge> = {
    parameters: {
        controls: { disable: true },
        docs: {
            description: { story: "С префиксом и постфиксом." },
        },
    },
    render: () => (
        <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
            <Badge
                size={EComponentSize.SM}
                prefix={<PercentsmallStrokeSrvIcon16 paletteIndex={7} />}
                postfix={<PercentsmallStrokeSrvIcon16 paletteIndex={7} />}
            >
                <Caption size={ECaptionSize.C1} weight={EFontWeightCaption.REGULAR} type={EFontType.PRIMARY_INVERT}>
                    Badge text SM
                </Caption>
            </Badge>

            <Badge
                size={EComponentSize.MD}
                prefix={<PercentsmallStrokeSrvIcon20 paletteIndex={7} />}
                postfix={<PercentsmallStrokeSrvIcon20 paletteIndex={7} />}
            >
                <Text size={ETextSize.B4} weight={EFontWeightText.REGULAR} type={EFontType.PRIMARY_INVERT}>
                    Badge text MD
                </Text>
            </Badge>

            <Badge
                size={EComponentSize.LG}
                prefix={<PercentsmallStrokeSrvIcon24 paletteIndex={7} />}
                postfix={<PercentsmallStrokeSrvIcon24 paletteIndex={7} />}
            >
                <Text size={ETextSize.B3} weight={EFontWeightText.REGULAR} type={EFontType.PRIMARY_INVERT}>
                    Badge text LG
                </Text>
            </Badge>
        </div>
    ),
};

export const SizesBadgeDot: StoryObj<typeof BadgeDot> = {
    parameters: {
        controls: { disable: true },
        docs: { description: { story: "Размеры" } },
    },
    render: () => {
        const sizes = Object.values(EComponentSize);

        return (
            <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
                {sizes.map((size) => (
                    <Badge.Dot key={size} size={size} />
                ))}
            </div>
        );
    },
};

export const Example: StoryObj<typeof Badge> = {
    render: () => (
        <div style={{ display: "flex", gap: "16px" }}>
            <Badge size={EComponentSize.MD} prefix={<PercentsmallStrokeSrvIcon20 paletteIndex={7} />} />

            <Badge size={EComponentSize.MD} prefix={<PercentsmallStrokeSrvIcon20 paletteIndex={7} />}>
                <Text size={ETextSize.B4} weight={EFontWeightText.REGULAR} type={EFontType.PRIMARY_INVERT}>
                    Badge text
                </Text>
            </Badge>

            <Badge size={EComponentSize.MD} postfix={<PercentsmallStrokeSrvIcon20 paletteIndex={7} />}>
                <Text size={ETextSize.B4} weight={EFontWeightText.REGULAR} type={EFontType.PRIMARY_INVERT}>
                    Badge text
                </Text>
            </Badge>

            <Badge
                size={EComponentSize.MD}
                prefix={<NewsmallFilledSrvIcon20 paletteIndex={7} />}
                style={{ backgroundColor: "#1297FE" }}
            >
                <Text size={ETextSize.B4} weight={EFontWeightText.REGULAR} type={EFontType.PRIMARY_INVERT}>
                    Новинка
                </Text>
            </Badge>

            <Badge size={EComponentSize.MD} style={{ backgroundColor: "#E3FFFA" }}>
                <Text size={ETextSize.B4} weight={EFontWeightText.REGULAR} type={EFontType.BRAND}>
                    Рисков не выявлено
                </Text>
            </Badge>

            <Badge size={EComponentSize.MD} style={{ backgroundColor: "#FFF0F3" }}>
                <Text size={ETextSize.B4} weight={EFontWeightText.REGULAR} type={EFontType.ERROR}>
                    Негативные факторы
                </Text>
            </Badge>

            <Badge size={EComponentSize.MD} style={{ backgroundColor: "#FFF4DB" }}>
                <Text size={ETextSize.B4} weight={EFontWeightText.REGULAR} type={EFontType.WARNING}>
                    Обратите внимание
                </Text>
            </Badge>

            <Badge size={EComponentSize.MD} style={{ backgroundColor: "#EEF3FC" }}>
                <Text size={ETextSize.B4} weight={EFontWeightText.REGULAR} type={EFontType.SYSTEM}>
                    Нет данных
                </Text>
            </Badge>
        </div>
    ),
    parameters: {
        controls: { disable: true },
        docs: { description: { story: "Примеры использования" } },
    },
};
