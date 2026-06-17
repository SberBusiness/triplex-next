import React from "react";
import clsx from "clsx";
import { IOverlayBaseProps, OverlayBase } from "./OverlayBase";
import { OverlayMask } from "./OverlayMask";
import { OverlayPanel } from "./OverlayPanel";
import styles from "./styles/Overlay.module.less";

export interface IOverlayProps extends IOverlayBaseProps, Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
    /**
     * Render-функция контента оверлея. Получает свойства состояния оверлея.
     */
    children: IOverlayBaseProps["children"];
    /**
     * Оверлей с фиксированным позиционированием на всю страницу, иначе с абсолютным поверх родителя.
     */
    fixed?: boolean;
}

export type IOverlayFC = React.ForwardRefExoticComponent<IOverlayProps & React.RefAttributes<HTMLDivElement>> & {
    Mask: typeof OverlayMask;
    Panel: typeof OverlayPanel;
};

/**
 * Оверлей элемента/страницы с выезжающей панелью.
 */
export const Overlay = React.forwardRef<HTMLDivElement, IOverlayProps>(
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
) as IOverlayFC;

Overlay.displayName = "Overlay";
Overlay.Mask = OverlayMask;
Overlay.Panel = OverlayPanel;
