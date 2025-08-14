import React from "react";
import { Row } from "../src/components/Row";
import { Col } from "../src/components/Col";
import { Gap } from "../src/components/Gap";
import { StoryObj } from "@storybook/react";

export default {
    title: "Components/Col",
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component: `
Компонент колонки сетки, который используется внутри компонента Row.

## Особенности

- Размеры от 1 до 12 (12-колоночная сетка)
- Адаптивные размеры для разных экранов (sm, md, lg, xl)
- Поддержка отступов (offset)
- Управление видимостью (hidden/block)
- Следует использовать только внутри компонента Row

## Размеры экранов

- **sm**: ≥576px (планшеты)
- **md**: ≥768px (планшеты в альбомной ориентации)
- **lg**: ≥992px (десктопы)
- **xl**: ≥1200px (большие десктопы)

## Использование

\`\`\`tsx
import { Row, Col } from '@sberbusiness/triplex-next';

<Row>
    <Col size={6} sizeMd={4} sizeLg={3}>
        Col
    </Col>
</Row>
\`\`\`
                `,
            },
        },
    },
};

export const WithControls: StoryObj<typeof Col> = {
    name: "With Controls",
    args: {
        size: 12,
        offset: 0,
        children: "Col Content",
    },
    argTypes: {
        children: {
            control: { type: "text" },
            description: "Контент колонки",
            table: {
                type: { summary: "React.ReactNode" },
            },
        },
        size: {
            control: { type: "select" },
            options: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
            description: "Ширина колонки",
            table: {
                type: { summary: "TColumnSize" },
                defaultValue: { summary: "12" },
            },
        },
        offset: {
            control: { type: "select" },
            options: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
            description: "Отступ слева для колонки",
            table: {
                type: { summary: "TOffsetSize" },
                defaultValue: { summary: "0" },
            },
        },
        hidden: {
            control: { type: "boolean" },
            description: "Колонка скрыта на всех экранах",
            table: {
                type: { summary: "boolean" },
            },
        },
        block: {
            control: { type: "boolean" },
            description: "Колонка отображается на всех экранах",
            table: {
                type: { summary: "boolean" },
            },
        },
    },
    render: (args) => (
        <div>
            <Row style={{ width: "600px" }}>
                <Col {...args}>
                    <div
                        style={{
                            padding: "16px",
                            textAlign: "center",
                            backgroundColor: "rgb(255, 217, 160)",
                        }}
                    >
                        {args.children}
                    </div>
                </Col>
            </Row>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "Демонстрация различных размеров колонок, включая размер по-умолчанию",
            },
        },
    },
};

export const DifferentSizes: StoryObj = {
    name: "Different Sizes",
    render: () => (
        <div>
            <Row style={{ width: "600px" }}>
                <Col>
                    <div
                        style={{
                            padding: "16px",
                            textAlign: "center",
                            backgroundColor: "rgb(255, 217, 160)",
                        }}
                    >
                        default size (size-12)
                    </div>{" "}
                </Col>
            </Row>

            <Row style={{ width: "600px" }}>
                <Col size={2}>
                    <div
                        style={{
                            padding: "16px",
                            textAlign: "center",
                            backgroundColor: "rgb(255, 217, 160)",
                        }}
                    >
                        size-2
                    </div>
                </Col>
                <Col size={3}>
                    <div
                        style={{
                            padding: "16px",
                            textAlign: "center",
                            backgroundColor: "rgb(255, 217, 160)",
                        }}
                    >
                        size-3
                    </div>
                </Col>

                <Col size={6}>
                    <div
                        style={{
                            padding: "16px",
                            textAlign: "center",
                            backgroundColor: "rgb(255, 217, 160)",
                        }}
                    >
                        size-6
                    </div>
                </Col>
            </Row>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "Демонстрация различных размеров колонок, включая размер по-умолчанию",
            },
        },
    },
};

export const ResponsiveSizes: StoryObj = {
    name: "Responsive Sizes",
    render: () => (
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <Row>
                <Col sizeSm={6} sizeMd={5} sizeLg={4} sizeXl={3}>
                    <div
                        style={{
                            padding: "16px",
                            textAlign: "center",
                            backgroundColor: "rgb(255, 217, 160)",
                        }}
                    >
                        <div>sizeSm=6 sizeMd=5 sizeLg=4 sizeXl=3</div>
                    </div>
                    <Gap size={16} />
                </Col>

                <Col sizeSm={7} sizeMd={8} sizeLg={9} sizeXl={10}>
                    <div
                        style={{
                            padding: "16px",
                            textAlign: "center",
                            backgroundColor: "rgb(255, 217, 160)",
                        }}
                    >
                        <div>sizeSm=7 sizeMd=8 sizeLg=9 sizeXl=10</div>
                    </div>
                </Col>
            </Row>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "Колонки с адаптивными размерами для разных экранов",
            },
        },
    },
};

