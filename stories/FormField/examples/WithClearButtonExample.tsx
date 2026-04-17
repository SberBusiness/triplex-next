import React, { useState } from "react";
import {
    FormField,
    FormFieldClear,
    FormFieldInput,
    FormFieldLabel,
    FormFieldPostfix,
    HelpBox,
    ETooltipPreferPlace,
    ETooltipSize,
} from "@sberbusiness/triplex-next";

export const WithClearButtonExample = () => {
    const [value, setValue] = useState("");
    return (
        <div style={{ maxWidth: "300px" }}>
            <FormField>
                <FormFieldLabel>Название поля</FormFieldLabel>
                <FormFieldInput value={value} onChange={(e) => setValue(e.target.value)} />
                <FormFieldPostfix>
                    <FormFieldClear onClick={() => setValue("")} />
                    <HelpBox tooltipSize={ETooltipSize.SM} preferPlace={ETooltipPreferPlace.ABOVE}>
                        Text
                    </HelpBox>
                </FormFieldPostfix>
            </FormField>
        </div>
    );
};
