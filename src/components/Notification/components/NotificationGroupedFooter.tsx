import React from "react";
import clsx from "clsx";
import styles from "../styles/Notification.module.less";
import { SkinContext } from "../../SkinProvider/SkinContext";
import skinStyles from "../../SkinProvider/WordArt.module.less";

/** Два декоративных слоя под содержимым NotificationGrouped. */
export const NotificationGroupedFooter = () => {
    const wordArt = React.useContext(SkinContext) === "wordart";
    return (
        <div>
            <div
                className={clsx(
                    styles.notificationGroupedFooterItem,
                    styles.first,
                    wordArt && skinStyles.wordArtNotificationLayer,
                )}
            />
            <div
                className={clsx(
                    styles.notificationGroupedFooterItem,
                    styles.second,
                    wordArt && skinStyles.wordArtNotificationLayer,
                )}
            />
        </div>
    );
};
