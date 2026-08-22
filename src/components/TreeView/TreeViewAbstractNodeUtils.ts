import { traverseAbstractTree } from "../AbstractTree/AbstractTreeNode";
import { TreeViewAbstractNode } from "./TreeViewAbstractNode";

/** Утилиты для работы с AbstractNode. */
interface ITreeViewAbstractNodeUtils {
    /** Возвращает активную ноду в случае ее наличия. */
    getActiveNode: (node: TreeViewAbstractNode) => TreeViewAbstractNode | undefined;
    /**
     * Возвращает следующую ноду текущего уровня. Если prevNode имеет дочерние ноды, и prevNode.getOpened() === true будет
     * возвращена первая дочерняя нода. Если prevNode - последняя нода текущего уровня, будет возвращена следующая нода
     * верхнего уровня. Если верхний уровень - rootNode, будет возвращена первая дочерняя нода rootNode.
     */
    getNextNode: (prevNode: TreeViewAbstractNode) => TreeViewAbstractNode;
    /** Возвращает следующую ноду текущего уровня. Если prevNode - последняя нода, будет возвращено undefined. */
    getNextSiblingNode: (prevNode: TreeViewAbstractNode) => TreeViewAbstractNode | undefined;
    /** Возвращает AbstractNode по id. */
    getNode: (nodeId: string, rootNode: TreeViewAbstractNode) => TreeViewAbstractNode | undefined;
    /**
     * Возвращает предыдущую ноду текущего уровня дерева. Если предыдущая нода имеет детей и она раскрыта, будет возвращена
     * последняя ее дочерняя нода. Если nextNode - первая нода, будет возвращена родительская нода. Если верхний
     * уровень - rootNode, будет возвращена последняя дочерняя нода rootNode.
     */
    getPrevNode: (nextNode: TreeViewAbstractNode) => TreeViewAbstractNode;
    /** Возвращает предыдущую ноду текущего уровня дерева. В случае если nextNode - первая нода, будет возвращено undefined. */
    getPrevSiblingNode: (nextNode: TreeViewAbstractNode) => TreeViewAbstractNode | undefined;
    /** Возвращает true если нода - последняя в дереве. */
    isLastNode: (node: TreeViewAbstractNode) => boolean;
    /**
     * Устанавливает флаг активности AbstractNode для следующей ноды дерева. Если нода раскрыта, будет активна первая
     * дочерняя нода, если нода закрыта - будет активирована следующая нода этого же уровня.
     */
    setActiveNextNode: (rootNode: TreeViewAbstractNode) => void;
    /** Устанавливает флаг активности AbstractNode. */
    setActiveNode: (node: TreeViewAbstractNode, rootNode: TreeViewAbstractNode, isActive: boolean) => void;
    /** Устанавливает флаг активности AbstractNode для предыдущей ноды дерева. */
    setActivePrevNode: (rootNode: TreeViewAbstractNode) => void;
}

/** Возвращает последнюю дочернюю ноду. Вызывается только для нод, у которых есть дочерние ноды. */
const getLastChildNode = (node: TreeViewAbstractNode): TreeViewAbstractNode => {
    const children = node.getChildren();

    return children[children.length - 1];
};

/**
 * Возвращает индекс ноды среди дочерних нод родителя.
 * Если нода среди них не найдена, возвращает 0 - нода трактуется как первая.
 */
const getNodeIndexInParent = (node: TreeViewAbstractNode, parentNodeChildren: TreeViewAbstractNode[]): number => {
    const index = parentNodeChildren.findIndex((n) => n.getId() === node.getId());

    return index === -1 ? 0 : index;
};

