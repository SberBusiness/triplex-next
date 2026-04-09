import React, { useMemo, useState } from "react";
import { ButtonDropdown, EButtonTheme, EComponentSize, IButtonDropdownOption } from "@sberbusiness/triplex-next";

const createOptions = (onItemSelect?: (id: string) => void): IButtonDropdownOption[] => [
    { id: "opt-1", label: "Действие 1", onSelect: () => onItemSelect?.("opt-1") },
    { id: "opt-2", label: "Действие 2", onSelect: () => onItemSelect?.("opt-2") },
    { id: "opt-3", label: "Действие 3", onSelect: () => onItemSelect?.("opt-3") },
];

export const ButtonDropdownWithSelectedOptionExample = () => {
    const [selectedId, setSelectedId] = useState<string | undefined>("opt-2");
    const options = useMemo(() => createOptions(setSelectedId), []);
    const selected = options.find((o) => o.id === selectedId);

    return (
        <div style={{ maxWidth: 280 }}>
            <ButtonDropdown theme={EButtonTheme.GENERAL} size={EComponentSize.MD} options={options} selected={selected}>
                Button text
            </ButtonDropdown>
        </div>
    );
};
