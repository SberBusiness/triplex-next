import React from "react";
import {
    CollapsibleTree,
    CollapsibleTreeNodeLabel,
    EFontWeightText,
    ETextSize,
    ICollapsibleTreeNodeBranch,
    Text,
} from "@sberbusiness/triplex-next";

const collapsedNodes: ICollapsibleTreeNodeBranch[] = [
    {
        id: "vt-collapsed-folder-1",
        label: <CollapsibleTreeNodeLabel>Folder 1</CollapsibleTreeNodeLabel>,
        children: [
            {
                id: "vt-collapsed-file-1",
                content: (
                    <Text size={ETextSize.B1} tag="span">
                        File 1
                    </Text>
                ),
            },
        ],
    },
    {
        id: "vt-collapsed-folder-2",
        label: <CollapsibleTreeNodeLabel>Folder 2</CollapsibleTreeNodeLabel>,
        children: [
            {
                id: "vt-collapsed-file-2",
                content: (
                    <Text size={ETextSize.B1} tag="span">
                        File 2
                    </Text>
                ),
            },
        ],
    },
    {
        id: "vt-collapsed-folder-3",
        label: <CollapsibleTreeNodeLabel>Folder 3</CollapsibleTreeNodeLabel>,
        children: [
            {
                id: "vt-collapsed-file-3",
                content: (
                    <Text size={ETextSize.B1} tag="span">
                        File 3
                    </Text>
                ),
            },
        ],
    },
];

const expandedNodes: ICollapsibleTreeNodeBranch[] = [
    {
        id: "vt-expanded-folder-1",
        label: <CollapsibleTreeNodeLabel>Folder 1</CollapsibleTreeNodeLabel>,
        defaultOpened: true,
        children: [
            {
                id: "vt-expanded-folder-1-1",
                label: <CollapsibleTreeNodeLabel>Folder 1.1</CollapsibleTreeNodeLabel>,
                defaultOpened: true,
                children: [
                    {
                        id: "vt-expanded-file-1-1-1",
                        content: (
                            <Text size={ETextSize.B1} tag="span">
                                File 1.1.1
                            </Text>
                        ),
                    },
                    {
                        id: "vt-expanded-file-1-1-2",
                        content: (
                            <Text size={ETextSize.B1} tag="span">
                                File 1.1.2
                            </Text>
                        ),
                    },
                ],
            },
            {
                id: "vt-expanded-file-1-2",
                content: (
                    <Text size={ETextSize.B1} tag="span">
                        File 1.2
                    </Text>
                ),
            },
        ],
    },
    {
        id: "vt-expanded-folder-2",
        label: <CollapsibleTreeNodeLabel>Folder 2</CollapsibleTreeNodeLabel>,
        defaultOpened: true,
        children: [
            {
                id: "vt-expanded-file-2-1",
                content: (
                    <Text size={ETextSize.B1} tag="span">
                        File 2.1
                    </Text>
                ),
            },
        ],
    },
];

const customLabelNodes: ICollapsibleTreeNodeBranch[] = [
    {
        id: "vt-label-folder-b3",
        label: <CollapsibleTreeNodeLabel size={ETextSize.B3}>Folder B3</CollapsibleTreeNodeLabel>,
        defaultOpened: true,
        children: [
            {
                id: "vt-label-file-b3",
                content: (
                    <Text size={ETextSize.B3} tag="span">
                        File text
                    </Text>
                ),
            },
        ],
    },
    {
        id: "vt-label-folder-b2",
        label: (
            <CollapsibleTreeNodeLabel size={ETextSize.B2} weight={EFontWeightText.REGULAR}>
                Folder B2 regular
            </CollapsibleTreeNodeLabel>
        ),
        defaultOpened: true,
        children: [
            {
                id: "vt-label-file-b2",
                content: (
                    <Text size={ETextSize.B2} tag="span">
                        File text
                    </Text>
                ),
            },
        ],
    },
    {
        id: "vt-label-folder-b1",
        label: <CollapsibleTreeNodeLabel>Folder B1 default</CollapsibleTreeNodeLabel>,
        defaultOpened: true,
        children: [
            {
                id: "vt-label-file-b1",
                content: (
                    <Text size={ETextSize.B1} tag="span">
                        File text
                    </Text>
                ),
            },
        ],
    },
];

interface IVariantProps {
    title: string;
    nodes: ICollapsibleTreeNodeBranch[];
}

const Variant: React.FC<IVariantProps> = ({ title, nodes }) => (
    <div style={{ minWidth: 240, maxWidth: 320 }}>
        <div style={{ marginBottom: 8, fontSize: 16, fontWeight: 700 }}>{title}</div>
        <CollapsibleTree nodes={nodes} />
    </div>
);

export const VisualTestsExample = () => (
    <div style={{ display: "flex", alignItems: "flex-start", flexWrap: "wrap", gap: 32 }}>
        <Variant title="Collapsed" nodes={collapsedNodes} />
        <Variant title="Expanded" nodes={expandedNodes} />
        <Variant title="Custom label sizes" nodes={customLabelNodes} />
    </div>
);
