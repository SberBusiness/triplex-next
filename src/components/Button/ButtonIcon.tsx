import React from "react";
import { EButtonIconShape } from "./enums";
import clsx from "clsx";
import styles from "./styles/ButtonIcon.module.less";

const getButtonIconShapeClassName = (shape?: EButtonIconShape) => {
    switch (shape) {
        case EButtonIconShape.SQUARE:
            return styles.square;
        case EButtonIconShape.CIRCLE:
            return styles.circle;
    }
};

/** Свойства ButtonIcon. */
export interface IButtonIconProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    /** Форма границы кнопки. */
    shape?: EButtonIconShape;
    /** Активное состояние. */
    active?: boolean;
}

/** Кнопка-иконка. */
export const ButtonIcon = React.forwardRef<HTMLButtonElement, IButtonIconProps>(
    ({ className, disabled, shape = EButtonIconShape.SQUARE, active, ...rest }, ref) => {
        const classNames = clsx(styles.buttonIcon, getButtonIconShapeClassName(shape), "hoverable", className, {
            active: !!active,
            disabled: !!disabled,
        });

        return <button className={classNames} disabled={disabled} {...rest} ref={ref} />;
    },
);

ButtonIcon.displayName = "ButtonIcon";
