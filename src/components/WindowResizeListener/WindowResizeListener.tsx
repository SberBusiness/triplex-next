import React, { useEffect } from "react";
import throttle from "lodash-es/throttle";

/** Свойства компонента WindowResizeListener. */
export interface IWindowResizeListenerProps {
    /** Содержимое. Рендерится как есть, без обёртки и без собственной разметки. */
    children?: React.ReactNode;
    /** Обработчик изменения размеров окна. Получает нативный UIEvent. */
    onResize: (event: UIEvent) => void;
    /** Задержка throttle между вызовами onResize, в миллисекундах. По умолчанию 100. */
    throttleDelay?: number;
}

/**
 * Слушатель изменения размеров окна браузера. Пока компонент смонтирован, слушает resize
 * на window и вызывает onResize не чаще, чем раз в throttleDelay миллисекунд.
 */
export const WindowResizeListener: React.FC<IWindowResizeListenerProps> = ({
    children,
    onResize,
    throttleDelay = 100,
}) => {
    useEffect(() => {
        const throttledResize = throttle(onResize, throttleDelay);

        window.addEventListener("resize", throttledResize);

        return () => {
            window.removeEventListener("resize", throttledResize);
            // Отменяет отложенный trailing-вызов: снятие слушателя его не отменяет.
            throttledResize.cancel();
        };
    }, [onResize, throttleDelay]);

    return children ?? null;
};

WindowResizeListener.displayName = "WindowResizeListener";
