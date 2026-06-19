import React from "react";
import clsx from "clsx";
import { IOverlayBaseProps, OverlayBase } from "./OverlayBase";
import { OverlayMask } from "./OverlayMask";
import { OverlayPanel } from "./OverlayPanel";
import styles from "./styles/Overlay.module.less";

export interface IOverlayProps extends IOverlayBaseProps, Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
    /**
     * Оверлей с фиксированным позиционированием на всю страницу, иначе с абсолютным поверх родителя.
     */
    fixed?: boolean;
}

/**
 * Оверлей элемента/страницы с выезжающей панелью.
 */
export const Overlay = Object.assign(
    React.forwardRef<HTMLDivElement, IOverlayProps>(
        (
            {
                children,
                className,
                direction,
                fixed,
                onClose,
                onClosing,
                onOpening,
                onOpen,
                opened,
                setOpened,
                ...htmlDivAttributes
            },
            ref,
        ) => (
            <OverlayBase
                direction={direction}
                onClose={onClose}
                onClosing={onClosing}
                onOpening={onOpening}
                onOpen={onOpen}
                opened={opened}
                setOpened={setOpened}
            >
                {(provideProps) => (
                    <div
                        className={clsx(styles.overlay, className, {
                            [styles.closing]: provideProps.closing,
                            [styles.fixed]: Boolean(fixed),
                            [styles.opened]: opened,
                        })}
                        ref={ref}
                        {...htmlDivAttributes}
                    >
                        {children(provideProps)}
                    </div>
                )}
            </OverlayBase>
        ),
    ),
    {
        Mask: OverlayMask,
        Panel: OverlayPanel,
    },
);

Overlay.displayName = "Overlay";
