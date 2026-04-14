import React from "react";
import { Button, EButtonTheme, EComponentSize } from "@sberbusiness/triplex-next";

export const ThemesExample = () => (
    <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 16 }}>
        <Button theme={EButtonTheme.GENERAL} size={EComponentSize.MD}>
            General
        </Button>
        <Button theme={EButtonTheme.SECONDARY} size={EComponentSize.MD}>
            Secondary
        </Button>
        <Button theme={EButtonTheme.SECONDARY_LIGHT} size={EComponentSize.MD}>
            Secondary Light
        </Button>
        <Button theme={EButtonTheme.DANGER} size={EComponentSize.MD}>
            Danger
        </Button>
        <Button theme={EButtonTheme.LINK} size={EComponentSize.MD}>
            Link
        </Button>
    </div>
);
