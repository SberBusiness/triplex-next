import React from "react";
import { DefaulticonStrokePrdIcon20 } from "@sberbusiness/icons-next";
import { Button, EButtonTheme, EComponentSize } from "@sberbusiness/triplex-next";

export const TextWithIconExample = () => (
    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <Button
            icon={<DefaulticonStrokePrdIcon20 paletteIndex={5} />}
            theme={EButtonTheme.LINK}
            size={EComponentSize.MD}
        >
            &nbsp;Button text
        </Button>
    </div>
);
