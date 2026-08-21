import React from "react";
import { Notification } from "@sberbusiness/triplex-next";
import { ErrorStrokeStsIcon20, SuccessStrokeStsIcon20, WarningStrokeStsIcon20 } from "@sberbusiness/icons-next";

export const Status = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
        <div>
            <h3 style={{ marginBottom: "16px", fontSize: "18px", fontWeight: "600" }}>Success</h3>
            <Notification>
                <Notification.Icon>
                    <SuccessStrokeStsIcon20 paletteIndex={0} />
                </Notification.Icon>
                <Notification.Body>
                    <Notification.Body.Content>
                        This message provides context or highlights important information to note.
                    </Notification.Body.Content>
                    <Notification.Body.List
                        items={[
                            { key: "1", children: "List item text" },
                            { key: "2", children: "List item text" },
                            { key: "3", children: "List item text" },
                        ]}
                    />
                </Notification.Body>
                <Notification.Close onClick={() => {}} />
            </Notification>
        </div>

        <div>
            <h3 style={{ marginBottom: "16px", fontSize: "18px", fontWeight: "600" }}>Warning</h3>
            <Notification>
                <Notification.Icon>
                    <WarningStrokeStsIcon20 paletteIndex={2} />
                </Notification.Icon>
                <Notification.Body>
                    <Notification.Body.Content>
                        This message provides context or highlights important information to note.
                    </Notification.Body.Content>
                    <Notification.Body.List
                        items={[
                            { key: "1", children: "List item text" },
                            { key: "2", children: "List item text" },
                            { key: "3", children: "List item text" },
                        ]}
                    />
                </Notification.Body>
                <Notification.Close onClick={() => {}} />
            </Notification>
        </div>

        <div>
            <h3 style={{ marginBottom: "16px", fontSize: "18px", fontWeight: "600" }}>Error</h3>
            <Notification>
                <Notification.Icon>
                    <ErrorStrokeStsIcon20 paletteIndex={1} />
                </Notification.Icon>
                <Notification.Body>
                    <Notification.Body.Content>
                        This message provides context or highlights important information to note.
                    </Notification.Body.Content>
                    <Notification.Body.List
                        items={[
                            { key: "1", children: "List item text" },
                            { key: "2", children: "List item text" },
                            { key: "3", children: "List item text" },
                        ]}
                    />
                </Notification.Body>
                <Notification.Close onClick={() => {}} />
            </Notification>
        </div>
    </div>
);
