import React from "react";
import { Page, EBodyPageType, EBodyPageVerticalMargin, Text, ETextSize, EFontType } from "@sberbusiness/triplex-next";

interface ICaseProps {
    label: string;
    children: React.ReactNode;
}

/** Обёртка с рамкой — делает вертикальные отступы BodyPage видимыми на скриншоте. */
const Case = ({ label, children }: ICaseProps) => (
    <div>
        <div style={{ marginBottom: "8px", fontSize: "16px", fontWeight: 700 }}>{label}</div>
        <div style={{ border: "1px dashed rgb(125, 131, 138)", display: "flex", flexDirection: "column" }}>
            {children}
        </div>
    </div>
);

export const VisualTests = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        <Case label="FIRST + LARGE">
            <Page.Body type={EBodyPageType.FIRST} verticalMargin={EBodyPageVerticalMargin.LARGE}>
                <Text tag="div" size={ETextSize.B2} type={EFontType.PRIMARY}>
                    FIRST + LARGE (24px) — контент в карточке.
                </Text>
            </Page.Body>
        </Case>
        <Case label="FIRST + SMALL">
            <Page.Body type={EBodyPageType.FIRST} verticalMargin={EBodyPageVerticalMargin.SMALL}>
                <Text tag="div" size={ETextSize.B2} type={EFontType.PRIMARY}>
                    FIRST + SMALL (16px) — контент в карточке.
                </Text>
            </Page.Body>
        </Case>
        <Case label="FIRST + NONE">
            <Page.Body type={EBodyPageType.FIRST} verticalMargin={EBodyPageVerticalMargin.NONE}>
                <Text tag="div" size={ETextSize.B2} type={EFontType.PRIMARY}>
                    FIRST + NONE (0) — контент в карточке без отступов.
                </Text>
            </Page.Body>
        </Case>
        <Case label="FIRST + { top: NONE, bottom: LARGE }">
            <Page.Body
                type={EBodyPageType.FIRST}
                verticalMargin={{ top: EBodyPageVerticalMargin.NONE, bottom: EBodyPageVerticalMargin.LARGE }}
            >
                <Text tag="div" size={ETextSize.B2} type={EFontType.PRIMARY}>
                    FIRST + сверху 0, снизу 24px.
                </Text>
            </Page.Body>
        </Case>
        <Case label="FIRST + { top: LARGE, bottom: NONE }">
            <Page.Body
                type={EBodyPageType.FIRST}
                verticalMargin={{ top: EBodyPageVerticalMargin.LARGE, bottom: EBodyPageVerticalMargin.NONE }}
            >
                <Text tag="div" size={ETextSize.B2} type={EFontType.PRIMARY}>
                    FIRST + сверху 24px, снизу 0.
                </Text>
            </Page.Body>
        </Case>
        <Case label="FIRST + { top: SMALL, bottom: LARGE }">
            <Page.Body
                type={EBodyPageType.FIRST}
                verticalMargin={{ top: EBodyPageVerticalMargin.SMALL, bottom: EBodyPageVerticalMargin.LARGE }}
            >
                <Text tag="div" size={ETextSize.B2} type={EFontType.PRIMARY}>
                    FIRST + сверху 16px, снизу 24px.
                </Text>
            </Page.Body>
        </Case>
        <Case label="SECOND + LARGE">
            <Page.Body type={EBodyPageType.SECOND} verticalMargin={EBodyPageVerticalMargin.LARGE}>
                <Text tag="div" size={ETextSize.B2} type={EFontType.PRIMARY}>
                    SECOND + LARGE (24px) — контент без карточки.
                </Text>
            </Page.Body>
        </Case>
        <Case label="SECOND + SMALL">
            <Page.Body type={EBodyPageType.SECOND} verticalMargin={EBodyPageVerticalMargin.SMALL}>
                <Text tag="div" size={ETextSize.B2} type={EFontType.PRIMARY}>
                    SECOND + SMALL (16px) — контент без карточки.
                </Text>
            </Page.Body>
        </Case>
        <Case label="SECOND + NONE">
            <Page.Body type={EBodyPageType.SECOND} verticalMargin={EBodyPageVerticalMargin.NONE}>
                <Text tag="div" size={ETextSize.B2} type={EFontType.PRIMARY}>
                    SECOND + NONE (0) — контент без карточки и без отступов.
                </Text>
            </Page.Body>
        </Case>
        <Case label="SECOND + { top: NONE, bottom: SMALL }">
            <Page.Body
                type={EBodyPageType.SECOND}
                verticalMargin={{ top: EBodyPageVerticalMargin.NONE, bottom: EBodyPageVerticalMargin.SMALL }}
            >
                <Text tag="div" size={ETextSize.B2} type={EFontType.PRIMARY}>
                    SECOND + сверху 0, снизу 16px.
                </Text>
            </Page.Body>
        </Case>
    </div>
);
