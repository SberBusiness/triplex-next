import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { CheckboxTreeExtended } from "../src/components/CheckboxTreeExtended/CheckboxTreeExtended";
import { Title, Description, Stories } from "@storybook/addon-docs/blocks";

const meta: Meta<typeof CheckboxTreeExtended> = {
    title: "Components/CheckboxTreeExtended",
    component: CheckboxTreeExtended,
    tags: ["autodocs"],
    parameters: {
        layout: "padded",
        docs: {
            page: () => (
                <>
                    <Title />
                    <Description />
                    <Stories />
                </>
            ),
        },
    },
};

export default meta;
type Story = StoryObj<typeof CheckboxTreeExtended>;

export const Default: Story = {
    name: "Default",
    parameters: {
        controls: { disable: true },
    },
    render: () => {
        const checkboxesInitial = [
            {
                id: "1",
                label: "Группа 1",
                checked: false,
                bulk: false,
                children: [
                    {
                        id: "1-1",
                        label: "Значение 1-1",
                        checked: false,
                        bulk: false,
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
                bulk: false,
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

        const [checkboxes, setCheckboxes] = React.useState(checkboxesInitial);

        /** Обход чекбоксов. */
        const traverseCheckboxes = (checkboxes, callback) => {
            checkboxes.forEach((checkbox) => {
                if (checkbox.children) traverseCheckboxes(checkbox.children, callback);
                callback(checkbox);
            });
        };

        /** Обновление флага checked и bulk родителя, при изменении дочернего чекбокса. */
        const checkParentCheckboxes = (checkbox) => {
            if (!checkbox.children) return;

            let checkedChildrenCount = 0;
            let bulkChildrenCount = 0;

            checkbox.children.forEach((child) => {
                child.checked ? checkedChildrenCount++ : "";
                child.bulk ? bulkChildrenCount++ : "";
            });

            // Все дочерние чекбоксы выбраны.
            if (checkedChildrenCount === checkbox.children.length) {
                checkbox.checked = true;
                checkbox.bulk = bulkChildrenCount !== 0;
            } else if (checkedChildrenCount > 0) {
                // Некоторые дочерние чекбоксы выбраны.
                checkbox.checked = true;
                checkbox.bulk = true;
            } else {
                // Все дочерние чекбоксы не выбраны.
                checkbox.checked = false;
            }
        };

        /** Обновление флага checked дочерних чекбоксов, при изменении родителя. */
        const checkChildrenCheckboxes = (checkbox) => {
            if (!checkbox.children) return;

            checkbox.children.forEach((child) => {
                child.checked = checkbox.checked;
                checkChildrenCheckboxes(child);
            });
        };

        const handleChange = (checkbox) => (event) => {
            checkbox.checked = checkbox.bulk ? true : event.target.checked;

            // Обновление флага checked дочерних чекбоксов, при изменении родителя.
            checkChildrenCheckboxes(checkbox);

            // Обновление флага checked и bulk всех чекбоксов снизу вверх.
            traverseCheckboxes(checkboxes, checkParentCheckboxes);

            setCheckboxes([...checkboxes]);
        };

        const renderCheckboxNode = (checkbox) => (
            <CheckboxTreeExtended.Node
                id={checkbox.id}
                key={checkbox.id}
                checkbox={(props) => (
                    <CheckboxTreeExtended.Checkbox
                        {...props}
                        onChange={handleChange(checkbox)}
                        bulk={checkbox.bulk}
                        checked={checkbox.checked}
                    >
                        {checkbox.label}
                    </CheckboxTreeExtended.Checkbox>
                )}
            >
                {checkbox.children && checkbox.children.map((child) => renderCheckboxNode(child))}
            </CheckboxTreeExtended.Node>
        );

        return (
            <CheckboxTreeExtended>{checkboxes.map((checkbox) => renderCheckboxNode(checkbox))}</CheckboxTreeExtended>
        );
    },
};
