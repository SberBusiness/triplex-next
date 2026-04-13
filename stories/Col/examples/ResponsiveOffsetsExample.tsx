import React from "react";
import { Col, Row } from "@sberbusiness/triplex-next";

export const ResponsiveOffsetsExample = () => (
    <div style={{ display: "flex", flexDirection: "column" }}>
        <Row>
            <Col sizeMd={6} offsetMd={3}>
                <div style={{ padding: "16px", backgroundColor: "rgb(255, 217, 160)", textAlign: "center" }}>
                    <div>sizeMd=6</div>
                    <div>offsetMd=3</div>
                </div>
            </Col>
        </Row>

        <Row>
            <Col sizeSm={6} offsetSm={4}>
                <div style={{ padding: "16px", backgroundColor: "rgb(255, 217, 160)", textAlign: "center" }}>
                    <div>sizeSm=6</div>
                    <div>offsetSm=4</div>
                </div>
            </Col>
        </Row>
    </div>
);
