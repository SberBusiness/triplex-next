import React from "react";
import { classnames } from "@sber-business/triplex/utils/classnames/classnames";

/** Свойства компонента FooterDescriptionContent. */
export interface IFooterDescriptionContentProps extends React.HTMLAttributes<HTMLDivElement> {}

/** Футер, контент основной части. */
export const FooterDescriptionContent = React.forwardRef<HTMLDivElement, IFooterDescriptionContentProps>(
    ({ children, className, ...rest }, ref) => (
        <div className={classnames("cssClass[footerDescriptionContent]", className)} {...rest} ref={ref}>
            {children}
        </div>
    ),
);

FooterDescriptionContent.displayName = "FooterDescriptionContent";
