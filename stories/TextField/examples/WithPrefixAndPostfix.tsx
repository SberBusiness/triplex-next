import React, { useState } from "react";
import { TextField, HelpBox, ETooltipSize, ETooltipPreferPlace } from "@sberbusiness/triplex-next";
import { DefaulticonStrokePrdIcon24 } from "@sberbusiness/icons-next";

export const WithPrefixAndPostfix = () => {
    const [value, setValue] = useState("");

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => setValue(event.target.value);

    return (
        <div style={{ maxWidth: "300px" }}>
            <TextField
                label="Label"
                prefix={<DefaulticonStrokePrdIcon24 paletteIndex={5} />}
                postfix={
                    <HelpBox tooltipSize={ETooltipSize.SM} preferPlace={ETooltipPreferPlace.ABOVE}>
                        Text
                    </HelpBox>
                }
                inputProps={{ value, onChange: handleChange, placeholder: "Type to proceed" }}
            />
        </div>
    );
};
