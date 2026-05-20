import React from "react";
import { MinusStrokeSrvIcon24, PlusStrokeSrvIcon24 } from "@sberbusiness/icons-next";
import { CollapsibleTreeExtended, EFontWeightText, ETextSize, Text } from "@sberbusiness/triplex-next";
import "./CustomToggleExample.less";

interface ITreeNodeData {
    id: string;
    label: React.ReactNode;
    defaultOpened?: boolean;
    children?: ITreeNodeData[];
}

const nodes: ITreeNodeData[] = [
    {
        id: "section-1",
        label: "Section 1",
        defaultOpened: true,
        children: [
            { id: "item-1-1", label: "Item 1.1" },
            { id: "item-1-2", label: "Item 1.2" },
        ],
    },
    {
        id: "section-2",
        label: "Section 2",
        children: [
            { id: "item-2-1", label: "Item 2.1" },
            { id: "item-2-2", label: "Item 2.2" },
        ],
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
                        className="custom-toggle-example-header"
                        onClick={() => setOpened(!opened)}
                        aria-expanded={opened}
                    >
                        <span className="custom-toggle-example-icon" aria-hidden>
                            {opened ? (
                                <MinusStrokeSrvIcon24 paletteIndex={5} />
                            ) : (
                                <PlusStrokeSrvIcon24 paletteIndex={5} />
                            )}
                        </span>
                        <Text size={ETextSize.B1} tag="span" weight={EFontWeightText.SEMIBOLD}>
                            {node.label}
                        </Text>
                    </button>
                ) : (
                    <div className="custom-toggle-example-leaf">
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

export const CustomToggleExample = () => (
    <div className="custom-toggle-example" style={{ maxWidth: 420 }}>
        <CollapsibleTreeExtended>
            {nodes.map((node, index) => (
                <TreeNode key={node.id} node={node} prevNode={nodes[index - 1]} nextNode={nodes[index + 1]} />
            ))}
        </CollapsibleTreeExtended>
    </div>
);
