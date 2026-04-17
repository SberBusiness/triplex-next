import React, { useState } from "react";
import { DateField } from "../../../src/components/DateField";
import { EComponentSize } from "../../../src/enums";
import { HelpBox } from "../../../src/components/HelpBox/HelpBox";
import { ETooltipPreferPlace, ETooltipSize } from "../../../src/components/Tooltip/enums";

export const VisualTestsExample = () => {
    const [value, setValue] = useState("");
    return (
        <div style={{ display: "flex", alignItems: "flex-start", gap: 5, flexWrap: "wrap" }}>
            <div style={{ maxWidth: "250px" }}>
                <DateField
                    value={value}
                    defaultViewDate={"19700101"}
                    onChange={setValue}
                    label="Label"
                    placeholderMask="дд.мм.гггг"
                    invalidDateHint="Указана недоступная для выбора дата."
                    targetProps={{
                        postfix: (
                            <HelpBox tooltipSize={ETooltipSize.SM} preferPlace={ETooltipPreferPlace.ABOVE}>
                                Text
                            </HelpBox>
                        ),
                    }}
                />
            </div>
            <div style={{ maxWidth: "250px" }}>
                <DateField
                    value="20260322"
                    size={EComponentSize.SM}
                    onChange={() => {}}
                    label="Label"
                    placeholderMask="дд.мм.гггг"
                    invalidDateHint="Указана недоступная для выбора дата."
                />
            </div>
            <div style={{ maxWidth: "250px" }}>
                <DateField
                    value="20260322"
                    onChange={() => {}}
                    label="Label"
                    placeholderMask="дд.мм.гггг"
                    invalidDateHint="Указана недоступная для выбора дата."
                />
            </div>
            <div style={{ maxWidth: "250px" }}>
                <DateField
                    value="20260322"
                    size={EComponentSize.LG}
                    onChange={() => {}}
                    label="Label"
                    placeholderMask="дд.мм.гггг"
                    invalidDateHint="Указана недоступная для выбора дата."
                />
            </div>
        </div>
    );
};
