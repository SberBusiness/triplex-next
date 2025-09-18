import React from "react";
import { FooterDescription } from "@sber-business/triplex/components/Footer/components/FooterDescription";
import { classnames } from "@sber-business/triplex/utils/classnames/classnames";

/** Свойства компонента Footer. */
export interface IFooterProps extends React.HTMLAttributes<HTMLDivElement> {
    /**
     * Footer прилипает к нижней границе экрана при скролле.
     * Свойство работает на экранах высотой более 800px и шириной более 1024px.
     * */
    sticky?: boolean;
}

/** Футер. */
export const Footer = Object.assign(
    React.forwardRef<HTMLDivElement, IFooterProps>(function Footer({ children, className, sticky, ...rest }, ref) {
        return (
            <div
                className={classnames("cssClass[footer]", { "cssClass[sticky]": Boolean(sticky) }, className)}
                {...rest}
                data-tx={process.env.npm_package_version}
                ref={ref}
            >
                {children}
            </div>
        );
    }),
    {
        Description: FooterDescription,
    },
);

Footer.displayName = "Footer";
