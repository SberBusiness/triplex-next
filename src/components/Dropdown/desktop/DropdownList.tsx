import React, { useContext, useEffect, useRef, useState } from "react";
import clsx from "clsx";
import {
    DropdownListItem,
    IDropdownListItemProps,
} from "@sberbusiness/triplex-next/components/Dropdown/desktop/DropdownListItem";
import { EVENT_KEY_CODES } from "@sberbusiness/triplex-next/utils/keyboard";
import { DropdownListContext } from "@sberbusiness/triplex-next/components/Dropdown/DropdownListContext";
import { LoaderSmall, ELoaderSmallTheme } from "@sberbusiness/triplex-next/components/Loader";
import { EComponentSize } from "@sberbusiness/triplex-next/enums/EComponentSize";
import { createSizeToClassNameMap } from "../../../utils/classNameMaps";
import { getSelectedListItemIndex, scrollListToItem, scrollListToTop } from "./utils";
import styles from "../styles/DropdownDesktopList.module.less";

/** Свойства компонента DropdownList. */
export interface IDropdownListProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Dropdown открыт. При открытии список подписывается на клавиатурную навигацию. */
    dropdownOpened: boolean;
    /** Объект для создания ссылки на html-элемент "список". */
    listRef?: React.RefObject<HTMLDivElement>;
    /** Состояние загрузки. Дополняет список элементом с лоадером. */
    loading?: boolean;
    /** Размер списка. Пробрасывается в элементы списка. */
    size?: EComponentSize;
}

/** Индекс текущего выделенного элемента списка при навигации с клавиатуры. */
type TActiveListItemIndex = number | undefined;

/** Композиция компонента DropdownList. */
export interface IDropdownListComponent extends React.FC<IDropdownListProps> {
    /** Элемент выпадающего списка. */
    Item: typeof DropdownListItem;
}

// Соответствие размера имени класса.
const sizeToClassNameMap = createSizeToClassNameMap(styles);

/** Идентификатор служебного элемента списка с лоадером. */
const LOADER_ITEM_ID = "dropdown-desktop-list-loader-item";

/**
 * Компонент DropdownList.
 * Используется для обрамления вложенного списка и добавляет списку возможность навигации с клавиатуры.
 * В качестве children принимает только DropdownList.Item.
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
    const classNames = clsx(styles.dropdownDesktopList, sizeToClassNameMap[size], className);

    const { setActiveDescendant } = useContext(DropdownListContext);

    // Ref контейнера списка. Используется внутренний ref, если listRef не передан снаружи.
    const innerContainerRef = useRef<HTMLDivElement>(null);
    const containerRef = listRef || innerContainerRef;
    // Массив DOM-элементов списка.
    const listItemsRef = useRef<Array<HTMLDivElement | null>>([]);

    // Индекс элемента, который становится активным при открытии: выбранный элемент либо первый.
    const selectedListItemIndex = getSelectedListItemIndex(children);
    const activeListItemIndexOnOpen = selectedListItemIndex ?? 0;

    const [activeListItemIndex, setActiveListItemIndex] = useState<TActiveListItemIndex>(
        dropdownOpened ? activeListItemIndexOnOpen : undefined,
    );
    const [prevDropdownOpened, setPrevDropdownOpened] = useState(dropdownOpened);

    // Сброс активного элемента при смене открытости — корректировка state в ответ на изменение props.
    // Сброс симметричен: на закрытии активный элемент снимается вместе с activeDescendant,
    // иначе список, оставленный смонтированным в закрытом виде, сохранял бы подсветку.
    if (dropdownOpened !== prevDropdownOpened) {
        setPrevDropdownOpened(dropdownOpened);
        setActiveListItemIndex(dropdownOpened ? activeListItemIndexOnOpen : undefined);
    }

    const childrenCount = React.Children.count(children);

    // Подписка на keydown когда открыт, с актуальным индексом.
    useEffect(() => {
        if (!dropdownOpened) {
            return;
        }

        const handleKeyDown = (event: KeyboardEvent) => {
            let nextActiveListItemIndex: number | undefined;

            if (event.keyCode === EVENT_KEY_CODES.ARROW_DOWN) {
                nextActiveListItemIndex =
                    activeListItemIndex === undefined || activeListItemIndex >= childrenCount - 1
                        ? 0
                        : activeListItemIndex + 1;
                event.preventDefault();
            } else if (event.keyCode === EVENT_KEY_CODES.ARROW_UP) {
                nextActiveListItemIndex =
                    activeListItemIndex === undefined || activeListItemIndex <= 0
                        ? childrenCount - 1
                        : activeListItemIndex - 1;
                event.preventDefault();
            }

            if (nextActiveListItemIndex !== undefined && activeListItemIndex !== nextActiveListItemIndex) {
                scrollListToItem(containerRef.current, listItemsRef.current[nextActiveListItemIndex]);
                setActiveListItemIndex(nextActiveListItemIndex);
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [dropdownOpened, activeListItemIndex, childrenCount, containerRef]);

    // Прокрутка списка к активному элементу при открытии.
    useEffect(() => {
        if (!dropdownOpened) {
            return;
        }

        if (selectedListItemIndex === undefined) {
            scrollListToTop(containerRef.current);
        } else {
            scrollListToItem(containerRef.current, listItemsRef.current[selectedListItemIndex]);
        }
        // Прокрутка выполняется один раз на открытие, по состоянию списка на момент открытия.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dropdownOpened]);

    // Синхронизация activeDescendant при изменении activeListItemIndex.
    useEffect(() => {
        if (dropdownOpened && activeListItemIndex !== undefined) {
            setActiveDescendant(listItemsRef.current[activeListItemIndex]?.id);
            return;
        }

        if (!dropdownOpened) {
            setActiveDescendant(undefined);
        }
    }, [dropdownOpened, activeListItemIndex, setActiveDescendant]);

    // Сброс activeDescendant при размонтировании списка.
    useEffect(
        () => () => {
            setActiveDescendant(undefined);
        },
        [setActiveDescendant],
    );

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
            size: size,
            ref: (node: HTMLDivElement | null) => {
                listItemsRef.current[index] = node;
            },
        });
    });

    const renderLoaderItem = () => (
        <DropdownListItem id={LOADER_ITEM_ID}>
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
