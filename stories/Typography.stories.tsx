import React from "react";
import { StoryObj } from "@storybook/react";
import { Title } from "../src/components/Typography/Title";
import { Text } from "../src/components/Typography/Text";
import { Caption } from "../src/components/Typography/Caption";
import {
    EFontType,
    EFontWeightText,
    EFontWeightTitle,
    ELineType,
    ETextSize,
    ETitleSize,
    ECaptionSize,
} from "../src/components/Typography/enums";

export default {
    title: "Components/Typography",
    parameters: {
        docs: {
            description: {
                component: `
Компоненты типографики для отображения текста с различными размерами, весами и стилями.

## Шрифты

Компоненты Typography используют шрифты SBSansDisplay и SBSansText. Эти шрифты включены в npm-пакет и должны быть подключены в вашем проекте.

### Подключение шрифтов

Подключите шрифты в вашем CSS:

\`\`\`css
@font-face {
    font-family: 'SBSansDisplay';
    src: url('node_modules/@sberbusiness/triplex-next/public/assets/fonts/SBSansDisplay-Regular.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
}

@font-face {
    font-family: 'SBSansDisplayMedium';
    src: url('node_modules/@sberbusiness/triplex-next/public/assets/fonts/SBSansDisplay-Medium.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
}

@font-face {
    font-family: 'SBSansDisplaySemibold';
    src: url('node_modules/@sberbusiness/triplex-next/public/assets/fonts/SBSansDisplay-SemiBold.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
}

@font-face {
    font-family: 'SBSansDisplayBold';
    src: url('node_modules/@sberbusiness/triplex-next/public/assets/fonts/SBSansDisplay-Bold.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
}

@font-face {
    font-family: 'SBSansText';
    src: url('node_modules/@sberbusiness/triplex-next/public/assets/fonts/SBSansText-Regular.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
}

@font-face {
    font-family: 'SBSansTextSemibold';
    src: url('node_modules/@sberbusiness/triplex-next/public/assets/fonts/SBSansText-Semibold.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
}
\`\`\`

### Доступные шрифты

- **SBSansDisplay** - для заголовков (Title компонент)
  - Regular 
  - Medium 
  - Semibold 
  - Bold

- **SBSansText** - для основного текста и подписей (Text и Caption компоненты)
  - Regular
  - Semibold

                `,
            },
        },
    },
    tags: ["autodocs"],
};

export const TitleWithControls: StoryObj<typeof Title> = {
    render: (args) => (
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <Title {...args}>Интерактивный заголовок с controls</Title>
        </div>
    ),
    argTypes: {
        size: {
            control: { type: "select" },
            options: [ETitleSize.H1, ETitleSize.H2, ETitleSize.H3],
            description: "Размер заголовка",
            table: {
                type: { summary: "ETitleSize" },
                defaultValue: { summary: "ETitleSize.H1" },
            },
        },
        weight: {
            control: { type: "select" },
            options: [
                EFontWeightTitle.REGULAR,
                EFontWeightTitle.MEDIUM,
                EFontWeightTitle.SEMIBOLD,
                EFontWeightTitle.BOLD,
            ],
            description: "Толщина шрифта",
            table: {
                type: { summary: "EFontWeightTitle" },
                defaultValue: { summary: "EFontWeightTitle.SEMIBOLD" },
            },
        },
        type: {
            control: { type: "select" },
            options: [
                EFontType.PRIMARY,
                EFontType.SECONDARY,
                EFontType.COMPLEMENTARY,
                EFontType.TERTIARY,
                EFontType.BRAND,
                EFontType.INFO,
                EFontType.SUCCESS,
                EFontType.WARNING,
                EFontType.ERROR,
                EFontType.DISABLED,
                EFontType.SYSTEM,
            ],
            description: "Тип (цвет) текста",
            table: {
                type: { summary: "EFontType" },
                defaultValue: { summary: "EFontType.PRIMARY" },
            },
        },
        tag: {
            control: { type: "select" },
            options: ["h1", "h2", "h3", "div", "span", "p"],
            description: "HTML тег для рендера",
            table: {
                type: { summary: "string" },
                defaultValue: { summary: "h1" },
            },
        },
        underline: {
            control: { type: "boolean" },
            description: "Подчеркивание текста",
            table: {
                type: { summary: "boolean" },
                defaultValue: { summary: "false" },
            },
        },
        strikethrough: {
            control: { type: "boolean" },
            description: "Зачеркивание текста",
            table: {
                type: { summary: "boolean" },
                defaultValue: { summary: "false" },
            },
        },
        className: {
            control: { type: "text" },
            description: "Дополнительные CSS классы",
            table: {
                type: { summary: "string" },
            },
        },
    },
    args: {
        size: ETitleSize.H1,
        weight: EFontWeightTitle.SEMIBOLD,
        type: EFontType.PRIMARY,
        tag: "h1",
        underline: false,
        strikethrough: false,
        className: "",
    },
    parameters: {
        docs: {
            description: {
                story: "Интерактивная демонстрация компонента Title с возможностью изменения всех пропсов через controls панель.",
            },
        },
    },
};

