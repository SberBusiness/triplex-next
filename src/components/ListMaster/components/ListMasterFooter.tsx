import React from "react";
import { classnames } from "@sber-business/triplex/utils/classnames/classnames";

/** Свойства компонента ListMasterFooter. */
export interface IListMasterFooterProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Элемент позиционируется как sticky. */
    sticky?: boolean;
}

/** Футер ListMaster. */
export const ListMasterFooter = React.forwardRef<HTMLDivElement, IListMasterFooterProps>(
    ({ children, className, sticky = true, ...rest }, ref) => (
        <div
            className={classnames(
                "cssClass[listMasterFooter]",
                {
                    "cssClass[sticky]": sticky,
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
