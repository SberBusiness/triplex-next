import React from "react";
import { ButtonDropdown, EButtonTheme, EComponentSize, Gap, IButtonDropdownOption } from "@sberbusiness/triplex-next";

const OPTIONS: IButtonDropdownOption[] = [
    { id: "opt-1", label: "Действие 1", onSelect: () => undefined },
    { id: "opt-2", label: "Действие 2", onSelect: () => undefined },
    { id: "opt-3", label: "Действие 3", onSelect: () => undefined },
];

export const ButtonDropdownBlockModeExample = () => (
    <div style={{ maxWidth: 280 }}>
        <ButtonDropdown block theme={EButtonTheme.GENERAL} size={EComponentSize.MD} options={OPTIONS}>
            Button text
        </ButtonDropdown>
        <Gap size={16} />
        <ButtonDropdown block theme={EButtonTheme.SECONDARY} size={EComponentSize.MD} options={OPTIONS}>
            Button text
        </ButtonDropdown>
        <Gap size={16} />
        <ButtonDropdown block theme={EButtonTheme.SECONDARY_LIGHT} size={EComponentSize.MD} options={OPTIONS}>
            Button text
        </ButtonDropdown>
        <Gap size={16} />
        <ButtonDropdown block theme={EButtonTheme.DANGER} size={EComponentSize.MD} options={OPTIONS}>
            Button text
        </ButtonDropdown>
    </div>
);
