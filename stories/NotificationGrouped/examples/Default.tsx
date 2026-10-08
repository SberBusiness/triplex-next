import React from "react";
import { Notification, NotificationGrouped } from "@sberbusiness/triplex-next";

export const Default = () => (
    <div style={{ maxWidth: "600px" }}>
        <NotificationGrouped>
            <Notification>
                <Notification.Body>
                    <Notification.Body.Content>Получены новые сообщения.</Notification.Body.Content>
                </Notification.Body>
            </Notification>
        </NotificationGrouped>
    </div>
);
