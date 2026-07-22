import { useEffect, useRef, useState } from "react";

/** Параметры хука useLightBoxSidebarVisibility. */
interface IUseLightBoxSidebarVisibilityParams {
    /** Минимальная ширина (в пикселях), при которой содержимое боковой панели отображается. */
    minVisibleWidth: number;
    /** Callback при отображении содержимого боковой панели. */
    onShow?: () => void;
    /** Callback при скрытии содержимого боковой панели. */
    onHide?: () => void;
}

/**
 * Наблюдает за шириной боковой панели лайтбокса и возвращает флаг видимости её содержимого.
 * При пересечении порога minVisibleWidth вызывает onShow/onHide.
 */
export const useLightBoxSidebarVisibility = (
    elementRef: React.RefObject<HTMLDivElement>,
    { minVisibleWidth, onShow, onHide }: IUseLightBoxSidebarVisibilityParams,
): boolean => {
    const [isVisible, setIsVisible] = useState(true);
    const onShowRef = useRef(onShow);
    const onHideRef = useRef(onHide);

    useEffect(() => {
        onShowRef.current = onShow;
        onHideRef.current = onHide;
    }, [onShow, onHide]);

    useEffect(() => {
        const element = elementRef.current;
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
    }, [elementRef, minVisibleWidth]);

    return isVisible;
};
