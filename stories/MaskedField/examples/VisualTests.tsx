import React from "react";
import { MaskedField, FormFieldMaskedInput, EComponentSize, EFormFieldStatus } from "@sberbusiness/triplex-next";
import { action } from "storybook/actions";

const { masks } = FormFieldMaskedInput.presets;

const captionStyle: React.CSSProperties = { marginBottom: "8px", fontSize: "16px", fontWeight: "700" };
const itemStyle: React.CSSProperties = { width: "300px" };

/**
 * Набор состояний для скриншот-тестов, не покрытых документационными стори.
 * Проверяет поведение маски при фокусе, сетку размеров и отображение маски-плейсхолдера.
 */
export const VisualTests = () => (
    <div style={{ display: "flex", alignItems: "flex-start", gap: "24px", flexWrap: "wrap" }}>
        {/* Проверяет отображение маски-плейсхолдера при фокусе в пустом поле. */}
        <div style={itemStyle}>
            <div style={captionStyle}>FOCUSED</div>
            <MaskedField
                label="Label"
                maskedInputProps={{ mask: masks.phone, value: "", onChange: action("onChange") }}
            />
        </div>

        {/* Проверяет позиционирование маски-плейсхолдера для малого размера. */}
        <div style={itemStyle}>
            <div style={captionStyle}>PARTIALLY FILLED | SM</div>
            <MaskedField
                size={EComponentSize.SM}
                label="Label"
                maskedInputProps={{ mask: masks.phone, value: "+7 (900)", onChange: action("onChange") }}
            />
        </div>

        {/* Проверяет позиционирование маски-плейсхолдера для среднего размера. */}
        <div style={itemStyle}>
            <div style={captionStyle}>PARTIALLY FILLED | MD</div>
            <MaskedField
                size={EComponentSize.MD}
                label="Label"
                maskedInputProps={{ mask: masks.phone, value: "+7 (900)", onChange: action("onChange") }}
            />
        </div>

        {/* Проверяет позиционирование маски-плейсхолдера для большого размера. */}
        <div style={itemStyle}>
            <div style={captionStyle}>PARTIALLY FILLED | LG</div>
            <MaskedField
                size={EComponentSize.LG}
                label="Label"
                maskedInputProps={{ mask: masks.phone, value: "+7 (900)", onChange: action("onChange") }}
            />
        </div>

        {/* Проверяет цвет маски-плейсхолдера в заблокированном состоянии. */}
        <div style={itemStyle}>
            <div style={captionStyle}>PARTIALLY FILLED | DISABLED</div>
            <MaskedField
                status={EFormFieldStatus.DISABLED}
                label="Label"
                maskedInputProps={{ mask: masks.phone, value: "+7 (900)", onChange: action("onChange") }}
            />
        </div>
    </div>
);
