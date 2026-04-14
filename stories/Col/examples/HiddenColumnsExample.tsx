import React from "react";
import { Col, Gap, Row } from "@sberbusiness/triplex-next";

export const HiddenColumnsExample = () => (
    <div style={{ display: "flex", flexDirection: "column" }}>
        <Row>
            <Col>
                <div style={{ padding: "16px", backgroundColor: "rgb(255, 217, 160)", textAlign: "center" }}>
                    Свойство hidden не установлено
                </div>
            </Col>
        </Row>

        <Row>
            <Col hiddenSm>
                <div style={{ padding: "16px", backgroundColor: "rgb(255, 217, 160)", textAlign: "center" }}>
                    Свойство hidden установлено для экрана sm
                </div>
                <Gap size={16} />
            </Col>

            <Col hiddenMd>
                <div style={{ padding: "16px", backgroundColor: "rgb(255, 217, 160)", textAlign: "center" }}>
                    Свойство hidden установлено для экрана md
                </div>
                <Gap size={16} />
            </Col>

            <Col hiddenLg>
                <div style={{ padding: "16px", backgroundColor: "rgb(255, 217, 160)", textAlign: "center" }}>
                    Свойство hidden установлено для экрана lg
                </div>
                <Gap size={16} />
            </Col>

            <Col hiddenXl>
                <div style={{ padding: "16px", backgroundColor: "rgb(255, 217, 160)", textAlign: "center" }}>
                    Свойство hidden установлено для экрана xl
                </div>
            </Col>
        </Row>
    </div>
);
