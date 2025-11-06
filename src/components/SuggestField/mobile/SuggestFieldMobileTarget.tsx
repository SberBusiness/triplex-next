import React, { useCallback } from "react";
import { ISuggestFieldMobileTargetProps } from "@sberbusiness/triplex-next/components/SuggestField/mobile/types";
import { ISuggestFieldInputProvideProps } from "@sberbusiness/triplex-next/components/SuggestField/types";
import { SuggestFieldTarget } from "@sberbusiness/triplex-next/components/SuggestField/SuggestFieldTarget";

/** Целевой элемент компонента SuggestFieldMobile. */
export const SuggestFieldMobileTarget = React.forwardRef<HTMLInputElement, ISuggestFieldMobileTargetProps>(
    ({ inputValue, placeholder, renderInput, ...restProps }, ref) => {
        const renderInputCallback = useCallback(
            (props: ISuggestFieldInputProvideProps) => {
                const Input = renderInput === undefined ? SuggestFieldTarget.Input : renderInput;

                return <Input {...props} readOnly />;
            },
            [renderInput],
        );

        return (
            <SuggestFieldTarget
                inputValue={inputValue}
                placeholder={placeholder}
                renderInput={renderInputCallback}
                {...restProps}
                ref={ref}
            />
        );
    },
);

SuggestFieldMobileTarget.displayName = "SuggestFieldMobileTarget";
