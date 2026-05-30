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
    /** Размер. */
    size?: EComponentSize;
    /** Тип. */
    type?: EChipType;
}

/** Соответствие типа имени класса. */
const typeToClassNameMap: Record<EChipType, string> = {
    [EChipType.TYPE_1]: styles.type1,
    [EChipType.TYPE_2]: styles.type2,
};

/** Соответствие размера имени класса. */
const sizeToClassNameMap = createSizeToClassNameMap(styles);

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
                    typeToClassNameMap[type],
                    sizeToClassNameMap[size],
                    {
                        [styles.disabled]: Boolean(disabled),
                        [styles.selected]: Boolean(selected),
                        [styles.withPostfix]: typeof postfix !== "undefined",
                        [styles.withPrefix]: typeof prefix !== "undefined",
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
                    <IconWrapper className={styles.prefix} disabled={Boolean(disabled)}>
                        {prefix}
                    </IconWrapper>
                ) : null}

                <span className={styles.content}>{children}</span>

                {postfix ? (
                    <IconWrapper className={styles.postfix} disabled={Boolean(disabled)}>
                        {postfix}
                    </IconWrapper>
                ) : null}

                {showNotificationIcon && <Badge.Dot size={size} className={styles.notificationIcon} />}
            </span>
        );
    },
);

Chip.displayName = "Chip";
