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

export const ButtonDropdownDisabledExample = () => (
    <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 16 }}>
        <ButtonDropdown disabled theme={EButtonTheme.GENERAL} size={EComponentSize.MD} options={OPTIONS}>
            Button text
        </ButtonDropdown>
        <ButtonDropdown disabled theme={EButtonTheme.SECONDARY} size={EComponentSize.MD} options={OPTIONS}>
            Button text
        </ButtonDropdown>
        <ButtonDropdown disabled theme={EButtonTheme.SECONDARY_LIGHT} size={EComponentSize.MD} options={OPTIONS}>
            Button text
        </ButtonDropdown>
        <ButtonDropdown disabled theme={EButtonTheme.DANGER} size={EComponentSize.MD} options={OPTIONS}>
            Button text
        </ButtonDropdown>
        <ButtonDropdown disabled theme={EButtonDotsTheme.DOTS_SECONDARY} size={EComponentSize.MD} options={OPTIONS}>
            Button text
        </ButtonDropdown>
        <ButtonDropdown
            disabled
            theme={EButtonDotsTheme.DOTS_SECONDARY_LIGHT}
            size={EComponentSize.MD}
            options={OPTIONS}
        >
            Button text
        </ButtonDropdown>
    </div>
);
