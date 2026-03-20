import React, { useState } from "react";
import {
    NumberField,
    FormFieldClear,
    Text,
    HelpBox,
    EComponentSize,
    EFormFieldStatus,
    ETextSize,
    EFontType,
    ETooltipSize,
} from "@sberbusiness/triplex-next";

export const ProductionExample = () => {
    const [value, setValue] = useState("");

    const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (event) => setValue(event.target.value);

    const handleClearClick = () => setValue("");

    return (
        <div style={{ maxWidth: "300px" }}>
            <NumberField
                size={EComponentSize.LG}
                status={EFormFieldStatus.DEFAULT}
                inputProps={{
                    value,
                    placeholder: "0",
                    onChange: handleInputChange,
                }}
                label="Label"
                postfix={
                    <>
                        <FormFieldClear aria-label="clear value" onClick={handleClearClick} />
                        <Text size={ETextSize.B2} type={EFontType.SECONDARY}>
                            мм
                        </Text>
                        <HelpBox tooltipSize={ETooltipSize.SM}>Helpful details appear here</HelpBox>
                    </>
                }
            />
        </div>
    );
};
