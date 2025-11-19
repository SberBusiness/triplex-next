import React from "react";
import { useEffect, useState, useRef } from "react";
import { LoaderScreen } from "../../LoaderScreen/LoaderScreen";
import styles from "./styles/LightBoxSideOverlayLoader.module.less";

interface ILightBoxSideOverlayLoaderProps {
    /** Текст под спиннером.*/
    loadingTitle?: React.ReactNode;
}

export const LightBoxSideOverlayLoader: React.FC<ILightBoxSideOverlayLoaderProps> = ({ loadingTitle }) => {
    // Позиция top, высчитывается из scrollTop родителя.
    const [topPosition, setTopPosition] = useState<number | string>(0);
    const loaderRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        setTimeout(() => {
            if (loaderRef.current) {
                const position = loaderRef.current.getBoundingClientRect();
                // position.top равен высоте скролла родителя.
                if (position.top !== topPosition) {
                    setTopPosition(Math.abs(position.top));
                }
            }
        });
    }, []);

    return (
        <div ref={loaderRef} className={styles.lightBoxSideOverlayLoaderWrapper} style={{ top: `${topPosition}px` }}>
            <LoaderScreen type="middle">{loadingTitle}</LoaderScreen>
        </div>
    );
};

LightBoxSideOverlayLoader.displayName = "LightBoxSideOverlayLoader";
