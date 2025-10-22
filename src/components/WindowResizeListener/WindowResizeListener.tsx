import React, { useEffect } from "react";
import throttle from "lodash-es/throttle";

/** Свойства компонента WindowResizeListener. */
interface IWindowResizeListenerProps {
    children?: React.ReactNode;
    /** Обработчик изменения размер окна. */
    onResize: (event: UIEvent) => void;
    /** Задержка для функции throttle, в миллисекундах. */
    throttleDelay?: number;
}

/** Слушатель изменения размеров окна браузера. */
export const WindowResizeListener: React.FC<IWindowResizeListenerProps> = ({
    children,
    onResize,
    throttleDelay = 100,
}) => {
    useEffect(() => {
        const throttled = throttle(onResize, throttleDelay);
        window.addEventListener("resize", throttled);

        return () => {
            window.removeEventListener("resize", throttled);
            throttled.cancel?.();
        };
    }, [onResize, throttleDelay]);

    return children;
};

WindowResizeListener.displayName = "WindowResizeListener";
