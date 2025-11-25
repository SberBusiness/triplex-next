import React, { useRef } from "react";
import { Header, IHeaderProps } from "@sberbusiness/triplex-next/components/Header/Header";
import { EHeaderPageType } from "./enums";
import clsx from "clsx";
import { Island } from "../../Island/Island";
import { EIslandType } from "../../Island/enums";
import { useStickyCornerRadius } from "./useStickyCornerRadius";
import { EComponentSize } from "@sberbusiness/triplex-next";
import styles from "../styles/Page.module.less";

export interface IHeaderPageTypeSecondProps extends IHeaderProps {
    children: React.ReactNode;
    /** Тип компонента HeaderPage. */
    type: EHeaderPageType.SECOND;
    /**
     * Header прилипает к верхней границе экрана при скролле. Только для второго типа HeaderPage и только внутри LightBox.
     * */
    sticky?: never;
    /** Размер острова. */
    size?: never;
}

export interface IHeaderPageTypeFirstProps extends IHeaderProps {
    children: React.ReactNode;
    /** Тип компонента HeaderPage. */
    type: EHeaderPageType.FIRST;
    /**
     * Header прилипает к верхней границе экрана при скролле. Только для второго типа HeaderPage и только внутри LightBox.
     * */
    sticky?: boolean;
    /** Размер острова. */
    size?: EComponentSize;
}
export const HeaderPage = Object.assign(
    React.forwardRef<HTMLDivElement, IHeaderPageTypeFirstProps | IHeaderPageTypeSecondProps>(
        ({ className, type, size, sticky, ...rest }, ref) => {
            const islandRef = useRef<HTMLDivElement | null>(null);

            useStickyCornerRadius(islandRef, "top", type === EHeaderPageType.FIRST && sticky);

            const setIslandRef = (instance: HTMLDivElement | null) => {
                islandRef.current = instance;
                if (typeof ref === "function") {
                    ref(instance);
                } else if (ref) {
                    ref.current = instance;
                }
            };

            const headerPageFirstClassNames = clsx(className, styles.headerPageTypeFirst, {
                [styles.sticky]: type === EHeaderPageType.FIRST && sticky,
            });

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
