import React from "react";
import { Button, EButtonTheme, EComponentSize } from "@sberbusiness/triplex-next";

export const ButtonSizesExample = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <div style={{ marginBottom: "8px", fontSize: "16px", fontWeight: "700" }}>SM</div>
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 16 }}>
                <Button size={EComponentSize.SM} theme={EButtonTheme.GENERAL}>
                    Button text
                </Button>
                <Button size={EComponentSize.SM} theme={EButtonTheme.SECONDARY}>
                    Button text
                </Button>
                <Button size={EComponentSize.SM} theme={EButtonTheme.SECONDARY_LIGHT}>
                    Button text
                </Button>
                <Button size={EComponentSize.SM} theme={EButtonTheme.DANGER}>
                    Button text
                </Button>
                <Button size={EComponentSize.SM} theme={EButtonTheme.LINK}>
                    Button text
                </Button>
            </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <div style={{ marginBottom: "8px", fontSize: "16px", fontWeight: "700" }}>MD</div>
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 16 }}>
                <Button size={EComponentSize.MD} theme={EButtonTheme.GENERAL}>
                    Button text
                </Button>
                <Button size={EComponentSize.MD} theme={EButtonTheme.SECONDARY}>
                    Button text
                </Button>
                <Button size={EComponentSize.MD} theme={EButtonTheme.SECONDARY_LIGHT}>
                    Button text
                </Button>
                <Button size={EComponentSize.MD} theme={EButtonTheme.DANGER}>
                    Button text
                </Button>
                <Button size={EComponentSize.MD} theme={EButtonTheme.LINK}>
                    Button text
                </Button>
            </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <div style={{ marginBottom: "8px", fontSize: "16px", fontWeight: "700" }}>LG</div>
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 16 }}>
                <Button size={EComponentSize.LG} theme={EButtonTheme.GENERAL}>
                    Button text
                </Button>
                <Button size={EComponentSize.LG} theme={EButtonTheme.SECONDARY}>
                    Button text
                </Button>
                <Button size={EComponentSize.LG} theme={EButtonTheme.SECONDARY_LIGHT}>
                    Button text
                </Button>
                <Button size={EComponentSize.LG} theme={EButtonTheme.DANGER}>
                    Button text
                </Button>
                <Button size={EComponentSize.LG} theme={EButtonTheme.LINK}>
                    Button text
                </Button>
            </div>
        </div>
    </div>
);
