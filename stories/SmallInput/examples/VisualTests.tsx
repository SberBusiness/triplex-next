import React from "react";
import { SmallInput } from "@sberbusiness/triplex-next";

const captionStyle: React.CSSProperties = { marginBottom: "8px", fontSize: "16px", fontWeight: "700" };
const itemStyle: React.CSSProperties = { width: "120px" };
const wideItemStyle: React.CSSProperties = { width: "260px" };

/**
 * Набор состояний для скриншот-тестов: пустое поле с плейсхолдером, заполненное,
 * disabled, readOnly, переполнение значением и растягивание по ширине контейнера.
 * Собственных стилей фокуса и наведения у компонента нет, поэтому эти состояния не снимаются.
 */
export const VisualTests = () => (
    <div style={{ display: "flex", alignItems: "flex-start", flexWrap: "wrap", gap: "24px" }}>
        <div style={itemStyle}>
            <div style={captionStyle}>PLACEHOLDER</div>
            <SmallInput placeholder="000000" />
        </div>

        <div style={itemStyle}>
            <div style={captionStyle}>FILLED</div>
            <SmallInput defaultValue="000123" placeholder="000000" />
        </div>

        <div style={itemStyle}>
            <div style={captionStyle}>DISABLED</div>
            <SmallInput defaultValue="000123" placeholder="000000" disabled />
        </div>

        <div style={itemStyle}>
            <div style={captionStyle}>READ ONLY</div>
            <SmallInput defaultValue="000123" placeholder="000000" readOnly />
        </div>

        <div style={itemStyle}>
            <div style={captionStyle}>OVERFLOW</div>
            <SmallInput defaultValue="0001234567890123456789" />
        </div>

        <div style={wideItemStyle}>
            <div style={captionStyle}>FULL WIDTH</div>
            <SmallInput defaultValue="Растягивается по ширине контейнера" />
        </div>
    </div>
);
