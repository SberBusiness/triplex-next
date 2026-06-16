import { NotificationGroupedFooter } from "./components/NotificationGroupedFooter";
import React from "react";
import styles from "./styles/Notification.module.less";

/** Свойства NotificationGrouped. */
export interface INotificationGroupedProps {
    /** Нотификация. */
    children: React.ReactNode;
}

/**
 * Компонент NotificationGrouped.
 */
export const NotificationGrouped = React.forwardRef<HTMLDivElement, INotificationGroupedProps>(
    function NotificationGrouped({ children }, ref) {
        return (
            <div className={styles.notificationGroupedWrapper} ref={ref}>
                {children}
                <NotificationGroupedFooter />
            </div>
        );
    },
);

NotificationGrouped.displayName = "NotificationGrouped";
