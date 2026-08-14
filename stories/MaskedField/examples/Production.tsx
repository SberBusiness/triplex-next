import React, { useState } from "react";
import {
    MaskedField,
    FormFieldMaskedInput,
    FormFieldClear,
    HelpBox,
    Text,
    Link,
    ETooltipSize,
    ETooltipPreferPlace,
    ETextSize,
    EFontType,
} from "@sberbusiness/triplex-next";

export const Production = () => {
    const [value, setValue] = useState("");

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => setValue(event.target.value);

    return (
        <div style={{ maxWidth: "300px" }}>
            <MaskedField
                label="Номер телефона"
                description={
                    <Text tag="div" size={ETextSize.B4} type={EFontType.SECONDARY}>
                        (21) Description{" "}
                        <Link href="#" onClick={(event) => event.preventDefault()}>
                            Link text
                        </Link>
                    </Text>
                }
                postfix={
                    <>
                        <FormFieldClear onClick={() => setValue("")} />
                        <HelpBox tooltipSize={ETooltipSize.SM} preferPlace={ETooltipPreferPlace.ABOVE}>
                            Text
                        </HelpBox>
                    </>
                }
                maskedInputProps={{
                    mask: FormFieldMaskedInput.presets.masks.phone,
                    value,
                    onChange: handleChange,
                }}
            />
        </div>
    );
};
