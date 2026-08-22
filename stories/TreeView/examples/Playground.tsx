import React from "react";
import clsx from "clsx";
import { action } from "storybook/actions";
import { CaretrightStrokeSrvIcon24 } from "@sberbusiness/icons-next";
import { ETextSize, Text, TreeView } from "@sberbusiness/triplex-next";
import "./Playground.less";

interface INodeData {
    id: string;
    label: string;
    children?: INodeData[];
}

const buildNodes = (withThirdLevel: boolean): INodeData[] => [
    {
        id: "folder-1",
        label: "Folder text",
        children: [
            { id: "file-1-1", label: "File text" },
            {
                id: "folder-1-2",
                label: "Folder text",
                children: withThirdLevel ? [{ id: "file-1-2-1", label: "File text" }] : undefined,
            },
        ],
    },
    {
        id: "folder-2",
        label: "Folder text",
        children: [{ id: "file-2-1", label: "File text" }],
    },
    { id: "file-3", label: "File text" },
];

interface ITreeNodeProps {
    node: INodeData;
    defaultOpened: boolean;
}

const TreeNode = ({ node, defaultOpened }: ITreeNodeProps) => {
    const [opened, setOpened] = React.useState(defaultOpened);
    const branch = Boolean(node.children?.length);

    const toggle = () => {
        action("toggle")(node.id, !opened);
        setOpened((prevOpened) => !prevOpened);
    };

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
            {({ activeNode, hasChildNodes, openedNode }) => (
                <>
                    <div className={clsx("tree-view-playground-example-row", { branch, active: activeNode })}>
                        {hasChildNodes ? (
                            <CaretrightStrokeSrvIcon24
                                paletteIndex={5}
                                className={clsx("tree-view-playground-example-chevron", { opened: openedNode })}
                                aria-hidden
                            />
                        ) : (
                            <span className="tree-view-playground-example-chevron-placeholder" />
                        )}
                        <Text size={ETextSize.B1} tag="span">
                            {node.label}
                        </Text>
                    </div>
                    {node.children ? (
                        <TreeView.Group
                            className={clsx("tree-view-playground-example-group", { collapsed: !openedNode })}
                        >
                            {node.children.map((child) => (
                                <TreeNode key={child.id} node={child} defaultOpened={defaultOpened} />
                            ))}
                        </TreeView.Group>
                    ) : null}
                </>
            )}
        </TreeView.Node>
    );
};

export interface IPlaygroundProps {
    /** Раскрыть все ветки по умолчанию. */
    defaultOpened: boolean;
    /** Добавить третий уровень вложенности. */
    withThirdLevel: boolean;
}

export const Playground = ({ defaultOpened, withThirdLevel }: IPlaygroundProps) => (
    <div className="tree-view-playground-example" style={{ maxWidth: 420 }}>
        {/* key перемонтирует дерево, чтобы ноды подхватили новое значение defaultOpened из Controls. */}
        <TreeView key={String(defaultOpened)} aria-label="Tree">
            {buildNodes(withThirdLevel).map((node) => (
                <TreeNode key={node.id} node={node} defaultOpened={defaultOpened} />
            ))}
        </TreeView>
    </div>
);
