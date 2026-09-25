import React from "react";
import { Spoiler, Text, ETextSize, EFontType } from "@sberbusiness/triplex-next";

export const Default = () => (
    <Spoiler labelExpand="Развернуть" labelCollapse="Свернуть">
        <Text size={ETextSize.B3} type={EFontType.PRIMARY}>
            Скрытый контент
        </Text>
    </Spoiler>
);
