import React from "react";
import clsx from "clsx";
import styles from "../styles/Footer.module.less";

/** Свойства компонента FooterDescriptionControls. */
export interface IFooterDescriptionControlsProps extends React.HTMLAttributes<HTMLDivElement> {}

/** Футер, кнопки действий основной части. */
export const FooterDescriptionControls = React.forwardRef<HTMLDivElement, IFooterDescriptionControlsProps>(
    ({ children, className, ...rest }, ref) => (
        <div className={clsx(styles.footerDescriptionControls, className)} {...rest} ref={ref}>
            {children}
        </div>
    ),
);

FooterDescriptionControls.displayName = "FooterDescriptionControls";
