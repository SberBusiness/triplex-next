import React from "react";
import { Badge, Button, EButtonTheme, EComponentSize } from "@sberbusiness/triplex-next";
import { BellStrokeNavIcon20 } from "@sberbusiness/icons-next";

export const WithNotificationIconExample = () => (
    <div style={{ position: "relative", display: "inline-flex" }}>
        <Button
            icon={<BellStrokeNavIcon20 paletteIndex={0} />}
            size={EComponentSize.MD}
            theme={EButtonTheme.SECONDARY}
        />
        <Badge.Dot size={EComponentSize.MD} style={{ position: "absolute", top: 4, right: 4 }} />
    </div>
);
