import React from "react";
import { CaretrightStrokeSrvIcon24, MinusStrokeSrvIcon24, PlusStrokeSrvIcon24 } from "@sberbusiness/icons-next";
import { CollapsibleTreeExtended, EFontWeightText, ETextSize, Text } from "@sberbusiness/triplex-next";
import "./VisualTestsExample.less";

interface ITreeNodeData {
    id: string;
    label: React.ReactNode;
    defaultOpened?: boolean;
    children?: ITreeNodeData[];
}

const sampleNodes: ITreeNodeData[] = [
    {
        id: "vt-folder-1",
        label: "Folder 1",
        children: [
            {
                id: "vt-folder-1-1",
                label: "Folder 1.1",
                defaultOpened: true,
                children: [
                    { id: "vt-file-1-1-1", label: "File 1.1.1" },
                    { id: "vt-file-1-1-2", label: "File 1.1.2" },
                ],
            },
            { id: "vt-file-1-2", label: "File 1.2" },
        ],
    },
    {
        id: "vt-folder-2",
        label: "Folder 2",
        children: [{ id: "vt-file-2-1", label: "File 2.1" }],
    },
];

const allCollapsed = (data: ITreeNodeData[]): ITreeNodeData[] =>
    data.map((node) => ({
        ...node,
        defaultOpened: false,
        children: node.children ? allCollapsed(node.children) : undefined,
    }));

const allOpened = (data: ITreeNodeData[]): ITreeNodeData[] =>
    data.map((node) => ({
        ...node,
        defaultOpened: true,
        children: node.children ? allOpened(node.children) : undefined,
    }));

interface ITreeNodeProps {
    node: ITreeNodeData;
    prevNode?: ITreeNodeData;
    nextNode?: ITreeNodeData;
    headerClassName: string;
    leafClassName: string;
    renderToggleIcon: (opened: boolean) => React.ReactNode;
}

const TreeNode: React.FC<ITreeNodeProps> = ({
    node,
    prevNode,
    nextNode,
    headerClassName,
    leafClassName,
    renderToggleIcon,
}) => {
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
                        className={headerClassName}
                        onClick={() => setOpened(!opened)}
                        aria-expanded={opened}
                    >
                        {renderToggleIcon(opened)}
                        <Text size={ETextSize.B1} tag="span" weight={EFontWeightText.SEMIBOLD}>
                            {node.label}
                        </Text>
                    </button>
                ) : (
                    <div className={leafClassName}>
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
                              headerClassName={headerClassName}
                              leafClassName={leafClassName}
                              renderToggleIcon={renderToggleIcon}
                          />
                      ))
                    : null
            }
        />
    );
};

const renderChevronIcon = (opened: boolean) => (
    <CaretrightStrokeSrvIcon24
        paletteIndex={5}
        className={`collapsible-tree-extended-visual-tests-chevron${opened ? " opened" : ""}`}
        aria-hidden
    />
);

const renderPlusMinusIcon = (opened: boolean) => (
    <span className="collapsible-tree-extended-visual-tests-icon" aria-hidden>
        {opened ? <MinusStrokeSrvIcon24 paletteIndex={5} /> : <PlusStrokeSrvIcon24 paletteIndex={5} />}
    </span>
);

interface IVariantProps {
    title: string;
    nodes: ITreeNodeData[];
    headerClassName: string;
    leafClassName: string;
    renderToggleIcon: (opened: boolean) => React.ReactNode;
}

const Variant: React.FC<IVariantProps> = ({ title, nodes, headerClassName, leafClassName, renderToggleIcon }) => (
    <div className="collapsible-tree-extended-visual-tests-variant">
        <div className="collapsible-tree-extended-visual-tests-title">{title}</div>
        <CollapsibleTreeExtended>
            {nodes.map((node, index) => (
                <TreeNode
                    key={node.id}
                    node={node}
                    prevNode={nodes[index - 1]}
                    nextNode={nodes[index + 1]}
                    headerClassName={headerClassName}
                    leafClassName={leafClassName}
                    renderToggleIcon={renderToggleIcon}
                />
            ))}
        </CollapsibleTreeExtended>
    </div>
);

export const VisualTestsExample = () => (
    <div className="collapsible-tree-extended-visual-tests">
        <Variant
            title="Collapsed"
            nodes={allCollapsed(sampleNodes)}
            headerClassName="collapsible-tree-extended-visual-tests-header"
            leafClassName="collapsible-tree-extended-visual-tests-leaf"
            renderToggleIcon={renderChevronIcon}
        />
        <Variant
            title="Expanded"
            nodes={allOpened(sampleNodes)}
            headerClassName="collapsible-tree-extended-visual-tests-header"
            leafClassName="collapsible-tree-extended-visual-tests-leaf"
            renderToggleIcon={renderChevronIcon}
        />
        <Variant
            title="Custom toggle (Plus/Minus)"
            nodes={allOpened(sampleNodes)}
            headerClassName="collapsible-tree-extended-visual-tests-header custom"
            leafClassName="collapsible-tree-extended-visual-tests-leaf custom"
            renderToggleIcon={renderPlusMinusIcon}
        />
    </div>
);
