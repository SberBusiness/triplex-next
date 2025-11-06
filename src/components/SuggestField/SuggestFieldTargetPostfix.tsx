import React from "react";
import { ISuggestFieldTargetPostfixProps } from "@sberbusiness/triplex-next/components/SuggestField/types";
import { FormFieldPostfix, FormFieldClear } from "@sberbusiness/triplex-next/components/FormField";
import { LoaderSmall, ELoaderSmallTheme } from "@sberbusiness/triplex-next/components/Loader";

/** Постфикс компонента SuggestFieldTarget. */
export const SuggestFieldTargetPostfix = React.forwardRef<HTMLDivElement, ISuggestFieldTargetPostfixProps>(
    ({ children, size, loading, onClear, ...restProps }, ref) => (
        <FormFieldPostfix {...restProps} ref={ref}>
            <FormFieldClear onClick={onClear} />
            {loading && <LoaderSmall theme={ELoaderSmallTheme.BRAND} size={size} />}
            {children}
        </FormFieldPostfix>
    ),
);

SuggestFieldTargetPostfix.displayName = "SuggestFieldTargetPostfix";