export const TitleStory: StoryObj<typeof Title> = {
    render: () => (
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <Title size={ETitleSize.H1}>Заголовок H1</Title>
            <Title size={ETitleSize.H2}>Заголовок H2</Title>
            <Title size={ETitleSize.H3}>Заголовок H3</Title>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "Основные размеры заголовков: H1 (28px), H2 (24px), H3 (20px)",
            },
        },
    },
};

export const TitleWeights: StoryObj<typeof Title> = {
    render: () => (
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <Title size={ETitleSize.H2} weight={EFontWeightTitle.REGULAR}>
                Regular - Обычный вес
            </Title>
            <Title size={ETitleSize.H2} weight={EFontWeightTitle.MEDIUM}>
                Medium - Средний вес
            </Title>
            <Title size={ETitleSize.H2} weight={EFontWeightTitle.SEMIBOLD}>
                Semibold - Полужирный
            </Title>
            <Title size={ETitleSize.H2} weight={EFontWeightTitle.BOLD}>
                Bold - Жирный
            </Title>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "Различные веса шрифта для заголовков: Regular, Medium, Semibold, Bold",
            },
        },
    },
};

export const TitleTypes: StoryObj<typeof Title> = {
    render: () => (
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <Title size={ETitleSize.H2} type={EFontType.PRIMARY}>
                Primary
            </Title>
            <Title size={ETitleSize.H2} type={EFontType.COMPLEMENTARY}>
                Complementary
            </Title>
            <Title size={ETitleSize.H2} type={EFontType.SECONDARY}>
                Secondary
            </Title>
            <Title size={ETitleSize.H2} type={EFontType.TERTIARY}>
                Tertiary
            </Title>
            <Title size={ETitleSize.H2} type={EFontType.BRAND}>
                Brand
            </Title>
            <Title size={ETitleSize.H2} type={EFontType.INFO}>
                Info
            </Title>
            <Title size={ETitleSize.H2} type={EFontType.SUCCESS}>
                Success
            </Title>
            <Title size={ETitleSize.H2} type={EFontType.WARNING}>
                Warning
            </Title>
            <Title size={ETitleSize.H2} type={EFontType.ERROR}>
                Error
            </Title>
            <Title size={ETitleSize.H2} type={EFontType.DISABLED}>
                Disabled
            </Title>
            <Title size={ETitleSize.H2} type={EFontType.SYSTEM}>
                System
            </Title>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "Различные типы цветов для заголовков: Primary, Secondary, Tertiary, Brand, Info, Success, Warning, Error, Disabled",
            },
        },
    },
};

