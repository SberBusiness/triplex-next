import React from "react";
import { DefaulticonStrokePrdIcon20 } from "@sberbusiness/icons-next";
import { Button, EButtonTheme, EComponentSize } from "@sberbusiness/triplex-next";

export const StatesExample = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <div style={{ marginBottom: "8px", fontSize: "16px", fontWeight: "700" }}>Expanded</div>
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 16 }}>
                <Button theme={EButtonTheme.GENERAL} size={EComponentSize.MD} aria-expanded>
                    General
                </Button>
                <Button theme={EButtonTheme.SECONDARY} size={EComponentSize.MD} aria-expanded>
                    Secondary
                </Button>
                <Button theme={EButtonTheme.SECONDARY_LIGHT} size={EComponentSize.MD} aria-expanded>
                    Secondary Light
                </Button>
                <Button theme={EButtonTheme.DANGER} size={EComponentSize.MD} aria-expanded>
                    Danger
                </Button>
                <Button
                    theme={EButtonTheme.GENERAL}
                    size={EComponentSize.MD}
                    icon={<DefaulticonStrokePrdIcon20 paletteIndex={7} />}
                    aria-expanded
                />
            </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <div style={{ marginBottom: "8px", fontSize: "16px", fontWeight: "700" }}>Loading</div>
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 16 }}>
                <Button loading theme={EButtonTheme.GENERAL} size={EComponentSize.MD}>
                    Button text
                </Button>
                <Button loading theme={EButtonTheme.SECONDARY} size={EComponentSize.MD}>
                    Button text
                </Button>
                <Button loading theme={EButtonTheme.SECONDARY_LIGHT} size={EComponentSize.MD}>
                    Button text
                </Button>
                <Button loading theme={EButtonTheme.DANGER} size={EComponentSize.MD}>
                    Button text
                </Button>
                <Button
                    loading
                    icon={<DefaulticonStrokePrdIcon20 paletteIndex={0} />}
                    size={EComponentSize.MD}
                    theme={EButtonTheme.GENERAL}
                />
            </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <div style={{ marginBottom: "8px", fontSize: "16px", fontWeight: "700" }}>Disabled</div>
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 16 }}>
                <Button disabled theme={EButtonTheme.GENERAL} size={EComponentSize.MD}>
                    General
                </Button>
                <Button disabled theme={EButtonTheme.SECONDARY} size={EComponentSize.MD}>
                    Secondary
                </Button>
                <Button disabled theme={EButtonTheme.SECONDARY_LIGHT} size={EComponentSize.MD}>
                    Secondary Light
                </Button>
                <Button disabled theme={EButtonTheme.DANGER} size={EComponentSize.MD}>
                    Danger
                </Button>
                <Button disabled theme={EButtonTheme.LINK} size={EComponentSize.MD}>
                    Link
                </Button>
                <Button
                    icon={<DefaulticonStrokePrdIcon20 paletteIndex={7} />}
                    size={EComponentSize.MD}
                    theme={EButtonTheme.GENERAL}
                    disabled
                />
            </div>
        </div>
    </div>
);
