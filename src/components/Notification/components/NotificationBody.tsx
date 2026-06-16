import React from "react";
import { NotificationHeader } from "./NotificationHeader";
import { NotificationBodyContent } from "./NotificationBodyContent";
import { NotificationFooter } from "./NotificationFooter";
import { NotificationBodyList } from "./NotificationBodyList";
import styles from "../styles/Notification.module.less";

/** Свойства компонента NotificationBody. */
interface INotificationBodyProps {
    /** Содержимое тела нотификации: Header, Content, List, Footer. */
    children?: React.ReactNode;
}

/** Тело нотификации. Состоит из 4х уровней Header, Content, List, Footer. */
export const NotificationBody = Object.assign(
    React.forwardRef<HTMLDivElement, INotificationBodyProps>(function NotificationBody({ children }, ref) {
        return (
            <div className={styles.notificationBody} ref={ref}>
                {children}
            </div>
        );
    }),
    {
        Header: NotificationHeader,
        Content: NotificationBodyContent,
        List: NotificationBodyList,
        Footer: NotificationFooter,
    },
);

NotificationBody.displayName = "NotificationBody";
