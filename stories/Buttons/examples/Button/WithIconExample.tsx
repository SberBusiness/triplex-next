import React from "react";
import { DefaulticonStrokePrdIcon20, DefaulticonStrokePrdIcon32 } from "@sberbusiness/icons-next";
import { Button, EButtonTheme, EComponentSize } from "@sberbusiness/triplex-next";

export const WithIconExample = () => (
    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <Button
            icon={<DefaulticonStrokePrdIcon20 paletteIndex={7} />}
            size={EComponentSize.SM}
            theme={EButtonTheme.GENERAL}
        />
        <Button
            icon={<DefaulticonStrokePrdIcon20 paletteIndex={0} />}
            size={EComponentSize.MD}
            theme={EButtonTheme.SECONDARY}
        />
        <Button
            icon={<DefaulticonStrokePrdIcon20 paletteIndex={0} />}
            size={EComponentSize.MD}
            theme={EButtonTheme.SECONDARY_LIGHT}
        />
        <Button
            icon={<DefaulticonStrokePrdIcon32 paletteIndex={7} />}
            size={EComponentSize.LG}
            theme={EButtonTheme.DANGER}
        />
    </div>
);
