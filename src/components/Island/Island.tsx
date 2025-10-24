import React from "react";
import clsx from "clsx";
import { EIslandType } from "./enums";
import { IslandBody } from "./components/IslandBody";
import { IslandHeader } from "./components/IslandHeader";
import { IslandFooter } from "./components/IslandFooter";
import styles from "./styles/Island.module.less";

export type TIslandBorderRadiusSize = 16 | 24 | 32;
export type TIslandPaddingSize = 16 | 24 | 32;

export interface IIslandProps extends React.HTMLProps<HTMLDivElement> {
    /** Возможные размеры скругления. */
    borderRadius?: TIslandBorderRadiusSize;
    /** Тип компонента Island. Отличаются цвет и тень. */
    type?: EIslandType;
    /** Возможные размеры внутреннего отступа. */
    paddingSize?: TIslandPaddingSize;
}

const mapBorderRadiusToClassName = (borderRadius: TIslandBorderRadiusSize) => {
    switch (borderRadius) {
        case 16:
            return styles.borderRadius16;
        case 24:
            return styles.borderRadius24;
        case 32:
            return styles.borderRadius32;
    }

    return "";
};

const mapPaddingSizeToClassName = (paddingSize: TIslandPaddingSize) => {
    switch (paddingSize) {
        case 16:
            return styles.padding16;

        case 24:
            return styles.padding24;

        case 32:
            return styles.padding32;
    }
};

const mapTypeToClassName = (type: EIslandType) => {
    switch (type) {
        case EIslandType.TYPE_1:
            return styles.type1;

        case EIslandType.TYPE_2:
            return styles.type2;

        case EIslandType.TYPE_3:
            return styles.type3;
    }
};

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
