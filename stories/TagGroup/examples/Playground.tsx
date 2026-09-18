import React from "react";
import { action } from "storybook/actions";
import { Tag, TagGroup, EComponentSize } from "@sberbusiness/triplex-next";

/** Аргументы стори Playground. */
export interface IPlaygroundArgs {
    /** Размер группы — отступ между тегами. */
    size: EComponentSize;
    /** С кнопкой редактирования у тегов. */
    withEditButton: boolean;
}

const TAGS = ["Selected value", "Another value", "One more value"];

export const Playground = ({ size, withEditButton }: IPlaygroundArgs) => (
    <TagGroup size={size} aria-label="Применённые фильтры">
        {TAGS.map((children, index) => (
            <Tag
                key={children}
                id={`playground-tag-${index}`}
                size={size}
                onEdit={withEditButton ? action("onEdit") : undefined}
                onRemove={action("onRemove")}
                editButtonProps={{ "aria-label": "Редактировать" }}
                removeButtonProps={{ "aria-label": "Удалить" }}
            >
                {children}
            </Tag>
        ))}
    </TagGroup>
);
