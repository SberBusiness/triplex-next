import React from "react";
import { NotificationHeader } from "./NotificationHeader";
import { NotificationBodyContent } from "./NotificationBodyContent";
import { NotificationFooter } from "./NotificationFooter";
import { NotificationBodyList } from "./NotificationBodyList";
import styles from "../styles/Notification.module.less";

/** Свойства компонента NotificationBody. */
interface INotificationBodyProps {
    children?: React.ReactNode;
}

export interface INotificationBodySFC extends React.FC<INotificationBodyProps> {
    Header: typeof NotificationHeader;
    Content: typeof NotificationBodyContent;
    List: typeof NotificationBodyList;
    Footer: typeof NotificationFooter;
}

/** Тело нотификации. Состоит из 4х уровней Header, Content, List, Footer. */
export const NotificationBody: INotificationBodySFC = ((props) => {
    const { children } = props;

    return <div className={styles.notificationBody}>{children}</div>;
}) as INotificationBodySFC;

NotificationBody.displayName = "NotificationBody";
NotificationBody.Header = NotificationHeader;
NotificationBody.Content = NotificationBodyContent;
NotificationBody.List = NotificationBodyList;
NotificationBody.Footer = NotificationFooter;
