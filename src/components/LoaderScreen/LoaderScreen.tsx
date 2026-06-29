import React from "react";
import { LoaderSmall, ELoaderSmallTheme, LoaderMiddle } from "../Loader";
import { Gap } from "../Gap";
import { ETextSize, Text } from "../Typography";
import clsx from "clsx";
import { EComponentSize } from "@sberbusiness/triplex-next/enums";
import styles from "./styles/LoaderScreen.module.less";

/** Свойства компонента LoaderScreen. */
export interface ILoaderScreenProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Тип лоадера. */
    type: "small" | "middle";
    /** Размер лоадера для типа small. */
    size?: EComponentSize;
    /** Текст, который будет отображаться под спиннером. */
    description?: React.ReactNode;
    /** Кнопки, которые будут отображаться под спиннером. */
    controls?: React.ReactNode;
}

export const LoaderScreen: React.FC<ILoaderScreenProps> = ({
    className,
    size = EComponentSize.MD,
    type,
    description,
    controls,
    ...htmlDivAttributes
}) => {
    const classNames = clsx(className, styles.loaderScreen, {
        [styles.loaderSmallBackdrop]: type === "small",
        [styles.loaderMiddleBackdrop]: type === "middle",
    });

    return (
        <div className={classNames} {...htmlDivAttributes}>
            <div className={styles.loaderContent}>
                {type === "small" ? <LoaderSmall size={size} theme={ELoaderSmallTheme.BRAND} /> : <LoaderMiddle />}

                {description && (
                    <>
                        <Gap size={24} />
                        <Text className={styles.description} tag="div" size={ETextSize.B2}>
                            {description}
                        </Text>
                    </>
                )}

                {controls && (
                    <>
                        {description && <Gap size={24} />}
                        <div>{controls}</div>
                    </>
                )}
            </div>
        </div>
    );
};

LoaderScreen.displayName = "LoaderScreen";
