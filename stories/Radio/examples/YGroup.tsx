import React from "react";
import { Radio, RadioYGroup, Row, Col, EComponentSize } from "@sberbusiness/triplex-next";

export const YGroup = () => (
    <Row>
        <Col size={3}>
            <RadioYGroup aria-label="Группа размера SM">
                {[1, 2, 3, 4].map((value) => (
                    <Radio key={value} name="radio-y-group-sm" value={value} size={EComponentSize.SM}>
                        Radio text
                    </Radio>
                ))}
            </RadioYGroup>
        </Col>
        <Col size={3}>
            <RadioYGroup aria-label="Группа размера MD">
                {[1, 2, 3, 4].map((value) => (
                    <Radio key={value} name="radio-y-group-md" value={value}>
                        Radio text
                    </Radio>
                ))}
            </RadioYGroup>
        </Col>
        <Col size={3}>
            <RadioYGroup aria-label="Группа размера LG">
                {[1, 2, 3, 4].map((value) => (
                    <Radio key={value} name="radio-y-group-lg" value={value} size={EComponentSize.LG}>
                        Radio text
                    </Radio>
                ))}
            </RadioYGroup>
        </Col>
    </Row>
);
