import React from "react";
import { ETextSize, Text, TreeView } from "@sberbusiness/triplex-next";
import "./Default.less";

const items = [
    { id: "item-1", label: "Item text" },
    { id: "item-2", label: "Item text" },
    { id: "item-3", label: "Item text" },
];

export const Default = () => (
    <div className="tree-view-default-example" style={{ maxWidth: 420 }}>
        <TreeView aria-label="Tree">
            {items.map((item) => (
                <TreeView.Node key={item.id} id={item.id}>
                    {() => (
                        <div className="tree-view-default-example-row">
                            <Text size={ETextSize.B1} tag="span">
                                {item.label}
                            </Text>
                        </div>
                    )}
                </TreeView.Node>
            ))}
        </TreeView>
    </div>
);
