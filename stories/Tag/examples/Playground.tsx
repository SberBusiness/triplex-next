import React from "react";
import { action } from "storybook/actions";
import { Tag, EComponentSize } from "@sberbusiness/triplex-next";

/** Аргументы стори Playground. */
export interface IPlaygroundArgs {
    /** Содержимое тега. */
    children: string;
    /** Размер. */
    size: EComponentSize;
    /** Отключенное состояние. */
    disabled: boolean;
    /** С кнопкой редактирования — кнопка появляется, когда передан onEdit. */
    withEditButton: boolean;
}

export const Playground = ({ children, size, disabled, withEditButton }: IPlaygroundArgs) => (
    <Tag
        id="playground-tag"
        size={size}
        disabled={disabled}
        onEdit={withEditButton ? action("onEdit") : undefined}
        onRemove={action("onRemove")}
        editButtonProps={{ "aria-label": "Редактировать" }}
        removeButtonProps={{ "aria-label": "Удалить" }}
    >
        {children}
    </Tag>
);
