import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { IOverlayChildrenProvideProps } from "@sberbusiness/triplex-next/components/Overlay/OverlayBase";
import { useToken } from "../../ThemeProvider/useToken";
import styles from "../styles/DropdownMobile.module.less";

/** Свойства компонента DropdownMobileInner. */
export interface IDropdownMobileInnerProps extends IOverlayChildrenProvideProps, React.HTMLAttributes<HTMLDivElement> {}

/** Контент мобильного Dropdown. */
export const DropdownMobileInner = React.forwardRef<HTMLDivElement, IDropdownMobileInnerProps>(
    (
        {
            children,
            className,
            opened: openedProps,
            opening: openingProps,
            closing,
            setOpened,
            setClosing,
            setOpening,
            ...htmlAttributes
        },
        ref
    ) => {
        // OpeningState после рендера становится равен openingProps. Чтобы появилась анимация открытия, сначала нужно отрендерить элемент в закрытом виде.
        const [openingState, setOpeningState] = useState(false);
        const [openedState, setOpenedState] = useState(false);
        const { scopeClassName } = useToken();

        useEffect(() => {
            setTimeout(() => setOpeningState(openingProps));
        }, [openingProps]);

        useEffect(() => {
            setTimeout(() => setOpenedState(openedProps));
        }, [openedProps]);

        const classNamesWrapper = clsx(styles.dropdownMobileWrapper, scopeClassName, className);

        const classNamesBackDrop = clsx(styles.dropdownMobileBackdrop, {
            [styles.closing]: closing,
            [styles.opened]: openedState,
            [styles.opening]: openingState,
        });

        const classNamesContent = clsx(styles.dropdownMobile, {
            [styles.closing]: closing,
            [styles.opened]: openedState,
            [styles.opening]: openingState,
        });

        const handleTransitionEnd = (event: React.TransitionEvent<HTMLDivElement>) => {
            const { target, currentTarget } = event;

            if (target === currentTarget) {
                if (closing) {
                    setClosing(false);
                } else if (openingProps) {
                    setOpening(false);
                }
            }
        };

        /** Функция закрытия DropdownMobile. */
        const closeDropdown = () => {
            if (openedProps) {
                setOpened(false);
            }
        };

        if (!openingProps && !openedProps && !closing) {
            return null;
        }

        return (
            <div className={classNamesWrapper}>
                {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
                <div
                    className={classNamesBackDrop}
                    onTransitionEnd={handleTransitionEnd}
                    onTouchStart={closeDropdown}
                    onMouseDown={closeDropdown}
                />
                <div className={classNamesContent} ref={ref} {...htmlAttributes}>
                    {children}
                </div>
            </div>
        );
    }
);

DropdownMobileInner.displayName = "DropdownMobileInner";
