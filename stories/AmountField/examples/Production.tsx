import React, { useState, useRef } from "react";
import { AmountField, Text, HelpBox, Link, ETextSize, EFontType, ETooltipSize } from "@sberbusiness/triplex-next";

export const Production = () => {
    const [value, setValue] = useState<string>("");
    const inputRef = useRef<HTMLInputElement>(null);

    const handleLinkClick: React.MouseEventHandler<HTMLAnchorElement> = (event) => {
        event.preventDefault();
    };

    const handleClear = () => {
        setValue("");
        inputRef.current?.focus();
    };

    return (
        <div style={{ maxWidth: 300 }}>
            <AmountField
                label="Label"
                postfix={<HelpBox tooltipSize={ETooltipSize.SM}>Helpful details appear here</HelpBox>}
                description={
                    <Text tag="div" size={ETextSize.B4} type={EFontType.SECONDARY}>
                        (21) Description{" "}
                        <Link href="#" onClick={handleLinkClick}>
                            Link text
                        </Link>
                    </Text>
                }
                inputProps={{
                    value,
                    placeholder: "0,00 ₽",
                    onChange: setValue,
                    ref: inputRef,
                }}
                currency="₽"
                onClear={handleClear}
            />
        </div>
    );
};
