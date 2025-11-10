import React, { useRef } from "react";
import { Footer, IFooterProps } from "@sberbusiness/triplex-next/components/Footer/Footer";
import { EFooterPageType } from "./enums";
import styles from "../styles/Page.module.less";
import clsx from "clsx";
import { useStickyCornerRadius } from "./useStickyCornerRadius";
import { EIslandType, Island } from "../../Island";

export interface IFooterPageProps extends IFooterProps {
    /** Тип компонента FooterPage. */
    type?: EFooterPageType;
}

/** Свойства компонента FooterPage. */
export const FooterPage = Object.assign(
    React.forwardRef<HTMLDivElement, IFooterPageProps>(({ className, type = EFooterPageType.FIRST, ...rest }, ref) => {
        const footerRef = useRef<HTMLDivElement | null>(null);
        // Плавное обнуление нижних углов и добавление тени при прилипания к низу.
        useStickyCornerRadius(footerRef, "bottom");

        const setFooterRef = (instance: HTMLDivElement | null) => {
            footerRef.current = instance;
            if (typeof ref === "function") {
                ref(instance);
            } else if (ref) {
                ref.current = instance;
            }
        };

        const footerPageTypeSecondClassNames = clsx(className, styles.footerPageTypeSecond);

        return type === EFooterPageType.SECOND ? (
            <Island
                className={footerPageTypeSecondClassNames}
                type={EIslandType.TYPE_1}
                borderRadius={16}
                paddingSize={16}
                ref={setFooterRef}
            >
                <Footer {...rest} />
            </Island>
        ) : (
            <Footer ref={ref} className={clsx(styles.footerPageTypeFirst, className)} {...rest} />
        );
    }),
    {
        Description: Footer.Description,
    },
);
