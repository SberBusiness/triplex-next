import React, { useEffect, useRef, useState } from "react";
import { Header, IHeaderProps } from "@sberbusiness/triplex-next/components/Header/Header";
import { EHeaderPageType } from "./enums";
import styles from "../styles/Page.module.less";
import clsx from "clsx";

/** Свойства компонента HeaderPage Type 1. */
export interface IHeaderPageFirstProps extends Omit<IHeaderProps, "sticky"> {
    /** Тип компонента HeaderPage. */
    type: EHeaderPageType.FIRST;
}

/** Свойства компонента HeaderPage Type 2. */
export interface IHeaderPageSecondProps extends IHeaderProps {
    /** Тип компонента HeaderPage. */
    type: EHeaderPageType.SECOND;
}

/** Свойства компонента HeaderPage. */
export type IHeaderPageProps = IHeaderPageFirstProps | IHeaderPageSecondProps;

export const HeaderPage = Object.assign(
    React.forwardRef<HTMLDivElement, IHeaderPageProps>(({ className, type, ...rest }, ref) => {
        const [stuck, setStuck] = useState(false);
        const targetRef = useRef<HTMLDivElement | null>(null);

        const sticky = type === EHeaderPageType.SECOND && "sticky" in rest ? rest.sticky : false;

        useEffect(() => {
            if (!sticky || !targetRef.current) {
                return;
            }

            const observer = new IntersectionObserver(([entry]) => setStuck(!entry.isIntersecting), { threshold: [0] });

            observer.observe(targetRef.current);

            return () => {
                observer.disconnect();
            };
        }, [sticky]);

        const headerPageClassNames = clsx(
            styles.headerPage,
            {
                [styles.headerPageBackground]: type === EHeaderPageType.SECOND,
                [styles.headerPageSticky]: sticky,
                [styles.headerPageStuck]: stuck && sticky && type === EHeaderPageType.SECOND,
            },
            className,
        );

        return type === EHeaderPageType.SECOND ? (
            <>
                <div ref={targetRef} aria-hidden="true" className={styles.observerTarget} />
                <div className={headerPageClassNames} ref={ref}>
                    {<Header {...rest} />}
                </div>
            </>
        ) : (
            <Header ref={ref} className={headerPageClassNames} {...rest} />
        );
    }),
    {
        LayoutSidebar: Header.LayoutSidebar,
        Subhead: Header.Subhead,
        Tabs: Header.Tabs,
        Title: Header.Title,
    },
);
