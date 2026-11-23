import React from "react";
import { EComponentSize } from "../../enums";
import { LoaderSmall, ELoaderSmallTheme } from "../Loader";
import styles from "./styles/Puller.module.less";

/** Свойства компонента PullerList. */
export interface IPullerListProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Состояние загрузки. */
    loading?: boolean;
}

/** Список Puller. */
export const PullerList = React.forwardRef<HTMLDivElement, IPullerListProps>(
    ({ children, loading, ...restProps }, ref) => (
        <div role="listbox" aria-busy={loading} {...restProps} ref={ref}>
            {children}
            {/* Скрыт от скринридеров: в listbox допустимы только option, загрузку передаёт aria-busy. */}
            {loading && (
                <div className={styles.pullerListLoader} aria-hidden="true">
                    <LoaderSmall theme={ELoaderSmallTheme.BRAND} size={EComponentSize.MD} />
                </div>
            )}
        </div>
    ),
);

PullerList.displayName = "PullerList";
