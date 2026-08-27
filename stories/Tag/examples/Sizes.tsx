import React from "react";
import { Tag, EComponentSize } from "@sberbusiness/triplex-next";

const SIZES = Object.values(EComponentSize);

export const Sizes = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {SIZES.map((size) => (
            <div key={size}>
                <div style={{ marginBottom: 8, fontSize: 16, fontWeight: 700 }}>{size.toUpperCase()}</div>
                <Tag
                    id={`${size}-tag`}
                    size={size}
                    onEdit={() => {}}
                    onRemove={() => {}}
                    editButtonProps={{ "aria-label": "Редактировать" }}
                    removeButtonProps={{ "aria-label": "Удалить" }}
                >
                    Selected value
                </Tag>
            </div>
        ))}
    </div>
);
