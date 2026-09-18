import React from "react";
import { Tag, TagGroup, EComponentSize } from "@sberbusiness/triplex-next";

const TAGS = Array.from({ length: 10 }, (_, index) => `Selected value ${index + 1}`);

export const WithOverflow = () => (
    <div style={{ width: 400, border: "1px dashed #D0D4D9" }}>
        <TagGroup size={EComponentSize.LG} aria-label="Применённые фильтры">
            {TAGS.map((children, index) => (
                <Tag
                    key={children}
                    id={`overflow-tag-${index}`}
                    size={EComponentSize.LG}
                    onRemove={() => {}}
                    removeButtonProps={{ "aria-label": "Удалить" }}
                >
                    {children}
                </Tag>
            ))}
        </TagGroup>
    </div>
);
