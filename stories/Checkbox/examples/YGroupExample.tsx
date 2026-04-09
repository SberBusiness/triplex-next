import React from "react";
import { Checkbox, CheckboxYGroup, Col, EComponentSize, Row } from "@sberbusiness/triplex-next";

export const YGroupExample = () => (
    <Row>
        <Col size={3}>
            <CheckboxYGroup aria-labelledby="checkbox-y-group-label">
                {[1, 2, 3, 4].map((value) => (
                    <Checkbox key={value} name="checkbox-y-group" value={value} size={EComponentSize.SM}>
                        Checkbox text
                    </Checkbox>
                ))}
            </CheckboxYGroup>
        </Col>
        <Col size={3}>
            <CheckboxYGroup aria-labelledby="checkbox-y-group-label">
                {[1, 2, 3, 4].map((value) => (
                    <Checkbox key={value} name="checkbox-y-group" value={value}>
                        Checkbox text
                    </Checkbox>
                ))}
            </CheckboxYGroup>
        </Col>
        <Col size={3}>
            <CheckboxYGroup aria-labelledby="checkbox-y-group-label">
                {[1, 2, 3, 4].map((value) => (
                    <Checkbox key={value} name="checkbox-y-group" value={value} size={EComponentSize.LG}>
                        Checkbox text
                    </Checkbox>
                ))}
            </CheckboxYGroup>
        </Col>
    </Row>
);
