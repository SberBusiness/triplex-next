import React from "react";
import clsx from "clsx";
import { DataAttributes } from "@sberbusiness/triplex-next/types/CoreTypes";
import { EButtonIconShape } from "@sberbusiness/triplex-next/components/Button/enums";
import styles from "./styles/ButtonIcon.module.less";

const SHAPE_TO_CLASS_NAME_MAP: Record<EButtonIconShape, string> = {
    [EButtonIconShape.SQUIRCLE]: styles.squircle,
    [EButtonIconShape.CIRCLE]: styles.circle,
};

/** Свойства компонента ButtonIcon. */
export interface IButtonIconProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, DataAttributes {
    /** Форма границы кнопки. */
    shape?: EButtonIconShape;
    /** Активное состояние. */
    active?: boolean;
}

/** Кнопка-иконка. */
export const ButtonIcon = React.forwardRef<HTMLButtonElement, IButtonIconProps>(
    ({ className, disabled, shape = EButtonIconShape.SQUIRCLE, active, ...rest }, ref) => {
        const classNames = clsx(
            styles.buttonIcon,
            SHAPE_TO_CLASS_NAME_MAP[shape],
            "hoverable",
            {
                active: !!active,
                disabled: !!disabled,
            },
            className,
        );

        return <button type="button" className={classNames} disabled={disabled} {...rest} ref={ref} />;
    },
);

ButtonIcon.displayName = "ButtonIcon";
