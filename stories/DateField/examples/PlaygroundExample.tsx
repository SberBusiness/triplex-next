import React, { useState, useRef, useCallback } from "react";
import {
    DateField,
    HelpBox,
    Text,
    Link,
    ETooltipSize,
    ETextSize,
    EFormFieldStatus,
    EFontType,
} from "@sberbusiness/triplex-next";
import type { PlaygroundArgs } from "../DateField.stories.tsx";

const STATUS_TO_DESCRIPTION_FONT_TYPE_MAP: Record<EFormFieldStatus, EFontType> = {
    [EFormFieldStatus.DEFAULT]: EFontType.SECONDARY,
    [EFormFieldStatus.DISABLED]: EFontType.SECONDARY,
    [EFormFieldStatus.ERROR]: EFontType.ERROR,
    [EFormFieldStatus.WARNING]: EFontType.WARNING,
};

export const PlaygroundExample = ({
    status = EFormFieldStatus.DEFAULT,
    withPostfix,
    withDescription,
    ...restArgs
}: PlaygroundArgs) => {
    const [value, setValue] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);

    const handleLinkClick = useCallback<React.MouseEventHandler<HTMLAnchorElement>>((event) => {
        event.preventDefault();
    }, []);

    const handleClear = useCallback<React.MouseEventHandler<HTMLButtonElement>>(() => {
        setValue("");
        inputRef.current?.focus();
    }, []);

    return (
        <div style={{ maxWidth: 300 }}>
            <DateField
                {...restArgs}
                value={value}
                status={status}
                onChange={setValue}
                onClear={withPostfix ? handleClear : undefined}
                targetProps={{
                    maskedInputProps: {
                        forwardedRef: inputRef,
                    },
                    postfix: withPostfix && (
                        <HelpBox tooltipSize={ETooltipSize.SM}>Helpful details appear here</HelpBox>
                    ),
                    description: withDescription && (
                        <Text size={ETextSize.B4} type={STATUS_TO_DESCRIPTION_FONT_TYPE_MAP[status]}>
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
