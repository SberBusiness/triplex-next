import React from "react";
import { AmountField, EComponentSize, EFormFieldStatus } from "@sberbusiness/triplex-next";
import { action } from "storybook/actions";

const itemStyle: React.CSSProperties = { width: "300px" };
const captionStyle: React.CSSProperties = { marginBottom: "8px", fontSize: "16px", fontWeight: "700" };

/**
 * Набор состояний для скриншот-тестов, не покрытых документационными стори.
 * Проверяет поведение компонента при фокусе, сетку размеров и отображение валюты.
 */
export const VisualTests = () => (
    <div style={{ display: "flex", alignItems: "flex-start", gap: "24px", flexWrap: "wrap" }}>
        {/* Проверяет, что знак валюты НЕ рендерится при пустом значении. */}
        <div style={itemStyle}>
            <div style={captionStyle}>CURRENCY | FOCUSED</div>
            <AmountField
                label="Label"
                inputProps={{
                    value: "",
                    placeholder: "0,00 ₽",
                    onChange: action("onChange"),
                }}
                currency="₽"
            />
        </div>

        {/* Проверяет позиционирование зеркального слоя валюты для малого размера. */}
        <div style={itemStyle}>
            <div style={captionStyle}>FILLED | SM | CURRENCY</div>
            <AmountField
                size={EComponentSize.SM}
                label="Label"
                inputProps={{
                    value: "8967452.31",
                    placeholder: "0,00 ₽",
                    onChange: action("onChange"),
                }}
                currency="₽"
            />
        </div>

        {/* Проверяет позиционирование зеркального слоя валюты для среднего размера. */}
        <div style={itemStyle}>
            <div style={captionStyle}>FILLED | MD | CURRENCY</div>
            <AmountField
                size={EComponentSize.MD}
                label="Label"
                inputProps={{
                    value: "8967452.31",
                    placeholder: "0,00 ₽",
                    onChange: action("onChange"),
                }}
                currency="₽"
            />
        </div>

        {/* Проверяет позиционирование зеркального слоя валюты для большого размера. */}
        <div style={itemStyle}>
            <div style={captionStyle}>FILLED | LG | CURRENCY</div>
            <AmountField
                size={EComponentSize.LG}
                label="Label"
                inputProps={{
                    value: "8967452.31",
                    placeholder: "0,00 ₽",
                    onChange: action("onChange"),
                }}
                currency="₽"
            />
        </div>

        {/* Проверяет изменение цвета знака валюты в заблокированном состоянии. */}
        <div style={itemStyle}>
            <div style={captionStyle}>FILLED | CURRENCY | DISABLED</div>
            <AmountField
                status={EFormFieldStatus.DISABLED}
                label="Label"
                inputProps={{
                    value: "8967452.31",
                    placeholder: "0,00 ₽",
                    onChange: action("onChange"),
                }}
                currency="₽"
            />
        </div>
    </div>
);
