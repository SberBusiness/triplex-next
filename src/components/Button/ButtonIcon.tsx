import React from "react";
import clsx from "clsx";
import { DataAttributes } from "@sberbusiness/triplex-next/types/CoreTypes";
import { EButtonIconShape } from "@sberbusiness/triplex-next/components/Button/enums";
import styles from "./styles/ButtonIcon.module.less";

const iconShapeToClassNameMap = {
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
        const classNames = clsx(styles.buttonIcon, iconShapeToClassNameMap[shape], "hoverable", className, {
            active: !!active,
            disabled: !!disabled,
        });

        return <button type="button" className={classNames} disabled={disabled} {...rest} ref={ref} />;
    },
);

ButtonIcon.displayName = "ButtonIcon";
