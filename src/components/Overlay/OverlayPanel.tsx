import React from "react";
import clsx from "clsx";
import { EOverlayDirection, IOverlayChildrenProvideProps } from "./OverlayBase";
import styles from "./styles/Overlay.module.less";

/** Свойства компонента OverlayPanel. */
export interface IOverlayPanelProps extends React.HTMLAttributes<HTMLDivElement>, IOverlayChildrenProvideProps {}

/** Выезжающая с контентом панель оверлея. */
export const OverlayPanel = React.forwardRef<HTMLDivElement, IOverlayPanelProps>(
    (
        {
            children,
            className,
            closing,
            direction,
            onTransitionEnd,
            opened,
            opening,
            setClosing,
            setOpened,
            setOpening,
            ...htmlDivAttributes
        },
        ref,
    ) => {
        const handleTransitionEnd = (event: React.TransitionEvent<HTMLDivElement>) => {
            const { target, currentTarget } = event;

            if (target === currentTarget) {
                setClosing(false);
                setOpening(false);
            }

            onTransitionEnd?.(event);
        };

        return (
            <div
                className={clsx(styles.overlayPanel, className, {
                    [styles.bottom]: direction === EOverlayDirection.BOTTOM,
                    [styles.left]: direction === EOverlayDirection.LEFT,
                    [styles.opened]: opened,
                    [styles.right]: direction === EOverlayDirection.RIGHT,
                    [styles.top]: direction === EOverlayDirection.TOP,
                })}
                onTransitionEnd={handleTransitionEnd}
                ref={ref}
                {...htmlDivAttributes}
            >
                <div className={styles.overlayContent}>{children}</div>
            </div>
        );
    },
);

OverlayPanel.displayName = "OverlayPanel";
