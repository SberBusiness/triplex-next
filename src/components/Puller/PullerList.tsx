import React, { useContext, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { EComponentSize } from "../../enums";
import { mergeRefs } from "../../utils/refs";
import { DropdownListContext } from "../Dropdown/DropdownListContext";
import {
    createListKeyDownHandler,
    getListItemElement,
    getListItemsProps,
    resolveActiveListItemId,
} from "../Dropdown/listUtils";
import { LoaderSmall, ELoaderSmallTheme } from "../Loader";
import { IPullerListItemProps } from "./PullerListItem";
import { IPullerListItemsContext, PullerListItemsContext } from "./PullerListItemsContext";
import styles from "./styles/Puller.module.less";

/** Свойства компонента PullerList. */
export interface IPullerListProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Состояние загрузки. */
    loading?: boolean;
}

/**
 * Список Puller. Внутри DropdownListContext.Provider поддерживает навигацию с клавиатуры (aria-activedescendant).
 * PullerListItem должен быть прямым child: список читает его props из children. Подробнее — Puller-ai.md.
 */
export const PullerList = React.forwardRef<HTMLDivElement, IPullerListProps>(
    ({ children, loading, ...restProps }, ref) => {
        const { setActiveDescendant, registerKeyDownHandler } = useContext(DropdownListContext);
        const [activeIdState, setActiveIdState] = useState<string>();
        const containerRef = useRef<HTMLDivElement | null>(null);
        const setContainerRef = useMemo(() => mergeRefs(containerRef, ref), [ref]);

        const itemsProps = getListItemsProps<IPullerListItemProps>(children);
        const itemIds = itemsProps.map(({ id }) => id);
        // Активный элемент хранится по id: при фильтрации и подгрузке опций подсветка остаётся на той же опции.
        // Пока этой опции нет в списке, подсвечивается первая; когда опция вернётся, подсветка перейдёт на неё.
        const activeId = resolveActiveListItemId(itemIds, activeIdState);

        // Без зависимостей: обработчик замыкает актуальные props элементов, а регистрация — лишь запись в ref.
        // Layout-эффект — чтобы следующее нажатие не застало устаревший активный элемент.
        useLayoutEffect(() =>
            registerKeyDownHandler(
                createListKeyDownHandler(itemsProps, activeId, (nextActiveId) => {
                    // Прокручивается ближайший скроллируемый предок (PullerBody), а не сам список.
                    getListItemElement(containerRef.current, nextActiveId)?.scrollIntoView?.({ block: "nearest" });
                    setActiveIdState(nextActiveId);
                }),
            ),
        );

        // activeDescendant повторяет активный элемент; cleanup сбрасывает его при размонтировании.
        useEffect(() => {
            setActiveDescendant(activeId);

            return () => {
                setActiveDescendant(undefined);
            };
        }, [activeId, setActiveDescendant]);

        const itemsContext = useMemo<IPullerListItemsContext>(() => ({ activeId }), [activeId]);

        return (
            <div role="listbox" aria-busy={loading} {...restProps} ref={setContainerRef}>
                <PullerListItemsContext.Provider value={itemsContext}>{children}</PullerListItemsContext.Provider>
                {/* Скрыт от скринридеров: в listbox допустимы только option, загрузку передаёт aria-busy. */}
                {loading && (
                    <div className={styles.pullerListLoader} aria-hidden="true">
                        <LoaderSmall theme={ELoaderSmallTheme.BRAND} size={EComponentSize.MD} />
                    </div>
                )}
            </div>
        );
    },
);

PullerList.displayName = "PullerList";
