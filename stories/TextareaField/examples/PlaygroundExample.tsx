import React, { useState, useRef, useCallback, useMemo } from "react";
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
import type { PlaygroundArgs } from "../TextareaField.stories";

const STATUS_TO_DESCRIPTION_FONT_TYPE_MAP: Record<EFormFieldStatus, EFontType> = {
    [EFormFieldStatus.DEFAULT]: EFontType.SECONDARY,
    [EFormFieldStatus.DISABLED]: EFontType.SECONDARY,
    [EFormFieldStatus.ERROR]: EFontType.ERROR,
    [EFormFieldStatus.WARNING]: EFontType.WARNING,
};

const SIZE_TO_POSTFIX_MARGIN_TOP_MAP: Record<EComponentSize, number> = {
    [EComponentSize.SM]: -13, // 6px from top
    [EComponentSize.MD]: -8, // 12px from top
    [EComponentSize.LG]: -4, // 20px from top
};

const getPostfixStyles = (size: EComponentSize): React.CSSProperties => ({
    alignSelf: "flex-start",
    marginTop: SIZE_TO_POSTFIX_MARGIN_TOP_MAP[size],
    display: "flex",
    alignItems: "center",
    gap: 8,
});

export const PlaygroundExample = ({
    size = EComponentSize.LG,
    status = EFormFieldStatus.DEFAULT,
    placeholder,
    maxLength,
    textareaProps,
    withPostfix,
    withDescription,
    withCounter,
    ...restArgs
}: PlaygroundArgs) => {
    const [value, setValue] = useState("");
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const handleTextareaChange = useCallback<React.ChangeEventHandler<HTMLTextAreaElement>>((event) => {
        setValue(event.target.value);
    }, []);

    const handleClearButtonClick = useCallback<React.MouseEventHandler<HTMLButtonElement>>(() => {
        setValue("");
        textareaRef.current?.focus();
    }, []);

    const handleLinkClick = useCallback<React.MouseEventHandler<HTMLAnchorElement>>((event) => {
        event.preventDefault();
    }, []);

    const postfixStyles = useMemo(() => {
        if (withPostfix) {
            return getPostfixStyles(size);
        }
    }, [withPostfix, size]);

    return (
        <div style={{ maxWidth: 300 }}>
            <TextareaField
                {...restArgs}
                size={size}
                status={status}
                textareaProps={{
                    ...textareaProps,
                    value,
                    placeholder,
                    maxLength,
                    onChange: handleTextareaChange,
                    ref: textareaRef,
                }}
                postfix={
                    withPostfix && (
                        <div style={postfixStyles}>
                            <FormFieldClear aria-label="clear value" onClick={handleClearButtonClick} />
                            <HelpBox tooltipSize={ETooltipSize.SM}>Helpful details appear here</HelpBox>
                        </div>
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
                counter={
                    withCounter && (
                        <Text size={ETextSize.B4} type={EFontType.SECONDARY}>
                            {value.length}/{maxLength}
                        </Text>
                    )
                }
            />
        </div>
    );
};
