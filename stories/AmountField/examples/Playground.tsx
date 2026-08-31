import React, { useState, useRef, useCallback } from "react";
import {
    AmountField,
    Text,
    HelpBox,
    Link,
    EFormFieldStatus,
    ETextSize,
    EFontType,
    ETooltipSize,
} from "@sberbusiness/triplex-next";

export interface PlaygroundArgs extends Pick<
    React.ComponentProps<typeof AmountField>,
    "size" | "status" | "label" | "active" | "currency" | "maxIntegerDigits" | "fractionDigits"
> {
    inputProps: Omit<React.ComponentProps<typeof AmountField>["inputProps"], "value" | "onChange" | "ref">;
    withClear: boolean;
    withHelpBox: boolean;
    withDescription: boolean;
}

const STATUS_TO_DESCRIPTION_FONT_TYPE_MAP: Record<EFormFieldStatus, EFontType> = {
    [EFormFieldStatus.DEFAULT]: EFontType.SECONDARY,
    [EFormFieldStatus.DISABLED]: EFontType.SECONDARY,
    [EFormFieldStatus.ERROR]: EFontType.ERROR,
    [EFormFieldStatus.WARNING]: EFontType.WARNING,
};

export const Playground = ({
    status = EFormFieldStatus.DEFAULT,
    inputProps,
    withClear,
    withHelpBox,
    withDescription,
    ...restArgs
}: PlaygroundArgs) => {
    const [value, setValue] = useState<string>("");
    const inputRef = useRef<HTMLInputElement>(null);

    const handleClear = useCallback<() => void>(() => {
        setValue("");
        inputRef.current?.focus();
    }, []);

    const handleLinkClick = useCallback<React.MouseEventHandler<HTMLAnchorElement>>((event) => {
        event.preventDefault();
    }, []);

    return (
        <div style={{ maxWidth: 300 }}>
            <AmountField
                {...restArgs}
                status={status}
                postfix={
                    withHelpBox ? (
                        <HelpBox tooltipSize={ETooltipSize.SM}>Helpful details appear here</HelpBox>
                    ) : undefined
                }
                description={
                    withDescription ? (
                        <Text tag="div" size={ETextSize.B4} type={STATUS_TO_DESCRIPTION_FONT_TYPE_MAP[status]}>
                            (21) Description{" "}
                            <Link href="#" onClick={handleLinkClick}>
                                Link text
                            </Link>
                        </Text>
                    ) : undefined
                }
                inputProps={{
                    ...inputProps,
                    value,
                    onChange: setValue,
                    ref: inputRef,
                }}
                onClear={withClear ? handleClear : undefined}
            />
        </div>
    );
};
