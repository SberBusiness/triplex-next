import React from "react";
import { Button, EButtonTheme, EComponentSize, Notification, NotificationGrouped } from "@sberbusiness/triplex-next";

export const WithFooter = () => (
    <div style={{ maxWidth: "600px" }}>
        <NotificationGrouped>
            <Notification withExtraBottomPadding>
                <Notification.Body>
                    <Notification.Body.Header>Новые платежи</Notification.Body.Header>
                    <Notification.Body.Content>
                        Получены три платежа. Откройте список для проверки.
                    </Notification.Body.Content>
                    <Notification.Body.Footer>
                        <Button theme={EButtonTheme.SECONDARY} size={EComponentSize.SM} onClick={() => {}}>
                            Открыть платежи
                        </Button>
                    </Notification.Body.Footer>
                </Notification.Body>
                <Notification.Close aria-label="Закрыть уведомление" onClick={() => {}} />
                <Notification.Time time="14:30" />
            </Notification>
        </NotificationGrouped>
    </div>
);
