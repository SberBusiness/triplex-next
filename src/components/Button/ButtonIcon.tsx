import React from "react";
import clsx from "clsx";
import { DataAttributes } from "../../types/CoreTypes";
import { EButtonIconShape } from "./enums";
import { IconWrapper } from "../IconWrapper";
import styles from "./styles/ButtonIcon.module.less";

const SHAPE_TO_CLASS_NAME_MAP: Record<EButtonIconShape, string> = {
    [EButtonIconShape.SQUIRCLE]: styles.squircle,
    [EButtonIconShape.CIRCLE]: styles.circle,
};

/** Свойства компонента ButtonIcon. */
export interface IButtonIconProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, DataAttributes {
    /** Форма границы кнопки. По умолчанию EButtonIconShape.SQUIRCLE. */
    shape?: EButtonIconShape;
    /** Активное состояние. По умолчанию false. */
    active?: boolean;
    /**
     * Содержимое кнопки, обычно иконка из @sberbusiness/icons-next.
     * Не деструктурируется отдельно — уходит на корневой button внутри ...rest.
     */
    children?: React.ReactNode;
}

/**
 * Кнопка-иконка — компактный интерактивный элемент без текстового контента.
 * Размер задаётся размером переданной иконки. Требует aria-label от потребителя.
 */
export const ButtonIcon = React.forwardRef<HTMLButtonElement, IButtonIconProps>(
    ({ className, disabled, shape = EButtonIconShape.SQUIRCLE, active, ...rest }, ref) => {
        const classNames = clsx(styles.buttonIcon, SHAPE_TO_CLASS_NAME_MAP[shape], className);

        return (
            <IconWrapper displayContents disabled={disabled} active={active}>
                <button type="button" className={classNames} disabled={disabled} {...rest} ref={ref} />
            </IconWrapper>
        );
    },
);

ButtonIcon.displayName = "ButtonIcon";
