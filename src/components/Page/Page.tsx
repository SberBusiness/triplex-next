import React from "react";
import clsx from "clsx";
import { Body } from "../Body";
import { Footer } from "../Footer";
import { Header } from "../Header";
import styles from "./styles/Page.module.less";

/** Свойства компонента Page. */
export interface IPageProps extends React.HTMLAttributes<HTMLDivElement> {}

/** Страница. Может содержать только Body, Header и Footer. */
export const Page = Object.assign(
    React.forwardRef<HTMLDivElement, IPageProps>(function Page({ children, className, ...rest }, ref) {
        return (
            <div className={clsx(styles.page, className)} {...rest} ref={ref}>
                {children}
            </div>
        );
    }),
    {
        Body: Body,
        Header: Header,
        Footer: Footer,
    },
);

Page.displayName = "Page";
