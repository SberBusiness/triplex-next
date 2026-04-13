import React, { useState } from "react";
import { DateField, HelpBox, ETooltipPreferPlace, ETooltipSize } from "@sberbusiness/triplex-next";

export const WithPostfixExample = () => {
    const [value, setValue] = useState("");
    return (
        <div style={{ maxWidth: "300px" }}>
            <DateField
                value={value}
                onChange={setValue}
                label="Label"
                placeholderMask="дд.мм.гггг"
                targetProps={{
                    postfix: (
                        <HelpBox tooltipSize={ETooltipSize.SM} preferPlace={ETooltipPreferPlace.ABOVE}>
                            Text
                        </HelpBox>
                    ),
                }}
            />
        </div>
    );
};
