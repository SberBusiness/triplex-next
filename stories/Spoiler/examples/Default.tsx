import React from "react";
import { Spoiler, Text, EComponentSize, ETextSize, EFontType } from "@sberbusiness/triplex-next";

export const Default = () => (
    <Spoiler labelExpand="Развернуть" labelCollapse="Свернуть" size={EComponentSize.MD}>
        <Text size={ETextSize.B3} type={EFontType.PRIMARY}>
            Скрытый контент
        </Text>
    </Spoiler>
);
