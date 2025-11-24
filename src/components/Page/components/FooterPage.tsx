import React, { useRef } from "react";
import clsx from "clsx";
import { Footer, IFooterProps } from "@sberbusiness/triplex-next/components/Footer/Footer";
import { EFooterPageType } from "./enums";
import { useStickyCornerRadius } from "./useStickyCornerRadius";
import { EIslandType, Island } from "../../Island";
import { useMatchMedia } from "../../MediaWidth/useMatchMedia";
import { EScreenWidth } from "../../../helpers/breakpoints";
import styles from "../styles/Page.module.less";

export interface IFooterPageProps extends IFooterProps {
    /** Тип компонента FooterPage. */
    type?: EFooterPageType;
    /**
     * Footer прилипает к нижней границе экрана при скролле. Только для второго типа FooterPage и только внутри LightBox.
     * */
    sticky?: boolean;
}

/** Свойства компонента FooterPage. */
export const FooterPage = Object.assign(
    React.forwardRef<HTMLDivElement, IFooterPageProps>(
        ({ className, type = EFooterPageType.FIRST, sticky = false, ...rest }, ref) => {
            const footerRef = useRef<HTMLDivElement | null>(null);
            // Плавное обнуление нижних углов и добавление тени при прилипания к низу.
            useStickyCornerRadius(footerRef, "bottom", sticky);

            const isMobileScreenWidth = useMatchMedia(
                `(max-width: ${EScreenWidth.SM_MAX})`,
                window.innerWidth <= parseInt(EScreenWidth.SM_MAX),
            );

            const islandPaddingSize = isMobileScreenWidth ? 16 : 24;
            const islandBorderRadius = isMobileScreenWidth ? 16 : 24;

            const setFooterRef = (instance: HTMLDivElement | null) => {
                footerRef.current = instance;
                if (typeof ref === "function") {
                    ref(instance);
                } else if (ref) {
                    ref.current = instance;
                }
            };

            const footerPageTypeFirstClassNames = clsx(className, styles.footerPageTypeFirst, {
                [styles.sticky]: sticky,
            });

            return type === EFooterPageType.FIRST ? (
                <Island
                    className={footerPageTypeFirstClassNames}
                    type={EIslandType.TYPE_1}
                    borderRadius={islandBorderRadius}
                    paddingSize={islandPaddingSize}
                    ref={setFooterRef}
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
