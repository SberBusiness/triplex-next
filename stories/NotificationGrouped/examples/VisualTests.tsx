import React from "react";
import { action } from "storybook/actions";
import { Button, EButtonTheme, EComponentSize, Notification, NotificationGrouped } from "@sberbusiness/triplex-next";

export const VisualTests = () => (
    <div style={{ maxWidth: "600px", display: "flex", flexDirection: "column", gap: "16px" }}>
        <div data-testid="notification-grouped-focus" tabIndex={-1}>
            <h3 style={{ marginTop: 0, marginBottom: "16px" }}>Клавиатурный фокус на действии</h3>
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
            <h3 style={{ marginTop: 0, marginBottom: "16px" }}>Кнопка закрытия при наведении</h3>
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
