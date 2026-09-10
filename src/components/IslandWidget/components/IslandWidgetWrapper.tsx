import React, { useCallback, useMemo, useState } from "react";
import clsx from "clsx";
import styles from "../styles/IslandWidgetWrapper.module.less";
import { IslandWidgetLayoutContext } from "../IslandWidgetLayoutContext";

/** Свойства компонента IslandWidgetWrapper. */
export interface IIslandWidgetWrapperProps extends React.HTMLAttributes<HTMLDivElement> {}

/**
 * Общая обёртка виджета и его дополнительного подвала.
 * Нужна только когда используется IslandWidget.ExtraFooter: через неё виджет узнаёт, что подвал раскрыт, и рисует тень.
 */
export const IslandWidgetWrapper = React.forwardRef<HTMLDivElement, IIslandWidgetWrapperProps>(
    ({ children, className, ...rest }, ref) => {
        // Считаем раскрытые подвалы, а не храним флаг: иначе закрытие или размонтирование
        // одного подвала снимало бы тень, пока соседний ещё раскрыт.
        const [openExtraFooterCount, setOpenExtraFooterCount] = useState(0);

        const addOpenExtraFooter = useCallback(() => setOpenExtraFooterCount((count) => count + 1), []);
        const removeOpenExtraFooter = useCallback(() => setOpenExtraFooterCount((count) => Math.max(0, count - 1)), []);

        const context = useMemo(
            () => ({
                hasExtraFooter: openExtraFooterCount > 0,
                addOpenExtraFooter,
                removeOpenExtraFooter,
            }),
            [openExtraFooterCount, addOpenExtraFooter, removeOpenExtraFooter],
        );

        return (
            <IslandWidgetLayoutContext.Provider value={context}>
                <div className={clsx(styles.islandWidgetWrapper, className)} {...rest} ref={ref}>
                    {children}
                </div>
            </IslandWidgetLayoutContext.Provider>
        );
    },
);

IslandWidgetWrapper.displayName = "IslandWidgetWrapper";
