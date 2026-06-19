import React from "react";
import { Page, EBodyPageType, Text, ETextSize, EFontType } from "@sberbusiness/triplex-next";

export const Types = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        <div>
            <div style={{ marginBottom: "8px", fontSize: "16px", fontWeight: 700 }}>FIRST</div>
            <Page.Body type={EBodyPageType.FIRST}>
                <Text tag="div" size={ETextSize.B2} type={EFontType.PRIMARY}>
                    Тип FIRST оборачивает контент в Island (карточку) с белым фоном и тенью.
                </Text>
            </Page.Body>
        </div>
        <div>
            <div style={{ marginBottom: "8px", fontSize: "16px", fontWeight: 700 }}>SECOND</div>
            <Page.Body type={EBodyPageType.SECOND}>
                <Text tag="div" size={ETextSize.B2} type={EFontType.PRIMARY}>
                    Тип SECOND отображает контент без карточки.
                </Text>
            </Page.Body>
        </div>
    </div>
);
