import React from "react";
import {
    CollapsibleTree,
    CollapsibleTreeNodeLabel,
    ETextSize,
    ICollapsibleTreeNodeBranch,
    Text,
} from "@sberbusiness/triplex-next";

const nodes: ICollapsibleTreeNodeBranch[] = [
    {
        id: "folder-1",
        label: <CollapsibleTreeNodeLabel>Folder text</CollapsibleTreeNodeLabel>,
        children: [
            {
                id: "file-1",
                content: (
                    <Text size={ETextSize.B1} tag="span">
                        File text
                    </Text>
                ),
            },
        ],
    },
    {
        id: "folder-2",
        label: <CollapsibleTreeNodeLabel>Folder text</CollapsibleTreeNodeLabel>,
        defaultOpened: true,
        children: [
            {
                id: "file-2",
                content: (
                    <Text size={ETextSize.B1} tag="span">
                        File text
                    </Text>
                ),
            },
        ],
    },
    {
        id: "folder-3",
        label: <CollapsibleTreeNodeLabel>Folder text</CollapsibleTreeNodeLabel>,
        children: [
            {
                id: "file-3",
                content: (
                    <Text size={ETextSize.B1} tag="span">
                        File text
                    </Text>
                ),
            },
        ],
    },
];

export const Opened = () => (
    <div style={{ maxWidth: 320 }}>
        <CollapsibleTree nodes={nodes} />
    </div>
);
