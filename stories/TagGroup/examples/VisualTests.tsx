import React from "react";
import { Tag, TagGroup, EComponentSize } from "@sberbusiness/triplex-next";

const SIZES = Object.values(EComponentSize);
const TAGS = Array.from({ length: 6 }, (_, index) => `Selected value ${index + 1}`);

const REMOVE_BUTTON_PROPS = { "aria-label": "Удалить" };
const EDIT_BUTTON_PROPS = { "aria-label": "Редактировать" };

export const VisualTests = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        {SIZES.map((size) => (
            <div key={size} style={{ width: 320 }}>
                <div style={{ marginBottom: 8, fontSize: 16, fontWeight: 700 }}>{size.toUpperCase()}</div>
                {/* Ширина контейнера меньше суммарной ширины тегов — видны отступы между строками. */}
                <TagGroup size={size} aria-label={`Применённые фильтры, размер ${size}`}>
                    {TAGS.map((label, index) => (
                        <Tag
                            key={label}
                            id={`visual-${size}-tag-${index}`}
                            size={size}
                            onEdit={index === 0 ? () => {} : undefined}
                            onRemove={() => {}}
                            editButtonProps={EDIT_BUTTON_PROPS}
                            removeButtonProps={REMOVE_BUTTON_PROPS}
                        >
                            {label}
                        </Tag>
                    ))}
                </TagGroup>
            </div>
        ))}
        <div style={{ width: 320 }}>
            <div style={{ marginBottom: 8, fontSize: 16, fontWeight: 700 }}>SINGLE TAG</div>
            <TagGroup size={EComponentSize.LG} aria-label="Применённые фильтры, один тег">
                <Tag
                    id="visual-single-tag"
                    size={EComponentSize.LG}
                    onRemove={() => {}}
                    removeButtonProps={REMOVE_BUTTON_PROPS}
                >
                    Very long tag text that should be truncated with ellipsis
                </Tag>
            </TagGroup>
        </div>
    </div>
);
