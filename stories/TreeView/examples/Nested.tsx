import React from "react";
import clsx from "clsx";
import { CaretrightStrokeSrvIcon24 } from "@sberbusiness/icons-next";
import { ETextSize, Text, TreeView } from "@sberbusiness/triplex-next";
import "./Nested.less";

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
        children: [
            {
                id: "folder-2-1",
                label: "Folder text",
                children: [{ id: "file-2-1-1", label: "File text" }],
            },
        ],
    },
    { id: "file-3", label: "File text" },
];

interface ITreeNodeProps {
    node: INodeData;
}

const TreeNode = ({ node }: ITreeNodeProps) => {
    const [opened, setOpened] = React.useState(false);
    const branch = Boolean(node.children?.length);

    const toggle = () => setOpened((prevOpened) => !prevOpened);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        // Клик по вложенной ноде не должен раскрывать родительскую.
        event.stopPropagation();

        if (branch) {
            toggle();
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
        if (event.key !== "Enter" && event.key !== " ") {
            return;
        }

        event.preventDefault();
        event.stopPropagation();

        if (branch) {
            toggle();
        }
    };

    return (
        <TreeView.Node id={node.id} opened={opened} onClick={handleClick} onKeyDown={handleKeyDown}>
            {({ hasChildNodes, openedNode }) => (
                <>
                    <div className={clsx("tree-view-nested-example-row", { branch })}>
                        {hasChildNodes ? (
                            <CaretrightStrokeSrvIcon24
                                paletteIndex={5}
                                className={clsx("tree-view-nested-example-chevron", { opened: openedNode })}
                                aria-hidden
                            />
                        ) : (
                            <span className="tree-view-nested-example-chevron-placeholder" />
                        )}
                        <Text size={ETextSize.B1} tag="span">
                            {node.label}
                        </Text>
                    </div>
                    {node.children ? (
                        // Группа остаётся смонтированной: так вложенные ноды зарегистрированы в дереве
                        // и родитель знает про hasChildNodes даже в свёрнутом состоянии.
                        <TreeView.Group className={clsx("tree-view-nested-example-group", { collapsed: !openedNode })}>
                            {node.children.map((child) => (
                                <TreeNode key={child.id} node={child} />
                            ))}
                        </TreeView.Group>
                    ) : null}
                </>
            )}
        </TreeView.Node>
    );
};

export const Nested = () => (
    <div className="tree-view-nested-example" style={{ maxWidth: 420 }}>
        <TreeView aria-label="Tree">
            {nodes.map((node) => (
                <TreeNode key={node.id} node={node} />
            ))}
        </TreeView>
    </div>
);
