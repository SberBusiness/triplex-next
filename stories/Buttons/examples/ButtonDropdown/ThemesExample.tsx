import React from "react";
import {
    ButtonDropdown,
    EButtonDotsTheme,
    EButtonTheme,
    EComponentSize,
    IButtonDropdownOption,
} from "@sberbusiness/triplex-next";

const OPTIONS: IButtonDropdownOption[] = [
    { id: "opt-1", label: "Действие 1", onSelect: () => undefined },
    { id: "opt-2", label: "Действие 2", onSelect: () => undefined },
    { id: "opt-3", label: "Действие 3", onSelect: () => undefined },
];

export const ThemesExample = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 16 }}>
            <ButtonDropdown theme={EButtonTheme.GENERAL} size={EComponentSize.MD} options={OPTIONS}>
                General
            </ButtonDropdown>
            <ButtonDropdown theme={EButtonTheme.SECONDARY} size={EComponentSize.MD} options={OPTIONS}>
                Secondary
            </ButtonDropdown>
            <ButtonDropdown theme={EButtonTheme.SECONDARY_LIGHT} size={EComponentSize.MD} options={OPTIONS}>
                Secondary Light
            </ButtonDropdown>
            <ButtonDropdown theme={EButtonTheme.DANGER} size={EComponentSize.MD} options={OPTIONS}>
                Danger
            </ButtonDropdown>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <div style={{ marginBottom: "8px", fontSize: "16px", fontWeight: "700" }}>DOTS_SECONDARY</div>
            <ButtonDropdown theme={EButtonDotsTheme.DOTS_SECONDARY} size={EComponentSize.MD} options={OPTIONS}>
                Dots Secondary
            </ButtonDropdown>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <div style={{ marginBottom: "8px", fontSize: "16px", fontWeight: "700" }}>DOTS_SECONDARY_LIGHT</div>
            <ButtonDropdown theme={EButtonDotsTheme.DOTS_SECONDARY_LIGHT} size={EComponentSize.MD} options={OPTIONS}>
                Dots Secondary Light
            </ButtonDropdown>
        </div>
    </div>
);
