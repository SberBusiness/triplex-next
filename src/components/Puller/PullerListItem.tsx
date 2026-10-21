import React from "react";
import clsx from "clsx";
import { Text } from "../Typography/Text";
import { ETextSize } from "../Typography/enums";
import { EComponentSize } from "../../enums";
import { Badge } from "../Badge/Badge";
import styles from "./styles/Puller.module.less";

/** Свойства компонента PullerListItem. */
export interface IPullerListItemProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Идентификатор элемента. */
    id: string;
    /** Обработчик выбора текущего элемента. Вызывается по клику, до onClick. */
    onSelect?: () => void;
    /** Флаг - текущий элемент выбран. */
    selected?: boolean;
    /** Флаг отображения значка новых уведомлений. */
    showNotificationIcon?: boolean;
}

/** Элемент списка Puller. */
export const PullerListItem = React.forwardRef<HTMLDivElement, IPullerListItemProps>(
    ({ children, className, id, onClick, onSelect, selected, showNotificationIcon, ...restProps }, ref) => {
        const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
            onSelect?.();
            onClick?.(event);
        };

        return (
            <Text
                tag="div"
                size={ETextSize.B3}
                className={clsx(styles.pullerListItem, { [styles.selected]: selected }, className)}
                aria-selected={Boolean(selected)}
                role="option"
                onClick={handleClick}
                title={typeof children === "string" ? children : undefined}
                {...restProps}
                ref={ref}
            >
                {children}
                {showNotificationIcon && <Badge.Dot size={EComponentSize.MD} className={styles.notificationIcon} />}
            </Text>
        );
    },
);

PullerListItem.displayName = "PullerListItem";
