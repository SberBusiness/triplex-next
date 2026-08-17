import React from "react";
import clsx from "clsx";
import { UnorderedList, IUnorderedListProps } from "../../UnorderedList";
import styles from "../styles/Notification.module.less";

/** Свойства компонента NotificationBodyList. */
export interface INotificationBodyListProps extends IUnorderedListProps {}

/** Список нотификации. */
export const NotificationBodyList: React.FC<INotificationBodyListProps> = ({ className, ...restProps }) => (
    <UnorderedList className={clsx(styles.notificationBodyList, className)} {...restProps} />
);

NotificationBodyList.displayName = "NotificationBodyList";
