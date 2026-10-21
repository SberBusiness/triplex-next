import React, { useState } from "react";
import { uniqueId } from "lodash-es";
import { EComponentSize } from "../../enums";
import { LoaderSmall, ELoaderSmallTheme } from "../Loader";
import { PullerListItem } from "./PullerListItem";
import styles from "./styles/Puller.module.less";

/** Свойства компонента PullerList. */
export interface IPullerListProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Состояние загрузки. */
    loading?: boolean;
}

/** Список Puller. */
export const PullerList = React.forwardRef<HTMLDivElement, IPullerListProps>(
    ({ children, className, loading, ...restProps }, ref) => {
        const [loaderId] = useState(() => uniqueId());

        const renderLoaderItem = () => (
            <PullerListItem id={loaderId} className={styles.pullerListLoader}>
                <LoaderSmall theme={ELoaderSmallTheme.BRAND} size={EComponentSize.MD} />
            </PullerListItem>
        );

        return (
            <div className={className} role="listbox" {...restProps} ref={ref}>
                {children}
                {loading && renderLoaderItem()}
            </div>
        );
    },
);

PullerList.displayName = "PullerList";