export const TextWithControls: StoryObj<typeof Text> = {
    render: (args) => (
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <Text {...args}>Интерактивный текст с controls</Text>
        </div>
    ),
    argTypes: {
        size: {
            control: { type: "select" },
            options: [ETextSize.B1, ETextSize.B2, ETextSize.B3, ETextSize.B4],
            description: "Размер текста",
            table: {
                type: { summary: "ETextSize" },
                defaultValue: { summary: "ETextSize.B2" },
            },
        },
        weight: {
            control: { type: "select" },
            options: [EFontWeightText.REGULAR, EFontWeightText.SEMIBOLD],
            description: "Толщина шрифта",
            table: {
                type: { summary: "EFontWeightText" },
                defaultValue: { summary: "EFontWeightText.REGULAR" },
            },
        },
        line: {
            control: { type: "select" },
            options: [ELineType.NORMAL, ELineType.COMPACT],
            description: "Высота блока строки (Normal = обычная, Compact = компактная)",
            table: {
                type: { summary: "ELineType" },
                defaultValue: { summary: "ELineType.NORMAL" },
            },
        },
        type: {
            control: { type: "select" },
            options: [
                EFontType.PRIMARY,
                EFontType.COMPLEMENTARY,
                EFontType.SECONDARY,
                EFontType.TERTIARY,
                EFontType.BRAND,
                EFontType.INFO,
                EFontType.SUCCESS,
                EFontType.WARNING,
                EFontType.ERROR,
                EFontType.DISABLED,
                EFontType.SYSTEM,
            ],
            description: "Тип (цвет) текста",
            table: {
                type: { summary: "EFontType" },
                defaultValue: { summary: "EFontType.PRIMARY" },
            },
        },
        tag: {
            control: { type: "select" },
            options: ["span", "div", "p", "h1", "h2", "h3"],
            description: "HTML тег для рендера",
            table: {
                type: { summary: "string" },
                defaultValue: { summary: "span" },
            },
        },
        underline: {
            control: { type: "boolean" },
            description: "Подчеркивание текста",
            table: {
                type: { summary: "boolean" },
                defaultValue: { summary: "false" },
            },
        },
        strikethrough: {
            control: { type: "boolean" },
            description: "Зачеркивание текста",
            table: {
                type: { summary: "boolean" },
                defaultValue: { summary: "false" },
            },
        },
        className: {
            control: { type: "text" },
            description: "Дополнительные CSS классы",
            table: {
                type: { summary: "string" },
            },
        },
    },
    args: {
        size: ETextSize.B2,
        weight: EFontWeightText.REGULAR,
        line: ELineType.NORMAL,
        type: EFontType.PRIMARY,
        tag: "span",
        underline: false,
        strikethrough: false,
        className: "",
    },
    parameters: {
        docs: {
            description: {
                story: "Интерактивная демонстрация компонента Text с возможностью изменения всех пропсов через controls панель. Включает control для выбора высоты строки (Normal/Compact).",
            },
        },
    },
};

export const TextStory: StoryObj<typeof Text> = {
    render: () => (
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <Text size={ETextSize.B1}>B1 - Основной текст большого размера (18px)</Text>
            <Text size={ETextSize.B2}>B2 - Основной текст среднего размера (16px)</Text>
            <Text size={ETextSize.B3}>B3 - Основной текст малого размера (14px)</Text>
            <Text size={ETextSize.B4}>B4 - Основной текст очень малого размера (12px)</Text>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "Основные размеры текста: B1 (18px), B2 (16px), B3 (14px), B4 (12px)",
            },
        },
    },
};

export const TextWeights: StoryObj<typeof Text> = {
    render: () => (
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <Text size={ETextSize.B2} weight={EFontWeightText.REGULAR}>
                Regular - Обычный вес текста
            </Text>
            <Text size={ETextSize.B2} weight={EFontWeightText.SEMIBOLD}>
                Semibold - Полужирный текст
            </Text>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "Различные веса шрифта для текста: Regular, Semibold",
            },
        },
    },
};

