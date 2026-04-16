import React, { useState, useRef } from "react";
import {
    TextareaField,
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

const postfixStyles: React.CSSProperties = {
    alignSelf: "flex-start",
    marginTop: -4, // 20px from top
    display: "flex",
    alignItems: "center",
    gap: 8,
};

const MAX_LENGTH = 201;

export const ProductionExample = () => {
    const [value, setValue] = useState("");
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const handleTextareaChange: React.ChangeEventHandler<HTMLTextAreaElement> = (event) => {
        setValue(event.target.value);
    };

    const handleClearButtonClick: React.MouseEventHandler<HTMLButtonElement> = () => {
        setValue("");
        textareaRef.current?.focus();
    };

    const handleLinkClick: React.MouseEventHandler<HTMLAnchorElement> = (event) => {
        event.preventDefault();
    };

    return (
        <div style={{ maxWidth: 300 }}>
            <TextareaField
                size={EComponentSize.LG}
                status={EFormFieldStatus.DEFAULT}
                textareaProps={{
                    value,
                    placeholder: "Type to proceed",
                    maxLength: MAX_LENGTH,
                    onChange: handleTextareaChange,
                    ref: textareaRef,
                }}
                label="Label"
                postfix={
                    <div style={postfixStyles}>
                        <FormFieldClear aria-label="clear value" onClick={handleClearButtonClick} />
                        <HelpBox tooltipSize={ETooltipSize.SM}>Helpful details appear here</HelpBox>
                    </div>
                }
                description={
                    <Text size={ETextSize.B4} type={EFontType.SECONDARY}>
                        (21) Description{" "}
                        <Link href="#" onClick={handleLinkClick}>
                            Link text
                        </Link>
                    </Text>
                }
                counter={
                    <Text size={ETextSize.B4} type={EFontType.SECONDARY}>
                        {value.length}/{MAX_LENGTH}
                    </Text>
                }
            />
        </div>
    );
};
