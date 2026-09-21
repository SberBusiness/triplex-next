import React from "react";
import { Tag, TagGroup, EComponentSize } from "@sberbusiness/triplex-next";

const TAGS = Array.from({ length: 6 }, (_, index) => `Value ${index + 1}`);

export const WithOverflow = () => (
    // Ширина подобрана так, чтобы в строку помещалось ровно четыре тега, а остальные переносились.
    <div style={{ width: 480, border: "1px dashed #D0D4D9" }}>
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
