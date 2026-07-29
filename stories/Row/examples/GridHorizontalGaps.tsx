import React from "react";
import { Col, EComponentSize, Row } from "@sberbusiness/triplex-next";

export const GridHorizontalGaps = () => (
    <div style={{ maxWidth: "320px" }}>
        <div style={{ marginBottom: "8px", fontSize: "16px", fontWeight: "700" }}>SM</div>
        <Row gridHorizontalGap={EComponentSize.SM}>
            <Col size={6}>
                <div style={{ padding: "16px", textAlign: "center", backgroundColor: "rgb(255, 217, 160)" }}>Col 1</div>
            </Col>
            <Col size={6}>
                <div style={{ padding: "16px", textAlign: "center", backgroundColor: "rgb(255, 217, 160)" }}>Col 2</div>
            </Col>
        </Row>
        <div style={{ marginBottom: "8px", fontSize: "16px", fontWeight: "700" }}>MD</div>
        <Row gridHorizontalGap={EComponentSize.MD}>
            <Col size={6}>
                <div style={{ padding: "16px", textAlign: "center", backgroundColor: "rgb(255, 217, 160)" }}>Col 1</div>
            </Col>
            <Col size={6}>
                <div style={{ padding: "16px", textAlign: "center", backgroundColor: "rgb(255, 217, 160)" }}>Col 2</div>
            </Col>
        </Row>
    </div>
);
