import React from "react";
import { Body, Text, ETextSize, EFontType } from "@sberbusiness/triplex-next";

export const WithFullWidthContent = () => (
    <div style={{ border: "1px dashed rgb(125, 131, 138)", borderRadius: "4px", padding: "16px", maxWidth: "480px" }}>
        <Body>
            <div style={{ backgroundColor: "rgba(125, 131, 138, 0.16)", borderRadius: "4px", padding: "16px" }}>
                <Text tag="div" size={ETextSize.B2} type={EFontType.PRIMARY}>
                    Внутренняя обёртка Body растягивает контент на всю доступную ширину контейнера.
                </Text>
            </div>
        </Body>
    </div>
);
