import React, { useEffect, useRef, useState } from "react";
import { Footer, IFooterProps } from "@sberbusiness/triplex-next/components/Footer/Footer";
import { EFooterPageType } from "./enums";
import styles from "../styles/Page.module.less";
import clsx from "clsx";

/** Свойства компонента FooterPage Type 1. */
export interface IFooterPageFirstProps extends Omit<IFooterProps, "sticky"> {
    /** Тип компонента FooterPage. */
    type: EFooterPageType.FIRST;
}

/** Свойства компонента FooterPage Type 2. */
export interface IFooterPageSecondProps extends IFooterProps {
    /** Тип компонента FooterPage. */
    type: EFooterPageType.SECOND;
}

/** Свойства компонента FooterPage. */
export type IFooterPageProps = IFooterPageFirstProps | IFooterPageSecondProps;

export const FooterPage = Object.assign(
    React.forwardRef<HTMLDivElement, IFooterPageProps>(({ className, type, ...rest }, ref) => {
        const [stuck, setStuck] = useState(false);
        const targetRef = useRef<HTMLDivElement | null>(null);

        const sticky = type === EFooterPageType.SECOND && "sticky" in rest ? rest.sticky : false;

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

        const footerPageClassNames = clsx(
            styles.footerPage,
            {
                [styles.footerPageBackground]: type === EFooterPageType.SECOND,
                [styles.footerPageSticky]: sticky,
                [styles.footerPageStuck]: stuck && sticky && type === EFooterPageType.SECOND,
            },
            className,
        );

        return type === EFooterPageType.SECOND ? (
            <>
                <div className={footerPageClassNames} ref={ref}>
                    {<Footer {...rest} />}
                </div>
                <div ref={targetRef} aria-hidden="true" className={styles.observerTarget} />
            </>
        ) : (
            <Footer ref={ref} className={footerPageClassNames} {...rest} />
        );
    }),
    {
        Description: Footer.Description,
    },
);
