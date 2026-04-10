import React from "react";
import { CheckboxTreeExtended, EComponentSize } from "@sberbusiness/triplex-next";

type CheckboxNode = { id: string; label: string; checked: boolean; bulk?: boolean; children?: CheckboxNode[] };

const INITIAL: CheckboxNode[] = [
    { id: "1", label: "Группа 1", checked: false, children: [{ id: "1-1", label: "Значение 1-1", checked: false }] },
    { id: "2", label: "Группа 2", checked: false },
];

export const DefaultExample = ({ size = EComponentSize.MD }: { size?: EComponentSize }) => {
    const [checkboxes, setCheckboxes] = React.useState<CheckboxNode[]>(INITIAL);

    const onChange = (target: CheckboxNode) => (event: React.ChangeEvent<HTMLInputElement>) => {
        target.checked = event.target.checked;
        setCheckboxes([...checkboxes]);
    };

    const renderNode = (node: CheckboxNode) => (
        <CheckboxTreeExtended.Node
            id={node.id}
            key={node.id}
            checkbox={(props) => (
                <CheckboxTreeExtended.Checkbox
                    {...props}
                    onChange={onChange(node)}
                    bulk={node.bulk}
                    checked={node.checked}
                >
                    {node.label}
                </CheckboxTreeExtended.Checkbox>
            )}
        >
            {node.children?.map((child) => renderNode(child))}
        </CheckboxTreeExtended.Node>
    );

    return <CheckboxTreeExtended size={size}>{checkboxes.map((node) => renderNode(node))}</CheckboxTreeExtended>;
};
