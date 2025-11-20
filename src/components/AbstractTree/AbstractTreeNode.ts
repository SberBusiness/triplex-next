import { isEqual } from "lodash-es";

/** Базовая реализация абстрактного дерева. */
export class AbstractTreeNode<T extends AbstractTreeNode<T>> {
    // Массив дочерних нод.
    private children: T[] = [];
    // Родительская нода.
    private parent: T | null = null;

    /** Возвращает дочерние ноды. */
    public getChildren = (): T[] => this.children;

    /** Добавляет дочернюю ноду к текущим. */
    public addChild = (node: T, prevNode?: T, nextNode?: T): void => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        node.setParent(this);

        if (prevNode) {
            const index = this.children.findIndex((n) => isEqual(n, prevNode));
            this.children.splice(index + 1, 0, node);
        } else if (nextNode) {
            const index = this.children.findIndex((n) => isEqual(n, nextNode));
            this.children.splice(index, 0, node);
        } else {
            this.children.push(node);
        }
    };

    /** Удаляет дочернюю ноду. */
    public removeChild = (node: T): void => {
        const index = this.children.findIndex((n) => isEqual(n, node));
        if (index > -1) {
            this.children.splice(index, 1);
            node.setParent(null);
        }
    };

    /** Устанавливает дочерние ноды вместо текущих дочерних нод. */
    public setChildren = (nodes: T[]): void => {
        this.children.forEach((c) => c.setParent(null));

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        nodes.forEach((node) => node.setParent(this));
        this.children = nodes;
    };

    /** Возвращает родительскую ноду. */
    public getParent = (): T | null => this.parent;

    /** Устанавливает родительскую ноду. */
    public setParent = (node: T | null) => {
        this.parent = node;
    };
}

/**
 * Обходит дерево сверху вниз с вызовом коллбека на каждой дочерней ноде.
 * @param node Нода.
 * @param callback Коллбек, если коллбек возвращает false обход дерева прекращается.
 */
export function traverseAbstractTree<VisionNode extends AbstractTreeNode<VisionNode>>(
    node: VisionNode,
    callback: (node: VisionNode) => boolean,
): void {
    const result = callback(node);
    if (result && node.getChildren().length) {
        for (const child of node.getChildren()) {
            traverseAbstractTree<VisionNode>(child, callback);
        }
    }
}
