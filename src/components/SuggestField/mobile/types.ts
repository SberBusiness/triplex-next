import React from "react";
import { ISuggestFieldOption, ISuggestFieldProps } from "../types";
import { IPullerProps } from "../../Puller";

/** Свойства компонента SuggestFieldMobile. */
export interface ISuggestFieldMobileProps<
    T extends ISuggestFieldOption = ISuggestFieldOption,
> extends ISuggestFieldProps<T> {}

/** Свойства компонента SuggestFieldMobileDropdown. */
export interface ISuggestFieldMobileDropdownProps<T extends ISuggestFieldOption = ISuggestFieldOption>
    extends
        Omit<IPullerProps, "onSelect">,
        Pick<
            ISuggestFieldMobileProps<T>,
            | "value"
            | "options"
            | "placeholder"
            | "tooltipHint"
            | "tooltipOpen"
            | "loading"
            | "dropdownListLoading"
            | "clearInputOnFocus"
            | "onFilter"
            | "onSelect"
            | "onScrollEnd"
        > {}

/** Свойства компонента SuggestFieldMobileDropdownHint. */
export interface ISuggestFieldMobileDropdownHintProps {
    /** Текст подсказки. */
    children?: React.ReactNode;
}
