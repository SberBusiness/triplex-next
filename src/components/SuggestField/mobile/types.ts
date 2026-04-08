import { ISuggestFieldOption, ISuggestFieldProps } from "../types";
import { IDropdownMobileProps } from "../../Dropdown";

/** Свойства компонента SuggestFieldMobile. */
export interface ISuggestFieldMobileProps<
    T extends ISuggestFieldOption = ISuggestFieldOption,
> extends ISuggestFieldProps<T> {}

/** Свойства компонента SuggestFieldMobileDropdown. */
export interface ISuggestFieldMobileDropdownProps<T extends ISuggestFieldOption = ISuggestFieldOption>
    extends
        Omit<IDropdownMobileProps, "onSelect">,
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
    children?: React.ReactNode;
}
