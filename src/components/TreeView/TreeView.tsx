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
    children: React.ReactNode;
}

/** Состояние TreeView. */
interface ITreeViewState {
    /**
     * Число обновлений абстрактного дерева.
     * Используется для индикации изменения дереве т.к. изменение мутируемого объекта rootNode не вызывает триггер изменения контекста.
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
    private treeNode: HTMLUListElement | null = null;

    constructor(props: ITreeViewProps) {
        super(props);

        this.abstractRootNode = new TreeViewAbstractNode({ id: rootNodeId });

        this.state = {
            updateCount: 0,
        };
    }

    public componentDidMount(): void {
        window.addEventListener("keydown", this.handleKeyDown);
    }

    public componentWillUnmount(): void {
        window.removeEventListener("keydown", this.handleKeyDown);
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
                <ul className={clsx(styles.treeView, className)} role="tree" {...props} ref={this.setTreeDOMNode}>
                    {children}
                </ul>
            </TreeViewContext.Provider>
        );
    }

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
            this.setState(({ updateCount: prevCount }) => ({ updateCount: prevCount++ }));
        }
    };

    /** Добавляет ноду в родительскую ноду. */
    private registerNode: TTreeViewContextRegisterNode = (node, parentNode, prevNode, nextNode) => {
        parentNode.addChild(node, prevNode, nextNode);
        this.updateTabIndexNodes();
        this.setState(({ updateCount: prevCount }) => ({ updateCount: prevCount++ }));
    };

    /** Удаляет ноду из родительской ноды. */
    private removeNode: TTreeViewContextRemoveNode = (node) => {
        node.getParent()?.removeChild(node);
        this.updateTabIndexNodes();
    };

    /** Установка флага активности ноды. */
    private setActiveNode: TTreeViewContextSetActiveNode = (node, active) => {
        TreeViewAbstractNodeUtils.setActiveNode(node, this.abstractRootNode, active);
        this.setState(({ updateCount: prevCount }) => ({ updateCount: prevCount++ }));
    };

    /** Установка флага opened ноды. */
    private setOpenedNode: TTreeViewContextSetOpenedNode = (node, opened) => {
        node.setOpened(opened);
        this.setState(({ updateCount: prevCount }) => ({ updateCount: prevCount++ }));
    };

    /** Возвращает AbstractNode по id. */
    private getNode: TTreeViewContextGetNode = (nodeId) =>
        TreeViewAbstractNodeUtils.getNode(nodeId, this.abstractRootNode);

    private setTreeDOMNode = (DOMNode: HTMLUListElement) => (this.treeNode = DOMNode);

    /** Обработка нажатия на клавиш для навигации с клавиатуры. */
    private handleKeyDown = (event: KeyboardEvent) => {
        // Перемещение с клавиатуры активно, когда есть активная нода.
        if (!TreeViewAbstractNodeUtils.getActiveNode(this.abstractRootNode)) {
            return;
        }

        if (EVENT_KEY_CODES.ARROW_DOWN === event.keyCode) {
            // Устанавливает активность следующей ноды.
            TreeViewAbstractNodeUtils.setActiveNextNode(this.abstractRootNode);
            // Предотвращает скролл страницы.
            event.preventDefault();
            this.setState(({ updateCount: prevCount }) => ({ updateCount: prevCount++ }));
        } else if (EVENT_KEY_CODES.ARROW_UP === event.keyCode) {
            // Устанавливает активность предыдущей ноды.
            TreeViewAbstractNodeUtils.setActivePrevNode(this.abstractRootNode);
            // Предотвращает скролл страницы.
            event.preventDefault();
            this.setState(({ updateCount: prevCount }) => ({ updateCount: prevCount++ }));
        }
    };
}
