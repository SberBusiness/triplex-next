import React from "react";

/** Описание ноды компонента CollapsibleTree. */
export interface ICollapsibleTreeNodeData {
    /** Уникальный идентификатор ноды в дереве. */
    id: string;
    /** Содержимое заголовка ноды. */
    label: React.ReactNode;
    /** Начальное состояние раскрытия ноды. */
    defaultOpened?: boolean;
    /** Дочерние ноды. Если массив пуст или не передан — нода считается листом без шеврона. */
    children?: ICollapsibleTreeNodeData[];
}
