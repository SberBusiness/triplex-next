import React from "react";
import { Amount, EFontType, ETextSize, Text } from "@sberbusiness/triplex-next";

export const DefaultExample = () => (
    <Text size={ETextSize.B2} type={EFontType.PRIMARY}>
        <Amount value="8967452.31" currency="RUB" currencyTitle="Российские рубли" fractionLength={2} />
    </Text>
);
