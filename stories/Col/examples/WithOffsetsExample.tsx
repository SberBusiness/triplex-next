import React from "react";
import { Col, Row } from "@sberbusiness/triplex-next";

export const WithOffsetsExample = () => (
    <div style={{ display: "flex", flexDirection: "column" }}>
        <Row style={{ flexWrap: "nowrap" }}>
            <Col size={4}>
                <div style={{ padding: "16px", textAlign: "center", backgroundColor: "rgb(255, 217, 160)" }}>
                    size-4
                </div>
            </Col>
            <Col size={4} offset={3}>
                <div style={{ padding: "16px", textAlign: "center", backgroundColor: "rgb(255, 217, 160)" }}>
                    size-4 offset-3
                </div>
            </Col>
        </Row>

        <Row style={{ flexWrap: "nowrap" }}>
            <Col size={3} offset={3}>
                <div style={{ padding: "16px", textAlign: "center", backgroundColor: "rgb(255, 217, 160)" }}>
                    size-3 offset-3
                </div>
            </Col>
            <Col size={3} offset={1}>
                <div style={{ padding: "16px", textAlign: "center", backgroundColor: "rgb(255, 217, 160)" }}>
                    size-3 offset-1
                </div>
            </Col>
        </Row>

        <Row>
            <Col size={6} offset={2}>
                <div style={{ padding: "16px", textAlign: "center", backgroundColor: "rgb(255, 217, 160)" }}>
                    size-6 offset-2
                </div>
            </Col>
        </Row>
    </div>
);
