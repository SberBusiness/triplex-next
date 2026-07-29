import React from "react";
import { Col, Row } from "@sberbusiness/triplex-next";

export const Playground = (args: React.ComponentProps<typeof Row>) => (
    <div style={{ maxWidth: "320px" }}>
        <Row {...args}>
            <Col size={6}>
                <div style={{ padding: "16px", textAlign: "center", backgroundColor: "rgb(255, 217, 160)" }}>
                    Row 1, Col 1
                </div>
            </Col>
            <Col size={6}>
                <div style={{ padding: "16px", textAlign: "center", backgroundColor: "rgb(255, 217, 160)" }}>
                    Row 1, Col 2
                </div>
            </Col>
        </Row>
        <Row {...args}>
            <Col size={6}>
                <div style={{ padding: "16px", textAlign: "center", backgroundColor: "rgb(255, 217, 160)" }}>
                    Row 2, Col 1
                </div>
            </Col>
            <Col size={6}>
                <div style={{ padding: "16px", textAlign: "center", backgroundColor: "rgb(255, 217, 160)" }}>
                    Row 2, Col 2
                </div>
            </Col>
        </Row>
    </div>
);
