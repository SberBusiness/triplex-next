import React from "react";
import { DropdownListItem } from "./DropdownListItem";
import { EVENT_KEY_CODES } from "@sberbusiness/triplex-next/utils/keyboard";
import { DropdownListContext } from "@sberbusiness/triplex-next/components/Dropdown/DropdownListContext";
import clsx from "clsx";
import stylesDropdownList from "../styles/DropdownList.module.less";

/** Свойства компонента DropdownList. */
export interface IDropdownListProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Dropdown открыт. */
    dropdownOpened: boolean;
    /** Объект для создания ссылки на html-элемент "список". */
    listRef?: React.RefObject<HTMLDivElement>;
}

/** Состояние компонента DropdownList. */
interface IDropdownListState {
    /** Индекс текущего выделенного элемента списка при навигации с клавиатуры. */
    activeListItemIndex?: number;
}

/**
 * Компонент DropdownList.
 * Используется для обрамления вложенного списка и добавляет спику возможность навигации с клавиатуры.
 * В качестве children принимает только DropdownList.Item.
 */
export class DropdownList extends React.Component<IDropdownListProps, IDropdownListState> {
    public static Item = DropdownListItem;

    static contextType = DropdownListContext;

    declare context: React.ContextType<typeof DropdownListContext>;

    // Массив рефов на элементы списка.
    private listItems: React.RefObject<HTMLDivElement>[] = [];
    // Ref контейнера списка.
    private containerRef: React.RefObject<HTMLDivElement>;

    constructor(props: IDropdownListProps) {
        super(props);

        this.containerRef = props.listRef || React.createRef<HTMLDivElement>();
    }

    state: IDropdownListState = {
        activeListItemIndex: undefined,
    };

    public componentDidMount(): void {
        const { dropdownOpened } = this.props;

        if (dropdownOpened) {
            document.addEventListener("keydown", this.handleKeyDown);

            this.handleOpenDropdown();
        }
    }

    public componentDidUpdate(prevProps: IDropdownListProps, prevState: IDropdownListState): void {
        const { dropdownOpened } = this.props;
        const { activeListItemIndex } = this.state;
        const { activeDescendant, setActiveDescendant } = this.context;
        const { dropdownOpened: prevDropdownOpened } = prevProps;
        const { activeListItemIndex: prevActiveListItemIndex } = prevState;

        if (dropdownOpened && !prevDropdownOpened) {
            document.addEventListener("keydown", this.handleKeyDown);

            this.handleOpenDropdown();
        } else if (!dropdownOpened && prevDropdownOpened) {
            document.removeEventListener("keydown", this.handleKeyDown);
            if (activeDescendant !== undefined) {
                setActiveDescendant();
            }
        } else if (activeListItemIndex !== undefined && prevActiveListItemIndex !== activeListItemIndex) {
            setActiveDescendant(this.listItems[activeListItemIndex]?.current?.id);
        }
    }

    public componentWillUnmount(): void {
        const { activeDescendant, setActiveDescendant } = this.context;

        document.removeEventListener("keydown", this.handleKeyDown);
        if (activeDescendant !== undefined) {
            setActiveDescendant();
        }
    }

    public render(): JSX.Element {
        const { children, className, dropdownOpened, listRef, ...htmlDivAttributes } = this.props;
        const classNames = clsx(stylesDropdownList.dropdownList, className);

        return (
            <div className={classNames} role="listbox" ref={this.containerRef} {...htmlDivAttributes}>
                {this.renderChildren()}
            </div>
        );
    }

    private setListItemRef: (index: number) => React.RefObject<HTMLDivElement> = (index) => {
        const ref = React.createRef<HTMLDivElement>();
        this.listItems[index] = ref;
        return ref;
    };

    /**
     * Обработка открытия Dropdown.
     * Скролл к выбранному значению и установка activeListItemIndex.
     */
    private handleOpenDropdown = () => {
        const { children } = this.props;

        // Есть выбранное значение.
        let isSelectedItemExist = false;

        React.Children.forEach(children, (child, index) => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            if (child && child.props && child.props.selected) {
                isSelectedItemExist = true;
                this.scrollContainerToItem(index);

                this.setState({
                    activeListItemIndex: index,
                });
            }
        });

        // Нет выбранного значения, контейнер скроллится к первому значению.
        if (!isSelectedItemExist) {
            // activeListItemIndex - первый элемент списка.
            this.setState({
                activeListItemIndex: 0,
            });
            this.scrollContainerToTop();
        }
    };

    /**
     * Скролл контейнера к элементу списка.
     */
    private scrollContainerToItem = (itemIndex: number) => {
        const parent = this.containerRef?.current;
        const activeItem = this.listItems[itemIndex]?.current;

        if (parent && activeItem) {
            const { top: parentTop, bottom: parentBottom } = parent.getBoundingClientRect();
            const { top: itemTop, bottom: itemBottom } = activeItem.getBoundingClientRect();
            const offset = 4;

            // Item выше верхней границы parent.
            if (parentTop > itemTop) {
                parent.scrollTop = parent.scrollTop - parentTop + itemTop - offset;
            } else if (itemBottom > parentBottom) {
                // Item ниже нижней границы parent.
                parent.scrollTop = parent.scrollTop + itemBottom - parentBottom + offset;
            }
        }
    };

    /**
     * Скролл контейнера к началу списка.
     */
    private scrollContainerToTop = () => {
        const container = this.containerRef?.current;

        if (container) {
            container.scrollTop = 0;
        }
    };

    private handleKeyDown = (event: KeyboardEvent) => {
        const { keyCode } = event;
        const { children } = this.props;
        const { activeListItemIndex } = this.state;
        const childrenLength = React.Children.count(children);
        let nextActiveListItemIndex;

        if (keyCode === EVENT_KEY_CODES.ARROW_DOWN) {
            if (activeListItemIndex !== undefined) {
                if (activeListItemIndex < childrenLength - 1) {
                    // Следующий за текущим элемент списка.
                    nextActiveListItemIndex = activeListItemIndex + 1;
                } else {
                    // Первый элемент списка.
                    nextActiveListItemIndex = 0;
                }
            } else {
                // Первый элемент списка.
                nextActiveListItemIndex = 0;
            }

            event.preventDefault();
        } else if (keyCode === EVENT_KEY_CODES.ARROW_UP) {
            if (activeListItemIndex !== undefined) {
                if (activeListItemIndex > 0) {
                    // Предыдущий элемент списка.
                    nextActiveListItemIndex = activeListItemIndex - 1;
                } else {
                    // Последний элемент списка.
                    nextActiveListItemIndex = childrenLength - 1;
                }
            } else {
                // Последний элемент списка.
                nextActiveListItemIndex = childrenLength - 1;
            }

            event.preventDefault();
        }

        if (nextActiveListItemIndex !== undefined && activeListItemIndex !== nextActiveListItemIndex) {
            this.scrollContainerToItem(nextActiveListItemIndex);

            this.setState({
                activeListItemIndex: nextActiveListItemIndex,
            });
        }
    };

    private renderChildren = () => {
        const { children, dropdownOpened } = this.props;
        const { activeListItemIndex } = this.state;

        return React.Children.map(children, (child, index) => {
            if (!child) {
                return;
            }

            return React.cloneElement(child as React.ReactElement, {
                active: dropdownOpened && activeListItemIndex === index,
                onMouseOver: (event: MouseEvent) => {
                    this.setState({
                        activeListItemIndex: index,
                    });

                    // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
                    (child as React.ReactElement).props.onMouseOver?.(event);
                },
                ref: this.setListItemRef(index),
            });
        });
    };
}
