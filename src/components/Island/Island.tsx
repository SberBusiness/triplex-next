import React from "react";
import clsx from "clsx";
import { EIslandBorderRadius, EIslandPaddingSize, EIslandType } from "./enums";
import { IslandBody } from "./components/IslandBody";
import { IslandHeader } from "./components/IslandHeader";
import { IslandFooter } from "./components/IslandFooter";
import styles from "./styles/Island.module.less";

export interface IIslandProps extends React.HTMLProps<HTMLDivElement> {
    /** Возможные размеры скругления. */
    borderRadius?: EIslandBorderRadius;
    /** Тип компонента Island. Отличаются цвет и тень. */
    type?: EIslandType;
    /** Возможные размеры внутреннего отступа. */
    paddingSize?: EIslandPaddingSize;
}

const mapBorderRadiusToClassName = (borderRadius: EIslandBorderRadius) => {
    switch (borderRadius) {
        case EIslandBorderRadius.MD:
            return styles.borderRadiusMD;
        case EIslandBorderRadius.SM:
            return styles.borderRadiusSM;
    }
};

const mapPaddingSizeToClassName = (paddingSize: EIslandPaddingSize) => {
    switch (paddingSize) {
        case EIslandPaddingSize.MD:
            return styles.paddingMD;

        case EIslandPaddingSize.SM:
            return styles.paddingSM;

        case EIslandPaddingSize.LG:
            return styles.paddingLG;
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
        (
            {
                type = EIslandType.TYPE_1,
                borderRadius = EIslandBorderRadius.MD,
                paddingSize = EIslandPaddingSize.MD,
                className,
                children,
                ...rest
            },
            ref,
        ) => {
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
