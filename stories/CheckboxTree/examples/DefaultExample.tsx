import React, { useState } from "react";
import { CheckboxTree, ICheckboxTreeCheckboxData } from "@sberbusiness/triplex-next";

const SAMPLE: ICheckboxTreeCheckboxData[] = [
    { id: "1", label: "Группа 1", checked: false, children: [{ id: "1-1", label: "Значение 1-1", checked: false }] },
    { id: "2", label: "Группа 2", checked: false },
];

export const DefaultExample = () => {
    const [checkboxes, setCheckboxes] = useState<ICheckboxTreeCheckboxData[]>(SAMPLE);
    return <CheckboxTree checkboxes={checkboxes} onChange={setCheckboxes} />;
};
