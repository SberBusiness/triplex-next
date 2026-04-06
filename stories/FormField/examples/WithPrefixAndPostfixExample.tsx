import React, { useState } from "react";
import { DefaulticonStrokePrdIcon20 } from "@sberbusiness/icons-next";
import {
    FormField,
    FormFieldInput,
    FormFieldLabel,
    FormFieldPostfix,
    FormFieldPrefix,
    HelpBox,
    ETooltipPreferPlace,
    ETooltipSize,
} from "@sberbusiness/triplex-next";

export const WithPrefixAndPostfixExample = () => {
    const [value, setValue] = useState("");
    return (
        <div style={{ maxWidth: "300px" }}>
            <FormField>
                <FormFieldPrefix>
                    <DefaulticonStrokePrdIcon20 paletteIndex={5} />
                </FormFieldPrefix>
                <FormFieldLabel>Название поля</FormFieldLabel>
                <FormFieldInput value={value} onChange={(e) => setValue(e.target.value)} />
                <FormFieldPostfix>
                    <HelpBox tooltipSize={ETooltipSize.SM} preferPlace={ETooltipPreferPlace.ABOVE}>
                        Text
                    </HelpBox>
                </FormFieldPostfix>
            </FormField>
        </div>
    );
};
