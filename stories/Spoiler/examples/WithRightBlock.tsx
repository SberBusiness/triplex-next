import React from "react";
import { Spoiler, Text, EComponentSize, ETextSize, EFontType } from "@sberbusiness/triplex-next";

export const WithRightBlock = () => (
    <Spoiler
        labelExpand="Развернуть"
        labelCollapse="Свернуть"
        size={EComponentSize.MD}
        rightBlock={
            <Text size={ETextSize.B3} type={EFontType.SECONDARY}>
                12 документов
            </Text>
        }
    >
        <Text size={ETextSize.B3} type={EFontType.PRIMARY}>
            Скрытый контент
        </Text>
    </Spoiler>
);
