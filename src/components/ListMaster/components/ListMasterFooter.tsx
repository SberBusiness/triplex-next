import React from "react";
import clsx from "clsx";
import styles from "../styles/ListMasterFooter.module.less";

/** Свойства компонента ListMasterFooter. */
export interface IListMasterFooterProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Элемент позиционируется как sticky. */
    sticky?: boolean;
}

/** Футер ListMaster. */
export const ListMasterFooter = React.forwardRef<HTMLDivElement, IListMasterFooterProps>(
    ({ children, className, sticky = true, ...rest }, ref) => (
        <div
            className={clsx(
                styles.listMasterFooter,
                {
                    [styles.sticky]: sticky,
                },
                className
            )}
            {...rest}
            ref={ref}
        >
            {children}
        </div>
    )
);

ListMasterFooter.displayName = "ListMasterFooter";
