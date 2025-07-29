import React from "react";
import { StoryObj } from "@storybook/react";
import { Title } from "../src/components/Typography/Title";
import { Text } from "../src/components/Typography/Text";
import { Caption } from "../src/components/Typography/Caption";
import { EFontType, EFontWeightText, EFontWeightTitle, ELineType, ETextSize, ETitleSize, ECaptionSize } from "../src/components/Typography/enums";

export default {
    title: "Components/Typography",
    parameters: {
        docs: {
            description: {
                component: "Компоненты типографики для отображения текста с различными размерами, весами и стилями."
            }
        }
    },
    tags: ["autodocs"],
};

export const TitleStory: StoryObj<typeof Title> = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <Title size={ETitleSize.H1}>Заголовок H1 - Основной заголовок страницы</Title>
            <Title size={ETitleSize.H2}>Заголовок H2 - Подзаголовок раздела</Title>
            <Title size={ETitleSize.H3}>Заголовок H3 - Заголовок подраздела</Title>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "Основные размеры заголовков: H1 (28px), H2 (24px), H3 (20px)"
            }
        }
    }
};

export const TitleWeights: StoryObj<typeof Title> = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <Title size={ETitleSize.H2} weight={EFontWeightTitle.REGULAR}>Regular - Обычный вес</Title>
            <Title size={ETitleSize.H2} weight={EFontWeightTitle.MEDIUM}>Medium - Средний вес</Title>
            <Title size={ETitleSize.H2} weight={EFontWeightTitle.SEMIBOLD}>Semibold - Полужирный</Title>
            <Title size={ETitleSize.H2} weight={EFontWeightTitle.BOLD}>Bold - Жирный</Title>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "Различные веса шрифта для заголовков: Regular, Medium, Semibold, Bold"
            }
        }
    }
};

export const TitleTypes: StoryObj<typeof Title> = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <Title size={ETitleSize.H2} type={EFontType.PRIMARY}>Primary - Основной цвет</Title>
            <Title size={ETitleSize.H2} type={EFontType.SECONDARY}>Secondary - Вторичный цвет</Title>
            <Title size={ETitleSize.H2} type={EFontType.TERTIARY}>Tertiary - Третичный цвет</Title>
            <Title size={ETitleSize.H2} type={EFontType.BRAND}>Brand - Брендовый цвет</Title>
            <Title size={ETitleSize.H2} type={EFontType.INFO}>Info - Информационный цвет</Title>
            <Title size={ETitleSize.H2} type={EFontType.SUCCESS}>Success - Цвет успеха</Title>
            <Title size={ETitleSize.H2} type={EFontType.WARNING}>Warning - Цвет предупреждения</Title>
            <Title size={ETitleSize.H2} type={EFontType.ERROR}>Error - Цвет ошибки</Title>
            <Title size={ETitleSize.H2} type={EFontType.DISABLED}>Disabled - Отключенный цвет</Title>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "Различные типы цветов для заголовков: Primary, Secondary, Tertiary, Brand, Info, Success, Warning, Error, Disabled"
            }
        }
    }
};

export const TextStory: StoryObj<typeof Text> = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <Text size={ETextSize.B1}>B1 - Основной текст большого размера (18px)</Text>
            <Text size={ETextSize.B2}>B2 - Основной текст среднего размера (16px)</Text>
            <Text size={ETextSize.B3}>B3 - Основной текст малого размера (14px)</Text>
            <Text size={ETextSize.B4}>B4 - Основной текст очень малого размера (12px)</Text>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "Основные размеры текста: B1 (18px), B2 (16px), B3 (14px), B4 (12px)"
            }
        }
    }
};

export const TextWeights: StoryObj<typeof Text> = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <Text size={ETextSize.B2} weight={EFontWeightText.REGULAR}>Regular - Обычный вес текста</Text>
            <Text size={ETextSize.B2} weight={EFontWeightText.SEMIBOLD}>Semibold - Полужирный текст</Text>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "Различные веса шрифта для текста: Regular, Semibold"
            }
        }
    }
};

export const TextLineTypes: StoryObj<typeof Text> = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <Text size={ETextSize.B3} line={ELineType.NORMAL}>
                Normal - Обычная высота строки. Этот текст демонстрирует нормальную высоту строки для лучшей читаемости.
            </Text>
            <Text size={ETextSize.B3} line={ELineType.COMPACT}>
                Compact - Компактная высота строки. Этот текст демонстрирует компактную высоту строки для экономии места.
            </Text>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "Различные типы высоты строки для текста: Normal (обычная), Compact (компактная)"
            }
        }
    }
};

