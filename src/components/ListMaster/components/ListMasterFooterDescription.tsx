import React from "react";
import { classnames } from "@sber-business/triplex/utils/classnames/classnames";

/** Свойства компонента ListMasterFooterDescription. */
export interface IListMasterFooterDescriptionProps extends React.HTMLAttributes<HTMLDivElement> {}

/** Контейнер для текста в ListMasterFooter. */
export const ListMasterFooterDescription = React.forwardRef<HTMLDivElement, IListMasterFooterDescriptionProps>(
    ({ children, className, ...rest }, ref) => (
        <div className={classnames("cssClass[listMasterFooterDescription]", className)} {...rest} ref={ref}>
            {children}
        </div>
    )
);

ListMasterFooterDescription.displayName = "ListMasterFooterDescription";
