import React, { useState, useRef } from "react";
import { DateField, HelpBox, Text, Link, ETooltipSize, ETextSize, EFontType } from "@sberbusiness/triplex-next";

export const ProductionExample = () => {
    const [value, setValue] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);

    const handleLinkClick: React.MouseEventHandler<HTMLAnchorElement> = (event) => {
        event.preventDefault();
    };

    const handleClear: React.MouseEventHandler<HTMLButtonElement> = () => {
        setValue("");
        inputRef.current?.focus();
    };

    return (
        <div style={{ maxWidth: 300 }}>
            <DateField
                value={value}
                label="Label"
                placeholderMask="дд.мм.гггг"
                invalidDateHint="Указана недоступная для выбора дата."
                onChange={setValue}
                onClear={handleClear}
                targetProps={{
                    maskedInputProps: {
                        forwardedRef: inputRef,
                    },
                    postfix: <HelpBox tooltipSize={ETooltipSize.SM}>Helpful details appear here</HelpBox>,
                    description: (
                        <Text size={ETextSize.B4} type={EFontType.SECONDARY}>
                            (21) Description{" "}
                            <Link href="#" onClick={handleLinkClick}>
                                Link text
                            </Link>
                        </Text>
                    ),
                }}
            />
        </div>
    );
};
