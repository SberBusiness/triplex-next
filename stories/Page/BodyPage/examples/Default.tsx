import React from "react";
import { Page, EBodyPageType, Text, ETextSize, EFontType } from "@sberbusiness/triplex-next";

export const Default = () => (
    <Page.Body type={EBodyPageType.FIRST}>
        <Text tag="div" size={ETextSize.B2} type={EFontType.PRIMARY}>
            BodyPage типа FIRST оборачивает контент в Island (карточку) с белым фоном и тенью.
        </Text>
    </Page.Body>
);
