import React from "react";
import clsx from "clsx";
import styles from "../styles/Footer.module.less";

/** Свойства компонента FooterDescriptionContent. */
export interface IFooterDescriptionContentProps extends React.HTMLAttributes<HTMLDivElement> {}

/** Футер, контент основной части. */
export const FooterDescriptionContent = React.forwardRef<HTMLDivElement, IFooterDescriptionContentProps>(
    ({ children, className, ...rest }, ref) => (
        <div className={clsx(styles.footerDescriptionContent, className)} {...rest} ref={ref}>
            {children}
        </div>
    ),
);

FooterDescriptionContent.displayName = "FooterDescriptionContent";
