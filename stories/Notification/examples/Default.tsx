import React from "react";
import { Notification } from "@sberbusiness/triplex-next";
import { SuccessStrokeStsIcon20 } from "@sberbusiness/icons-next";

export const Default = () => (
    <div style={{ maxWidth: "600px" }}>
        <Notification>
            <Notification.Icon>
                <SuccessStrokeStsIcon20 paletteIndex={0} />
            </Notification.Icon>
            <Notification.Body>
                <Notification.Body.Header>Title text</Notification.Body.Header>
                <Notification.Body.Content>
                    This message provides context or highlights important information to note.
                </Notification.Body.Content>
            </Notification.Body>
            <Notification.Close onClick={() => {}} />
        </Notification>
    </div>
);
