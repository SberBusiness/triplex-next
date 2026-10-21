import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { IOverlayChildrenProvideProps } from "../Overlay/OverlayBase";
import { useToken } from "../ThemeProvider/useToken";
import styles from "./styles/Puller.module.less";

/** Свойства компонента PullerInner. */
export interface IPullerInnerProps extends IOverlayChildrenProvideProps, React.HTMLAttributes<HTMLDivElement> {}

/** Внутренняя разметка Puller: подложка и контент с анимацией открытия/закрытия. */
export const PullerInner = React.forwardRef<HTMLDivElement, IPullerInnerProps>(
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
            ...restProps
        },
        ref,
    ) => {
        // Состояния догоняют props через setTimeout в эффектах ниже: элемент сначала рендерится в закрытом виде,
        // иначе CSS-переход открытия не запустится.
        const [openingState, setOpeningState] = useState(false);
        const [openedState, setOpenedState] = useState(false);
        const { scopeClassName } = useToken();

        useEffect(() => {
            const timeoutId = setTimeout(() => setOpeningState(openingProps));

            return () => clearTimeout(timeoutId);
        }, [openingProps]);

        useEffect(() => {
            const timeoutId = setTimeout(() => setOpenedState(openedProps));

            return () => clearTimeout(timeoutId);
        }, [openedProps]);

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

        const closePuller = () => {
            if (openedProps) {
                setOpened(false);
            }
        };

        if (!openingProps && !openedProps && !closing) {
            return null;
        }

        // Закрытие анимируется возвратом к базовому (скрытому) состоянию, поэтому closing в модификаторы не входит.
        const animationClassNames = {
            [styles.opened]: openedState,
            [styles.opening]: openingState,
        };

        return (
            <div className={clsx(styles.pullerWrapper, scopeClassName, className)}>
                <div
                    className={clsx(styles.pullerBackdrop, animationClassNames)}
                    onTransitionEnd={handleTransitionEnd}
                    onTouchStart={closePuller}
                    onMouseDown={closePuller}
                />
                <div className={clsx(styles.puller, animationClassNames)} {...restProps} ref={ref}>
                    {children}
                </div>
            </div>
        );
    },
);

PullerInner.displayName = "PullerInner";
