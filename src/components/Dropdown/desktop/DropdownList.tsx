import React, { useContext, useEffect, useRef, useState } from "react";
import clsx from "clsx";
import {
    DropdownListItem,
    IDropdownListItemProps,
} from "@sberbusiness/triplex-next/components/Dropdown/desktop/DropdownListItem";
import { EVENT_KEY_CODES } from "@sberbusiness/triplex-next/utils/keyboard";
import { DropdownListContext } from "@sberbusiness/triplex-next/components/Dropdown/DropdownListContext";
import { LoaderSmall, ELoaderSmallTheme } from "@sberbusiness/triplex-next/components/Loader";
import styles from "../styles/DropdownDesktopList.module.less";
import { EComponentSize } from "@sberbusiness/triplex-next/enums/EComponentSize";

/** Свойства компонента DropdownList. */
export interface IDropdownListProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Dropdown открыт. */
    dropdownOpened: boolean;
    /** Объект для создания ссылки на html-элемент "список". */
    listRef?: React.RefObject<HTMLDivElement>;
    /** Состояние загрузки. */
    loading?: boolean;
    /** Размер списка. */
    size?: EComponentSize;
}

/** Индекс текущего выделенного элемента списка при навигации с клавиатуры. */
type TActiveListItemIndex = number | undefined;

export interface IDropdownListComponent extends React.FC<IDropdownListProps> {
    Item: typeof DropdownListItem;
}

/**
 * Компонент DropdownList.
 * Используется для обрамления вложенного списка и добавляет спику возможность навигации с клавиатуры.
 * В качестве children принимает только DropdownDesktopList.Item.
 */
export const DropdownList: IDropdownListComponent = (props) => {
    const {
        children,
        className,
        dropdownOpened,
        listRef,
        loading,
        size = EComponentSize.MD,
        ...htmlDivAttributes
    } = props;
    const classNames = clsx(styles.dropdownDesktopList, className, styles[`dropdownDesktopList-${size}`]);

    const { activeDescendant, setActiveDescendant } = useContext(DropdownListContext);

    // Ref контейнера списка.
    const containerRef = listRef || React.createRef<HTMLDivElement>();
    // Массив DOM-элементов списка.
    const listItemsRef = useRef<Array<HTMLDivElement | null>>([]);
    const [activeListItemIndex, setActiveListItemIndex] = useState<TActiveListItemIndex>(undefined);

    const childrenCount = React.Children.count(children);

    const scrollContainerToItem = (itemIndex: number) => {
        const parent = containerRef?.current;
        const activeItem = listItemsRef.current[itemIndex];

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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dropdownOpened, activeListItemIndex, childrenCount]);

    // Установка активного элемента и скролла при открытии.
    useEffect(() => {
        if (!dropdownOpened) {
            return;
        }
        let isSelectedItemExist = false;
        React.Children.forEach(children, (child, index) => {
            if (React.isValidElement<IDropdownListItemProps>(child) && child.props.selected) {
                isSelectedItemExist = true;
                scrollContainerToItem(index);
                setActiveListItemIndex(index);
            }
        });
        if (!isSelectedItemExist) {
            setActiveListItemIndex(0);
            scrollContainerToTop();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dropdownOpened]);

    // Синхронизация activeDescendant при изменении activeListItemIndex
    useEffect(() => {
        if (dropdownOpened && activeListItemIndex !== undefined) {
            setActiveDescendant(listItemsRef.current[activeListItemIndex]?.id);
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
        if (!React.isValidElement<IDropdownListItemProps & React.RefAttributes<HTMLDivElement>>(child)) {
            return child;
        }

        return React.cloneElement(child, {
            active: activeListItemIndex === index,
            onMouseOver: (event: React.MouseEvent<HTMLDivElement>) => {
                setActiveListItemIndex(index);
                child.props.onMouseOver?.(event);
            },
            onMouseOut: (event: React.MouseEvent<HTMLDivElement>) => {
                setActiveListItemIndex(undefined);
                child.props.onMouseOut?.(event);
            },
            ref: (node: HTMLDivElement | null) => {
                listItemsRef.current[index] = node;
            },
        });
    });

    const renderLoaderItem = () => (
        <DropdownListItem id="dropdown-desktop-list-loader-item">
            <LoaderSmall className={styles.dropdownDesktopListLoader} theme={ELoaderSmallTheme.BRAND} size={size} />
        </DropdownListItem>
    );

    return (
        <div className={classNames} role="listbox" {...htmlDivAttributes} ref={containerRef}>
            {renderedChildren}
            {loading && renderLoaderItem()}
        </div>
    );
};

DropdownList.Item = DropdownListItem;
