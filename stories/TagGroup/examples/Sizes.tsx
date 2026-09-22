import React from "react";
import { Tag, TagGroup, EComponentSize } from "@sberbusiness/triplex-next";

const SIZES = Object.values(EComponentSize);
const TAGS = ["Selected value", "Another value", "One more value"];

export const Sizes = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        {SIZES.map((size) => (
            <div key={size}>
                <div style={{ marginBottom: 8, fontSize: 16, fontWeight: 700 }}>{size.toUpperCase()}</div>
                <TagGroup size={size} aria-label={`Применённые фильтры, размер ${size}`}>
                    {TAGS.map((label, index) => (
                        <Tag
                            key={label}
                            id={`${size}-tag-${index}`}
                            size={size}
                            onEdit={() => {}}
                            onRemove={() => {}}
                            editButtonProps={{ "aria-label": "Редактировать" }}
                            removeButtonProps={{ "aria-label": "Удалить" }}
                        >
                            {label}
                        </Tag>
                    ))}
                </TagGroup>
            </div>
        ))}
    </div>
);
