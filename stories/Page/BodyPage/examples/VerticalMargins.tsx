import React from "react";
import { Page, EBodyPageType, EBodyPageVerticalMargin, Text, ETextSize, EFontType } from "@sberbusiness/triplex-next";

export const VerticalMargins = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        <div>
            <div style={{ marginBottom: "8px", fontSize: "16px", fontWeight: 700 }}>LARGE (24px)</div>
            <Page.Body type={EBodyPageType.FIRST} verticalMargin={EBodyPageVerticalMargin.LARGE}>
                <Text tag="div" size={ETextSize.B2} type={EFontType.PRIMARY}>
                    Отступы сверху и снизу 24px (значение по умолчанию).
                </Text>
            </Page.Body>
        </div>
        <div>
            <div style={{ marginBottom: "8px", fontSize: "16px", fontWeight: 700 }}>SMALL (16px)</div>
            <Page.Body type={EBodyPageType.FIRST} verticalMargin={EBodyPageVerticalMargin.SMALL}>
                <Text tag="div" size={ETextSize.B2} type={EFontType.PRIMARY}>
                    Уменьшенные отступы сверху и снизу 16px. Используется в LightBox.
                </Text>
            </Page.Body>
        </div>
        <div>
            <div style={{ marginBottom: "8px", fontSize: "16px", fontWeight: 700 }}>NONE (0)</div>
            <Page.Body type={EBodyPageType.FIRST} verticalMargin={EBodyPageVerticalMargin.NONE}>
                <Text tag="div" size={ETextSize.B2} type={EFontType.PRIMARY}>
                    Без вертикальных отступов сверху и снизу.
                </Text>
            </Page.Body>
        </div>
        <div>
            <div style={{ marginBottom: "8px", fontSize: "16px", fontWeight: 700 }}>
                {"{ top: NONE, bottom: LARGE }"}
            </div>
            <Page.Body
                type={EBodyPageType.FIRST}
                verticalMargin={{ top: EBodyPageVerticalMargin.NONE, bottom: EBodyPageVerticalMargin.LARGE }}
            >
                <Text tag="div" size={ETextSize.B2} type={EFontType.PRIMARY}>
                    Отступы задаются раздельно: сверху 0, снизу 24px.
                </Text>
            </Page.Body>
        </div>
        <div>
            <div style={{ marginBottom: "8px", fontSize: "16px", fontWeight: 700 }}>
                {"{ top: SMALL, bottom: NONE }"}
            </div>
            <Page.Body
                type={EBodyPageType.FIRST}
                verticalMargin={{ top: EBodyPageVerticalMargin.SMALL, bottom: EBodyPageVerticalMargin.NONE }}
            >
                <Text tag="div" size={ETextSize.B2} type={EFontType.PRIMARY}>
                    Отступы задаются раздельно: сверху 16px, снизу 0.
                </Text>
            </Page.Body>
        </div>
    </div>
);
