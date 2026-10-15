import React from "react";
import { action } from "storybook/actions";
import { Button, EButtonTheme, EComponentSize, Notification, NotificationGrouped } from "@sberbusiness/triplex-next";

export const VisualTests = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <div data-testid="notification-grouped-focus" tabIndex={-1}>
            <div style={{ marginBottom: "8px", fontSize: "16px", fontWeight: "700" }}>
                Клавиатурный фокус на действии
            </div>
            <NotificationGrouped>
                <Notification>
                    <Notification.Body>
                        <Notification.Body.Header>Новые платежи</Notification.Body.Header>
                        <Notification.Body.Content>Получены три платежа.</Notification.Body.Content>
                        <Notification.Body.Footer>
                            <Button theme={EButtonTheme.SECONDARY} size={EComponentSize.SM} onClick={action("onOpen")}>
                                Открыть платежи
                            </Button>
                        </Notification.Body.Footer>
                    </Notification.Body>
                </Notification>
            </NotificationGrouped>
        </div>
        <div>
            <div style={{ marginBottom: "8px", fontSize: "16px", fontWeight: "700" }}>
                Кнопка закрытия при наведении
            </div>
            <NotificationGrouped>
                <Notification isShowCloseOnHover data-testid="notification-grouped-hover">
                    <Notification.Body>
                        <Notification.Body.Header>Новые сообщения</Notification.Body.Header>
                        <Notification.Body.Content>Получены новые сообщения от клиентов.</Notification.Body.Content>
                    </Notification.Body>
                    <Notification.Close aria-label="Закрыть уведомление" onClick={action("onClose")} />
                </Notification>
            </NotificationGrouped>
        </div>
    </div>
);
