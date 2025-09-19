import React from "react";
import { classnames } from "@sber-business/triplex/utils/classnames/classnames";

/** Свойства компонента ListMasterBody. */
export interface IListMasterBodyProps extends React.HTMLAttributes<HTMLDivElement> {}

/** Контент ListMaster. */
export const ListMasterBody = React.forwardRef<HTMLDivElement, IListMasterBodyProps>(
    ({ children, className, ...rest }, ref) => (
        <div
            className={classnames("cssClass[listMasterBody]", className)}
            {...rest}
            data-tx={process.env.npm_package_version}
            ref={ref}
        >
            {children}
        </div>
    )
);

ListMasterBody.displayName = "ListMasterBody";
