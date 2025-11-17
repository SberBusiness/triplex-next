import clsx from "clsx";
import styles from "../styles/Notification.module.less";

/**
 * Низ сгруппированой нотификации.
 */
export const NotificationGroupedFooter = () => (
    <div>
        <div className={clsx(styles.notificationGroupedFooterItem, styles.first)} />
        <div className={clsx(styles.notificationGroupedFooterItem, styles.second)} />
    </div>
);
