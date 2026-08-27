import React from "react";
import { Tag, EComponentSize } from "@sberbusiness/triplex-next";

export const Disabled = () => (
    <Tag
        id="disabled-tag"
        size={EComponentSize.LG}
        disabled
        onEdit={() => {}}
        onRemove={() => {}}
        editButtonProps={{ "aria-label": "Редактировать" }}
        removeButtonProps={{ "aria-label": "Удалить" }}
    >
        Selected value
    </Tag>
);
