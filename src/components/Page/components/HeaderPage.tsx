import React, { useRef } from "react";
import { Header, IHeaderProps } from "@sberbusiness/triplex-next/components/Header/Header";
import { EHeaderPageType } from "./enums";
import clsx from "clsx";
import { Island } from "../../Island/Island";
import { EIslandType } from "../../Island/enums";
import { useStickyCornerRadius } from "./useStickyCornerRadius";
import { EComponentSize } from "@sberbusiness/triplex-next";
import styles from "../styles/Page.module.less";

export interface IHeaderPageTypeFirstProps extends IHeaderProps {
    children: React.ReactNode;
    /** Тип компонента HeaderPage. */
    type: EHeaderPageType.FIRST;
    /**
     * Header прилипает к верхней границе экрана при скролле. Только для второго типа HeaderPage и только внутри LightBox.
     * */
    sticky?: never;
    /** Размер острова. */
    size?: never;
}

export interface IHeaderPageTypeSecondProps extends IHeaderProps {
    children: React.ReactNode;
    /** Тип компонента HeaderPage. */
    type: EHeaderPageType.SECOND;
    /**
     * Header прилипает к верхней границе экрана при скролле. Только для второго типа HeaderPage и только внутри LightBox.
     * */
    sticky?: boolean;
    /** Размер острова. */
    size?: EComponentSize;
}
export const HeaderPage = Object.assign(
    React.forwardRef<HTMLDivElement, IHeaderPageTypeFirstProps | IHeaderPageTypeSecondProps>(
        ({ className, type, size, ...rest }, ref) => {
            const islandRef = useRef<HTMLDivElement | null>(null);

            useStickyCornerRadius(islandRef, "top", type === EHeaderPageType.SECOND && rest.sticky);

            const setIslandRef = (instance: HTMLDivElement | null) => {
                islandRef.current = instance;
                if (typeof ref === "function") {
                    ref(instance);
                } else if (ref) {
                    ref.current = instance;
                }
            };

            const headerPageSecondClassNames = clsx(className, styles.headerPageTypeSecond, {
                [styles.sticky]: type === EHeaderPageType.SECOND && rest.sticky,
            });

            return type === EHeaderPageType.SECOND ? (
                <Island className={headerPageSecondClassNames} type={EIslandType.TYPE_1} size={size} ref={setIslandRef}>
                    <Header {...rest} />
                </Island>
            ) : (
                <Header ref={ref} className={clsx(styles.headerPageTypeFirst, className)} {...rest} />
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
