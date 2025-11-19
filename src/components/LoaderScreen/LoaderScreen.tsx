import React from "react";
import { LoaderSmall, ELoaderSmallTheme, LoaderMiddle } from "../Loader";
import clsx from "clsx";
import { EComponentSize } from "@sberbusiness/triplex-next/enums";
import styles from "./styles/LoaderScreen.module.less";

/** Свойства компонента LoaderScreen. */
export interface ILoaderScreenProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Тип лоадера. */
    type: "small" | "middle";
    /** Тема лоадера для типа small. */
    theme?: ELoaderSmallTheme;
    /** Размер лоадера для типа small. */
    size?: EComponentSize;
}

export const LoaderScreen: React.FC<ILoaderScreenProps> = ({
    className,
    size = EComponentSize.MD,
    type,
    theme = ELoaderSmallTheme.BRAND,
    ...htmlDivAttributes
}) => {
    const classNames = clsx(className, styles.loaderScreen, {
        [styles.loaderSmallBackdrop]: type === "small",
        [styles.loaderMiddleBackdrop]: type === "middle",
    });

    return (
        <div className={classNames} {...htmlDivAttributes}>
            {type === "small" ? (
                <LoaderSmall size={size} theme={theme} />
            ) : (
                <div className={styles.loaderMiddleBackground}>
                    <LoaderMiddle />
                </div>
            )}
        </div>
    );
};

LoaderScreen.displayName = "LoaderScreen";
