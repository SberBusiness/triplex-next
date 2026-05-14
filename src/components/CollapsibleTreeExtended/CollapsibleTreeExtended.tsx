import React from "react";
import { ITreeViewProps, TreeView } from "../TreeView/TreeView";
import { CollapsibleTreeExtendedNode } from "./components/CollapsibleTreeExtendedNode";

/** Свойства CollapsibleTreeExtended. */
export interface ICollapsibleTreeExtendedProps extends ITreeViewProps {}

export interface ICollapsibleTreeExtendedSFC extends React.FC<ICollapsibleTreeExtendedProps> {
    Node: typeof CollapsibleTreeExtendedNode;
}

/**
 * Низкоуровневое декларативное дерево с раскрывающимися узлами. Обёртка над TreeView, добавляющая accordion-логику
 * (анимация раскрытия, контролируемое/неконтролируемое состояние) для каждого узла.
 *
 * Каждый узел рендерится через `CollapsibleTreeExtended.Node` с двумя render-функциями:
 * - `renderHeader` — видимая часть узла (любая разметка: кнопка с шевроном, текст, иконка-toggle и т.п.);
 * - `renderBody` — раскрываемое содержимое (обычно дочерние узлы, но может быть любым контентом).
 *
 * Используй этот компонент, когда нужен нестандартный UI узла: своя иконка раскрытия, кастомный header, нестандартное
 * поведение клика. Для типового UI (готовый шеврон, hover, focus-visible) используй обёртку {@link CollapsibleTree}.
 *
 * @see CollapsibleTree — готовая обёртка с типовым UI узла.
 */
const CollapsibleTreeExtended: ICollapsibleTreeExtendedSFC = (props) => <TreeView {...props} />;

CollapsibleTreeExtended.displayName = "CollapsibleTreeExtended";
CollapsibleTreeExtended.Node = CollapsibleTreeExtendedNode;

export { CollapsibleTreeExtended };
