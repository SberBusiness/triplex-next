import {
    ISuggestFieldOption,
    ISuggestFieldProps,
    ISuggestFieldTargetProps,
} from "@sberbusiness/triplex-next/components/SuggestField/types";
import { IDropdownMobileProps } from "@sberbusiness/triplex-next/components/Dropdown";

/** Свойства компонента SuggestFieldMobile. */
export interface ISuggestFieldMobileProps<T extends ISuggestFieldOption = ISuggestFieldOption>
    extends Omit<ISuggestFieldProps<T>, "tooltipHint" | "tooltipOpen"> {
    /** Текст подсказки. Например - "Ничего не найдено" или "Введите более 3 символов". Подсказка отображается на месте списка выбора. */
    dropdownHint: string;
}

/** Свойства компонента SuggestFieldMobileDropdown. */
export interface ISuggestFieldMobileDropdownProps<T extends ISuggestFieldOption = ISuggestFieldOption>
    extends Omit<IDropdownMobileProps, "onSelect">,
        Pick<
            ISuggestFieldMobileProps<T>,
            | "value"
            | "options"
            | "placeholder"
            | "dropdownHint"
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

/** Свойства компонента SuggestFieldMobileTarget. */
export interface ISuggestFieldMobileTargetProps extends ISuggestFieldTargetProps {}
