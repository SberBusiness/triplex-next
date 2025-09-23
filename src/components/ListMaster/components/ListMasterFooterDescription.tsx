import React from "react";
import clsx from "clsx";
import styles from "../styles/ListMasterFooter.module.less";

/** Свойства компонента ListMasterFooterDescription. */
export interface IListMasterFooterDescriptionProps extends React.HTMLAttributes<HTMLDivElement> {}

/** Контейнер для текста в ListMasterFooter. */
export const ListMasterFooterDescription = React.forwardRef<HTMLDivElement, IListMasterFooterDescriptionProps>(
    ({ children, className, ...rest }, ref) => (
        <div className={clsx(styles.listMasterFooterDescription, className)} {...rest} ref={ref}>
            {children}
        </div>
    )
);

ListMasterFooterDescription.displayName = "ListMasterFooterDescription";
