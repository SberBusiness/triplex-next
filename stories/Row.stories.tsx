import React from "react";
import { Row } from "../src/components/Row";
import { Col } from "../src/components/Col";
import { StoryObj } from "@storybook/react";
import { Title, Description, Primary, Controls, Stories } from "@storybook/addon-docs/blocks";

export default {
    title: "Components/Row",
    component: Row,
    tags: ["autodocs"],
    argTypes: {
        paddingBottom: {
            control: { type: "boolean" },
        },
    },
    parameters: {
        docs: {
            description: {
                component: `
Компонент строки сетки, который может содержать только компоненты Col.

## Особенности

- Принимает только компоненты Col в качестве children
- Имеет нижний отступ по умолчанию
- Можно отключить нижний отступ через \`paddingBottom\`

## Использование

\`\`\`tsx
import { Row, Col } from '@sberbusiness/triplex-next';

<Row>
    <Col size={6}>Колонка 1</Col>
    <Col size={6}>Колонка 2</Col>
</Row>
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
};

export const Playground: StoryObj<typeof Row> = {
    name: "Playground",
    args: {
        paddingBottom: true,
    },
    argTypes: {
        paddingBottom: {
            control: { type: "boolean" },
            description: "Нижний отступ",
        },
    },
    parameters: {
        controls: {
            include: ["paddingBottom"],
        },
    },
    render: (args) => (
        <>
            <Row style={{ flexWrap: "nowrap" }} paddingBottom={args.paddingBottom}>
                <Col>
                    <div
                        style={{
                            padding: "16px",
                            textAlign: "center",
                            backgroundColor: "rgb(255, 217, 160)",
                        }}
                    >
                        Row 1, Col 1
                    </div>
                </Col>

                <Col>
                    <div
                        style={{
                            padding: "16px",
                            textAlign: "center",
                            backgroundColor: "rgb(255, 217, 160)",
                        }}
                    >
                        Row 1, Col 2
                    </div>
                </Col>
            </Row>

            <Row style={{ flexWrap: "nowrap" }}>
                <Col>
                    <div
                        style={{
                            padding: "16px",
                            textAlign: "center",
                            backgroundColor: "rgb(255, 217, 160)",
                        }}
                    >
                        Row 2, Col 1
                    </div>
                </Col>

                <Col>
                    <div
                        style={{
                            padding: "16px",
                            textAlign: "center",
                            backgroundColor: "rgb(255, 217, 160)",
                        }}
                    >
                        Row 2, Col 2
                    </div>
                </Col>
            </Row>
        </>
    ),
};

export const Default: StoryObj<typeof Row> = {
    name: "Default",
    parameters: {
        docs: {
            description: {
                story: "Стандартные строки с двумя колонками равного размера",
            },
        },
        controls: { disable: true },
    },
    render: () => (
        <>
            <Row style={{ flexWrap: "nowrap" }} paddingBottom>
                <Col>
                    <div
                        style={{
                            padding: "16px",
                            textAlign: "center",
                            backgroundColor: "rgb(255, 217, 160)",
                        }}
                    >
                        Row 1, Col 1
                    </div>
                </Col>

                <Col>
                    <div
                        style={{
                            padding: "16px",
                            textAlign: "center",
                            backgroundColor: "rgb(255, 217, 160)",
                        }}
                    >
                        Row 1, Col 2
                    </div>
                </Col>
            </Row>

            <Row style={{ flexWrap: "nowrap" }}>
                <Col>
                    <div
                        style={{
                            padding: "16px",
                            textAlign: "center",
                            backgroundColor: "rgb(255, 217, 160)",
                        }}
                    >
                        Row 2, Col 1
                    </div>
                </Col>

                <Col>
                    <div
                        style={{
                            padding: "16px",
                            textAlign: "center",
                            backgroundColor: "rgb(255, 217, 160)",
                        }}
                    >
                        Row 2, Col 2
                    </div>
                </Col>
            </Row>
        </>
    ),
};

export const WithoutPaddingBottom: StoryObj<typeof Row> = {
    name: "Without Padding Bottom",
    render: () => (
        <>
            <Row paddingBottom={false} style={{ flexWrap: "nowrap" }}>
                <Col>
                    <div
                        style={{
                            padding: "16px",
                            textAlign: "center",
                            backgroundColor: "rgb(255, 217, 160)",
                        }}
                    >
                        Row 1, Col 1
                    </div>
                </Col>

                <Col>
                    <div
                        style={{
                            padding: "16px",
                            textAlign: "center",
                            backgroundColor: "rgb(255, 217, 160)",
                        }}
                    >
                        Row 1, Col 2
                    </div>
                </Col>
            </Row>

            <Row style={{ flexWrap: "nowrap" }}>
                <Col>
                    <div
                        style={{
                            padding: "16px",
                            textAlign: "center",
                            backgroundColor: "rgb(255, 217, 160)",
                        }}
                    >
                        Row 2, Col 1
                    </div>
                </Col>

                <Col>
                    <div
                        style={{
                            padding: "16px",
                            textAlign: "center",
                            backgroundColor: "rgb(255, 217, 160)",
                        }}
                    >
                        Row 2, Col 2
                    </div>
                </Col>
            </Row>
        </>
    ),
    parameters: {
        docs: {
            description: {
                story: "Строки без нижнего отступа с двумя колонками",
            },
        },
        controls: { disable: true },
    },
};
