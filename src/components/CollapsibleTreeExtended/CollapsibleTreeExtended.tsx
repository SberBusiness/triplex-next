import React from "react";
import { ITreeViewProps, TreeView } from "../TreeView/TreeView";
import { CollapsibleTreeExtendedNode } from "./components/CollapsibleTreeExtendedNode";

/** Свойства CollapsibleTreeExtended. */
export interface ICollapsibleTreeExtendedProps extends ITreeViewProps {}

/**
 * Тип компонента "Низкоуровневое дерево с раскрывающимися узлами" со статическими субкомпонентами.
 *
 * Явная аннотация снимает проверку лишних свойств у Object.assign, поэтому при добавлении
 * или удалении статики этот интерфейс нужно править синхронно: иначе новая статика окажется
 * в рантайме, но не попадёт в публичный тип, и TypeScript промолчит.
 */
export interface ICollapsibleTreeExtendedFC extends React.ForwardRefExoticComponent<
    ICollapsibleTreeExtendedProps & React.RefAttributes<HTMLUListElement>
> {
    /** Нода дерева. */
    Node: typeof CollapsibleTreeExtendedNode;
}

/**
 * @deprecated Используйте ICollapsibleTreeExtendedFC. Алиас сохранён, чтобы не ломать существующие импорты.
 */
export type ICollapsibleTreeExtendedSFC = ICollapsibleTreeExtendedFC;

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
 * ref указывает на корневой <ul role="tree">.
 *
 * @see CollapsibleTree — готовая обёртка с типовым UI узла.
 */
const CollapsibleTreeExtended: ICollapsibleTreeExtendedFC = Object.assign(
    React.forwardRef<HTMLUListElement, ICollapsibleTreeExtendedProps>((props, ref) => (
        <TreeView {...props} ref={ref} />
    )),
    {
        Node: CollapsibleTreeExtendedNode,
    },
);

CollapsibleTreeExtended.displayName = "CollapsibleTreeExtended";

export { CollapsibleTreeExtended };
