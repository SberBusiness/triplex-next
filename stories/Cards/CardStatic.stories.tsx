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
    Gap,
} from "@sberbusiness/triplex-next";
import { Title as DocsTitle, Description, Primary, Controls, Stories } from "@storybook/addon-docs/blocks";
import "./Cards.less";

// TODO: Проработать это
interface ICardStaticPlaygroundProps {
    paddingSize: ECardContentPaddingSize;
    roundingSize: ECardRoundingSize;
    theme: ECardTheme;
}

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
            page: () => (
                <>
                    <DocsTitle />
                    <Description />
                    <Controls of={Default} />
                    <Primary />
                    <Stories />
                </>
            ),
        },
    },
} satisfies Meta<typeof CardStatic>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: StoryObj<ICardStaticPlaygroundProps> = {
    name: "Playground",
    parameters: {
        docs: {
            description: {
                story: "Интерактивная демонстрация Card Static. Позволяет настраивать все основные свойства компонента.",
            },
        },
        controls: {
            include: ["paddingSize", "roundingSize", "theme"],
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
    },
    args: {
        paddingSize: ECardContentPaddingSize.MD,
        roundingSize: ECardRoundingSize.MD,
        theme: ECardTheme.GENERAL,
    },
    render: function Render(args) {
        const { paddingSize, roundingSize, theme } = args as typeof args & {
            paddingSize?: ECardContentPaddingSize;
            roundingSize: ECardRoundingSize;
            theme?: ECardTheme;
        };

        const previewContainerClassName =
            theme === ECardTheme.GENERAL ? "card-static-general-playground-preview" : "card-playground-preview";

        return (
            <div className={previewContainerClassName}>
                <CardStatic roundingSize={roundingSize} theme={theme}>
                    <CardStatic.Content paddingSize={paddingSize}>
                        <CardStatic.Content.Header>
                            <Text size={ETextSize.B3}>Subtitle text</Text>
                        </CardStatic.Content.Header>
                        <CardStatic.Content.Body>
                            <Text tag="div" size={ETextSize.B3} line={ELineType.EXTRA}>
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

export const Default: Story = {
    name: "Default",
    parameters: {
        controls: { disable: true },
    },
    render: function Render() {
        return (
            <div className="card-static-general-playground-preview">
                <CardStatic roundingSize={ECardRoundingSize.MD} theme={ECardTheme.GENERAL}>
                    <CardStatic.Content paddingSize={ECardContentPaddingSize.MD}>
                        <CardStatic.Content.Header>
                            <Text size={ETextSize.B3}>Subtitle text</Text>
                        </CardStatic.Content.Header>
                        <CardStatic.Content.Body>
                            <Text tag="div" size={ETextSize.B3} line={ELineType.EXTRA}>
                                This message provides context or highlights important information to note.
                            </Text>
                        </CardStatic.Content.Body>
                    </CardStatic.Content>
                </CardStatic>
            </div>
        );
    },
};

export const General: Story = {
    name: "General",
    parameters: {
        docs: {
            description: {
                story: "Пример использования Card Static General. Скругление карточки: MD, размер внутреннего отступа контента карточки: MD.",
            },
        },
        controls: { disable: true },
    },
    render: function Render() {
        return (
            <div className="card-static-general-playground-preview">
                <CardStatic roundingSize={ECardRoundingSize.MD} theme={ECardTheme.GENERAL}>
                    <CardStatic.Content paddingSize={ECardContentPaddingSize.MD}>
                        <CardStatic.Content.Header>
                            <Text size={ETextSize.B3}>Subtitle text</Text>
                        </CardStatic.Content.Header>
                        <CardStatic.Content.Body>
                            <Text tag="div" size={ETextSize.B3} line={ELineType.EXTRA}>
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

export const Secondary: Story = {
    name: "Secondary",
    parameters: {
        docs: {
            description: {
                story: "Пример использования Card Action Secondary. Скругление карточки: MD, размер внутреннего отступа контента карточки: MD.",
            },
        },
        controls: { disable: true },
    },
    render: function Render() {
        return (
            <div className="card-playground-preview">
                <CardStatic roundingSize={ECardRoundingSize.MD} theme={ECardTheme.SECONDARY}>
                    <CardStatic.Content paddingSize={ECardContentPaddingSize.MD}>
                        <CardStatic.Content.Header>
                            <Text size={ETextSize.B3}>Subtitle text</Text>
                        </CardStatic.Content.Header>
                        <CardStatic.Content.Body>
                            <Text tag="div" size={ETextSize.B3} line={ELineType.EXTRA}>
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

export const SmallPaddingSize: Story = {
    name: "Small padding size",
    parameters: {
        docs: {
            description: {
                story: "Пример использования Card Static. Размер внутреннего отступа контента карточки: SM.",
            },
        },
        controls: { disable: true },
    },
    render: function Render() {
        return (
            <div className="card-static-general-playground-preview">
                <CardStatic roundingSize={ECardRoundingSize.MD} theme={ECardTheme.GENERAL}>
                    <CardStatic.Content paddingSize={ECardContentPaddingSize.SM}>
                        <CardStatic.Content.Header>
                            <Text size={ETextSize.B3}>Subtitle text</Text>
                        </CardStatic.Content.Header>
                        <CardStatic.Content.Body>
                            <Text tag="div" size={ETextSize.B3} line={ELineType.EXTRA}>
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

export const SmallRoundingSize: Story = {
    name: "Small rounding size",
    parameters: {
        docs: {
            description: {
                story: "Пример использования Card Action. Скругление карточки: SM.",
            },
        },
        controls: { disable: true },
    },
    render: function Render() {
        return (
            <div className="card-static-general-playground-preview">
                <CardStatic roundingSize={ECardRoundingSize.SM} theme={ECardTheme.GENERAL}>
                    <CardStatic.Content paddingSize={ECardContentPaddingSize.MD}>
                        <CardStatic.Content.Header>
                            <Text size={ETextSize.B3}>Subtitle text</Text>
                        </CardStatic.Content.Header>
                        <CardStatic.Content.Body>
                            <Text tag="div" size={ETextSize.B3} line={ELineType.EXTRA}>
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
