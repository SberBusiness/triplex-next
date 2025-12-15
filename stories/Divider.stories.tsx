import React from "react";
import { StoryObj } from "@storybook/react";
import { Divider } from "../src/components/Divider";
import { Text } from "../src/components/Typography";
import { ETextSize } from "../src/components/Typography/enums";
import { EFontType } from "../src/components/Typography/enums";
import { Row } from "../src/components/Row";
import { Col } from "../src/components/Col";
import { Title, Description, Primary, Controls, Stories } from "@storybook/addon-docs/blocks";

export default {
    title: "Components/Divider",
    component: Divider,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component: `
Компонент разделитель для визуального разделения контента.

## Особенности

- **Отступы**: поддержка marginTopSize и marginBottomSize с размерами 4, 8, 12, 16, 20, 24, 28, 32

## Использование

\`\`\`tsx
import { Divider } from '@sberbusiness/triplex-next';   

<Divider marginTopSize={16} marginBottomSize={16} />
\`\`\`
                `,
            },
            page: () => (
                <>
                    <Title />
                    <Description />
                    <Controls of={Default} />
                    <Primary />
                    <Stories />
                </>
            ),
        },
    },
    argTypes: {
        marginTopSize: {
            control: { type: "select" },
            options: [4, 8, 12, 16, 20, 24, 28, 32],
            description: "Отступ сверху",
        },
        marginBottomSize: {
            control: { type: "select" },
            options: [4, 8, 12, 16, 20, 24, 28, 32],
            description: "Отступ снизу",
        },
    },
};

export const Default: StoryObj<typeof Divider> = {
    name: "Default",
    parameters: {
        controls: { disable: true },
    },
    render: () => (
        <div style={{ maxWidth: 600 }}>
            <Text size={ETextSize.B3} type={EFontType.PRIMARY}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                ex ea commodo consequat.
            </Text>
            <Divider marginTopSize={24} marginBottomSize={16} />
            <Text size={ETextSize.B3} type={EFontType.PRIMARY}>
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
                laborum.
            </Text>
            <Row>
                <Col size={4} offset={4}>
                    <Divider marginTopSize={24} marginBottomSize={16} />
                </Col>
            </Row>
            <Text size={ETextSize.B3} type={EFontType.PRIMARY}>
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam
                rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt
                explicabo.
            </Text>
        </div>
    ),
};

export const Playground: StoryObj<typeof Divider> = {
    name: "Playground",
    args: {
        marginTopSize: 24,
        marginBottomSize: 16,
    },
    parameters: {
        controls: {
            include: ["marginTopSize", "marginBottomSize"],
        },
    },
    render: (args) => (
        <div style={{ maxWidth: 600 }}>
            <Text size={ETextSize.B3} type={EFontType.PRIMARY}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                ex ea commodo consequat.
            </Text>
            <Divider {...args} />
            <Text size={ETextSize.B3} type={EFontType.PRIMARY}>
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
                laborum.
            </Text>
            <Row>
                <Col size={4} offset={4}>
                    <Divider {...args} />
                </Col>
            </Row>
            <Text size={ETextSize.B3} type={EFontType.PRIMARY}>
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam
                rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt
                explicabo.
            </Text>
        </div>
    ),
};
