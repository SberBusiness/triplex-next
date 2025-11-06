import React from "react";
import {
    ISuggestFieldDropdownItemLabelProps,
    ISuggestFieldOption,
} from "@sberbusiness/triplex-next/components/SuggestField/types";

export function SuggestFieldDesktopDropdownItemLabel<T extends ISuggestFieldOption>({
    option,
}: ISuggestFieldDropdownItemLabelProps<T>): JSX.Element {
    return option.labelReactNode ? (option.labelReactNode as JSX.Element) : <span>{option.label}</span>;
}
