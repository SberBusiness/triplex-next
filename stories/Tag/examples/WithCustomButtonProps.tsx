import React from "react";
import { Tag, EComponentSize } from "@sberbusiness/triplex-next";

export const WithCustomButtonProps = () => (
    <Tag
        id="custom-props-tag"
        size={EComponentSize.LG}
        onEdit={() => {}}
        onRemove={() => {}}
        editButtonProps={{
            title: "Редактировать тег",
            "aria-label": "Редактировать тег",
            onClick: () => {},
        }}
        removeButtonProps={{
            title: "Удалить тег",
            "aria-label": "Удалить тег",
            onClick: () => {},
        }}
    >
        Selected value
    </Tag>
);
