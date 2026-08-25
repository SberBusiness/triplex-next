import { EVENT_KEY_CODES } from "@sberbusiness/triplex-next/utils/keyboard";
import React from "react";
import { TreeViewAbstractNodeUtils } from "./TreeViewAbstractNodeUtils";
import {
    TreeViewContext,
    TTreeViewContextGetNode,
    TTreeViewContextRegisterNode,
    TTreeViewContextRemoveNode,
    TTreeViewContextSetActiveNode,
    TTreeViewContextSetOpenedNode,
} from "./TreeViewContext";
import { TreeViewAbstractNode } from "./TreeViewAbstractNode";
import { TreeViewNode } from "./components/TreeViewNode";
import { TreeViewGroup } from "./components/TreeViewGroup";
import clsx from "clsx";
import styles from "./styles/TreeView.module.less";

/** Свойства TreeView. */
export interface ITreeViewProps extends React.HTMLAttributes<HTMLUListElement> {
    /** Ноды дерева — TreeView.Node (напрямую или через компоненты-обёртки над ним). */
    children: React.ReactNode;
}

/** Состояние TreeView. */
interface ITreeViewState {
    /**
     * Число обновлений абстрактного дерева.
     * Используется для индикации изменения дерева т.к. изменение мутируемого объекта rootNode не вызывает триггер изменения контекста.
     */
    updateCount: number;
}

/** Идентификатор первой ноды дерева. */
const rootNodeId = "rootNode";

/**
 * Базовый компонент визуального дерева.
 * Добавляет нужную семантическую разметку.
 * Создает абстрактное дерево на основе текущего.
 * Устанавливает контекст для дочерних нод.
 * Реализует навигацию по дереву.
 *
 * Accessibility требования:
 * https://www.w3.org/TR/wai-aria-practices-1.1/examples/treeview/treeview-2/treeview-2a.html
 */
export class TreeView extends React.Component<ITreeViewProps, ITreeViewState> {
    public static displayName = "TreeView";
    public static Node = TreeViewNode;
    public static Group = TreeViewGroup;

    private readonly abstractRootNode: TreeViewAbstractNode;
    /** Глобальный слушатель keydown подписан. Он нужен только пока в дереве есть активная нода. */
    private keyDownListenerAttached = false;

    constructor(props: ITreeViewProps) {
        super(props);

        this.abstractRootNode = new TreeViewAbstractNode({ id: rootNodeId });

        this.state = {
            updateCount: 0,
        };
    }

    public componentWillUnmount(): void {
        this.detachKeyDownListener();
    }

    public render(): JSX.Element {
        const { children, className, ...props } = this.props;
        const { updateCount } = this.state;

        return (
            <TreeViewContext.Provider
                value={{
                    getNode: this.getNode,
                    parentNode: this.abstractRootNode,
                    registerNode: this.registerNode,
                    removeNode: this.removeNode,
                    rootNode: this.abstractRootNode,
                    setActiveNode: this.setActiveNode,
                    setOpenedNode: this.setOpenedNode,
                    updateCount,
                }}
            >
                {/* role после {...props}: семантика дерева - контракт компонента, потребитель ее не переопределяет. */}
                <ul className={clsx(styles.treeView, className)} {...props} role="tree">
                    {children}
                </ul>
            </TreeViewContext.Provider>
        );
    }

    /**
     * Увеличивает счетчик обновлений абстрактного дерева.
     * Значение попадает в контекст и сигнализирует дочерним нодам, что мутируемое дерево изменилось.
     */
    private incrementUpdateCount = () => {
        this.setState(({ updateCount }) => ({ updateCount: updateCount + 1 }));
    };

    /**
     * Обработка изменения контекста.
     * Установка tabIndex={0} для первой ноды, и tabIndex={-1} для остальных.
     */
    private updateTabIndexNodes = () => {
        // Ноды первого уровня вложенности.
        const firstLevelNodes = this.abstractRootNode.getChildren();
        let isContextChanged = false;

        firstLevelNodes.forEach((node, index) => {
            if (index === 0 && node.getTabIndex() !== 0) {
                node.setTabIndex(0);
                isContextChanged = true;
            } else if (index !== 0 && node.getTabIndex() === 0) {
                node.setTabIndex(-1);
                isContextChanged = true;
            }
        });

        if (isContextChanged) {
            this.incrementUpdateCount();
        }
    };

    /** Добавляет ноду в родительскую ноду. */
    private registerNode: TTreeViewContextRegisterNode = (node, parentNode, prevNode, nextNode) => {
        parentNode.addChild(node, prevNode, nextNode);
        this.updateTabIndexNodes();
        this.incrementUpdateCount();
    };

    /** Удаляет ноду из родительской ноды. */
    private removeNode: TTreeViewContextRemoveNode = (node) => {
        node.getParent()?.removeChild(node);
        this.updateTabIndexNodes();
        // Удалена могла быть активная нода - тогда слушатель стрелок больше не нужен.
        this.syncKeyDownListener();
        // Соседние ноды должны перерисоваться: после удаления у них могли измениться hasChildNodes и isLastNode.
        this.incrementUpdateCount();
    };

    /** Установка флага активности ноды. */
    private setActiveNode: TTreeViewContextSetActiveNode = (node, active) => {
        TreeViewAbstractNodeUtils.setActiveNode(node, this.abstractRootNode, active);
        this.syncKeyDownListener();
        this.incrementUpdateCount();
    };

    /**
     * Подписывает и отписывает глобальный слушатель keydown по наличию активной ноды.
     * Пока активной ноды нет, дерево не обрабатывает стрелки и не отменяет скролл страницы.
     */
    private syncKeyDownListener = () => {
        const hasActiveNode = Boolean(TreeViewAbstractNodeUtils.getActiveNode(this.abstractRootNode));

        if (hasActiveNode && !this.keyDownListenerAttached) {
            window.addEventListener("keydown", this.handleKeyDown);
            this.keyDownListenerAttached = true;
        } else if (!hasActiveNode && this.keyDownListenerAttached) {
            this.detachKeyDownListener();
        }
    };

    /** Отписывает глобальный слушатель keydown. */
    private detachKeyDownListener = () => {
        window.removeEventListener("keydown", this.handleKeyDown);
        this.keyDownListenerAttached = false;
    };

    /** Установка флага opened ноды. */
    private setOpenedNode: TTreeViewContextSetOpenedNode = (node, opened) => {
        node.setOpened(opened);
        this.incrementUpdateCount();
    };

    /** Возвращает AbstractNode по id. */
    private getNode: TTreeViewContextGetNode = (nodeId) =>
        TreeViewAbstractNodeUtils.getNode(nodeId, this.abstractRootNode);

    /** Обработка нажатия на клавиш для навигации с клавиатуры. */
    private handleKeyDown = (event: KeyboardEvent) => {
        // Перемещение с клавиатуры активно, когда есть активная нода.
        if (!TreeViewAbstractNodeUtils.getActiveNode(this.abstractRootNode)) {
            return;
        }

        if (EVENT_KEY_CODES.ARROW_DOWN === event.keyCode) {
            // Устанавливает активность следующей ноды.
            TreeViewAbstractNodeUtils.setActiveNextNode(this.abstractRootNode);
        } else if (EVENT_KEY_CODES.ARROW_UP === event.keyCode) {
            // Устанавливает активность предыдущей ноды.
            TreeViewAbstractNodeUtils.setActivePrevNode(this.abstractRootNode);
        } else {
            return;
        }

        // Предотвращает скролл страницы.
        event.preventDefault();
        this.incrementUpdateCount();
    };
}
