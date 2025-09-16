import React from "react";
import { Link } from "../src/components/Link";
import { StoryObj } from "@storybook/react";
import { Text } from "../src/components/Typography";
import { ETextSize } from "../src/components/Typography/enums";
import { EFontType } from "../src/components/Typography/enums";

const ExternalLinkStrokePrdIcon16 = () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M4 3C3.44772 3 3 3.44772 3 4V12C3 12.5523 3.44772 13 4 13H12C12.5523 13 13 12.5523 13 12V11.5C13 10.9477 13.4477 10.5 14 10.5C14.5523 10.5 15 10.9477 15 11.5V12C15 13.6569 13.6569 15 12 15H4C2.34315 15 1 13.6569 1 12V4C1 2.34315 2.34315 1 4 1H4.5C5.05228 1 5.5 1.44772 5.5 2C5.5 2.55228 5.05228 3 4.5 3H4Z"
            fill="#1358BF"
        />
        <path
            d="M7.5 2C7.5 1.44772 7.94772 1 8.5 1H13C14.1046 1 15 1.89543 15 3V7.5C15 8.05228 14.5523 8.5 14 8.5C13.4477 8.5 13 8.05228 13 7.5V4.41421L8.20711 9.20711C7.81658 9.59763 7.18342 9.59763 6.79289 9.20711C6.40237 8.81658 6.40237 8.18342 6.79289 7.79289L11.5858 3H8.5C7.94772 3 7.5 2.55228 7.5 2Z"
            fill="#1358BF"
        />
    </svg>
);

export default {
    title: "Components/Link",
    component: Link,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component: `
Гиперссылка с поддержкой дополнительного контента.

## Особенности

- **Дополнительный контент**: поддержка contentAfter для добавления иконок или другого контента
- Компонент не задает размеры или цвет текста. Контент передается с нужными компонентами Typography

## Использование

\`\`\`tsx
import { Link } from '@sberbusiness/triplex-next';
import { ExternalLinkStrokePrdIcon16 } from '@sberbusiness/icons-next';

// Простая ссылка
<Link>
    Перейти
</Link>

// External link
<Link contentAfter={() => <ExternalLinkStrokePrdIcon16 />} >
    Перейти
</Link>

\`\`\`
                `,
            },
        },
    },
    argTypes: {
        href: {
            control: { type: "text" },
            description: "URL для перехода",
        },
        target: {
            control: { type: "select" },
            options: ["_self", "_blank", "_parent", "_top"],
            description: "Цель для открытия ссылки",
        },
        children: {
            control: { type: "text" },
            description: "Текст ссылки",
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
};

export const Playground: StoryObj<typeof Link> = {
    name: "Playground",
    argTypes: {
        children: {
            control: { type: "text" },
            description: "Текст ссылки",
        },
        contentAfter: {
            table: {
                disable: true,
            },
        },
        href: {
            table: {
                disable: true,
            },
        },
        target: {
            table: {
                disable: true,
            },
        },
        onClick: {
            table: {
                disable: true,
            },
        },
    },
    render: (args) => (
        <Link {...args}>
            <Text size={ETextSize.B3} type={EFontType.PRIMARY}>
                Link text
            </Text>
        </Link>
    ),
};

export const Default: StoryObj<typeof Link> = {
    name: "Default",
    argTypes: {
        children: {
            table: {
                disable: true,
            },
        },
        contentAfter: {
            table: {
                disable: true,
            },
        },
        href: {
            table: {
                disable: true,
            },
        },
        target: {
            table: {
                disable: true,
            },
        },
        onClick: {
            table: {
                disable: true,
            },
        },
    },
    render: (args) => (
        <Link {...args} href="#">
            <Text size={ETextSize.B3} type={EFontType.PRIMARY}>
                Link text
            </Text>
        </Link>
    ),
};

export const ExternalLink: StoryObj<typeof Link> = {
    name: "External Link",
    argTypes: {
        contentAfter: {
            table: {
                disable: true,
            },
        },
        children: {
            table: {
                disable: true,
            },
        },
        href: {
            table: {
                disable: true,
            },
        },
        target: {
            table: {
                disable: true,
            },
        },
        onClick: {
            table: {
                disable: true,
            },
        },
    },
    render: (args) => {
        const renderContentAfter = () => (
            <div style={{ paddingTop: "4px" }}>
                <ExternalLinkStrokePrdIcon16 />
            </div>
        );

        return (
            <Link {...args} href="#" contentAfter={renderContentAfter}>
                <Text size={ETextSize.B3} type={EFontType.PRIMARY}>
                    Link text
                </Text>
            </Link>
        );
    },
};
