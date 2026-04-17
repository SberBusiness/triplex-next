import React, { useMemo, useState } from "react";
import { action } from "storybook/actions";
import {
    ButtonDropdown,
    EButtonTheme,
    EComponentSize,
    EScreenWidth,
    IButtonDropdownOption,
} from "@sberbusiness/triplex-next";
import { AdaptiveUtils } from "../../../utils/adaptiveUtils";

const createOptions = (onItemSelect?: (id: string) => void): IButtonDropdownOption[] => [
    {
        id: "opt-1",
        label: "Действие 1",
        onSelect: () => {
            action("select")("opt-1");
            onItemSelect?.("opt-1");
        },
    },
    {
        id: "opt-2",
        label: "Действие 2",
        onSelect: () => {
            action("select")("opt-2");
            onItemSelect?.("opt-2");
        },
    },
    {
        id: "opt-3",
        label: "Действие 3",
        onSelect: () => {
            action("select")("opt-3");
            onItemSelect?.("opt-3");
        },
    },
];

export const VisualTestsExample = () => {
    const [selectedId, setSelectedId] = useState<string | undefined>("opt-2");
    const options = useMemo(() => createOptions(setSelectedId), []);
    const selectedSM = options.find((o) => o.id === selectedId);
    const selectedMD = options.find((o) => o.id === selectedId);
    const selectedLG = options.find((o) => o.id === selectedId);

    const openedMdLg = !AdaptiveUtils.isAdaptive(EScreenWidth.SM_MAX);

    return (
        <div style={{ display: "flex", gap: 16 }}>
            {/* opened пробрасывается в ButtonDropdownExtended через rest (см. ButtonDropdown.tsx) */}
            <ButtonDropdown
                {...({
                    opened: true,
                    theme: EButtonTheme.GENERAL,
                    size: EComponentSize.SM,
                    options,
                    selected: selectedSM,
                    children: "Button text",
                } as React.ComponentProps<typeof ButtonDropdown>)}
            />
            <ButtonDropdown
                {...({
                    opened: openedMdLg,
                    theme: EButtonTheme.GENERAL,
                    size: EComponentSize.MD,
                    options,
                    selected: selectedMD,
                    children: "Button text",
                } as React.ComponentProps<typeof ButtonDropdown>)}
            />
            <ButtonDropdown
                {...({
                    opened: openedMdLg,
                    theme: EButtonTheme.GENERAL,
                    size: EComponentSize.LG,
                    options,
                    selected: selectedLG,
                    children: "Button text",
                } as React.ComponentProps<typeof ButtonDropdown>)}
            />
        </div>
    );
};
