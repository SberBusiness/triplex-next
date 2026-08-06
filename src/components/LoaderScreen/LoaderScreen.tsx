import React from "react";
import clsx from "clsx";
import { EComponentSize } from "@sberbusiness/triplex-next/enums";
import { Gap } from "../Gap";
import { LoaderSmall, ELoaderSmallTheme, LoaderMiddle } from "../Loader";
import { ETextSize, Text } from "../Typography";
import styles from "./styles/LoaderScreen.module.less";

/** Свойства компонента LoaderScreen. */
export interface ILoaderScreenProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Тип лоадера: `small` — компактный LoaderSmall, `middle` — крупный LoaderMiddle. */
    type: "small" | "middle";
    /**
     * Размер лоадера. Учитывается только при `type="small"`.
     * @default EComponentSize.MD
     */
    size?: EComponentSize;
    /** Текст, который будет отображаться под спиннером. */
    description?: React.ReactNode;
    /** Кнопки, которые будут отображаться под спиннером. */
    controls?: React.ReactNode;
}

/**
 * Свойства LoaderScreen с предустановленным типом `middle`.
 * Используется компонентами библиотеки, которые встраивают LoaderScreen и сами задают тип
 * (ModalWindowContent, LightBoxContent, LightBoxSideOverlay).
 */
export interface ILoaderScreenMiddleProps extends Omit<ILoaderScreenProps, "type" | "size"> {}

/** Соответствие типа лоадера имени класса подложки. */
const TYPE_TO_BACKDROP_CLASS_NAME_MAP: Record<ILoaderScreenProps["type"], string> = {
    small: styles.loaderSmallBackdrop,
    middle: styles.loaderMiddleBackdrop,
};

/**
 * Виджет-загрузчик. Перекрывает область ближайшего позиционированного родителя полупрозрачной
 * подложкой и показывает по центру лоадер, опциональное описание и кнопки.
 */
export const LoaderScreen = React.forwardRef<HTMLDivElement, ILoaderScreenProps>(
    ({ className, size = EComponentSize.MD, type, description, controls, ...htmlDivAttributes }, ref) => {
        const classNames = clsx(styles.loaderScreen, TYPE_TO_BACKDROP_CLASS_NAME_MAP[type], className);

        return (
            <div ref={ref} className={classNames} {...htmlDivAttributes}>
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
                            <Gap size={24} />
                            <div>{controls}</div>
                        </>
                    )}
                </div>
            </div>
        );
    },
);

LoaderScreen.displayName = "LoaderScreen";
