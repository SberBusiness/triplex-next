import React, { useRef } from "react";
import clsx from "clsx";
import { Footer, IFooterProps } from "@sberbusiness/triplex-next/components/Footer/Footer";
import { EFooterPageType } from "./enums";
import { useStickyCornerRadius } from "./useStickyCornerRadius";
import { EIslandType, Island } from "../../Island";
import { EComponentSize } from "@sberbusiness/triplex-next/enums/EComponentSize";
import styles from "../styles/Page.module.less";

export interface IFooterPageTypeSecondProps extends IFooterProps {
    /** Контент футера страницы. */
    children: React.ReactNode;
    /** Тип компонента FooterPage. SECOND рендерит футер без карточки (Island). */
    type: EFooterPageType.SECOND;
    /** Прилипание к нижней границе экрана недоступно для типа SECOND. */
    sticky?: never;
    /** Размер острова недоступен для типа SECOND, так как контент не оборачивается в Island. */
    size?: never;
}

export interface IFooterPageTypeFirstProps extends IFooterProps {
    /** Контент футера страницы. */
    children: React.ReactNode;
    /** Тип компонента FooterPage. FIRST оборачивает футер в Island (карточку). */
    type: EFooterPageType.FIRST;
    /** Footer прилипает к нижней границе экрана при скролле. Только для типа FIRST внутри LightBox. */
    sticky?: boolean;
    /** Размер острова (Island). Доступен только для типа FIRST. */
    size?: EComponentSize;
}

/** Футер компонента Page. Доступен как `Page.Footer`. Нижний блок страницы с контентом и управляющими элементами. */
export const FooterPage = Object.assign(
    React.forwardRef<HTMLDivElement, IFooterPageTypeFirstProps | IFooterPageTypeSecondProps>(
        ({ className, type, size, sticky, ...rest }, ref) => {
            const footerRef = useRef<HTMLDivElement | null>(null);
            // Плавное обнуление нижних углов и добавление тени при прилипании к низу.
            useStickyCornerRadius(footerRef, "bottom", type === EFooterPageType.FIRST && sticky);

            const setFooterRef = (instance: HTMLDivElement | null) => {
                footerRef.current = instance;
                if (typeof ref === "function") {
                    ref(instance);
                } else if (ref) {
                    ref.current = instance;
                }
            };

            const footerPageTypeFirstClassNames = clsx(
                styles.footerPageTypeFirst,
                {
                    [styles.sticky]: type === EFooterPageType.FIRST && sticky,
                },
                className,
            );

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

FooterPage.displayName = "FooterPage";
