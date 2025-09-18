import React from "react";
import { classnames } from "@sber-business/triplex/utils/classnames/classnames";

/** Свойства компонента FooterDescriptionControls. */
export interface IFooterDescriptionControlsProps extends React.HTMLAttributes<HTMLDivElement> {}

/** Футер, кнопки действий основной части. */
export const FooterDescriptionControls = React.forwardRef<HTMLDivElement, IFooterDescriptionControlsProps>(
    ({ children, className, ...rest }, ref) => (
        <div className={classnames("cssClass[footerDescriptionControls]", className)} {...rest} ref={ref}>
            {children}
        </div>
    ),
);

FooterDescriptionControls.displayName = "FooterDescriptionControls";
