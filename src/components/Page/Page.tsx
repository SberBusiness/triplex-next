import React from "react";
import clsx from "clsx";
import { BodyPage } from "./components/BodyPage";
import { HeaderPage } from "./components/HeaderPage";
import { FooterPage } from "./components/FooterPage";
import styles from "./styles/Page.module.less";

/** Свойства компонента Page. */
export interface IPageProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Флаг, убрающий padding. */
    noPadding?: boolean;
}

/** Страница. Может содержать только Body, Header и Footer. */
export const Page = Object.assign(
    React.forwardRef<HTMLDivElement, IPageProps>(function Page(
        { children, className, noPadding = false, ...rest },
        ref,
    ) {
        return (
            <div className={clsx(styles.page, className, { [styles.noPadding]: noPadding })} {...rest} ref={ref}>
                {children}
            </div>
        );
    }),
    {
        Body: BodyPage,
        Header: HeaderPage,
        Footer: FooterPage,
    },
);

Page.displayName = "Page";
