import type { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import { CheckboxTree, ICheckboxTreeProps } from "../src/components/CheckboxTree/CheckboxTree";
import { ICheckboxTreeCheckboxData } from "../src/components/CheckboxTree/types";

const meta: Meta<typeof CheckboxTree> = {
    title: "Components/CheckboxTree",
    component: CheckboxTree,
    tags: ["autodocs"],
    parameters: {
        layout: "padded",
        docs: {
            description: {
                component: `
Дерево чекбоксов. Является оберткой над CheckboxTreeExtended.

## Использование

\`\`\`tsx
import { CheckboxTree } from "@sberbusiness/triplex-next";

const checkboxes = [
  {
    id: "1",
    label: "группа 1",
    checked: false,
    children: [
      { id: "1-1", label: "Элемент 1-1", checked: false },
      { id: "1-2", label: "Элемент 1-2", checked: false },
    ],
  },
];

<CheckboxTree
  checkboxes={checkboxes}
  onChange={(updated) => console.log(updated)}
/>
\`\`\`
                `,
            },
        },
    },
    argTypes: {
        checkboxes: {
            control: false,
            description: "Array of checkbox data with hierarchical structure",
        },
        onChange: {
            action: "onChange",
            description: "Callback function called when checkbox state changes",
        },
    },
};

export default meta;
type Story = StoryObj<typeof CheckboxTree>;

// Sample data for CheckboxTree with "группа 1", "группа 2", "Значение 3"
const sampleCheckboxes: ICheckboxTreeCheckboxData[] = [
    {
        id: "1",
        label: "Группа 1",
        checked: false,
        children: [
            {
                id: "1-1",
                label: "Значение 1-1",
                checked: false,
                children: [
                    {
                        id: "1-1-1",
                        label: "Значение 1-1-1",
                        checked: false,
                    },
                    {
                        id: "1-1-2",
                        label: "Значение 1-1-2",
                        checked: false,
                    },
                    {
                        id: "1-1-3",
                        label: "Значение 1-1-3",
                        checked: false,
                    },
                ],
            },
            {
                id: "1-2",
                label: "Значение 1-2",
                checked: false,
            },
        ],
    },
    {
        id: "2",
        label: "Группа 2",
        checked: false,
        children: [
            {
                id: "2-1",
                label: "Значение 2-1",
                checked: false,
            },
            {
                id: "2-2",
                label: "Значение 2-2",
                checked: false,
            },
        ],
    },
    {
        id: "3",
        label: "Значение 3",
        checked: false,
    },
];

// Interactive wrapper component
const InteractiveCheckboxTree = (args: ICheckboxTreeProps) => {
    const [checkboxes, setCheckboxes] = useState<ICheckboxTreeCheckboxData[]>(args.checkboxes);

    const handleChange = (updatedCheckboxes: ICheckboxTreeCheckboxData[]) => {
        setCheckboxes(updatedCheckboxes);
        args.onChange?.(updatedCheckboxes);
    };

    return <CheckboxTree {...args} checkboxes={checkboxes} onChange={handleChange} />;
};

/**
 * Дерево чекбоксов. Является оберткой над CheckboxTreeExtended.
 *
 * @example
 * ```tsx
 * import { CheckboxTree } from "@sberbusiness/triplex-next";
 *
 * const checkboxes = [
 *   {
 *     id: "1",
 *     label: "группа 1",
 *     checked: false,
 *     children: [
 *       { id: "1-1", label: "Элемент 1-1", checked: false },
 *       { id: "1-2", label: "Элемент 1-2", checked: false },
 *     ],
 *   },
 * ];
 *
 * <CheckboxTree
 *   checkboxes={checkboxes}
 *   onChange={(updated) => console.log(updated)}
 * />
 * ```
 */
export const Default: Story = {
    render: (args) => <InteractiveCheckboxTree {...args} />,
    args: {
        checkboxes: sampleCheckboxes,
    },
};
