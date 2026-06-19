import { CrossStrokeSrvIcon16 } from "@sberbusiness/icons-next";
import { ButtonIcon, IButtonIconProps } from "@sberbusiness/triplex-next/components/Button";
import React from "react";
import styles from "../styles/Notification.module.less";

/** Свойства компонента кнопки закрытия нотификации. */
export interface INotificationCloseProps extends Omit<IButtonIconProps, "children"> {
    /** Обработчик закрытия нотификации. */
    onClick: () => void;
    /** Дочерний элемент. */
    children?: never;
}

/**
 * Компонент кнопки закрытия нотификации.
 */
export const NotificationClose: React.FC<INotificationCloseProps> = ({ onClick, ...buttonProps }) => (
    <span className={styles.notificationClose}>
        <ButtonIcon {...buttonProps} onClick={onClick}>
            <CrossStrokeSrvIcon16 paletteIndex={5} />
        </ButtonIcon>
    </span>
);

NotificationClose.displayName = "NotificationClose";
