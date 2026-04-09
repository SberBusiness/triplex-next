import React from "react";
import { ButtonDropdown, EButtonTheme, EComponentSize, IButtonDropdownOption } from "@sberbusiness/triplex-next";

const OPTIONS: IButtonDropdownOption[] = [
    { id: "opt-1", label: "Действие 1", onSelect: () => undefined },
    { id: "opt-2", label: "Действие 2", onSelect: () => undefined },
    { id: "opt-3", label: "Действие 3", onSelect: () => undefined },
];

export const ButtonDropdownDefaultExample = () => (
    <div style={{ width: 280 }}>
        <ButtonDropdown theme={EButtonTheme.GENERAL} size={EComponentSize.MD} options={OPTIONS}>
            Button text
        </ButtonDropdown>
    </div>
);
