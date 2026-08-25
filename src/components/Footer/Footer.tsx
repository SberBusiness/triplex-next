import React from "react";
import { FooterDescription } from "./components/FooterDescription";

/** Свойства компонента Footer. */
export interface IFooterProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Контент футера. Обычно составной Footer.Description. */
    children?: React.ReactNode;
}

/** Футер. Контейнер нижнего блока с контентом и управляющими элементами. */
export const Footer = Object.assign(
    React.forwardRef<HTMLDivElement, IFooterProps>(function Footer({ children, ...rest }, ref) {
        return (
            <div {...rest} data-tx={process.env.npm_package_version} ref={ref}>
                {children}
            </div>
        );
    }),
    {
        Description: FooterDescription,
    },
);

Footer.displayName = "Footer";