/** Утилиты для работы с AbstractNode. */
export const TreeViewAbstractNodeUtils: ITreeViewAbstractNodeUtils = {
    getActiveNode: (node) => {
        let activeNode: TreeViewAbstractNode | undefined;

        traverseAbstractTree(node, (n) => {
            if (n.getActive()) {
                activeNode = n;
                // Не углубляться в дочерние ноды.
                return false;
            }

            // Продолжить обход дерева.
            return true;
        });

        return activeNode;
    },
    getNextNode: (node) => {
        const childrenNodes = node.getChildren();
        // Нода раскрыта и имеются дочерние ноды: следующей нодой будет первая дочерняя нода.
        if (node.getOpened() && childrenNodes.length) {
            return childrenNodes[0];
        }

        const nextSiblingNode = TreeViewAbstractNodeUtils.getNextSiblingNode(node);
        // Найдена следующая нода текущего уровня вложенности.
        if (nextSiblingNode) {
            return nextSiblingNode;
        }

        let nextNode = node;

        while (true) {
            // as TreeViewAbstractNode потому что .getParent() может вернуть null только для rootNode, prevNode не может быть rootNode.
            const parentNode = nextNode.getParent() as TreeViewAbstractNode;

            if (parentNode.getParent()) {
                const nextSiblingParenNode = TreeViewAbstractNodeUtils.getNextSiblingNode(parentNode);
                // Найдена следующая нода верхнего уровня вложенности.
                if (nextSiblingParenNode) {
                    nextNode = nextSiblingParenNode;
                    break;
                }
            }
            // Если parentNode является rootNode.
            else {
                // Следующая нода - первая нода дерева.
                nextNode = parentNode.getChildren()[0];
                break;
            }

            nextNode = parentNode;
        }

        return nextNode;
    },
    getNextSiblingNode: (node) => {
        const parentNode = node.getParent();
        // node является rootNode.
        if (!parentNode) {
            return undefined;
        }

        const parentNodeChildren = parentNode.getChildren();
        // Индекс текущей ноды среди дочерних нод родителя.
        const currentNodeIndex = getNodeIndexInParent(node, parentNodeChildren);

        // Текущая нода - последняя.
        if (currentNodeIndex === parentNodeChildren.length - 1) {
            return undefined;
        }

        // Возвращается следующая нода.
        return parentNodeChildren[currentNodeIndex + 1];
    },
    getNode: (nodeId, rootNode) => {
        let result: TreeViewAbstractNode | undefined;

        traverseAbstractTree(rootNode, (node) => {
            if (node.getId() === nodeId) {
                result = node;
                // Не углубляться в дочерние ноды.
                return false;
            }

            // Продолжить обход дерева.
            return true;
        });

        return result;
    },
    getPrevNode: (node) => {
        const prevSiblingNode = TreeViewAbstractNodeUtils.getPrevSiblingNode(node);

        // Предыдущая нода текущего уровня вложенности не найдена.
        if (!prevSiblingNode) {
            // as TreeViewAbstractNode потому что .getParent() может вернуть null только для rootNode, nextNode не может быть rootNode.
            const parentNode = node.getParent() as TreeViewAbstractNode;

            if (parentNode.getParent()) {
                return parentNode;
            }
            // Если parentNode является rootNode.
            else {
                let lastChild = getLastChildNode(parentNode);

                // Отклонение (pre-existing): спуск идет без проверки getOpened(), в отличие от цикла ниже,
                // поэтому активной может стать нода внутри свернутой ветки. Подробности - в TreeView-ai.md.
                while (lastChild.getChildren().length > 0) {
                    lastChild = getLastChildNode(lastChild);
                }

                // Предыдущая нода - последняя нода дерева.
                return lastChild;
            }
        }

        let prevNode = prevSiblingNode;

        while (true) {
            // Предыдущая нода раскрыта и имеет дочерние ноды. Предыдущей станет последняя ее дочерняя нода.
            if (prevNode.getOpened() && prevNode.getChildren().length) {
                prevNode = getLastChildNode(prevNode);
            } else {
                break;
            }
        }

        return prevNode;
    },
    getPrevSiblingNode: (node) => {
        const parentNode = node.getParent();
        // node является rootNode.
        if (!parentNode) {
            return undefined;
        }

        const parentNodeChildren = parentNode.getChildren();
        // Индекс текущей ноды среди дочерних нод родителя.
        const currentNodeIndex = getNodeIndexInParent(node, parentNodeChildren);

        // Текущая нода - первая.
        if (currentNodeIndex === 0) {
            return undefined;
        }

        // Возвращается предыдущая нода.
        return parentNodeChildren[currentNodeIndex - 1];
    },
    isLastNode: (node) => {
        const parentNode = node.getParent();

        if (parentNode) {
            // Если нода является последней на текущем уровне.
            if (getLastChildNode(parentNode) === node) {
                return TreeViewAbstractNodeUtils.isLastNode(parentNode);
            }
        }
        // node является rootNode.
        else {
            return true;
        }

        return false;
    },
    setActiveNextNode: (rootNode) => {
        const activeNode = TreeViewAbstractNodeUtils.getActiveNode(rootNode);

        if (activeNode) {
            const nextNode = TreeViewAbstractNodeUtils.getNextNode(activeNode);

            TreeViewAbstractNodeUtils.setActiveNode(nextNode, rootNode, true);
        }
    },
    setActiveNode: (node, rootNode, isActive) => {
        if (isActive) {
            node.setActive(true);

            traverseAbstractTree(rootNode, (n) => {
                if (n.getActive() && n.getId() !== node.getId()) {
                    // Сброс флага активности всех других нод, активная может быть только одна нода.
                    n.setActive(false);
                }

                // Продолжить обход дерева.
                return true;
            });
        } else {
            node.setActive(false);
        }
    },
    setActivePrevNode: (rootNode) => {
        const activeNode = TreeViewAbstractNodeUtils.getActiveNode(rootNode);

        if (activeNode) {
            const prevNode = TreeViewAbstractNodeUtils.getPrevNode(activeNode);

            TreeViewAbstractNodeUtils.setActiveNode(prevNode, rootNode, true);
        }
    },
};
