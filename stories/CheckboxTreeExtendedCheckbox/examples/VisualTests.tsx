import React from "react";
import { CheckboxTreeExtended, EComponentSize } from "@sberbusiness/triplex-next";
import { action } from "storybook/actions";

const SIZES = [EComponentSize.SM, EComponentSize.MD, EComponentSize.LG];
const STATES = [
    { id: "focus", label: "Фокус с клавиатуры", checked: false },
    { id: "checked", label: "Выбран", checked: true },
    { id: "bulk", label: "Частичный выбор", checked: true, bulk: true },
    { id: "disabled", label: "Недоступен", checked: false, disabled: true },
    { id: "disabled-checked", label: "Недоступен и выбран", checked: true, disabled: true },
    { id: "disabled-bulk", label: "Недоступен, частичный выбор", checked: true, bulk: true, disabled: true },
];

export const VisualTests = () => (
    <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-start", gap: 32 }}>
        {SIZES.map((size) => (
            <div key={size} style={{ width: 300 }}>
                <div style={{ marginBottom: 8, fontSize: 16, fontWeight: 700 }}>{size.toUpperCase()}</div>
                <CheckboxTreeExtended size={size} aria-label={`Состояния ${size.toUpperCase()}`}>
                    {STATES.map(({ id, label, ...state }) => (
                        <CheckboxTreeExtended.Node
                            key={id}
                            id={`${size}-${id}`}
                            checkbox={(props) => (
                                <CheckboxTreeExtended.Checkbox
                                    {...props}
                                    {...state}
                                    onChange={action("onChange")}
                                    data-testid={`checkbox-tree-extended-${size}-${id}`}
                                >
                                    {label}
                                </CheckboxTreeExtended.Checkbox>
                            )}
                        />
                    ))}
                </CheckboxTreeExtended>
            </div>
        ))}
    </div>
);
