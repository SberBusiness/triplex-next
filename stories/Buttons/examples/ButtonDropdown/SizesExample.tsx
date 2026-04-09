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

export const SizesExample = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <div style={{ marginBottom: "8px", fontSize: "16px", fontWeight: "700" }}>SM</div>
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 16 }}>
                <ButtonDropdown size={EComponentSize.SM} theme={EButtonTheme.GENERAL} options={OPTIONS}>
                    Button text
                </ButtonDropdown>
                <ButtonDropdown size={EComponentSize.SM} theme={EButtonTheme.SECONDARY} options={OPTIONS}>
                    Button text
                </ButtonDropdown>
                <ButtonDropdown size={EComponentSize.SM} theme={EButtonTheme.SECONDARY_LIGHT} options={OPTIONS}>
                    Button text
                </ButtonDropdown>
                <ButtonDropdown size={EComponentSize.SM} theme={EButtonTheme.DANGER} options={OPTIONS}>
                    Button text
                </ButtonDropdown>
                <ButtonDropdown size={EComponentSize.SM} theme={EButtonDotsTheme.DOTS_SECONDARY} options={OPTIONS}>
                    Button text
                </ButtonDropdown>
                <ButtonDropdown
                    size={EComponentSize.SM}
                    theme={EButtonDotsTheme.DOTS_SECONDARY_LIGHT}
                    options={OPTIONS}
                >
                    Button text
                </ButtonDropdown>
            </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <div style={{ marginBottom: "8px", fontSize: "16px", fontWeight: "700" }}>MD</div>
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 16 }}>
                <ButtonDropdown size={EComponentSize.MD} theme={EButtonTheme.GENERAL} options={OPTIONS}>
                    Button text
                </ButtonDropdown>
                <ButtonDropdown size={EComponentSize.MD} theme={EButtonTheme.SECONDARY} options={OPTIONS}>
                    Button text
                </ButtonDropdown>
                <ButtonDropdown size={EComponentSize.MD} theme={EButtonTheme.SECONDARY_LIGHT} options={OPTIONS}>
                    Button text
                </ButtonDropdown>
                <ButtonDropdown size={EComponentSize.MD} theme={EButtonTheme.DANGER} options={OPTIONS}>
                    Button text
                </ButtonDropdown>
                <ButtonDropdown size={EComponentSize.MD} theme={EButtonDotsTheme.DOTS_SECONDARY} options={OPTIONS}>
                    Button text
                </ButtonDropdown>
                <ButtonDropdown
                    size={EComponentSize.MD}
                    theme={EButtonDotsTheme.DOTS_SECONDARY_LIGHT}
                    options={OPTIONS}
                >
                    Button text
                </ButtonDropdown>
            </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <div style={{ marginBottom: "8px", fontSize: "16px", fontWeight: "700" }}>LG</div>
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 16 }}>
                <ButtonDropdown size={EComponentSize.LG} theme={EButtonTheme.GENERAL} options={OPTIONS}>
                    Button text
                </ButtonDropdown>
                <ButtonDropdown size={EComponentSize.LG} theme={EButtonTheme.SECONDARY} options={OPTIONS}>
                    Button text
                </ButtonDropdown>
                <ButtonDropdown size={EComponentSize.LG} theme={EButtonTheme.SECONDARY_LIGHT} options={OPTIONS}>
                    Button text
                </ButtonDropdown>
                <ButtonDropdown size={EComponentSize.LG} theme={EButtonTheme.DANGER} options={OPTIONS}>
                    Button text
                </ButtonDropdown>
                <ButtonDropdown size={EComponentSize.LG} theme={EButtonDotsTheme.DOTS_SECONDARY} options={OPTIONS}>
                    Button text
                </ButtonDropdown>
                <ButtonDropdown
                    size={EComponentSize.LG}
                    theme={EButtonDotsTheme.DOTS_SECONDARY_LIGHT}
                    options={OPTIONS}
                >
                    Button text
                </ButtonDropdown>
            </div>
        </div>
    </div>
);
