import React from "react";
import { Col, Row } from "@sberbusiness/triplex-next";

export const DifferentSizesExample = () => (
    <>
        <Row style={{ width: "600px" }}>
            <Col>
                <div style={{ padding: "16px", textAlign: "center", backgroundColor: "rgb(255, 217, 160)" }}>
                    default size (size-12)
                </div>
            </Col>
        </Row>

        <Row style={{ width: "600px" }}>
            <Col size={2}>
                <div style={{ padding: "16px", textAlign: "center", backgroundColor: "rgb(255, 217, 160)" }}>
                    size-2
                </div>
            </Col>
            <Col size={3}>
                <div style={{ padding: "16px", textAlign: "center", backgroundColor: "rgb(255, 217, 160)" }}>
                    size-3
                </div>
            </Col>
            <Col size={6}>
                <div style={{ padding: "16px", textAlign: "center", backgroundColor: "rgb(255, 217, 160)" }}>
                    size-6
                </div>
            </Col>
        </Row>
    </>
);
