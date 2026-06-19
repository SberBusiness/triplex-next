import clsx from "clsx";
import { NotificationBody } from "./components/NotificationBody";
import { NotificationClose } from "./components/NotificationClose";
import { NotificationIcon } from "./components/NotificationIcon";
import { NotificationTime } from "./components/NotificationTime";
import React from "react";
import styles from "./styles/Notification.module.less";

/** Свойства Notification. */
export interface INotificationProps extends React.ButtonHTMLAttributes<HTMLElement> {
    /** Тело нотификации. */
    children: React.ReactElement | React.ReactElement[];
    /** Признак для увеличения отступа снизу, по дефолту есть в нотификации типа mail. */
    withExtraBottomPadding?: boolean;
    /** Признак является ли нотификация из sideoverlay или алертом, сделано для того чтобы в sideoverlay кнопка закрытия появлялась по ховеру. */
    isShowCloseOnHover?: boolean;
    /** Обработчик клика на нотификацию. */
    onClick?: () => void;
}

/**
 * Notification. Может содержать только Icon, Body, Close, Time.
 */
export const Notification = Object.assign(
    React.forwardRef<HTMLDivElement, INotificationProps>(function Notification(
        { children, className, withExtraBottomPadding = false, isShowCloseOnHover = false, onClick, ...HTMLAttributes },
        ref,
    ) {
        const cn = clsx(className, styles.notification, {
            [styles.showCloseOnHover]: isShowCloseOnHover,
            [styles.extraBottomPadding]: withExtraBottomPadding,
        });

        return (
            <div
                {...HTMLAttributes}
                role="alertdialog"
                className={cn}
                onClick={onClick}
                ref={ref}
                data-tx={process.env.npm_package_version}
            >
                {children}
            </div>
        );
    }),
    {
        Icon: NotificationIcon,
        Body: NotificationBody,
        Close: NotificationClose,
        Time: NotificationTime,
    },
);

Notification.displayName = "Notification";
