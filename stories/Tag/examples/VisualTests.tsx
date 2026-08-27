import React from "react";
import { Tag, EComponentSize } from "@sberbusiness/triplex-next";

const SIZES = Object.values(EComponentSize);

const EDIT_BUTTON_PROPS = { "aria-label": "Редактировать" };
const REMOVE_BUTTON_PROPS = { "aria-label": "Удалить" };

export const VisualTests = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        {SIZES.map((size) => (
            <div key={size} style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
                <Tag id={`${size}-default`} size={size} onRemove={() => {}} removeButtonProps={REMOVE_BUTTON_PROPS}>
                    {size.toUpperCase()}
                </Tag>
                <Tag
                    id={`${size}-editable`}
                    size={size}
                    onEdit={() => {}}
                    onRemove={() => {}}
                    editButtonProps={EDIT_BUTTON_PROPS}
                    removeButtonProps={REMOVE_BUTTON_PROPS}
                >
                    {size.toUpperCase()} editable
                </Tag>
                <Tag
                    id={`${size}-disabled`}
                    size={size}
                    disabled
                    onEdit={() => {}}
                    onRemove={() => {}}
                    editButtonProps={EDIT_BUTTON_PROPS}
                    removeButtonProps={REMOVE_BUTTON_PROPS}
                >
                    {size.toUpperCase()} disabled
                </Tag>
            </div>
        ))}
        <div style={{ maxWidth: 240 }}>
            <Tag
                id="overflow"
                size={EComponentSize.LG}
                onEdit={() => {}}
                onRemove={() => {}}
                editButtonProps={EDIT_BUTTON_PROPS}
                removeButtonProps={REMOVE_BUTTON_PROPS}
            >
                Very long tag text that should be truncated with ellipsis
            </Tag>
        </div>
    </div>
);
