import React from "react";
import { Col, Gap, Row } from "@sberbusiness/triplex-next";

export const ResponsiveSizesExample = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <Row>
            <Col sizeSm={6} sizeMd={5} sizeLg={4} sizeXl={3}>
                <div style={{ padding: "16px", textAlign: "center", backgroundColor: "rgb(255, 217, 160)" }}>
                    <div>Размеры колонки на разных экранах: sm - 6, md - 5, lg - 4, xl - 3</div>
                </div>
                <Gap size={16} />
            </Col>

            <Col sizeSm={7} sizeMd={8} sizeLg={9} sizeXl={10}>
                <div style={{ padding: "16px", textAlign: "center", backgroundColor: "rgb(255, 217, 160)" }}>
                    <div>Размеры колонки на разных экранах: sm - 7, md - 8, lg - 9, xl - 10</div>
                </div>
            </Col>
        </Row>
    </div>
);
