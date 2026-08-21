import React from "react";
import { TreeViewAbstractNode } from "./TreeViewAbstractNode";

/** Возвращает AbstractNode по id. */
export type TTreeViewContextGetNode = (nodeId: string) => TreeViewAbstractNode | undefined;

/** Добавляет AbstractNode в AbstractTree. AbstractTree является AbstractNode. */
export type TTreeViewContextRegisterNode = (
    node: TreeViewAbstractNode,
    parentNode: TreeViewAbstractNode,
    prevNode?: TreeViewAbstractNode,
    nextNode?: TreeViewAbstractNode,
) => void;

/** Удаляет AbstractNode из AbstractTree. */
export type TTreeViewContextRemoveNode = (node: TreeViewAbstractNode) => void;

/** Устанавливает флаг активности AbstractNode. */
export type TTreeViewContextSetActiveNode = (node: TreeViewAbstractNode, active: boolean) => void;

/** Устанавливает флаг opened AbstractNode. */
export type TTreeViewContextSetOpenedNode = (node: TreeViewAbstractNode, opened: boolean) => void;

/** Контекст TreeView. */
export interface ITreeViewContext {
    /**
     * Число обновлений абстрактного дерева.
     * Используется для индикации изменения дерева т.к. изменение мутируемого объекта rootNode не вызывает триггер изменения контекста.
     */
    updateCount: number;
    /** Возвращает TreeViewAbstractNode по id. */
    getNode: TTreeViewContextGetNode;
    /** Родительская TreeViewAbstractNode. Каждая нода переопределяет ее для своих детей. */
    parentNode: TreeViewAbstractNode;
    /** Рутовая нода абстрактного дерева. */
    rootNode: TreeViewAbstractNode | null;
    /** Добавляет TreeViewAbstractNode в AbstractTree. AbstractTree также является AbstractNode. */
    registerNode: TTreeViewContextRegisterNode;
    /** Удаляет TreeViewAbstractNode из AbstractTree. */
    removeNode: TTreeViewContextRemoveNode;
    /** Устанавливает флаг активности AbstractNode. */
    setActiveNode: TTreeViewContextSetActiveNode;
    /** Устанавливает флаг раскрытости AbstractNode. */
    setOpenedNode: TTreeViewContextSetOpenedNode;
}

/**
 * Начальное значение контекста.
 * Используется только для типизации createContext, реальные значения устанавливает TreeView.
 */
export const initialTreeContext: ITreeViewContext = {
    getNode: () => undefined,
    parentNode: new TreeViewAbstractNode({ id: "contextNode" }),
    registerNode: () => {},
    removeNode: () => {},
    rootNode: null,
    setActiveNode: () => {},
    setOpenedNode: () => {},
    updateCount: 0,
};

export const TreeViewContext = React.createContext<ITreeViewContext>(initialTreeContext);

/** Свойства контекста, добавляемые withTreeViewContext. */
export interface IWithTreeViewContextProps {
    /** Контекст TreeView. Подставляется HOC-ом withTreeViewContext, снаружи передавать не нужно. */
    treeViewContext: ITreeViewContext;
}

/** HOC, предоставляющий TreeViewContext через prop treeViewContext. */
export function withTreeViewContext<T extends IWithTreeViewContextProps>(
    WrapperComponent: React.ComponentType<T>,
): React.ComponentType<Omit<T, keyof IWithTreeViewContextProps>> {
    const displayName = WrapperComponent.displayName || WrapperComponent.name || "Component";

    const ComponentWithTreeViewContext = (props: Omit<T, keyof IWithTreeViewContextProps>) => (
        <TreeViewContext.Consumer>
            {(context) => <WrapperComponent {...(props as T)} treeViewContext={context} />}
        </TreeViewContext.Consumer>
    );

    ComponentWithTreeViewContext.displayName = `WithTreeViewContext(${displayName})`;

    return ComponentWithTreeViewContext;
}
