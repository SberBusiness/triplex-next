import React from "react";
import { Col, EComponentSize, Row } from "@sberbusiness/triplex-next";
import { DefaultExample } from "./DefaultExample";

export const SizesExample = () => (
    <Row>
        <Col size={4}>
            <div style={{ marginBottom: "8px", fontSize: "16px", fontWeight: "700" }}>SM</div>
            <DefaultExample size={EComponentSize.SM} />
        </Col>
        <Col size={4}>
            <div style={{ marginBottom: "8px", fontSize: "16px", fontWeight: "700" }}>MD</div>
            <DefaultExample size={EComponentSize.MD} />
        </Col>
        <Col size={4}>
            <div style={{ marginBottom: "8px", fontSize: "16px", fontWeight: "700" }}>LG</div>
            <DefaultExample size={EComponentSize.LG} />
        </Col>
    </Row>
);
