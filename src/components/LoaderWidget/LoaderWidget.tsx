import React from "react";
import { LoaderSmall, ELoaderSmallTheme, LoaderMiddle } from "../Loader";
import clsx from "clsx";
import { EComponentSize } from "@sberbusiness/triplex-next/enums";
import styles from "./styles/LoaderWidget.module.less";

/** Свойства компонента LoaderWidget. */
export interface ILoaderWidgetProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Тип лоадера. */
    type: "small" | "middle";
    /** Тема лоадера для типа small. */
    theme?: ELoaderSmallTheme;
    /** Размер лоадера для типа small. */
    size?: EComponentSize;
}

/** Лоадер виждет, закрывает контент и отображает лоадер в середине своей области. */
export const LoaderWidget: React.FC<ILoaderWidgetProps> = ({
    className,
    size = EComponentSize.MD,
    type,
    theme = ELoaderSmallTheme.BRAND,
    ...htmlDivAttributes
}) => {
    const classNames = clsx(className, styles.loaderWidget, {
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

LoaderWidget.displayName = "LoaderWidget";
