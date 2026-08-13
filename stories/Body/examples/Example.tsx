import React from "react";
import {
    Body,
    Island,
    EIslandType,
    EComponentSize,
    Text,
    ETextSize,
    EFontType,
    Caption,
    ECaptionSize,
} from "@sberbusiness/triplex-next";

export const Example = () => (
    <Island type={EIslandType.TYPE_1} size={EComponentSize.MD}>
        <Island.Header>
            <Text tag="div" size={ETextSize.B1} type={EFontType.PRIMARY}>
                Реквизиты счёта
            </Text>
        </Island.Header>
        <Island.Body>
            <Body>
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", gap: "16px" }}>
                        <Caption size={ECaptionSize.C1} type={EFontType.SECONDARY}>
                            Номер счёта
                        </Caption>
                        <Text tag="span" size={ETextSize.B2} type={EFontType.PRIMARY}>
                            40702810400000012345
                        </Text>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", gap: "16px" }}>
                        <Caption size={ECaptionSize.C1} type={EFontType.SECONDARY}>
                            БИК
                        </Caption>
                        <Text tag="span" size={ETextSize.B2} type={EFontType.PRIMARY}>
                            044525225
                        </Text>
                    </div>
                </div>
            </Body>
        </Island.Body>
    </Island>
);
