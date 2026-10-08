import React from "react";
import { action } from "storybook/actions";
import { Radio, EComponentSize } from "@sberbusiness/triplex-next";

const SIZES = [EComponentSize.SM, EComponentSize.MD, EComponentSize.LG];

export const VisualTests = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 24, maxWidth: 480 }}>
        <div>
            <div style={{ marginBottom: 8, fontSize: 16, fontWeight: 700 }}>Фокус с клавиатуры</div>
            <Radio data-testid="radio-focus" onChange={action("onChange")}>
                Radio text
            </Radio>
        </div>
        <div>
            <div style={{ marginBottom: 8, fontSize: 16, fontWeight: 700 }}>Наведение</div>
            <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
                <Radio data-testid="radio-hover-unchecked" onChange={action("onChange")}>
                    Radio text
                </Radio>
                <Radio data-testid="radio-hover-checked" defaultChecked onChange={action("onChange")}>
                    Radio text
                </Radio>
            </div>
        </div>
        {SIZES.map((size) => (
            <div key={size}>
                <div style={{ marginBottom: 8, fontSize: 16, fontWeight: 700 }}>{size.toUpperCase()}</div>
                <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
                    <Radio size={size} defaultChecked onChange={action("onChange")}>
                        Radio text
                    </Radio>
                    <Radio size={size} disabled>
                        Radio text
                    </Radio>
                    <Radio size={size} defaultChecked disabled>
                        Radio text
                    </Radio>
                </div>
            </div>
        ))}
        <div>
            <div style={{ marginBottom: 8, fontSize: 16, fontWeight: 700 }}>Длинная подпись</div>
            <div style={{ maxWidth: 280 }}>
                <Radio onChange={action("onChange")}>
                    Radio text Radio text Radio text Radio text Radio text Radio text Radio text
                </Radio>
            </div>
        </div>
    </div>
);
