import React from "react";
import { CaretrightStrokeSrvIcon24 } from "@sberbusiness/icons-next";
import { CollapsibleTreeExtended, EFontWeightText, ETextSize, Text } from "@sberbusiness/triplex-next";
import "./DefaultExample.less";

interface ITreeNodeData {
    id: string;
    label: React.ReactNode;
    defaultOpened?: boolean;
    children?: ITreeNodeData[];
}

const nodes: ITreeNodeData[] = [
    {
        id: "folder-1",
        label: "Folder text",
        children: [{ id: "file-1", label: "File text" }],
    },
    {
        id: "folder-2",
        label: "Folder text",
        defaultOpened: true,
        children: [
            {
                id: "folder-2-1",
                label: "Folder text",
                defaultOpened: true,
                children: [
                    { id: "file-2-1-1", label: "File text" },
                    { id: "file-2-1-2", label: "File text" },
                ],
            },
        ],
    },
    {
        id: "folder-3",
        label: "Folder text",
        defaultOpened: true,
        children: [{ id: "file-3", label: "File text" }],
    },
];

interface ITreeNodeProps {
    node: ITreeNodeData;
    prevNode?: ITreeNodeData;
    nextNode?: ITreeNodeData;
}

const TreeNode: React.FC<ITreeNodeProps> = ({ node, prevNode, nextNode }) => {
    const hasChildren = Boolean(node.children?.length);
    const [opened, setOpened] = React.useState(node.defaultOpened ?? false);

    return (
        <CollapsibleTreeExtended.Node
            id={node.id}
            opened={opened}
            toggle={setOpened}
            prevNodeId={prevNode?.id}
            nextNodeId={nextNode?.id}
            renderHeader={({ hasChildNodes }) =>
                hasChildNodes ? (
                    <button
                        type="button"
                        className="collapsible-tree-extended-example-header"
                        onClick={() => setOpened(!opened)}
                        aria-expanded={opened}
                    >
                        <CaretrightStrokeSrvIcon24
                            paletteIndex={5}
                            className={`collapsible-tree-extended-example-chevron${opened ? " opened" : ""}`}
                            aria-hidden
                        />
                        <Text size={ETextSize.B1} tag="span" weight={EFontWeightText.SEMIBOLD}>
                            {node.label}
                        </Text>
                    </button>
                ) : (
                    <div className="collapsible-tree-extended-example-leaf">
                        <Text size={ETextSize.B1} tag="span">
                            {node.label}
                        </Text>
                    </div>
                )
            }
            renderBody={() =>
                hasChildren
                    ? node.children!.map((child, index) => (
                          <TreeNode
                              key={child.id}
                              node={child}
                              prevNode={node.children![index - 1]}
                              nextNode={node.children![index + 1]}
                          />
                      ))
                    : null
            }
        />
    );
};

export const DefaultExample = () => (
    <div className="collapsible-tree-extended-example" style={{ maxWidth: 420 }}>
        <CollapsibleTreeExtended>
            {nodes.map((node, index) => (
                <TreeNode key={node.id} node={node} prevNode={nodes[index - 1]} nextNode={nodes[index + 1]} />
            ))}
        </CollapsibleTreeExtended>
    </div>
);
