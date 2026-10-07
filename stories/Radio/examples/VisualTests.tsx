import React from "react";
import { action } from "storybook/actions";
import { Radio, EComponentSize } from "@sberbusiness/triplex-next";

const SIZES = [EComponentSize.SM, EComponentSize.MD, EComponentSize.LG];

export const VisualTests = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 24, maxWidth: 480 }}>
        <Radio onChange={action("onChange")}>Фокус с клавиатуры</Radio>
        {SIZES.map((size) => (
            <div key={size}>
                <div style={{ marginBottom: 8, fontWeight: 700 }}>{size.toUpperCase()}</div>
                <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
                    <Radio size={size} defaultChecked onChange={action("onChange")}>
                        Выбран
                    </Radio>
                    <Radio size={size} disabled>
                        Не выбран
                    </Radio>
                    <Radio size={size} defaultChecked disabled>
                        Выбран, недоступен
                    </Radio>
                </div>
            </div>
        ))}
        <div style={{ maxWidth: 280 }}>
            <Radio onChange={action("onChange")}>
                Длинное описание варианта, которое переносится на несколько строк
            </Radio>
        </div>
    </div>
);
