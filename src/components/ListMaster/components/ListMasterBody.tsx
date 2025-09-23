import React from "react";

/** Свойства компонента ListMasterBody. */
export interface IListMasterBodyProps extends React.HTMLAttributes<HTMLDivElement> {}

/** Контент ListMaster. */
export const ListMasterBody = React.forwardRef<HTMLDivElement, IListMasterBodyProps>(
    ({ children, className, ...rest }, ref) => (
        <div
            className={className}
            {...rest}
            data-tx={process.env.npm_package_version}
            ref={ref}
        >
            {children}
        </div>
    )
);

ListMasterBody.displayName = "ListMasterBody";
