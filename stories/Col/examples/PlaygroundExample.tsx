import React from "react";
import { Col, Row } from "@sberbusiness/triplex-next";

export const PlaygroundExample = (args: React.ComponentProps<typeof Col>) => (
    <Row style={{ width: "600px" }}>
        <Col {...args}>
            <div style={{ padding: "16px", textAlign: "center", backgroundColor: "rgb(255, 217, 160)" }}>
                {args.children}
            </div>
        </Col>
    </Row>
);
