import React, { useContext, useEffect, useLayoutEffect, useRef, useState } from "react";
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
import {
    getListItemProps,
    getNextActiveListItemIndex,
    getSelectedListItemIndex,
    scrollListToItem,
    scrollListToTop,
} from "./utils";
import styles from "../styles/DropdownDesktopList.module.less";

/** Свойства компонента DropdownList. */
export interface IDropdownListProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Dropdown открыт. Пока true, список принимает клавиши через DropdownListContext. */
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

/** Клавиши выбора активного элемента, если у элемента не задан keyCodesForSelection. */
const KEY_CODES_FOR_SELECTION_DEFAULT = [EVENT_KEY_CODES.SPACE, EVENT_KEY_CODES.ENTER];

/** Идентификатор служебного элемента списка с лоадером. */
const LOADER_ITEM_ID = "dropdown-desktop-list-loader-item";

/**
 * Компонент DropdownList.
 * Используется для обрамления вложенного списка и добавляет списку возможность навигации с клавиатуры:
 * ArrowUp / ArrowDown перемещают активный элемент, клавиши keyCodesForSelection активного элемента вызывают его onSelect.
 * Рендерится внутри DropdownListContext.Provider со значением из useDropdownListKeyboard.
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

    const { setActiveDescendant, registerKeyDownHandler } = useContext(DropdownListContext);

    // Ref контейнера списка. Используется внутренний ref, если listRef не передан снаружи.
    const innerContainerRef = useRef<HTMLDivElement>(null);
    const containerRef = listRef || innerContainerRef;
    // Массив DOM-элементов списка.
    const listItemsRef = useRef<Array<HTMLDivElement | null>>([]);

    // У пустого списка — 0: первым активным станет первый элемент, подгруженный после открытия.
    const getActiveListItemIndexOnOpen = () =>
        getSelectedListItemIndex(children) ?? getNextActiveListItemIndex(children, undefined, "next") ?? 0;

    const [activeListItemIndex, setActiveListItemIndex] = useState<TActiveListItemIndex>(() =>
        dropdownOpened ? getActiveListItemIndexOnOpen() : undefined,
    );
    const [prevDropdownOpened, setPrevDropdownOpened] = useState(dropdownOpened);

    // Сброс активного элемента при смене открытости — корректировка state в ответ на изменение props.
    // Сброс симметричен: на закрытии активный элемент снимается вместе с activeDescendant,
    // иначе список, оставленный смонтированным в закрытом виде, сохранял бы подсветку.
    if (dropdownOpened !== prevDropdownOpened) {
        setPrevDropdownOpened(dropdownOpened);
        setActiveListItemIndex(dropdownOpened ? getActiveListItemIndexOnOpen() : undefined);
    }

    const activeListItemProps = getListItemProps(children, activeListItemIndex);

    // Без зависимостей: обработчик замыкает актуальные индекс и props активного элемента, а регистрация —
    // лишь запись в ref. Layout-эффект — чтобы следующее нажатие не застало устаревший индекс
    // (в React 17 пассивные эффекты выполняются после отрисовки).
    useLayoutEffect(() => {
        if (!dropdownOpened) {
            return;
        }

        return registerKeyDownHandler((event) => {
            if (event.keyCode === EVENT_KEY_CODES.ARROW_DOWN || event.keyCode === EVENT_KEY_CODES.ARROW_UP) {
                const nextActiveListItemIndex = getNextActiveListItemIndex(
                    children,
                    activeListItemIndex,
                    event.keyCode === EVENT_KEY_CODES.ARROW_DOWN ? "next" : "previous",
                );

                // В списке без элементов перемещаться некуда: клавиша остаётся управляющему элементу.
                if (nextActiveListItemIndex === undefined) {
                    return false;
                }

                event.preventDefault();

                if (activeListItemIndex !== nextActiveListItemIndex) {
                    scrollListToItem(containerRef.current, listItemsRef.current[nextActiveListItemIndex]);
                    setActiveListItemIndex(nextActiveListItemIndex);
                }

                return true;
            }

            const keyCodesForSelection = activeListItemProps?.keyCodesForSelection ?? KEY_CODES_FOR_SELECTION_DEFAULT;

            if (activeListItemProps && keyCodesForSelection.includes(event.keyCode)) {
                event.preventDefault();
                activeListItemProps.onSelect?.();

                return true;
            }

            return false;
        });
    });

    // Прокрутка списка к активному элементу при открытии.
    useEffect(() => {
        if (!dropdownOpened) {
            return;
        }

        const selectedListItemIndex = getSelectedListItemIndex(children);

        if (selectedListItemIndex === undefined) {
            scrollListToTop(containerRef.current);
        } else {
            scrollListToItem(containerRef.current, listItemsRef.current[selectedListItemIndex]);
        }
        // Прокрутка выполняется один раз на открытие, по состоянию списка на момент открытия.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dropdownOpened]);

    // Зависимость по id, а не по индексу: id меняется и без смены индекса, когда опции подгрузились после открытия.
    const activeListItemId = activeListItemProps?.id;

    useEffect(() => {
        setActiveDescendant(dropdownOpened ? activeListItemId : undefined);
    }, [dropdownOpened, activeListItemId, setActiveDescendant]);

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
