import { AbstractTreeNode } from "../AbstractTree/AbstractTreeNode";

/**
 * Абстрактная нода TreeView.
 * Нода верхнего уровня является деревом.
 * Реализация на основе AbstractTreeNode с дополнительными свойствами active, opened, tabIndex.
 */
export class TreeViewAbstractNode extends AbstractTreeNode<TreeViewAbstractNode> {
    private readonly id: string;
    private active?: boolean;
    private opened?: boolean;
    private tabIndex = -1;

    constructor(props: { id: string }) {
        super();

        this.id = props.id;
    }

    /** Возвращает tabIndex ноды. */
    public getTabIndex = (): number => this.tabIndex;

    /** Устанавливает tabIndex ноды. */
    public setTabIndex = (tabIndex: number): void => {
        this.tabIndex = tabIndex;
    };

    /** Возвращает id ноды. */
    public getId = (): string => this.id;

    /** Возвращает флаг активности ноды. */
    public getActive = (): boolean => Boolean(this.active);

    /** Устанавливает флаг активности ноды. */
    public setActive = (active: boolean): void => {
        this.active = active;
    };

    /** Возвращает флаг раскрытости ноды. */
    public getOpened = (): boolean => Boolean(this.opened);

    /** Устанавливает флаг раскрытости ноды. */
    public setOpened = (opened: boolean): void => {
        this.opened = opened;
    };
}
