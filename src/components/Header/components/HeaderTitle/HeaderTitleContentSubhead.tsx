import React from "react";
import { classnames } from "@sber-business/triplex/utils/classnames/classnames";

/** Свойства компонента HeaderTitleContentSubhead. */
export interface IHeaderTitleContentSubheadProps extends React.HTMLAttributes<HTMLDivElement> {}

/** Подзаголовок. */
export const HeaderTitleContentSubhead = React.forwardRef<HTMLDivElement, IHeaderTitleContentSubheadProps>(
    ({ children, className, ...rest }, ref) => (
        <div className={classnames("cssClass[headerTitleContentSubhead]", className)} {...rest} ref={ref}>
            {children}
        </div>
    ),
);

HeaderTitleContentSubhead.displayName = "HeaderTitleContentSubhead";
