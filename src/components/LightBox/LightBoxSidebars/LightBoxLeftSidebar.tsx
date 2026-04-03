import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import styles from "./styles/LightBoxLeftSidebar.module.less";

export interface ILightBoxLeftSidebarProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Фиксация боковой панели. */
    fixed?: boolean;
    /** Минимальная ширина (в пикселях), при которой содержимое боковой панели отображается. По умолчанию 100. */
    minVisibleWidth?: number;
    /** Callback при отображении содержимого боковой панели. */
    onShow?: () => void;
    /** Callback при скрытии содержимого боковой панели. */
    onHide?: () => void;
}

/** Контейнер левой боковой панели. */
export const LightBoxLeftSidebar: React.FC<ILightBoxLeftSidebarProps> = ({
    children,
    className,
    fixed,
    minVisibleWidth = 100,
    onShow,
    onHide,
    ...htmlDivAttributes
}) => {
    const outerRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(true);
    const onShowRef = useRef(onShow);
    const onHideRef = useRef(onHide);

    useEffect(() => {
        onShowRef.current = onShow;
        onHideRef.current = onHide;
    }, [onShow, onHide]);

    useEffect(() => {
        const element = outerRef.current;
        if (!element) return;

        const observer = new ResizeObserver((entries) => {
            for (const entry of entries) {
                const shouldBeVisible = entry.contentRect.width > minVisibleWidth;

                setIsVisible((prev) => {
                    if (shouldBeVisible !== prev) {
                        if (shouldBeVisible) {
                            onShowRef.current?.();
                        } else {
                            onHideRef.current?.();
                        }
                    }
                    return shouldBeVisible;
                });
            }
        });

        observer.observe(element);
        return () => observer.disconnect();
    }, [minVisibleWidth]);

    return (
        <div
            ref={outerRef}
            className={clsx(className, styles.lightBoxLeftSidebar, { [styles.fixed]: fixed })}
            {...htmlDivAttributes}
        >
            <div className={clsx(styles.lightBoxLeftSidebarInner, { [styles.hidden]: !isVisible })}>{children}</div>
        </div>
    );
};

LightBoxLeftSidebar.displayName = "LightBoxLeftSidebar";