export const TextLineTypes: StoryObj<typeof Text> = {
    render: () => (
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <Text size={ETextSize.B3} line={ELineType.NORMAL}>
                Normal - Обычная высота строки. Этот текст демонстрирует нормальную высоту строки для лучшей читаемости.
            </Text>
            <Text size={ETextSize.B3} line={ELineType.COMPACT}>
                Compact - Компактная высота строки. Этот текст демонстрирует компактную высоту строки для экономии
                места.
            </Text>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "Различные типы высоты строки для текста: Normal (обычная), Compact (компактная)",
            },
        },
    },
};

export const TextTypes: StoryObj<typeof Text> = {
    render: () => (
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <Text size={ETextSize.B2} type={EFontType.PRIMARY}>
                Primary
            </Text>
            <Text size={ETextSize.B2} type={EFontType.COMPLEMENTARY}>
                Complementary
            </Text>
            <Text size={ETextSize.B2} type={EFontType.SECONDARY}>
                Secondary
            </Text>
            <Text size={ETextSize.B2} type={EFontType.TERTIARY}>
                Tertiary
            </Text>
            <Text size={ETextSize.B2} type={EFontType.BRAND}>
                Brand
            </Text>
            <Text size={ETextSize.B2} type={EFontType.INFO}>
                Info
            </Text>
            <Text size={ETextSize.B2} type={EFontType.SUCCESS}>
                Success
            </Text>
            <Text size={ETextSize.B2} type={EFontType.WARNING}>
                Warning
            </Text>
            <Text size={ETextSize.B2} type={EFontType.ERROR}>
                Error
            </Text>
            <Text size={ETextSize.B2} type={EFontType.DISABLED}>
                Disabled
            </Text>
            <Text size={ETextSize.B2} type={EFontType.SYSTEM}>
                System
            </Text>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "Различные типы цветов для текста: Primary, Secondary, Tertiary, Brand, Info, Success, Warning, Error, Disabled",
            },
        },
    },
};

export const CaptionWithControls: StoryObj<typeof Caption> = {
    render: (args) => (
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <Caption {...args}>Интерактивная подпись с controls</Caption>
        </div>
    ),
    argTypes: {
        size: {
            control: { type: "select" },
            options: [ECaptionSize.C1, ECaptionSize.C2, ECaptionSize.D1],
            description: "Размер подписи",
            table: {
                type: { summary: "ECaptionSize" },
                defaultValue: { summary: "ECaptionSize.C1" },
            },
        },
        weight: {
            control: { type: "select" },
            options: [EFontWeightText.REGULAR, EFontWeightText.SEMIBOLD],
            description: "Толщина шрифта",
            table: {
                type: { summary: "EFontWeightText" },
                defaultValue: { summary: "EFontWeightText.REGULAR" },
            },
        },
        type: {
            control: { type: "select" },
            options: [
                EFontType.PRIMARY,
                EFontType.COMPLEMENTARY,
                EFontType.SECONDARY,
                EFontType.TERTIARY,
                EFontType.BRAND,
                EFontType.INFO,
                EFontType.SUCCESS,
                EFontType.WARNING,
                EFontType.ERROR,
                EFontType.DISABLED,
                EFontType.SYSTEM,
            ],
            description: "Тип (цвет) текста",
            table: {
                type: { summary: "EFontType" },
                defaultValue: { summary: "EFontType.PRIMARY" },
            },
        },
        tag: {
            control: { type: "select" },
            options: ["span", "div", "p", "h1", "h2", "h3"],
            description: "HTML тег для рендера",
            table: {
                type: { summary: "string" },
                defaultValue: { summary: "span" },
            },
        },
        underline: {
            control: { type: "boolean" },
            description: "Подчеркивание текста",
            table: {
                type: { summary: "boolean" },
                defaultValue: { summary: "false" },
            },
        },
        strikethrough: {
            control: { type: "boolean" },
            description: "Зачеркивание текста",
            table: {
                type: { summary: "boolean" },
                defaultValue: { summary: "false" },
            },
        },
        className: {
            control: { type: "text" },
            description: "Дополнительные CSS классы",
            table: {
                type: { summary: "string" },
            },
        },
    },
    args: {
        size: ECaptionSize.C1,
        weight: EFontWeightText.REGULAR,
        type: EFontType.PRIMARY,
        tag: "span",
        underline: false,
        strikethrough: false,
        className: "",
    },
    parameters: {
        docs: {
            description: {
                story: "Интерактивная демонстрация компонента Caption с возможностью изменения всех пропсов через controls панель.",
            },
        },
    },
};

