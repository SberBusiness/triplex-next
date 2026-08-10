import React, { useRef } from "react";
import clsx from "clsx";
import { Header, IHeaderProps } from "@sberbusiness/triplex-next/components/Header/Header";
import { EHeaderPageType } from "./enums";
import { useStickyCornerRadius } from "./useStickyCornerRadius";
import { EIslandType, Island } from "../../Island";
import { EComponentSize } from "@sberbusiness/triplex-next/enums/EComponentSize";
import styles from "../styles/Page.module.less";

export interface IHeaderPageTypeSecondProps extends IHeaderProps {
    /** Контент заголовка страницы. */
    children: React.ReactNode;
    /** Тип компонента HeaderPage. SECOND рендерит заголовок без карточки (Island). */
    type: EHeaderPageType.SECOND;
    /** Прилипание к верхней границе экрана недоступно для типа SECOND. */
    sticky?: never;
    /** Размер острова недоступен для типа SECOND, так как контент не оборачивается в Island. */
    size?: never;
}

export interface IHeaderPageTypeFirstProps extends IHeaderProps {
    /** Контент заголовка страницы. */
    children: React.ReactNode;
    /** Тип компонента HeaderPage. FIRST оборачивает заголовок в Island (карточку). */
    type: EHeaderPageType.FIRST;
    /** Header прилипает к верхней границе при скролле. Только для типа FIRST. */
    sticky?: boolean;
    /** Размер острова (Island). Доступен только для типа FIRST. */
    size?: EComponentSize;
}

/** Заголовок страницы Page. Доступен как `Page.Header`. Верхний блок страницы с заголовком, табами и подзаголовком. */
export const HeaderPage = Object.assign(
    React.forwardRef<HTMLDivElement, IHeaderPageTypeFirstProps | IHeaderPageTypeSecondProps>(
        ({ className, type, size, sticky, ...rest }, ref) => {
            const islandRef = useRef<HTMLDivElement | null>(null);
            // Плавное обнуление верхних углов и добавление тени при прилипании к верху.
            useStickyCornerRadius(islandRef, "top", type === EHeaderPageType.FIRST && sticky);

            const setIslandRef = (instance: HTMLDivElement | null) => {
                islandRef.current = instance;
                if (typeof ref === "function") {
                    ref(instance);
                } else if (ref) {
                    ref.current = instance;
                }
            };

            const headerPageFirstClassNames = clsx(
                styles.headerPageTypeFirst,
                {
                    [styles.sticky]: type === EHeaderPageType.FIRST && sticky,
                },
                className,
            );

            return type === EHeaderPageType.FIRST ? (
                <Island className={headerPageFirstClassNames} type={EIslandType.TYPE_1} size={size} ref={setIslandRef}>
                    <Header {...rest} />
                </Island>
            ) : (
                <Header ref={ref} className={clsx(styles.headerPageTypeSecond, className)} {...rest} />
            );
        },
    ),
    {
        LayoutSidebar: Header.LayoutSidebar,
        Subhead: Header.Subhead,
        Tabs: Header.Tabs,
        Title: Header.Title,
    },
);

HeaderPage.displayName = "HeaderPage";
