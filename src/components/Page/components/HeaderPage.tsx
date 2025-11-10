import React, { useRef } from "react";
import { Header, IHeaderProps } from "@sberbusiness/triplex-next/components/Header/Header";
import { EHeaderPageType } from "./enums";
import clsx from "clsx";
import { Island } from "../../Island/Island";
import { EIslandType } from "../../Island/enums";
import { useStickyCornerRadius } from "./useStickyCornerRadius";
import styles from "../styles/Page.module.less";

export interface IHeaderPage extends IHeaderProps {
    /** Тип компонента HeaderPage. */
    type?: EHeaderPageType;
}

export const HeaderPage = Object.assign(
    React.forwardRef<HTMLDivElement, IHeaderPage>(({ className, type = EHeaderPageType.FIRST, ...rest }, ref) => {
        const islandRef = useRef<HTMLDivElement | null>(null);
        useStickyCornerRadius(islandRef, "top");

        const setIslandRef = (instance: HTMLDivElement | null) => {
            islandRef.current = instance;
            if (typeof ref === "function") {
                ref(instance);
            } else if (ref) {
                ref.current = instance;
            }
        };

        const headerPageSecondClassNames = clsx(className, styles.headerPageTypeSecond);

        return type === EHeaderPageType.SECOND ? (
            <Island
                className={headerPageSecondClassNames}
                type={EIslandType.TYPE_1}
                borderRadius={16}
                paddingSize={16}
                ref={setIslandRef}
            >
                <Header {...rest} />
            </Island>
        ) : (
            <Header ref={ref} className={clsx(styles.headerPageTypeFirst, className)} {...rest} />
        );
    }),
    {
        LayoutSidebar: Header.LayoutSidebar,
        Subhead: Header.Subhead,
        Tabs: Header.Tabs,
        Title: Header.Title,
    },
);
