import React from "react";
import { Link } from "../src/components/Link";
import { StoryObj } from "@storybook/react";
import { Text } from "../src/components/Typography";
import { ETextSize } from "../src/components/Typography/enums";
import { EFontType } from "../src/components/Typography/enums";
import { Col } from "../src/components/Col";
import { Gap } from "../src/components/Gap";
import { LinkStrokeSrvIcon16 } from "@sberbusiness/icons-next";
import { Title, Description, Primary, Controls, Stories, ArgTypes } from "@storybook/addon-docs/blocks";

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

- **Дополнительный контент**: поддержка contentAfter и contentBefore для добавления иконок или другого контента до или после ссылки
- Компонент задает только цвет текста ссылки

                `,
            },
            page: () => (
                <>
                    <Title />
                    <Description />
                    <h2>Props</h2>
                    <ArgTypes of={Link} />
                    <h2>Playground</h2>
                    <Primary />
                    <Controls of={Playground} />
                    <Stories />
                </>
            ),
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
    tags: ["!autodocs"],
    args: {
        children: "Link text",
    },
    argTypes: {
        children: {
            control: { type: "text" },
            description: "Текст ссылки",
        },
    },
    parameters: {
        controls: {
            include: ["children"],
        },
        docs: {
            canvas: {
                sourceState: "none",
            },
            codePanel: false,
        },
    },
    render: (args) => (
        <Text size={ETextSize.B3} type={EFontType.PRIMARY}>
            <Link {...args} onClick={(event) => event.preventDefault()}>
                {args.children}
            </Link>
        </Text>
    ),
};

export const Default: StoryObj<typeof Link> = {
    name: "Default",
    parameters: {
        controls: { disable: true },
    },
    render: () => (
        <Text size={ETextSize.B3} type={EFontType.PRIMARY}>
            <Link href="#" onClick={(event) => event.preventDefault()}>
                Link text
            </Link>
        </Text>
    ),
};

export const ExternalLink: StoryObj<typeof Link> = {
    name: "External Link",
    parameters: {
        controls: { disable: true },
    },
    render: () => {
        const renderContentAfter = () => (
            <div style={{ paddingTop: "4px" }}>
                <LinkStrokeSrvIcon16 paletteIndex={0} />
            </div>
        );

        const renderContentBefore = () => (
            <div style={{ paddingTop: "4px" }}>
                <LinkStrokeSrvIcon16 paletteIndex={0} />
            </div>
        );

        return (
            <Col size={6}>
                <Text size={ETextSize.B3} type={EFontType.PRIMARY}>
                    <Link href="#" contentAfter={renderContentAfter} onClick={(event) => event.preventDefault()}>
                        External link with content after
                    </Link>
                </Text>
                <Gap size={16} />
                <Text size={ETextSize.B3} type={EFontType.PRIMARY}>
                    <Link href="#" contentBefore={renderContentBefore} onClick={(event) => event.preventDefault()}>
                        External link with content before
                    </Link>
                </Text>
                <Gap size={16} />
                <Text size={ETextSize.B3} type={EFontType.PRIMARY}>
                    <Link
                        href="#"
                        contentBefore={renderContentBefore}
                        contentAfter={renderContentAfter}
                        onClick={(event) => event.preventDefault()}
                    >
                        External link with content before and after
                    </Link>
                </Text>
            </Col>
        );
    },
};
