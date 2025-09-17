import React, { useContext, useEffect, useRef, useState } from "react";
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

/** Индекс текущего выделенного элемента списка при навигации с клавиатуры. */
type TActiveListItemIndex = number | undefined;

/**
 * Компонент DropdownList.
 * Используется для обрамления вложенного списка и добавляет спику возможность навигации с клавиатуры.
 * В качестве children принимает только DropdownList.Item.
 */
export interface IDropdownListComponent extends React.FC<IDropdownListProps> {
    Item: typeof DropdownListItem;
}

export const DropdownList: IDropdownListComponent = (props) => {
    const { children, className, dropdownOpened, listRef, ...htmlDivAttributes } = props;
    const classNames = clsx(stylesDropdownList.dropdownList, className);

    const { activeDescendant, setActiveDescendant } = useContext(DropdownListContext);

    // Ref контейнера списка.
    const containerRef = listRef || React.createRef<HTMLDivElement>();
    // Массив рефов на элементы списка.
    const listItemsRef = useRef<Array<React.RefObject<HTMLDivElement>>>([]);
    const [activeListItemIndex, setActiveListItemIndex] = useState<TActiveListItemIndex>(undefined);

    const childrenCount = React.Children.count(children);

    const setListItemRef = (index: number): React.RefObject<HTMLDivElement> => {
        const ref = React.createRef<HTMLDivElement>();
        listItemsRef.current[index] = ref;
        return ref;
    };

    const scrollContainerToItem = (itemIndex: number) => {
        const parent = containerRef?.current;
        const activeItem = listItemsRef.current[itemIndex]?.current;

        if (parent && activeItem) {
            const { top: parentTop, bottom: parentBottom } = parent.getBoundingClientRect();
            const { top: itemTop, bottom: itemBottom } = activeItem.getBoundingClientRect();
            const offset = 4;

            if (parentTop > itemTop) {
                parent.scrollTop = parent.scrollTop - parentTop + itemTop - offset;
            } else if (itemBottom > parentBottom) {
                parent.scrollTop = parent.scrollTop + itemBottom - parentBottom + offset;
            }
        }
    };

    const scrollContainerToTop = () => {
        const container = containerRef?.current;
        if (container) {
            container.scrollTop = 0;
        }
    };

    // Подписка на keydown когда открыт, с актуальным индексом.
    useEffect(() => {
        if (!dropdownOpened) {
            return;
        }

        const handleKeyDown = (event: KeyboardEvent) => {
            const { keyCode } = event;
            const childrenLength = childrenCount;
            const currentIndex = activeListItemIndex;
            let nextActiveListItemIndex: number | undefined;

            if (keyCode === EVENT_KEY_CODES.ARROW_DOWN) {
                if (currentIndex !== undefined) {
                    if (currentIndex < childrenLength - 1) {
                        nextActiveListItemIndex = currentIndex + 1;
                    } else {
                        nextActiveListItemIndex = 0;
                    }
                } else {
                    nextActiveListItemIndex = 0;
                }
                event.preventDefault();
            } else if (keyCode === EVENT_KEY_CODES.ARROW_UP) {
                if (currentIndex !== undefined) {
                    if (currentIndex > 0) {
                        nextActiveListItemIndex = currentIndex - 1;
                    } else {
                        nextActiveListItemIndex = childrenLength - 1;
                    }
                } else {
                    nextActiveListItemIndex = childrenLength - 1;
                }
                event.preventDefault();
            }

            if (nextActiveListItemIndex !== undefined && currentIndex !== nextActiveListItemIndex) {
                scrollContainerToItem(nextActiveListItemIndex);
                setActiveListItemIndex(nextActiveListItemIndex);
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [dropdownOpened, activeListItemIndex, childrenCount]);

    // Установка активного элемента и скролла при открытии.
    useEffect(() => {
        if (!dropdownOpened) {
            return;
        }
        let isSelectedItemExist = false;
        React.Children.forEach(children, (child, index) => {
            // @ts-ignore
            if (child && child.props && child.props.selected) {
                isSelectedItemExist = true;
                scrollContainerToItem(index);
                setActiveListItemIndex(index);
            }
        });
        if (!isSelectedItemExist) {
            setActiveListItemIndex(0);
            scrollContainerToTop();
        }
    }, [dropdownOpened]);

    // Синхронизация activeDescendant при изменении activeListItemIndex
    useEffect(() => {
        if (dropdownOpened && activeListItemIndex !== undefined) {
            setActiveDescendant(listItemsRef.current[activeListItemIndex]?.current?.id);
            return;
        }
        if (!dropdownOpened && activeDescendant !== undefined) {
            setActiveDescendant();
        }
    }, [dropdownOpened, activeListItemIndex, activeDescendant, setActiveDescendant]);

    useEffect(() => {
        return () => {
            if (activeDescendant !== undefined) {
                setActiveDescendant();
            }
        };
    }, [activeDescendant, setActiveDescendant]);

    const renderedChildren = React.Children.map(children, (child, index) => {
        if (!child) {
            return;
        }

        return React.cloneElement(child as React.ReactElement, {
            active: dropdownOpened && activeListItemIndex === index,
            onMouseOver: (event: React.MouseEvent) => {
                setActiveListItemIndex(index);
                (child as React.ReactElement).props.onMouseOver?.(event);
            },
            ref: setListItemRef(index),
        });
    });

    return (
        <div className={classNames} role="listbox" ref={containerRef} {...htmlDivAttributes}>
            {renderedChildren}
        </div>
    );
};

DropdownList.Item = DropdownListItem;
