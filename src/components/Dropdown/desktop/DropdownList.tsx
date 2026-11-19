import React, { useContext, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import clsx from "clsx";
import { findLast } from "lodash-es";
import { EVENT_KEY_CODES } from "@sberbusiness/triplex-next/utils/keyboard";
import { LoaderSmall, ELoaderSmallTheme } from "@sberbusiness/triplex-next/components/Loader";
import { EComponentSize } from "@sberbusiness/triplex-next/enums/EComponentSize";
import { DropdownListItem } from "./DropdownListItem";
import { DropdownListItemsContext, IDropdownListItemsContext } from "./DropdownListItemsContext";
import {
    TActiveListItemId,
    getListItemElement,
    getListItemsProps,
    getNextActiveListItemId,
    resolveActiveListItemId,
    scrollListToItem,
    scrollListToTop,
} from "./utils";
import { DropdownListContext } from "../DropdownListContext";
import { createSizeToClassNameMap } from "../../../utils/classNameMaps";
import { mergeRefs } from "../../../utils/refs";
import styles from "../styles/DropdownDesktopList.module.less";

/** Свойства компонента DropdownList. */
export interface IDropdownListProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Открытость выпадающего блока. При true список регистрирует клавиатурный обработчик в DropdownListContext. */
    dropdownOpened: boolean;
    /** Добавляет после опций строку с лоадером вне клавиатурной навигации. */
    loading?: boolean;
    /** Размер контейнера и его опций. По умолчанию EComponentSize.MD. */
    size?: EComponentSize;
}

/** Композиция компонента DropdownList. */
export interface IDropdownListComponent extends React.ForwardRefExoticComponent<
    IDropdownListProps & React.RefAttributes<HTMLDivElement>
