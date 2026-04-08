import React from "react";
import { IconWrapper } from "@sberbusiness/triplex-next";
import { SettingsStrokeSrvIcon20 } from "@sberbusiness/icons-next";

export const StatesExample = () => (
    <div style={{ display: "flex", alignItems: "center", gap: "32px" }}>
        <div>
            <div style={{ marginBottom: "8px", fontSize: "16px", fontWeight: "700" }}>Default</div>
            <IconWrapper>
                <SettingsStrokeSrvIcon20 paletteIndex={5} />
            </IconWrapper>
        </div>
        <div>
            <div style={{ marginBottom: "8px", fontSize: "16px", fontWeight: "700" }}>Active</div>
            <IconWrapper active>
                <SettingsStrokeSrvIcon20 paletteIndex={5} />
            </IconWrapper>
        </div>
        <div>
            <div style={{ marginBottom: "8px", fontSize: "16px", fontWeight: "700" }}>Disabled</div>
            <IconWrapper disabled>
                <SettingsStrokeSrvIcon20 paletteIndex={5} />
            </IconWrapper>
        </div>
    </div>
);
