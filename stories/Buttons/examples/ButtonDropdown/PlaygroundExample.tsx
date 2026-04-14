import React from "react";
import { ButtonDropdown, IButtonDropdownOption } from "@sberbusiness/triplex-next";

const OPTIONS: IButtonDropdownOption[] = [
    { id: "opt-1", label: "Действие 1", onSelect: () => undefined },
    { id: "opt-2", label: "Действие 2", onSelect: () => undefined },
    { id: "opt-3", label: "Действие 3", onSelect: () => undefined },
];

export const PlaygroundExample = (args: React.ComponentProps<typeof ButtonDropdown>) => {
    const { children, ...rest } = args;

    return (
        <div style={{ width: 280 }}>
            <ButtonDropdown {...rest} options={OPTIONS}>
                {children}
            </ButtonDropdown>
        </div>
    );
};
