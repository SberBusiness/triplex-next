import React from "react";
import { NotificationGroupedFooter } from "./components/NotificationGroupedFooter";
import styles from "./styles/Notification.module.less";

/** Свойства NotificationGrouped. */
export interface INotificationGroupedProps {
    /** Содержимое группы; обычно один Notification, под которым отображаются декоративные слои. */
    children: React.ReactNode;
}

/** Обёртка, обозначающая группу уведомлений двумя декоративными слоями под содержимым. */
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
