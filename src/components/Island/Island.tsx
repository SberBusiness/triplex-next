import React from "react";
import clsx from "clsx";
import { EIslandType } from "./enums";
import { IslandBody } from "./components/IslandBody";
import { IslandHeader } from "./components/IslandHeader";
import { IslandFooter } from "./components/IslandFooter";
import { mapTypeToClassName } from "./utils";
import { EComponentSize } from "@sberbusiness/triplex-next/enums/EComponentSize";
import { createSizeToClassNameMap } from "@sberbusiness/triplex-next/utils/classNameMaps";
import styles from "./styles/Island.module.less";

/** Свойства компонента Island. */
export interface IIslandProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Тип. Отличаются цвет фона и тень.
     * @default EIslandType.TYPE_1
     */
    type?: EIslandType;
    /** Размер. Задаёт скругление, внутренние отступы и отступы между Header, Body и Footer.
     * @default EComponentSize.MD
     */
    size?: EComponentSize;
}

const SIZE_TO_CLASS_NAME_MAP = createSizeToClassNameMap(styles);

/** Контейнер-карточка. Составные части — Island.Header, Island.Body, Island.Footer. */
export const Island = Object.assign(
    React.forwardRef<HTMLDivElement, IIslandProps>(
        ({ type = EIslandType.TYPE_1, size = EComponentSize.MD, className, children, ...rest }, ref) => {
            return (
                <div
                    className={clsx(styles.island, mapTypeToClassName(type), SIZE_TO_CLASS_NAME_MAP[size], className)}
                    ref={ref}
                    {...rest}
                >
                    {children}
                </div>
            );
        },
    ),
    {
        Body: IslandBody,
        Header: IslandHeader,
        Footer: IslandFooter,
    },
);

Island.displayName = "Island";
