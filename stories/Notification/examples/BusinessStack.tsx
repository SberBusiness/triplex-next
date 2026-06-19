import React from "react";
import {
    AlertContext,
    Button,
    EAlertType,
    EButtonTheme,
    EComponentSize,
    Notification,
    NotificationGrouped,
} from "@sberbusiness/triplex-next";
import { DefaulticonStrokePrdIcon20 } from "@sberbusiness/icons-next";

export const BusinessStack = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
        <div>
            <h3 style={{ marginBottom: "16px", fontSize: "18px", fontWeight: "600" }}>Normal</h3>
            <NotificationGrouped>
                <Notification withExtraBottomPadding>
                    <Notification.Icon>
                        <DefaulticonStrokePrdIcon20 paletteIndex={5} />
                    </Notification.Icon>
                    <Notification.Body>
                        <Notification.Body.Header>Title text</Notification.Body.Header>
                        <Notification.Body.Content>
                            This message provides context or highlights important information to note.
                        </Notification.Body.Content>
                    </Notification.Body>
                    <Notification.Close onClick={() => {}} />
                    <Notification.Time time="22:45" />
                </Notification>
            </NotificationGrouped>
        </div>

        <div>
            <h3 style={{ marginBottom: "16px", fontSize: "18px", fontWeight: "600" }}>Button</h3>
            <NotificationGrouped>
                <Notification withExtraBottomPadding>
                    <Notification.Icon>
                        <DefaulticonStrokePrdIcon20 paletteIndex={5} />
                    </Notification.Icon>
                    <Notification.Body>
                        <Notification.Body.Header>Title text</Notification.Body.Header>
                        <Notification.Body.Content>
                            This message provides context or highlights important information to note.
                        </Notification.Body.Content>
                        <Notification.Body.Footer>
                            <Button theme={EButtonTheme.SECONDARY} size={EComponentSize.SM}>
                                Button text
                            </Button>
                        </Notification.Body.Footer>
                    </Notification.Body>
                    <Notification.Close onClick={() => {}} />
                    <Notification.Time time="22:45" />
                </Notification>
            </NotificationGrouped>
        </div>

        <div>
            <h3 style={{ marginBottom: "16px", fontSize: "18px", fontWeight: "600" }}>Alert</h3>
            <NotificationGrouped>
                <Notification withExtraBottomPadding>
                    <Notification.Icon>
                        <DefaulticonStrokePrdIcon20 paletteIndex={5} />
                    </Notification.Icon>
                    <Notification.Body>
                        <Notification.Body.Header>Title text</Notification.Body.Header>
                        <Notification.Body.Content>
                            This message provides context or highlights important information to note.
                        </Notification.Body.Content>
                        <Notification.Body.Footer>
                            <AlertContext type={EAlertType.INFO}>
                                This message provides context or highlights important information to note.
                            </AlertContext>
                        </Notification.Body.Footer>
                    </Notification.Body>
                    <Notification.Close onClick={() => {}} />
                    <Notification.Time time="22:45" />
                </Notification>
            </NotificationGrouped>
        </div>
    </div>
);
