import React from "react";
import { classnames } from "@sber-business/triplex/utils/classnames/classnames";

/** Свойства компонента ListMasterFooterControls. */
export interface IListMasterFooterControlsProps extends React.HTMLAttributes<HTMLDivElement> {}

/** Контейнер для кнопок в ListMasterFooter. */
export const ListMasterFooterControls = React.forwardRef<HTMLDivElement, IListMasterFooterControlsProps>(
    ({ children, className, ...rest }, ref) => (
        <div className={classnames("cssClass[listMasterFooterControls]", className)} {...rest} ref={ref}>
            {children}
        </div>
    )
);

ListMasterFooterControls.displayName = "ListMasterFooterControls";
