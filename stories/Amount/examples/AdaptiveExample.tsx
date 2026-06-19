import React from "react";
import { Amount, EFontType, ETextSize, Text } from "@sberbusiness/triplex-next";

export const AdaptiveExample = () => (
    <Text size={ETextSize.B2} type={EFontType.PRIMARY}>
        <Amount value="50000000000.31" currency="RUB" currencyTitle="Российские рубли" fractionLength={2} adaptive />
    </Text>
);
