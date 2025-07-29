import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Col } from "../src/components/Col/Col";
import { Row } from "../src/components/Row/Row";

const renderFilledDiv = (text: string) => (
    <div
        style={{
            background: "#FFD9A0",
            textAlign: "center",
        }}
    >
        {text}
    </div>
);

const meta: Meta<typeof Col> = {
    title: "Components/Col",
    component: Col,
    parameters: {
        docs: {
            description: {
                component: "Col is a responsive column component for grid layouts. See various layout examples below.",
            },
        },
    },
};
export default meta;
type Story = StoryObj<typeof Col>;

export const Default: Story = {
    render: () => (
        <>
            <div>Size не задан.</div>
            <Row>
                <Col>{renderFilledDiv("100% ширины")}</Col>
            </Row>

            <div>Колонки с шириной 4 и 8.</div>
            <Row>
                <Col size={4}>{renderFilledDiv("col-4")}</Col>
                <Col size={8}>{renderFilledDiv("col-8")}</Col>
            </Row>

            <div>Несколько строк в одном Row.</div>
            <Row>
                <Col>{renderFilledDiv("100% ширины")}</Col>
                <Col>{renderFilledDiv("100% ширины")}</Col>
                <Col>{renderFilledDiv("100% ширины")}</Col>
            </Row>

            <div>Колонка шириной 6 и отступом слева 3.</div>
            <Row>
                <Col offset={3} size={6}>
                    {renderFilledDiv("offset-3 size-6")}
                </Col>
            </Row>

            <div>
                Адаптивные колонки, размером 6 и 6.
                <br />
                SM - 5 и 7<br />
                MD - 4 и 6<br />
                LG - 3 и 9<br />
                XL - 2 и 10
                <br />
            </div>
            <Row>
                <Col size={6} sizeSm={5} sizeMd={4} sizeLg={3} sizeXl={2}>
                    {renderFilledDiv("left")}
                </Col>
                <Col size={6} sizeSm={7} sizeMd={8} sizeLg={9} sizeXl={10}>
                    {renderFilledDiv("right")}
                </Col>
            </Row>

            <div>Средняя колонка скрывается на разрешениях {"<"} 768px.</div>
            <Row>
                <Col size={6} sizeMd={4}>
                    {renderFilledDiv("size-6 size-md-4")}
                </Col>
                <Col sizeMd={4} hidden blockMd>
                    {renderFilledDiv("size-md-4")}
                </Col>
                <Col size={6} sizeMd={4}>
                    {renderFilledDiv("size-6 size-md-4")}
                </Col>
            </Row>
        </>
    ),
};