export const WithOffsets: StoryObj = {
    name: "With Offsets",
    render: () => (
        <div style={{ display: "flex", flexDirection: "column" }}>
            <Row style={{ flexWrap: "nowrap" }}>
                <Col size={8}>
                    <div
                        style={{
                            padding: "16px",
                            textAlign: "center",
                            backgroundColor: "rgb(255, 217, 160)",
                        }}
                    >
                        size-8
                    </div>
                </Col>

                <Col size={8} offset={3}>
                    <div
                        style={{
                            padding: "16px",
                            backgroundColor: "rgb(255, 217, 160)",
                            textAlign: "center",
                        }}
                    >
                        size-8 offset-3
                    </div>
                </Col>
            </Row>

            <Row style={{ flexWrap: "nowrap" }}>
                <Col size={6} offset={6}>
                    <div
                        style={{
                            padding: "16px",
                            backgroundColor: "rgb(255, 217, 160)",
                            textAlign: "center",
                        }}
                    >
                        size-6 offset-6
                    </div>
                </Col>

                <Col size={6} offset={2}>
                    <div
                        style={{
                            padding: "16px",
                            backgroundColor: "rgb(255, 217, 160)",
                            textAlign: "center",
                        }}
                    >
                        size-6 offset-2
                    </div>
                </Col>
            </Row>

            <Row>
                <Col size={12} offset={5}>
                    <div
                        style={{
                            padding: "16px",
                            textAlign: "center",
                            backgroundColor: "rgb(255, 217, 160)",
                        }}
                    >
                        size-12 offset-6
                    </div>
                </Col>
            </Row>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "Колонки с отступами (offset)",
            },
        },
    },
};

export const ResponsiveOffsets: StoryObj = {
    name: "Responsive Offsets",
    render: () => (
        <div style={{ display: "flex", flexDirection: "column" }}>
            <Row>
                <Col sizeMd={12} offsetMd={3}>
                    <div
                        style={{
                            padding: "16px",
                            backgroundColor: "rgb(255, 217, 160)",
                            textAlign: "center",
                        }}
                    >
                        <div>sizeMd=12</div>
                        <div>offsetMd=3</div>
                    </div>
                </Col>
            </Row>

            <Row>
                <Col sizeSm={12} offsetSm={4}>
                    <div
                        style={{
                            padding: "16px",
                            backgroundColor: "rgb(255, 217, 160)",
                            textAlign: "center",
                        }}
                    >
                        <div>sizeSm=12</div>
                        <div>offsetSm=4</div>
                    </div>
                </Col>
            </Row>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "Адаптивные отступы для разных размеров экрана",
            },
        },
    },
};

export const HiddenColumns: StoryObj = {
    name: "Hidden Columns",
    render: () => (
        <div style={{ display: "flex", flexDirection: "column" }}>
            <Row>
                <Col>
                    <div
                        style={{
                            padding: "16px",
                            backgroundColor: "rgb(255, 217, 160)",
                            textAlign: "center",
                        }}
                    >
                        hidden: false
                    </div>
                </Col>
            </Row>

            <Row>
                <Col hiddenSm>
                    <div
                        style={{
                            padding: "16px",
                            backgroundColor: "rgb(255, 217, 160)",
                            textAlign: "center",
                        }}
                    >
                        hiddenSm
                    </div>
                    <Gap size={16} />
                </Col>

                <Col hiddenMd>
                    <div
                        style={{
                            padding: "16px",
                            backgroundColor: "rgb(255, 217, 160)",
                            textAlign: "center",
                        }}
                    >
                        hiddenMd
                    </div>
                    <Gap size={16} />
                </Col>

                <Col hiddenXl>
                    <div
                        style={{
                            padding: "16px",
                            backgroundColor: "rgb(255, 217, 160)",
                            textAlign: "center",
                        }}
                    >
                        hiddenXl
                    </div>
                </Col>
            </Row>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "Колонки, скрытые на определенных размерах экрана",
            },
        },
    },
};
