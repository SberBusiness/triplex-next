import React from "react";
import { DefaulticonStrokePrdIcon16, DefaulticonStrokePrdIcon20 } from "@sberbusiness/icons-next";
import { Button, EButtonTheme, EComponentSize } from "@sberbusiness/triplex-next";

export const TextWithIconExample = () => (
    <div style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
        <Button theme={EButtonTheme.LINK} size={EComponentSize.SM}>
            <DefaulticonStrokePrdIcon16 paletteIndex={5} />
            <span style={{ marginLeft: 8 }}>Button text</span>
        </Button>
        <Button theme={EButtonTheme.LINK} size={EComponentSize.MD}>
            <DefaulticonStrokePrdIcon20 paletteIndex={5} />
            <span style={{ marginLeft: 8 }}>Button text</span>
        </Button>
        <Button theme={EButtonTheme.LINK} size={EComponentSize.LG}>
            <DefaulticonStrokePrdIcon20 paletteIndex={5} />
            <span style={{ marginLeft: 8 }}>Button text</span>
        </Button>
    </div>
);
