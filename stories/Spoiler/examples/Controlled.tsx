import React, { useState } from "react";
import { Spoiler, Text, EComponentSize, ETextSize, EFontType } from "@sberbusiness/triplex-next";

export const Controlled = () => {
    const [expanded, setExpanded] = useState(false);

    return (
        <Spoiler
            expanded={expanded}
            toggle={setExpanded}
            labelExpand="Развернуть"
            labelCollapse="Свернуть"
            size={EComponentSize.MD}
        >
            <Text size={ETextSize.B3} type={EFontType.PRIMARY}>
                Скрытый контент
            </Text>
        </Spoiler>
    );
};
