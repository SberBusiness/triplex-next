import React from "react";
import { LoaderScreen } from "../../LoaderScreen/LoaderScreen";
import styles from "./styles/LightBoxSideOverlayLoader.module.less";

interface ILightBoxSideOverlayLoaderProps {
    /** Текст под спиннером.*/
    loadingTitle?: React.ReactNode;
}

export const LightBoxSideOverlayLoader: React.FC<ILightBoxSideOverlayLoaderProps> = ({ loadingTitle }) => {
    return (
        <div className={styles.lightBoxSideOverlayLoaderWrapper}>
            <LoaderScreen type="middle">{loadingTitle}</LoaderScreen>
        </div>
    );
};

LightBoxSideOverlayLoader.displayName = "LightBoxSideOverlayLoader";
