import React from "react";
import { Body, Text, ETextSize, EFontType } from "@sberbusiness/triplex-next";

const wrapperStyle: React.CSSProperties = {
    border: "1px dashed rgb(125, 131, 138)",
    borderRadius: "4px",
    padding: "16px",
    width: "320px",
};

export const VisualTests = () => (
    <div style={{ display: "flex", alignItems: "flex-start", gap: "24px", flexWrap: "wrap" }}>
        <div style={wrapperStyle}>
            <div style={{ marginBottom: "8px", fontSize: "16px", fontWeight: 700 }}>Пустой</div>
            <Body />
        </div>
        <div style={wrapperStyle}>
            <div style={{ marginBottom: "8px", fontSize: "16px", fontWeight: 700 }}>Текстовый контент</div>
            <Body>
                <Text tag="div" size={ETextSize.B2} type={EFontType.PRIMARY}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore
                    et dolore magna aliqua.
                </Text>
            </Body>
        </div>
        <div style={wrapperStyle}>
            <div style={{ marginBottom: "8px", fontSize: "16px", fontWeight: 700 }}>Блочный контент</div>
            <Body>
                <div style={{ backgroundColor: "rgba(125, 131, 138, 0.16)", borderRadius: "4px", padding: "16px" }}>
                    <Text tag="div" size={ETextSize.B2} type={EFontType.PRIMARY}>
                        Контент на всю ширину.
                    </Text>
                </div>
            </Body>
        </div>
    </div>
);
