import React, { forwardRef, useImperativeHandle, useRef } from "react";
import clsx from "clsx";
import { useLightBoxSidebarVisibility } from "./useLightBoxSidebarVisibility";
import styles from "./styles/LightBoxLeftSidebar.module.less";

/** Свойства компонента LightBoxLeftSidebar. */
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
export const LightBoxLeftSidebar = forwardRef<HTMLDivElement, ILightBoxLeftSidebarProps>(
    ({ children, className, fixed, minVisibleWidth = 100, onShow, onHide, ...htmlDivAttributes }, ref) => {
        const outerRef = useRef<HTMLDivElement>(null);
        // Callback вызывается после монтирования, когда outerRef уже установлен.
        useImperativeHandle(ref, () => outerRef.current!);
        const isVisible = useLightBoxSidebarVisibility(outerRef, { minVisibleWidth, onShow, onHide });

        return (
            <div
                ref={outerRef}
                className={clsx(className, styles.lightBoxLeftSidebar, { [styles.fixed]: fixed })}
                {...htmlDivAttributes}
            >
                <div className={clsx(styles.lightBoxLeftSidebarInner, { [styles.hidden]: !isVisible })}>{children}</div>
            </div>
        );
    },
);

LightBoxLeftSidebar.displayName = "LightBoxLeftSidebar";
