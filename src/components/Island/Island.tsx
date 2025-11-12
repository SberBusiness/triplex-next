import React from "react";
import clsx from "clsx";
import { EIslandType } from "./enums";
import { IslandBody } from "./components/IslandBody";
import { IslandHeader } from "./components/IslandHeader";
import { IslandFooter } from "./components/IslandFooter";
import { mapTypeToClassName, mapBorderRadiusToClassName, mapPaddingSizeToClassName } from "./utils";
import { TIslandBorderRadiusSize, TIslandPaddingSize } from "./types";
import styles from "./styles/Island.module.less";

export interface IIslandProps extends React.HTMLProps<HTMLDivElement> {
    /** Возможные размеры скругления. */
    borderRadius?: TIslandBorderRadiusSize;
    /** Тип компонента Island. Отличаются цвет и тень. */
    type?: EIslandType;
    /** Возможные размеры внутреннего отступа. */
    paddingSize?: TIslandPaddingSize;
}

export const Island = Object.assign(
    React.forwardRef<HTMLDivElement, IIslandProps>(
        ({ type = EIslandType.TYPE_1, borderRadius = 16, paddingSize = 16, className, children, ...rest }, ref) => {
            return (
                <div
                    className={clsx(
                        styles.island,
                        mapTypeToClassName(type),
                        mapBorderRadiusToClassName(borderRadius),
                        mapPaddingSizeToClassName(paddingSize),
                        className,
                    )}
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
