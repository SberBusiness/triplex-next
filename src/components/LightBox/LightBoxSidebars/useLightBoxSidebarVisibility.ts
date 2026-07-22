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
    // Текущее значение видимости вне state, чтобы вызывать onShow/onHide вне setState-updater (updater должен быть чистым).
    const isVisibleRef = useRef(true);
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

                if (shouldBeVisible !== isVisibleRef.current) {
                    isVisibleRef.current = shouldBeVisible;

                    if (shouldBeVisible) {
                        onShowRef.current?.();
                    } else {
                        onHideRef.current?.();
                    }
                }

                setIsVisible(shouldBeVisible);
            }
        });

        observer.observe(element);
        return () => observer.disconnect();
    }, [elementRef, minVisibleWidth]);

    return isVisible;
};
