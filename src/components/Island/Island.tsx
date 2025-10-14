import React from "react";
import clsx from "clsx";
import {
    EIslandBorderRadius,
    EIslandPaddingSize,
    EIslandType,
} from "@sberbusiness/triplex-next/components/Island/enums";
import styles from "./styles/Island.module.less";

export interface IIslandProps extends React.HTMLProps<HTMLDivElement> {
    /** Возможные размеры скругления. */
    borderRadius?: EIslandBorderRadius;
    /** Тип компонента Island. Отличаются цвет и тень. */
    type?: EIslandType;
    /** Возможные размеры внутреннего отступа. */
    paddingSize?: EIslandPaddingSize;
}

export const Island = React.forwardRef<HTMLDivElement, IIslandProps>(
    (
        {
            type = EIslandType.type1,
            borderRadius = EIslandBorderRadius.MD,
            paddingSize = EIslandPaddingSize.MD,
            children,
            ...rest
        },
        ref,
    ) => {
        return (
            <div
                className={clsx(styles.island, styles[type], styles[borderRadius], styles[paddingSize])}
                ref={ref}
                {...rest}
            >
                {children}
            </div>
        );
    },
);
