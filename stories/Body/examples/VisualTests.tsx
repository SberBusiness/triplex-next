import React from "react";
import { Body, Text, ETextSize, EFontType } from "@sberbusiness/triplex-next";

const wrapperStyle: React.CSSProperties = {
    border: "1px dashed rgb(125, 131, 138)",
    borderRadius: "4px",
    padding: "16px",
    width: "320px",
};

const blockStyle: React.CSSProperties = {
    backgroundColor: "rgba(125, 131, 138, 0.16)",
    borderRadius: "4px",
    padding: "8px",
};

export const VisualTests = () => (
    <div style={{ display: "flex", alignItems: "flex-start", gap: "24px", flexWrap: "wrap" }}>
        <div style={wrapperStyle}>
            <div style={{ marginBottom: "8px", fontSize: "16px", fontWeight: 700 }}>Несколько детей подряд</div>
            <Body>
                <div style={blockStyle}>Первый</div>
                <div style={blockStyle}>Второй</div>
                <div style={blockStyle}>Третий</div>
            </Body>
        </div>
        <div style={wrapperStyle}>
            <div style={{ marginBottom: "8px", fontSize: "16px", fontWeight: 700 }}>Длинный неразрывный контент</div>
            <Body>
                <div style={blockStyle}>
                    <Text tag="div" size={ETextSize.B2} type={EFontType.PRIMARY}>
                        40702810400000012345_40702810400000067890
                    </Text>
                </div>
            </Body>
        </div>
        <div style={{ ...wrapperStyle, display: "flex", gap: "8px" }}>
            <div style={{ ...blockStyle, flexShrink: 0 }}>Сиблинг</div>
            <Body>
                <div style={blockStyle}>Body рядом с сиблингом</div>
            </Body>
        </div>
    </div>
);
