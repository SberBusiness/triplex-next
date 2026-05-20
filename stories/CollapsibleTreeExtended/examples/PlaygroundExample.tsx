import React from "react";
import clsx from "clsx";
import { action } from "storybook/actions";
import { CaretrightStrokeSrvIcon24, MinusStrokeSrvIcon24, PlusStrokeSrvIcon24 } from "@sberbusiness/icons-next";
import { CollapsibleTreeExtended, EFontWeightText, ETextSize, Text } from "@sberbusiness/triplex-next";
import "./PlaygroundExample.less";

interface IPlaygroundExampleProps {
    /** Раскрыть все ветки по умолчанию. */
    defaultOpened: boolean;
    /** Использовать кастомный toggle (Plus/Minus) вместо шеврона. */
    withCustomToggle: boolean;
}

interface ITreeNodeData {
    id: string;
    label: React.ReactNode;
    children?: ITreeNodeData[];
}

const nodes: ITreeNodeData[] = [
    {
        id: "folder-1",
        label: "Folder 1",
        children: [
            {
                id: "folder-1-1",
                label: "Folder 1.1",
                children: [
                    { id: "file-1-1-1", label: "File 1.1.1" },
                    { id: "file-1-1-2", label: "File 1.1.2" },
                ],
            },
            { id: "file-1-2", label: "File 1.2" },
        ],
    },
    {
        id: "folder-2",
        label: "Folder 2",
        children: [{ id: "file-2-1", label: "File 2.1" }],
    },
];

interface ITreeNodeProps {
    node: ITreeNodeData;
    prevNode?: ITreeNodeData;
    nextNode?: ITreeNodeData;
    defaultOpened: boolean;
    withCustomToggle: boolean;
}

const TreeNode: React.FC<ITreeNodeProps> = ({ node, prevNode, nextNode, defaultOpened, withCustomToggle }) => {
    const hasChildren = Boolean(node.children?.length);
    const [opened, setOpened] = React.useState(defaultOpened);

    const handleToggle = (next: boolean) => {
        setOpened(next);
        action("toggle")(node.id, next);
    };

    return (
        <CollapsibleTreeExtended.Node
            id={node.id}
            opened={opened}
            toggle={handleToggle}
            prevNodeId={prevNode?.id}
            nextNodeId={nextNode?.id}
            renderHeader={({ hasChildNodes }) =>
                hasChildNodes ? (
                    <button
                        type="button"
                        className="collapsible-tree-extended-playground-header"
                        onClick={() => handleToggle(!opened)}
                        aria-expanded={opened}
                    >
                        {withCustomToggle ? (
                            <span className="collapsible-tree-extended-playground-icon" aria-hidden>
                                {opened ? (
                                    <MinusStrokeSrvIcon24 paletteIndex={5} />
                                ) : (
                                    <PlusStrokeSrvIcon24 paletteIndex={5} />
                                )}
                            </span>
                        ) : (
                            <CaretrightStrokeSrvIcon24
                                paletteIndex={5}
                                className={clsx("collapsible-tree-extended-playground-chevron", { opened })}
                                aria-hidden
                            />
                        )}
                        <Text size={ETextSize.B1} tag="span" weight={EFontWeightText.SEMIBOLD}>
                            {node.label}
                        </Text>
                    </button>
                ) : (
                    <div className={clsx("collapsible-tree-extended-playground-leaf", { custom: withCustomToggle })}>
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
                              defaultOpened={defaultOpened}
                              withCustomToggle={withCustomToggle}
                          />
                      ))
                    : null
            }
        />
    );
};

export const PlaygroundExample = ({ defaultOpened, withCustomToggle }: IPlaygroundExampleProps) => (
    <div className="collapsible-tree-extended-playground" style={{ maxWidth: 420 }}>
        <CollapsibleTreeExtended key={`${defaultOpened}-${withCustomToggle}`}>
            {nodes.map((node, index) => (
                <TreeNode
                    key={node.id}
                    node={node}
                    prevNode={nodes[index - 1]}
                    nextNode={nodes[index + 1]}
                    defaultOpened={defaultOpened}
                    withCustomToggle={withCustomToggle}
                />
            ))}
        </CollapsibleTreeExtended>
    </div>
);
