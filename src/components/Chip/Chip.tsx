import React, { useCallback } from "react";
import clsx from "clsx";
import { EComponentSize } from "../../enums";
import { createSizeToClassNameMap } from "../../utils/classNameMaps";
import { DataAttributes } from "../../types/CoreTypes";
import { isKey } from "../../utils/keyboard";
import { Badge } from "../Badge/Badge";
import { IconWrapper } from "../IconWrapper";
import { EChipType } from "./enums";
import styles from "./styles/Chip.module.less";

/** Свойства компонента Chip. */
export interface IChipProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, "prefix">, DataAttributes {
    /** Основной контент. */
    children?: React.ReactNode;
    /** Состояние disabled. */
    disabled?: boolean;
    /** Выбранное состояние. */
    selected?: boolean;
    /** Контент, предшествующий основному контенту, например иконка слева. */
    prefix?: React.ReactNode;
    /** Контент, следующий за основным контентом, например иконка справа. */
    postfix?: React.ReactNode;
    /** Флаг отображения значка новых уведомлений. */
    showNotificationIcon?: boolean;
    /** Размер. По умолчанию EComponentSize.MD. */
    size?: EComponentSize;
    /** Тип. По умолчанию EChipType.TYPE_1. */
    type?: EChipType;
}

/** Соответствие типа имени класса. */
const TYPE_TO_CLASS_NAME_MAP: Record<EChipType, string> = {
    [EChipType.TYPE_1]: styles.type1,
    [EChipType.TYPE_2]: styles.type2,
};

/** Соответствие размера имени класса. */
const SIZE_TO_CLASS_NAME_MAP = createSizeToClassNameMap(styles);

/**
 * Предоставляет возможность произвести действие по нажатию, также отображает выбранное состояние.
 * Рекомендуется всегда располагать Chip внутри компонента ChipGroup.
 */
export const Chip = React.forwardRef<HTMLSpanElement, IChipProps>(
    (
        {
            children,
            className,
            disabled,
            postfix,
            prefix,
            selected,
            showNotificationIcon,
            size = EComponentSize.MD,
            type = EChipType.TYPE_1,
            onKeyDown,
            ...restProps
        },
        ref,
    ) => {
        /** Отменяет прокрутку страницы при нажатии пробела, так как Chip является фокусируемым элементом. */
        const handleKeyDown = useCallback<React.KeyboardEventHandler<HTMLSpanElement>>(
            (event) => {
                if (isKey(event.code, "SPACE")) {
                    event.preventDefault();
                }
                onKeyDown?.(event);
            },
            [onKeyDown],
        );

        return (
            <span
                className={clsx(
                    styles.chip,
                    styles.chipGroupItem,
                    TYPE_TO_CLASS_NAME_MAP[type],
                    SIZE_TO_CLASS_NAME_MAP[size],
                    {
                        [styles.disabled]: disabled,
                        [styles.selected]: selected,
                        [styles.withPostfix]: postfix !== undefined,
                        [styles.withPrefix]: prefix !== undefined,
                    },
                    className,
                )}
                role="button"
                tabIndex={disabled ? -1 : 0}
                onKeyDown={handleKeyDown}
                {...restProps}
                ref={ref}
            >
                {prefix ? (
                    <IconWrapper className={styles.prefix} disabled={disabled}>
                        {prefix}
                    </IconWrapper>
                ) : null}

                <span className={styles.content}>{children}</span>

                {postfix ? (
                    <IconWrapper className={styles.postfix} disabled={disabled}>
                        {postfix}
                    </IconWrapper>
                ) : null}

                {showNotificationIcon ? <Badge.Dot size={size} className={styles.notificationIcon} /> : null}
            </span>
        );
    },
);

Chip.displayName = "Chip";
