import React from "react";
import { Tag, TagGroup, EComponentSize } from "@sberbusiness/triplex-next";

const TAGS = Array.from({ length: 6 }, (_, index) => `Selected value ${index + 1}`);

export const WithOverflow = () => (
    // maxWidth, а не width: на широком экране в строку помещается четыре тега,
    // на узком контейнер сжимается по месту и теги переносятся раньше.
    <div style={{ maxWidth: 760, border: "1px dashed #D0D4D9" }}>
        <TagGroup size={EComponentSize.LG} aria-label="Применённые фильтры">
            {TAGS.map((label, index) => (
                <Tag
                    key={label}
                    id={`overflow-tag-${index}`}
                    size={EComponentSize.LG}
                    onRemove={() => {}}
                    removeButtonProps={{ "aria-label": "Удалить" }}
                >
                    {label}
                </Tag>
            ))}
        </TagGroup>
    </div>
);
