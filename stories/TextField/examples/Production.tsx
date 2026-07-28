import React, { useState } from "react";
import {
    TextField,
    FormFieldClear,
    HelpBox,
    Text,
    Link,
    ETooltipSize,
    ETooltipPreferPlace,
    ETextSize,
    EFontType,
} from "@sberbusiness/triplex-next";
import { DefaulticonStrokePrdIcon24 } from "@sberbusiness/icons-next";

const MAX_LENGTH = 201;

export const Production = () => {
    const [value, setValue] = useState("");

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.value.length <= MAX_LENGTH) {
            setValue(event.target.value);
        }
    };

    return (
        <div style={{ maxWidth: "300px" }}>
            <TextField
                label="Label"
                description={
                    <Text tag="div" size={ETextSize.B4} type={EFontType.SECONDARY}>
                        (21) Description{" "}
                        <Link href="#" onClick={(event) => event.preventDefault()}>
                            Link text
                        </Link>
                    </Text>
                }
                counter={
                    <Text tag="div" size={ETextSize.B4} type={EFontType.SECONDARY}>
                        {value.length}/{MAX_LENGTH}
                    </Text>
                }
                prefix={<DefaulticonStrokePrdIcon24 paletteIndex={5} />}
                postfix={
                    <>
                        <FormFieldClear onClick={() => setValue("")} />
                        <DefaulticonStrokePrdIcon24 paletteIndex={5} />
                        <HelpBox tooltipSize={ETooltipSize.SM} preferPlace={ETooltipPreferPlace.ABOVE}>
                            Text
                        </HelpBox>
                    </>
                }
                inputProps={{ value, onChange: handleChange, placeholder: "Type to proceed" }}
            />
        </div>
    );
};
