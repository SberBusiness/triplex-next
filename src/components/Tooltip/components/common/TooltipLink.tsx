import React from "react";
import clsx from "clsx";
import { MobileView } from "@sberbusiness/triplex-next/components/MobileView/MobileView";
import { getSafeRel } from "@sberbusiness/triplex-next/utils/html/anchorSecurity";
import styles from "@sberbusiness/triplex-next/components/Tooltip/styles/TooltipLink.module.less";
import { ITooltipLinkProps } from "@sberbusiness/triplex-next/components/Tooltip/types";

/** Гиперссылка в Tooltip. */
export const TooltipLink = React.forwardRef<HTMLAnchorElement, ITooltipLinkProps>(
    ({ children, className, target, rel, ...rest }, ref) => {
        // Защита от reverse tabnabbing при target="_blank".
        const safeRel = getSafeRel(target, rel);

        /** Рендер десктоп версии. */
        const renderDesktopLink = () => (
            <a
                className={clsx(styles.tooltipLink, styles.desktop, className)}
                {...rest}
                target={target}
                rel={safeRel}
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
                    target={target}
                    rel={safeRel}
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