export const CaptionStory: StoryObj<typeof Caption> = {
    render: () => (
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <Caption size={ECaptionSize.C1}>C1 - Подпись малого размера (10px)</Caption>
            <Caption size={ECaptionSize.C2}>C2 - Подпись очень малого размера (8px)</Caption>
            <Caption size={ECaptionSize.D1}>D1 - Подпись большого размера (32px)</Caption>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "Основные размеры подписей: C1 (10px), C2 (8px), D1 (32px)",
            },
        },
    },
};

export const CaptionWeights: StoryObj<typeof Caption> = {
    render: () => (
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <Caption size={ECaptionSize.C1} weight={EFontWeightText.REGULAR}>
                Regular - Обычный вес подписи
            </Caption>
            <Caption size={ECaptionSize.C1} weight={EFontWeightText.SEMIBOLD}>
                Semibold - Полужирная подпись
            </Caption>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "Различные веса шрифта для подписей: Regular, Semibold",
            },
        },
    },
};

export const CaptionTypes: StoryObj<typeof Caption> = {
    render: () => (
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <Caption size={ECaptionSize.C1} type={EFontType.PRIMARY}>
                Primary
            </Caption>
            <Caption size={ECaptionSize.C1} type={EFontType.COMPLEMENTARY}>
                Complementary
            </Caption>
            <Caption size={ECaptionSize.C1} type={EFontType.SECONDARY}>
                Secondary
            </Caption>
            <Caption size={ECaptionSize.C1} type={EFontType.TERTIARY}>
                Tertiary
            </Caption>
            <Caption size={ECaptionSize.C1} type={EFontType.BRAND}>
                Brand
            </Caption>
            <Caption size={ECaptionSize.C1} type={EFontType.INFO}>
                Info
            </Caption>
            <Caption size={ECaptionSize.C1} type={EFontType.SUCCESS}>
                Success
            </Caption>
            <Caption size={ECaptionSize.C1} type={EFontType.WARNING}>
                Warning
            </Caption>
            <Caption size={ECaptionSize.C1} type={EFontType.ERROR}>
                Error
            </Caption>
            <Caption size={ECaptionSize.C1} type={EFontType.DISABLED}>
                Disabled
            </Caption>
            <Caption size={ECaptionSize.C1} type={EFontType.SYSTEM}>
                System
            </Caption>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "Различные типы цветов для подписей: Primary, Secondary, Tertiary, Brand, Info, Success, Warning, Error, Disabled",
            },
        },
    },
};

export const TextDecoration: StoryObj<typeof Text> = {
    render: () => (
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <Text size={ETextSize.B2}>Обычный текст без декораций</Text>
            <Text size={ETextSize.B2} underline>
                Текст с подчеркиванием
            </Text>
            <Text size={ETextSize.B2} strikethrough>
                Текст с зачеркиванием
            </Text>
            <Text size={ETextSize.B2} underline strikethrough>
                Текст с подчеркиванием и зачеркиванием
            </Text>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "Различные варианты декорации текста: без декораций, подчеркивание, зачеркивание, комбинация",
            },
        },
    },
};
