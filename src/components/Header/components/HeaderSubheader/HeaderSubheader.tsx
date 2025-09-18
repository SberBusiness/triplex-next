import React from "react";
import { classnames } from "@sber-business/triplex/utils/classnames/classnames";

/** Свойства компонента HeaderSubheader. */
export interface IHeaderSubheaderProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Свойство отключающее padding. */
    withoutPaddings?: boolean;
}

/** Третий уровень Header. Содержит в себе произвольный контент. */
export const HeaderSubheader = React.forwardRef<HTMLDivElement, IHeaderSubheaderProps>(
    ({ children, className, withoutPaddings, ...rest }, ref) => (
        <div
            className={classnames(
                "cssClass[headerSubheader]",
                { "cssClass[withoutPaddings]": Boolean(withoutPaddings) },
                className,
            )}
            {...rest}
            ref={ref}
        >
            {children}
        </div>
    ),
);

HeaderSubheader.displayName = "HeaderSubheader";
