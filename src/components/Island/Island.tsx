import React from "react";
import clsx from "clsx";
import { EIslandType } from "./enums";
import { IslandBody } from "./components/IslandBody";
import { IslandHeader } from "./components/IslandHeader";
import { IslandFooter } from "./components/IslandFooter";
import { mapTypeToClassName } from "./utils";
import styles from "./styles/Island.module.less";
import { EComponentSize } from "@sberbusiness/triplex-next";
import { createSizeToClassNameMap } from "@sberbusiness/triplex-next/utils/classNameMaps";

export interface IIslandProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Тип компонента Island. Отличаются цвет и тень. */
    type?: EIslandType;
    /** Возможные размеры острова. */
    size?: EComponentSize;
}

const sizeToClassNameMap = createSizeToClassNameMap(styles);

export const Island = Object.assign(
    React.forwardRef<HTMLDivElement, IIslandProps>(
        ({ type = EIslandType.TYPE_1, size = EComponentSize.MD, className, children, ...rest }, ref) => {
            return (
                <div
                    className={clsx(styles.island, mapTypeToClassName(type), sizeToClassNameMap[size], className)}
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
