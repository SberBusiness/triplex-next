import React from "react";
import { UnorderedList } from "@sberbusiness/triplex-next";

export const Default = () => (
    <UnorderedList
        items={[
            { key: "1", children: "List item text" },
            { key: "2", children: "List item text" },
            { key: "3", children: "List item text" },
        ]}
    />
);
