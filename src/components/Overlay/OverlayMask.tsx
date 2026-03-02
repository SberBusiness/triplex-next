import React from "react";
import clsx from "clsx";
import { IOverlayChildrenProvideProps } from "@sberbusiness/triplex-next/components/Overlay/OverlayBase";
import styles from "./styles/Overlay.module.less";

export interface IOverlayMaskProps
    extends Pick<IOverlayChildrenProvideProps, "opened">,
        React.HTMLAttributes<HTMLDivElement> {}

/**
 * Область с полупрозрачным фоном между контейнером оверлея и OverlayPanel.
 */
export const OverlayMask = React.forwardRef<HTMLDivElement, IOverlayMaskProps>(
    ({ className, opened, ...htmlDivAttributes }, ref) => (
        <div
            className={clsx(styles.overlayMask, className, {
                [styles.overlayOpened]: opened,
            })}
            ref={ref}
            {...htmlDivAttributes}
        />
    ),
);

OverlayMask.displayName = "OverlayMask";
