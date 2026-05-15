import React from "react";
import { DateField } from "../../../src/components/DateField";
import { EComponentSize } from "../../../src/enums";

export const VisualTestsExample = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <div style={{ maxWidth: 300 }}>
            <DateField
                size={EComponentSize.SM}
                value="19700101"
                placeholderMask="дд.мм.гггг"
                onChange={() => {}}
                label="Label"
                invalidDateHint="Указана недоступная для выбора дата."
            />
        </div>
        <div style={{ maxWidth: 300 }}>
            <DateField
                size={EComponentSize.MD}
                value="19700101"
                placeholderMask="дд.мм.гггг"
                onChange={() => {}}
                label="Label"
                invalidDateHint="Указана недоступная для выбора дата."
            />
        </div>
        <div style={{ maxWidth: 300 }}>
            <DateField
                size={EComponentSize.LG}
                value="19700101"
                placeholderMask="дд.мм.гггг"
                onChange={() => {}}
                label="Label"
                invalidDateHint="Указана недоступная для выбора дата."
            />
        </div>
    </div>
);
