import React from "react";
import { CollapsibleTree, ETextSize, ICollapsibleTreeNodeData, Text } from "@sberbusiness/triplex-next";

const nodes: ICollapsibleTreeNodeData[] = [
    {
        id: "folder-1",
        label: "Folder text",
        children: [
            {
                id: "file-1",
                label: (
                    <Text size={ETextSize.B1} tag="span">
                        File text
                    </Text>
                ),
            },
        ],
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
                    {
                        id: "file-2-1-1",
                        label: (
                            <Text size={ETextSize.B1} tag="span">
                                File text
                            </Text>
                        ),
                    },
                    {
                        id: "file-2-1-2",
                        label: (
                            <Text size={ETextSize.B1} tag="span">
                                File text
                            </Text>
                        ),
                    },
                ],
            },
        ],
    },
    {
        id: "folder-3",
        label: "Folder text",
        defaultOpened: true,
        children: [
            {
                id: "file-3",
                label: (
                    <Text size={ETextSize.B1} tag="span">
                        File text
                    </Text>
                ),
            },
        ],
    },
];

export const Nested = () => (
    <div style={{ maxWidth: 420 }}>
        <CollapsibleTree nodes={nodes} />
    </div>
);
