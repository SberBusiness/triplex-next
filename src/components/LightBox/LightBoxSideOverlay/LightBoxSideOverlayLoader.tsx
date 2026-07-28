import React, { useEffect, useRef, useState } from "react";
import { LoaderScreen, ILoaderScreenMiddleProps } from "../../LoaderScreen/LoaderScreen";
import styles from "./styles/LightBoxSideOverlayLoader.module.less";

/** Свойства компонента LightBoxSideOverlayLoader. */
export interface ILightBoxSideOverlayLoaderProps {
    /** Свойства компонента LoaderScreen. */
    loaderScreenProps?: ILoaderScreenMiddleProps;
}

/** Экран загрузки, перекрывающий содержимое SideOverlay. */
export const LightBoxSideOverlayLoader: React.FC<ILightBoxSideOverlayLoaderProps> = ({ loaderScreenProps }) => {
    // Позиция top, высчитывается из scrollTop родителя.
    const [topPosition, setTopPosition] = useState<number>(0);
    const loaderRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (loaderRef.current) {
                const position = loaderRef.current.getBoundingClientRect();
                // position.top равен высоте скролла родителя. Отрицательное значение — родитель прокручен вниз.
                if (position.top < 0) {
                    setTopPosition(Math.abs(position.top));
                }
            }
        });

        return () => clearTimeout(timeoutId);
    }, []);

    return (
        <div ref={loaderRef} className={styles.lightBoxSideOverlayLoaderWrapper} style={{ top: `${topPosition}px` }}>
            <LoaderScreen {...loaderScreenProps} type="middle" />
        </div>
    );
};

LightBoxSideOverlayLoader.displayName = "LightBoxSideOverlayLoader";
