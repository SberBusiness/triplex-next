import React from "react";
import {
    CollapsibleTree,
    CollapsibleTreeNodeLabel,
    EFontWeightText,
    ETextSize,
    ICollapsibleTreeNodeBranch,
    Text,
} from "@sberbusiness/triplex-next";

const nodes: ICollapsibleTreeNodeBranch[] = [
    {
        id: "folder-1",
        label: <CollapsibleTreeNodeLabel size={ETextSize.B3}>Folder text (B3)</CollapsibleTreeNodeLabel>,
        children: [
            {
                id: "file-1",
                content: (
                    <Text size={ETextSize.B3} tag="span">
                        File text
                    </Text>
                ),
            },
        ],
    },
    {
        id: "folder-2",
        label: (
            <CollapsibleTreeNodeLabel size={ETextSize.B2} weight={EFontWeightText.REGULAR}>
                Folder text (B2, regular)
            </CollapsibleTreeNodeLabel>
        ),
        defaultOpened: true,
        children: [
            {
                id: "file-2",
                content: (
                    <Text size={ETextSize.B2} tag="span">
                        File text
                    </Text>
                ),
            },
        ],
    },
    {
        id: "folder-3",
        label: <CollapsibleTreeNodeLabel size={ETextSize.B1}>Folder text (B1, default)</CollapsibleTreeNodeLabel>,
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

export const CustomLabel = () => (
    <div style={{ maxWidth: 360 }}>
        <CollapsibleTree nodes={nodes} />
    </div>
);
