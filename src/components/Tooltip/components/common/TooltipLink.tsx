import React from "react";
import clsx from "clsx";
import { MobileView } from "@sberbusiness/triplex-next/components/MobileView/MobileView";
import styles from "@sberbusiness/triplex-next/components/Tooltip/styles/TooltipLink.module.less";

/** Свойства компонента TooltipLink. */
export interface ITooltipLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {}

/** Гиперссылка в Tooltip. */
export const TooltipLink = React.forwardRef<HTMLAnchorElement, ITooltipLinkProps>(
    ({ children, className, ...rest }, ref) => {
        /** Рендер десктоп версии. */
        const renderDesktopLink = () => (
            <a
                className={clsx(styles.tooltipLink, styles.desktop, className)}
                {...rest}
                data-tx={process.env.npm_package_version}
                ref={ref}
            >
                {children}
            </a>
        );

        return (
            <MobileView fallback={renderDesktopLink()}>
                <a
                    className={clsx(styles.tooltipLink, styles.mobile, className)}
                    {...rest}
                    data-tx={process.env.npm_package_version}
                    ref={ref}
                >
                    {children}
                </a>
            </MobileView>
        );
    },
);

TooltipLink.displayName = "TooltipLink";
