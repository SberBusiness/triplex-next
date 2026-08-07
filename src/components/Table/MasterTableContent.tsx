import React, { useMemo } from "react";
import { clsx } from "clsx";
import styles from "./styles/MasterTableContent.module.less";
import { MasterTableContentContext } from "@sberbusiness/triplex-next/components/Table/MasterTableContentContext";
import { IMasterTableContentProps } from "@sberbusiness/triplex-next/components/Table/TableBasic/types";
import { LoaderScreen } from "@sberbusiness/triplex-next/components/LoaderScreen/LoaderScreen";

/**
 * Компонент-обёртка контента таблицы.
 * Во время загрузки перекрывает своё содержимое целиком — таблицу, футер и панель пагинации.
 * Элементы, оставленные снаружи обёртки (FilterPanel, ChipPanel), лоадером не перекрываются.
 */
export const MasterTableContent = React.forwardRef<HTMLDivElement, IMasterTableContentProps>(
    ({ children, className, loading = false, ...htmlDivAttributes }, ref) => {
        const loadingContext = useMemo(() => ({ loading }), [loading]);

        return (
            <MasterTableContentContext.Provider value={loadingContext}>
                <div
                    ref={ref}
                    className={clsx(styles.masterTableContent, className)}
                    {...htmlDivAttributes}
                    data-tx={process.env.npm_package_version}
                >
                    {children}
                    {loading && <LoaderScreen type="middle" className={styles.loaderScreen} />}
                </div>
            </MasterTableContentContext.Provider>
        );
    },
);

MasterTableContent.displayName = "MasterTableContent";
