import React from "react";
import { Chip, EComponentSize } from "@sberbusiness/triplex-next";

export const WithNotificationIconExample = () => (
    <div style={{ display: "flex", gap: 12 }}>
        <Chip size={EComponentSize.SM} showNotificationIcon>
            SM
        </Chip>
        <Chip size={EComponentSize.MD} showNotificationIcon>
            MD
        </Chip>
        <Chip size={EComponentSize.LG} showNotificationIcon>
            LG
        </Chip>
    </div>
);
