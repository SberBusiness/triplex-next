import React, { useState, useRef, useCallback } from "react";
import {
    NumberField,
    FormFieldClear,
    Text,
    HelpBox,
    Link,
    EFormFieldStatus,
    ETextSize,
    EFontType,
    ETooltipSize,
} from "@sberbusiness/triplex-next";
import type { PlaygroundArgs } from "../NumberField.stories";

const STATUS_TO_POSTFIX_FONT_TYPE_MAP: Record<EFormFieldStatus, EFontType> = {
    [EFormFieldStatus.DEFAULT]: EFontType.SECONDARY,
    [EFormFieldStatus.DISABLED]: EFontType.DISABLED,
    [EFormFieldStatus.ERROR]: EFontType.SECONDARY,
    [EFormFieldStatus.WARNING]: EFontType.SECONDARY,
};

const STATUS_TO_DESCRIPTION_FONT_TYPE_MAP: Record<EFormFieldStatus, EFontType> = {
    [EFormFieldStatus.DEFAULT]: EFontType.SECONDARY,
    [EFormFieldStatus.DISABLED]: EFontType.SECONDARY,
    [EFormFieldStatus.ERROR]: EFontType.ERROR,
    [EFormFieldStatus.WARNING]: EFontType.WARNING,
};

export const PlaygroundExample = ({
    status = EFormFieldStatus.DEFAULT,
    inputProps,
    placeholder,
    withPostfix,
    withDescription,
    ...restArgs
}: PlaygroundArgs) => {
    const [value, setValue] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);

    const handleInputChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>((event) => {
        setValue(event.target.value);
    }, []);

    const handleClearButtonClick = useCallback<React.MouseEventHandler<HTMLButtonElement>>(() => {
        setValue("");
        inputRef.current?.focus();
    }, []);

    const handleLinkClick = useCallback<React.MouseEventHandler<HTMLAnchorElement>>((event) => {
        event.preventDefault();
    }, []);

    return (
        <div style={{ maxWidth: 300 }}>
            <NumberField
                {...restArgs}
                status={status}
                inputProps={{
                    ...inputProps,
                    value,
                    placeholder,
                    onChange: handleInputChange,
                    ref: inputRef,
                }}
                postfix={
                    withPostfix && (
                        <>
                            <FormFieldClear aria-label="clear value" onClick={handleClearButtonClick} />
                            <Text size={ETextSize.B2} type={STATUS_TO_POSTFIX_FONT_TYPE_MAP[status]}>
                                мм
                            </Text>
                            <HelpBox tooltipSize={ETooltipSize.SM}>Helpful details appear here</HelpBox>
                        </>
                    )
                }
                description={
                    withDescription && (
                        <Text size={ETextSize.B4} type={STATUS_TO_DESCRIPTION_FONT_TYPE_MAP[status]}>
                            (21) Description{" "}
                            <Link href="#" onClick={handleLinkClick}>
                                Link text
                            </Link>
                        </Text>
                    )
                }
            />
        </div>
    );
};
