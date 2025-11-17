import React from "react";
import { IUnorderedListProps, UnorderedList } from "@sberbusiness/triplex-next/components/UnorderedList";
import styles from "../styles/Notification.module.less";
import clsx from "clsx";

/** Свойства компонента NotificationBodyList. */
interface INotificationBodyListProps extends IUnorderedListProps {
    values: string[];
}

/** Список нотификации. */
export const NotificationBodyList: React.FC<INotificationBodyListProps> = ({ className, ...props }) => (
    <UnorderedList className={clsx(styles.notificationBodyList, className)} {...props}>
        {props.values.map((el, index) => (
            <UnorderedList.Item key={index}>{el}</UnorderedList.Item>
        ))}
    </UnorderedList>
);

NotificationBodyList.displayName = "NotificationBodyList";
