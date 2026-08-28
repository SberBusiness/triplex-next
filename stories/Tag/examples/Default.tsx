import React from "react";
import { Tag, EComponentSize } from "@sberbusiness/triplex-next";

export const Default = () => (
    <Tag id="default-tag" size={EComponentSize.LG} onRemove={() => {}} removeButtonProps={{ "aria-label": "Удалить" }}>
        Selected value
    </Tag>
);
