import React from "react";
import { Row } from "../src/components/Row";
import { Col } from "../src/components/Col";
import { StoryObj } from "@storybook/react";
import { Title, Description, Primary, Controls, Stories } from "@storybook/addon-docs/blocks";
import { EComponentSize } from "../src/enums/EComponentSize";

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
        testRunner: { skip: true },
        docs: {
            description: {
                component: `
Компонент строки сетки, который может содержать только компоненты Col.

## Особенности

- Принимает только компоненты Col в качестве children
- Имеет нижний отступ по умолчанию
- Можно отключить нижний отступ через \`paddingBottom\`
- Можно установить размер отступа между колонками через \`gridHorizontalGap\`

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
        gridHorizontalGap: EComponentSize.SM,
    },
    argTypes: {
        paddingBottom: {
            control: { type: "boolean" },
            description: "Нижний отступ",
        },
        gridHorizontalGap: {
            control: { type: "select" },
            options: [EComponentSize.SM, EComponentSize.MD],
            description: "Размер отступа между колонками",
        },
    },
    parameters: {
        controls: {
            include: ["paddingBottom", "gridHorizontalGap"],
        },
    },
    render: (args) => (
        <div style={{ maxWidth: "320px" }}>
            <Row
                style={{ flexWrap: "nowrap" }}
                paddingBottom={args.paddingBottom}
                gridHorizontalGap={args.gridHorizontalGap}
            >
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

            <Row style={{ flexWrap: "nowrap" }} gridHorizontalGap={args.gridHorizontalGap}>
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
        </div>
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
        <div style={{ maxWidth: "320px" }}>
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
        </div>
    ),
};

export const GridHorizontalGaps: StoryObj<typeof Row> = {
    parameters: {
        docs: {
            description: {
                story: "Строки с различными размерами отступа между колонками",
            },
        },
        controls: { disable: true },
    },
    render: () => (
        <div style={{ maxWidth: "320px" }}>
            <div style={{ marginBottom: "8px", fontSize: "16px", fontWeight: "700" }}>SM</div>
            <Row style={{ flexWrap: "nowrap" }} paddingBottom gridHorizontalGap={EComponentSize.SM}>
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

            <div style={{ marginBottom: "8px", fontSize: "16px", fontWeight: "700" }}>MD</div>
            <Row style={{ flexWrap: "nowrap" }} gridHorizontalGap={EComponentSize.MD}>
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
        </div>
    ),
};

export const WithoutPaddingBottom: StoryObj<typeof Row> = {
    name: "Without Padding Bottom",
    render: () => (
        <div style={{ maxWidth: "320px" }}>
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
        </div>
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
