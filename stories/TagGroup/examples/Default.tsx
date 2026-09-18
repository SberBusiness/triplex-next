import React from "react";
import { Tag, TagGroup, EComponentSize } from "@sberbusiness/triplex-next";

const TAGS = ["Selected value", "Another value", "One more value"];

export const Default = () => (
    <TagGroup size={EComponentSize.LG} aria-label="Применённые фильтры">
        {TAGS.map((children, index) => (
            <Tag
                key={children}
                id={`default-tag-${index}`}
                size={EComponentSize.LG}
                onRemove={() => {}}
                removeButtonProps={{ "aria-label": "Удалить" }}
            >
                {children}
            </Tag>
        ))}
    </TagGroup>
);
