import React from "react";
import { action } from "storybook/actions";
import { Radio, RadioYGroup } from "@sberbusiness/triplex-next";

export const VisualTests = () => (
    <div style={{ display: "flex", alignItems: "flex-start", flexWrap: "wrap", gap: 32 }}>
        <div style={{ width: 200 }}>
            <div style={{ marginBottom: 8, fontSize: 16, fontWeight: 700 }}>Фокус с клавиатуры</div>
            <RadioYGroup aria-label="Фокус с клавиатуры">
                <Radio
                    name="radio-y-group-focus"
                    value="first"
                    onChange={action("onChange")}
                    onFocus={action("onFocus")}
                >
                    Radio text
                </Radio>
                <Radio name="radio-y-group-focus" value="second" onChange={action("onChange")}>
                    Radio text
                </Radio>
            </RadioYGroup>
        </div>
        <div style={{ width: 200 }}>
            <div style={{ marginBottom: 8, fontSize: 16, fontWeight: 700 }}>Наведение</div>
            <RadioYGroup aria-label="Наведение">
                <Radio
                    name="radio-y-group-hover"
                    value="first"
                    data-testid="radio-y-group-hover-unchecked"
                    onChange={action("onChange")}
                >
                    Radio text
                </Radio>
                <Radio
                    name="radio-y-group-hover"
                    value="second"
                    data-testid="radio-y-group-hover-checked"
                    defaultChecked
                    onChange={action("onChange")}
                >
                    Radio text
                </Radio>
            </RadioYGroup>
        </div>
    </div>
);
