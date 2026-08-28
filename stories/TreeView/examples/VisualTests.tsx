import React from "react";
import clsx from "clsx";
import { CaretrightStrokeSrvIcon24 } from "@sberbusiness/icons-next";
import { ECaptionSize, ETextSize, Caption, Text, TreeView } from "@sberbusiness/triplex-next";
import "./VisualTests.less";

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
            {
                id: "folder-1-2",
                label: "Folder text",
                children: [{ id: "file-1-2-1", label: "File text" }],
            },
        ],
    },
    { id: "file-2", label: "File text" },
];

interface ITreeNodeProps {
    node: INodeData;
    opened: boolean;
}

const TreeNode = ({ node, opened }: ITreeNodeProps) => (
    <TreeView.Node id={node.id} opened={opened}>
        {({ activeNode, hasChildNodes, isLastNode, openedNode }) => (
            <>
                <div className={clsx("tree-view-visual-tests-row", { active: activeNode })}>
                    {hasChildNodes ? (
                        <CaretrightStrokeSrvIcon24
                            paletteIndex={5}
                            className={clsx("tree-view-visual-tests-chevron", { opened: openedNode })}
                            aria-hidden
                        />
                    ) : (
                        <span className="tree-view-visual-tests-chevron-placeholder" />
                    )}
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
                    <TreeView.Group className={clsx("tree-view-visual-tests-group", { collapsed: !openedNode })}>
                        {node.children.map((child) => (
                            <TreeNode key={child.id} node={child} opened={opened} />
                        ))}
                    </TreeView.Group>
                ) : null}
            </>
        )}
    </TreeView.Node>
);

interface ITreeCaseProps {
    title: string;
    opened: boolean;
}

const TreeCase = ({ title, opened }: ITreeCaseProps) => (
    <div style={{ width: 260 }}>
        <div style={{ marginBottom: "8px", fontSize: "16px", fontWeight: 700 }}>{title}</div>
        <div className="tree-view-visual-tests">
            <TreeView aria-label={title}>
                {nodes.map((node) => (
                    <TreeNode key={node.id} node={node} opened={opened} />
                ))}
            </TreeView>
        </div>
    </div>
);

export const VisualTests = () => (
    <div style={{ display: "flex", alignItems: "flex-start", gap: 32, flexWrap: "wrap" }}>
        <TreeCase title="Collapsed" opened={false} />
        <TreeCase title="Expanded" opened />
    </div>
);
