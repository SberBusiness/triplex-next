import React, { useState } from "react";
import { CheckboxTree, ICheckboxTreeCheckboxData } from "@sberbusiness/triplex-next";

const SAMPLE_CHECKBOXES: ICheckboxTreeCheckboxData[] = [
    {
        id: "1",
        label: "Группа 1",
        checked: false,
        children: [
            { id: "1-1", label: "Значение 1-1", checked: false },
            { id: "1-2", label: "Значение 1-2", checked: false },
        ],
    },
    {
        id: "2",
        label: "Группа 2",
        checked: false,
        children: [
            { id: "2-1", label: "Значение 2-1", checked: false },
            { id: "2-2", label: "Значение 2-2", checked: false },
        ],
    },
    { id: "3", label: "Значение 3", checked: false },
];

export const PlaygroundExample = (args: React.ComponentProps<typeof CheckboxTree>) => {
    const [checkboxes, setCheckboxes] = useState<ICheckboxTreeCheckboxData[]>(SAMPLE_CHECKBOXES);

    return <CheckboxTree {...args} checkboxes={checkboxes} onChange={setCheckboxes} />;
};
