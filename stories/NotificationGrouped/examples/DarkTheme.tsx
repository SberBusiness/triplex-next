import React, { useRef } from "react";
import { ETriplexNextTheme, Notification, NotificationGrouped, ThemeProvider } from "@sberbusiness/triplex-next";

export const DarkTheme = () => {
    const scopeRef = useRef<HTMLDivElement>(null);

    return (
        <ThemeProvider theme={ETriplexNextTheme.DARK} scopeRef={scopeRef}>
            <div ref={scopeRef} style={{ maxWidth: "600px" }}>
                <NotificationGrouped>
                    <Notification>
                        <Notification.Body>
                            <Notification.Body.Header>Новые сообщения</Notification.Body.Header>
                            <Notification.Body.Content>Получены новые сообщения от клиентов.</Notification.Body.Content>
                        </Notification.Body>
                    </Notification>
                </NotificationGrouped>
            </div>
        </ThemeProvider>
    );
};
