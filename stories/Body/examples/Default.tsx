import React from "react";
import { Body, Text, ETextSize, EFontType } from "@sberbusiness/triplex-next";

export const Default = () => (
    <Body>
        <Text tag="div" size={ETextSize.B2} type={EFontType.PRIMARY}>
            Body — контейнер основного контента. Собственных отступов не задаёт.
        </Text>
    </Body>
);
