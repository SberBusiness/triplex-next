import React, { useState, useRef } from "react";
import {
    NumberField,
    FormFieldClear,
    Text,
    HelpBox,
    Link,
    EComponentSize,
    EFormFieldStatus,
    ETextSize,
    EFontType,
    ETooltipSize,
} from "@sberbusiness/triplex-next";

export const ProductionExample = () => {
    const [value, setValue] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);

    const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        setValue(event.target.value);
    };

    const handleClearButtonClick: React.MouseEventHandler<HTMLButtonElement> = () => {
        setValue("");
        inputRef.current?.focus();
    };

    const handleLinkClick: React.MouseEventHandler<HTMLAnchorElement> = (event) => {
        event.preventDefault();
    };

    return (
        <div style={{ maxWidth: 300 }}>
            <NumberField
                size={EComponentSize.LG}
                status={EFormFieldStatus.DEFAULT}
                inputProps={{
                    value,
                    placeholder: "0",
                    onChange: handleInputChange,
                    ref: inputRef,
                }}
                label="Label"
                postfix={
                    <>
                        <FormFieldClear aria-label="clear value" onClick={handleClearButtonClick} />
                        <Text size={ETextSize.B2} type={EFontType.SECONDARY}>
                            мм
                        </Text>
                        <HelpBox tooltipSize={ETooltipSize.SM}>Helpful details appear here</HelpBox>
                    </>
                }
                description={
                    <>
                        <Text size={ETextSize.B4} type={EFontType.SECONDARY}>
                            (21) Description{" "}
                            <Link href="#" onClick={handleLinkClick}>
                                Link text
                            </Link>
                        </Text>
                    </>
                }
            />
        </div>
    );
};
