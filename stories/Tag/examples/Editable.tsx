import React from "react";
import { Tag, EComponentSize } from "@sberbusiness/triplex-next";

export const Editable = () => (
    <Tag
        id="editable-tag"
        size={EComponentSize.LG}
        onEdit={() => {}}
        onRemove={() => {}}
        editButtonProps={{ "aria-label": "Редактировать" }}
        removeButtonProps={{ "aria-label": "Удалить" }}
    >
        Selected value
    </Tag>
);
