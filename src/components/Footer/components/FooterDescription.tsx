import React from "react";
import { FooterDescriptionContent } from "./FooterDescriptionContent";
import { FooterDescriptionControls } from "./FooterDescriptionControls";
import clsx from "clsx";
import styles from "../styles/Footer.module.less";

/** Свойства компонента FooterDescription. */
export interface IFooterDescriptionProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Контент основной части футера: Footer.Description.Content и Footer.Description.Controls. */
    children?: React.ReactNode;
}

/** Футер, основная часть. Раскладывает контент и кнопки действий в строку. */
export const FooterDescription = Object.assign(
    React.forwardRef<HTMLDivElement, IFooterDescriptionProps>(function FooterDescription(
        { children, className, ...rest },
        ref,
    ) {
        return (
            <div className={clsx(styles.footerDescription, className)} {...rest} ref={ref}>
                {children}
            </div>
        );
    }),
    {
        Content: FooterDescriptionContent,
        Controls: FooterDescriptionControls,
    },
);

FooterDescription.displayName = "FooterDescription";
