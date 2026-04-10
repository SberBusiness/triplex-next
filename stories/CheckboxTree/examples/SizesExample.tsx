import React, { useState } from "react";
import { CheckboxTree, Col, EComponentSize, ICheckboxTreeCheckboxData, Row } from "@sberbusiness/triplex-next";

const createData = (): ICheckboxTreeCheckboxData[] => [
    { id: "1", label: "Группа 1", checked: false, children: [{ id: "1-1", label: "Значение 1-1", checked: false }] },
    { id: "2", label: "Группа 2", checked: false },
];

export const SizesExample = () => {
    const [sm, setSm] = useState<ICheckboxTreeCheckboxData[]>(createData());
    const [md, setMd] = useState<ICheckboxTreeCheckboxData[]>(createData());
    const [lg, setLg] = useState<ICheckboxTreeCheckboxData[]>(createData());

    return (
        <Row>
            <Col size={4}>
                <div style={{ marginBottom: "8px", fontSize: "16px", fontWeight: "700" }}>SM</div>
                <CheckboxTree checkboxes={sm} onChange={setSm} size={EComponentSize.SM} />
            </Col>
            <Col size={4}>
                <div style={{ marginBottom: "8px", fontSize: "16px", fontWeight: "700" }}>MD</div>
                <CheckboxTree checkboxes={md} onChange={setMd} />
            </Col>
            <Col size={4}>
                <div style={{ marginBottom: "8px", fontSize: "16px", fontWeight: "700" }}>LG</div>
                <CheckboxTree checkboxes={lg} onChange={setLg} size={EComponentSize.LG} />
            </Col>
        </Row>
    );
};
