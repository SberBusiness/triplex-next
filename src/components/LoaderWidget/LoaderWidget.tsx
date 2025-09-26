import React from "react";
import { LoaderSmall, ELoaderSmallSize, ELoaderSmallTheme, LoaderMiddle } from "../Loader";
import clsx from "clsx";
import styles from "./styles/LoaderWidget.module.less";

/** Свойства компонента LoaderWidget. */
export interface ILoaderWidgetProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Тип лоадера. */
    type: "small" | "middle";
    /** Тема лоадера для типа small. */
    theme?: ELoaderSmallTheme;
    /** Размер лоадера для типа small. */
    size?: ELoaderSmallSize;
}

/** Лоадер виждет, закрывает контент и отображает лоадер в середине своей области. */
export const LoaderWidget: React.FC<ILoaderWidgetProps> = ({
    className,
    size = ELoaderSmallSize.MD,
    type,
    theme = ELoaderSmallTheme.BRAND,
    ...htmlDivAttributes
}) => (
    <div className={clsx(className, styles.loaderWidget)} {...htmlDivAttributes}>
        {type === "small" ? (
            <LoaderSmall size={size} theme={theme} />
        ) : (
            <div className={styles.loaderMiddleBackground}>
                <LoaderMiddle />
            </div>
        )}
    </div>
);

LoaderWidget.displayName = "LoaderWidget";
