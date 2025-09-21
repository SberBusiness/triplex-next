import React from "react";
import clsx from "clsx";
import styles from "../styles/ListMasterFooter.module.less";

/** Свойства компонента ListMasterFooterControls. */
export interface IListMasterFooterControlsProps extends React.HTMLAttributes<HTMLDivElement> {}

/** Контейнер для кнопок в ListMasterFooter. */
export const ListMasterFooterControls = React.forwardRef<HTMLDivElement, IListMasterFooterControlsProps>(
    ({ children, className, ...rest }, ref) => (
        <div className={clsx(styles.listMasterFooterControls, className)} {...rest} ref={ref}>
            {children}
        </div>
    )
);

ListMasterFooterControls.displayName = "ListMasterFooterControls";
