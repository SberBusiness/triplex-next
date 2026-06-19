import React from "react";
import { Page, EBodyPageType, EBodyPageVerticalMargin, Text, ETextSize, EFontType } from "@sberbusiness/triplex-next";

export const VisualTests = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        <Page.Body type={EBodyPageType.FIRST} verticalMargin={EBodyPageVerticalMargin.LARGE}>
            <Text tag="div" size={ETextSize.B2} type={EFontType.PRIMARY}>
                FIRST + LARGE (24px) — контент в карточке.
            </Text>
        </Page.Body>
        <Page.Body type={EBodyPageType.FIRST} verticalMargin={EBodyPageVerticalMargin.SMALL}>
            <Text tag="div" size={ETextSize.B2} type={EFontType.PRIMARY}>
                FIRST + SMALL (16px) — контент в карточке.
            </Text>
        </Page.Body>
        <Page.Body type={EBodyPageType.SECOND} verticalMargin={EBodyPageVerticalMargin.LARGE}>
            <Text tag="div" size={ETextSize.B2} type={EFontType.PRIMARY}>
                SECOND + LARGE (24px) — контент без карточки.
            </Text>
        </Page.Body>
        <Page.Body type={EBodyPageType.SECOND} verticalMargin={EBodyPageVerticalMargin.SMALL}>
            <Text tag="div" size={ETextSize.B2} type={EFontType.PRIMARY}>
                SECOND + SMALL (16px) — контент без карточки.
            </Text>
        </Page.Body>
    </div>
);
