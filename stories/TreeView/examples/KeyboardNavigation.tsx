import React from "react";
import clsx from "clsx";
import { ECaptionSize, ETextSize, Caption, Text, TreeView } from "@sberbusiness/triplex-next";
import "./KeyboardNavigation.less";

interface INodeData {
    id: string;
    label: string;
    children?: INodeData[];
}

const nodes: INodeData[] = [
    {
        id: "folder-1",
        label: "Folder text",
        children: [
            { id: "file-1-1", label: "File text" },
            { id: "file-1-2", label: "File text" },
        ],
    },
    {
        id: "folder-2",
        label: "Folder text",
        children: [{ id: "file-2-1", label: "File text" }],
    },
];

interface ITreeNodeProps {
    node: INodeData;
}

const TreeNode = ({ node }: ITreeNodeProps) => (
    // Ветки раскрыты сразу: стрелки спускаются только в раскрытые ноды.
    <TreeView.Node id={node.id} opened>
        {({ activeNode, isLastNode }) => (
            <>
                <div className={clsx("tree-view-keyboard-example-row", { active: activeNode })}>
                    <Text size={ETextSize.B1} tag="span">
                        {node.label}
                    </Text>
                    {isLastNode ? (
                        <Caption size={ECaptionSize.C2} tag="span">
                            isLastNode
                        </Caption>
                    ) : null}
                </div>
                {node.children ? (
                    <TreeView.Group>
                        {node.children.map((child) => (
                            <TreeNode key={child.id} node={child} />
                        ))}
                    </TreeView.Group>
                ) : null}
            </>
        )}
    </TreeView.Node>
);

export const KeyboardNavigation = () => (
    <div className="tree-view-keyboard-example" style={{ maxWidth: 420 }}>
        <Caption size={ECaptionSize.C1} tag="p">
            Поставьте фокус на любой узел и используйте стрелки вверх/вниз.
        </Caption>
        <TreeView aria-label="Tree">
            {nodes.map((node) => (
                <TreeNode key={node.id} node={node} />
            ))}
        </TreeView>
    </div>
);
