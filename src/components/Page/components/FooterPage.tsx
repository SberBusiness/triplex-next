import React, { useRef } from "react";
import clsx from "clsx";
import { Footer, IFooterProps } from "@sberbusiness/triplex-next/components/Footer/Footer";
import { EFooterPageType } from "./enums";
import { useStickyCornerRadius } from "./useStickyCornerRadius";
import { EIslandType, Island } from "../../Island";
import styles from "../styles/Page.module.less";
import { EComponentSize } from "@sberbusiness/triplex-next";

export interface IFooterPageTypeFirstProps extends IFooterProps {
    children: React.ReactNode;
    /** Тип компонента FooterPage. */
    type: EFooterPageType.FIRST;
    /**
     * Footer прилипает к нижней границе экрана при скролле. Не используется.
     * */
    sticky?: never;
    /** Размер острова. */
    size?: never;
}

export interface IFooterPageTypeSecondProps extends IFooterProps {
    children: React.ReactNode;
    /** Тип компонента FooterPage. */
    type: EFooterPageType.SECOND;
    /**
     * Footer прилипает к нижней границе экрана при скролле. Только для второго типа FooterPage и только внутри LightBox.
     * */
    sticky?: boolean;
    /** Размер острова. */
    size?: EComponentSize;
}

/** Свойства компонента FooterPage. */
export const FooterPage = Object.assign(
    React.forwardRef<HTMLDivElement, IFooterPageTypeFirstProps | IFooterPageTypeSecondProps>(
        ({ className, type, size, ...rest }, ref) => {
            const footerRef = useRef<HTMLDivElement | null>(null);
            // Плавное обнуление нижних углов и добавление тени при прилипания к низу.
            useStickyCornerRadius(footerRef, "bottom", type === EFooterPageType.SECOND && rest.sticky);

            const setFooterRef = (instance: HTMLDivElement | null) => {
                footerRef.current = instance;
                if (typeof ref === "function") {
                    ref(instance);
                } else if (ref) {
                    ref.current = instance;
                }
            };

            const footerPageTypeFirstClassNames = clsx(className, styles.footerPageTypeFirst, {
                [styles.sticky]: type === EFooterPageType.SECOND && rest.sticky,
            });

            return type === EFooterPageType.FIRST ? (
                <Island
                    className={footerPageTypeFirstClassNames}
                    type={EIslandType.TYPE_1}
                    ref={setFooterRef}
                    size={size}
                >
                    <Footer {...rest} />
                </Island>
            ) : (
                <Footer ref={ref} className={className} {...rest} />
            );
        },
    ),
    {
        Description: Footer.Description,
    },
);