> {
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
 * ArrowUp / ArrowDown перемещают активный элемент, клавиши keyCodesForSelection активного элемента
 * вызывают его onSelect.
 * Рендерится внутри DropdownListContext.Provider со значением из useDropdownListKeyboard.
 * В качестве children принимает DropdownList.Item — напрямую или в компоненте-обёртке.
 * Props id, selected, onSelect и keyCodesForSelection список читает из прямого child, поэтому обёртка должна
 * получать их сама и передавать вложенному DropdownList.Item.
 */
export const DropdownList: IDropdownListComponent = Object.assign(
    React.forwardRef<HTMLDivElement, IDropdownListProps>((props, ref) => {
        const { children, className, dropdownOpened, loading, size = EComponentSize.MD, ...htmlDivAttributes } = props;
        const classNames = clsx(styles.dropdownDesktopList, sizeToClassNameMap[size], className);

        const { setActiveDescendant, registerKeyDownHandler } = useContext(DropdownListContext);

        // Внутренний ref нужен для прокрутки независимо от формы внешнего ref.
        const containerRef = useRef<HTMLDivElement>(null);
        const combinedRef = useMemo(() => mergeRefs(ref, containerRef), [ref, containerRef]);

        const listItemsProps = getListItemsProps(children);
        const listItemIds = listItemsProps.map(({ id }) => id);
        // Если выбранных элементов несколько, берётся последний.
        const selectedListItemId = findLast(listItemsProps, ({ selected }) => !!selected)?.id;
        // Без выбранного элемента — null, то есть первый элемент, в том числе подгруженный после открытия.
        const activeListItemIdOnOpen: TActiveListItemId = selectedListItemId ?? null;

        const [activeListItemIdState, setActiveListItemId] = useState<TActiveListItemId>(
            dropdownOpened ? activeListItemIdOnOpen : undefined,
        );
        const [prevDropdownOpened, setPrevDropdownOpened] = useState(dropdownOpened);

        // Сброс активного элемента при смене открытости — корректировка state в ответ на изменение props.
        // Сброс симметричен: на закрытии активный элемент снимается вместе с activeDescendant,
        // иначе список, оставленный смонтированным в закрытом виде, сохранял бы подсветку.
        if (dropdownOpened !== prevDropdownOpened) {
            setPrevDropdownOpened(dropdownOpened);
            setActiveListItemId(dropdownOpened ? activeListItemIdOnOpen : undefined);
        }

        // Активный элемент хранится по id: при фильтрации и подгрузке опций подсветка остаётся на той же опции.
        const activeListItemId = resolveActiveListItemId(listItemIds, activeListItemIdState);
        const activeListItemProps = listItemsProps.find(({ id }) => id === activeListItemId);

        // Без зависимостей: обработчик замыкает актуальные id и props активного элемента, а регистрация —
        // лишь запись в ref. Layout-эффект — чтобы следующее нажатие не застало устаревший активный элемент
        // (в React 17 пассивные эффекты выполняются после отрисовки).
        useLayoutEffect(() => {
            if (!dropdownOpened) {
                return;
            }

            return registerKeyDownHandler((event) => {
                if (event.keyCode === EVENT_KEY_CODES.ARROW_DOWN || event.keyCode === EVENT_KEY_CODES.ARROW_UP) {
                    const nextActiveListItemId = getNextActiveListItemId(
                        listItemIds,
                        activeListItemId,
                        event.keyCode === EVENT_KEY_CODES.ARROW_DOWN ? "next" : "previous",
                    );

                    // В списке без элементов перемещаться некуда: клавиша остаётся управляющему элементу.
                    if (nextActiveListItemId === undefined) {
                        return false;
                    }

                    event.preventDefault();
                    scrollListToItem(
                        containerRef.current,
                        getListItemElement(containerRef.current, nextActiveListItemId),
                    );
                    setActiveListItemId(nextActiveListItemId);

                    return true;
                }

                if (!activeListItemProps) {
                    return false;
                }

                const keyCodesForSelection =
                    activeListItemProps.keyCodesForSelection ?? KEY_CODES_FOR_SELECTION_DEFAULT;

                if (keyCodesForSelection.includes(event.keyCode)) {
                    event.preventDefault();
                    activeListItemProps.onSelect?.();

                    return true;
                }

                return false;
            });
        });

        // Прокрутка списка к выбранному элементу при открытии.
        useEffect(() => {
            if (!dropdownOpened) {
                return;
            }

            const selectedListItemElement = getListItemElement(containerRef.current, selectedListItemId);

            if (selectedListItemElement) {
                scrollListToItem(containerRef.current, selectedListItemElement);
            } else {
                scrollListToTop(containerRef.current);
            }
            // Прокрутка выполняется один раз на открытие, по состоянию списка на момент открытия.
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [dropdownOpened]);

        // activeDescendant повторяет активный элемент (у закрытого списка — undefined); cleanup сбрасывает его
        // при размонтировании.
        useEffect(() => {
            setActiveDescendant(activeListItemId);

            return () => {
                setActiveDescendant(undefined);
            };
        }, [activeListItemId, setActiveDescendant]);

        const listItemsContext = useMemo<IDropdownListItemsContext>(
            () => ({ activeId: activeListItemId, setActiveId: setActiveListItemId, size }),
            [activeListItemId, setActiveListItemId, size],
        );

        // Лоадер вне контекста: он не участвует в навигации и не подсвечивается при наведении.
        const renderLoaderItem = () => (
            <DropdownListItem id={LOADER_ITEM_ID}>
                <LoaderSmall className={styles.dropdownDesktopListLoader} theme={ELoaderSmallTheme.BRAND} size={size} />
            </DropdownListItem>
        );

        return (
            <div className={classNames} role="listbox" {...htmlDivAttributes} ref={combinedRef}>
                <DropdownListItemsContext.Provider value={listItemsContext}>
                    {children}
                </DropdownListItemsContext.Provider>
                {loading && renderLoaderItem()}
            </div>
        );
    }),
    { Item: DropdownListItem },
);

DropdownList.displayName = "DropdownList";
