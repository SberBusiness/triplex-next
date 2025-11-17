import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { useResizeDetector } from "react-resize-detector";
import { WindowResizeListener } from "../WindowResizeListener/WindowResizeListener";
import clsx from "clsx";
import { LoaderWidget } from "../LoaderWidget/LoaderWidget";
import styles from "./styles/LightBox.module.less";

export interface ILightBoxContentProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    isLoading?: boolean;
    loadingTitle?: React.ReactNode;
}

/**
 * Компонента контента лайтбокса.
 */
export const LightBoxContent: React.FC<ILightBoxContentProps> = (props) => {
    const { children, className, isLoading, loadingTitle, ...htmlDivAttributes } = props;

    const [paddingTop, setPaddingTop] = useState<number>(0);
    const updateStyleTimeoutIdRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const updateStyle = useCallback(() => {
        let nextPaddingTop = 0;

        const controlsNode = document.querySelector(`[data-lightbox-component="controls"]`) as HTMLDivElement | null;
        if (controlsNode) {
            nextPaddingTop += controlsNode.offsetHeight;
        }

        setPaddingTop((prevPaddingTop) => {
            const deltaTop = Math.abs(prevPaddingTop - nextPaddingTop);
            if (deltaTop > 1) {
                return nextPaddingTop;
            }
            return prevPaddingTop;
        });
    }, []);

    const updateStyleWithTimeout = useCallback(() => {
        if (updateStyleTimeoutIdRef.current) {
            clearTimeout(updateStyleTimeoutIdRef.current);
        }
        updateStyleTimeoutIdRef.current = setTimeout(updateStyle, 100);
    }, [updateStyle]);

    useLayoutEffect(() => {
        updateStyle();

        return () => {
            if (updateStyleTimeoutIdRef.current) {
                clearTimeout(updateStyleTimeoutIdRef.current);
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        updateStyleWithTimeout();
    }, [children, className, isLoading, loadingTitle, updateStyleWithTimeout]);

    const { ref: resizeRef } = useResizeDetector({
        handleWidth: true,
        onResize: updateStyleWithTimeout,
        refreshMode: "debounce",
        refreshRate: 100,
    });

    const contentBodyStyle = {
        paddingTop,
    };

    return (
        <WindowResizeListener onResize={updateStyleWithTimeout}>
            <div
                className={clsx(className, styles.lightBoxContent)}
                style={paddingTop ? contentBodyStyle : undefined}
                {...htmlDivAttributes}
            >
                {children}

                {isLoading && (
                    <LoaderWidget className={styles.loadingContentOverlay} type="middle">
                        {loadingTitle}
                    </LoaderWidget>
                )}

                <div className={styles.lightBoxContentResizeWrapper} ref={resizeRef} />
            </div>
        </WindowResizeListener>
    );
};

LightBoxContent.displayName = "LightBoxContent";