export const TextTypes: StoryObj<typeof Text> = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <Text size={ETextSize.B2} type={EFontType.PRIMARY}>Primary - Основной цвет текста</Text>
            <Text size={ETextSize.B2} type={EFontType.SECONDARY}>Secondary - Вторичный цвет текста</Text>
            <Text size={ETextSize.B2} type={EFontType.TERTIARY}>Tertiary - Третичный цвет текста</Text>
            <Text size={ETextSize.B2} type={EFontType.BRAND}>Brand - Брендовый цвет текста</Text>
            <Text size={ETextSize.B2} type={EFontType.INFO}>Info - Информационный цвет текста</Text>
            <Text size={ETextSize.B2} type={EFontType.SUCCESS}>Success - Цвет успеха</Text>
            <Text size={ETextSize.B2} type={EFontType.WARNING}>Warning - Цвет предупреждения</Text>
            <Text size={ETextSize.B2} type={EFontType.ERROR}>Error - Цвет ошибки</Text>
            <Text size={ETextSize.B2} type={EFontType.DISABLED}>Disabled - Отключенный цвет</Text>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "Различные типы цветов для текста: Primary, Secondary, Tertiary, Brand, Info, Success, Warning, Error, Disabled"
            }
        }
    }
};

export const CaptionStory: StoryObj<typeof Caption> = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <Caption size={ECaptionSize.C1}>C1 - Подпись малого размера (10px)</Caption>
            <Caption size={ECaptionSize.C2}>C2 - Подпись очень малого размера (8px)</Caption>
            <Caption size={ECaptionSize.D1}>D1 - Подпись большого размера (32px)</Caption>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "Основные размеры подписей: C1 (10px), C2 (8px), D1 (32px)"
            }
        }
    }
};

export const CaptionWeights: StoryObj<typeof Caption> = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <Caption size={ECaptionSize.C1} weight={EFontWeightText.REGULAR}>Regular - Обычный вес подписи</Caption>
            <Caption size={ECaptionSize.C1} weight={EFontWeightText.SEMIBOLD}>Semibold - Полужирная подпись</Caption>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "Различные веса шрифта для подписей: Regular, Semibold"
            }
        }
    }
};

export const CaptionTypes: StoryObj<typeof Caption> = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <Caption size={ECaptionSize.C1} type={EFontType.PRIMARY}>Primary - Основной цвет подписи</Caption>
            <Caption size={ECaptionSize.C1} type={EFontType.SECONDARY}>Secondary - Вторичный цвет подписи</Caption>
            <Caption size={ECaptionSize.C1} type={EFontType.TERTIARY}>Tertiary - Третичный цвет подписи</Caption>
            <Caption size={ECaptionSize.C1} type={EFontType.BRAND}>Brand - Брендовый цвет подписи</Caption>
            <Caption size={ECaptionSize.C1} type={EFontType.INFO}>Info - Информационный цвет подписи</Caption>
            <Caption size={ECaptionSize.C1} type={EFontType.SUCCESS}>Success - Цвет успеха</Caption>
            <Caption size={ECaptionSize.C1} type={EFontType.WARNING}>Warning - Цвет предупреждения</Caption>
            <Caption size={ECaptionSize.C1} type={EFontType.ERROR}>Error - Цвет ошибки</Caption>
            <Caption size={ECaptionSize.C1} type={EFontType.DISABLED}>Disabled - Отключенный цвет</Caption>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "Различные типы цветов для подписей: Primary, Secondary, Tertiary, Brand, Info, Success, Warning, Error, Disabled"
            }
        }
    }
};

export const TextDecoration: StoryObj<typeof Text> = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <Text size={ETextSize.B2}>Обычный текст без декораций</Text>
            <Text size={ETextSize.B2} underline>Текст с подчеркиванием</Text>
            <Text size={ETextSize.B2} strikethrough>Текст с зачеркиванием</Text>
            <Text size={ETextSize.B2} underline strikethrough>Текст с подчеркиванием и зачеркиванием</Text>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "Различные варианты декорации текста: без декораций, подчеркивание, зачеркивание, комбинация"
            }
        }
    }
};
