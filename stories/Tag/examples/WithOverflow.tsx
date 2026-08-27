import React from "react";
import { Tag, EComponentSize } from "@sberbusiness/triplex-next";

export const WithOverflow = () => (
    <div style={{ maxWidth: 440 }}>
        <Tag
            id="long-tag"
            size={EComponentSize.LG}
            onEdit={() => {}}
            onRemove={() => {}}
            editButtonProps={{ "aria-label": "Редактировать" }}
            removeButtonProps={{ "aria-label": "Удалить" }}
        >
            Very long tag text that should be truncated with ellipsis
        </Tag>
    </div>
);
