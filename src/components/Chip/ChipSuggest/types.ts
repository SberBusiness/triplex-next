/* eslint-disable @typescript-eslint/no-unused-vars */
import { ISuggestProps, ISuggestOption } from "../../Suggest/types";
import { IChipProps } from "../Chip";
import { IDropdownProps } from "../../Dropdown";
import { FocusTrapProps } from "focus-trap-react";

/** Свойства компонента ChipSuggest. */
export interface IChipSuggestProps<T extends ISuggestOption = ISuggestOption>
    extends Omit<ISuggestProps<T>, "renderTarget"> {
    /** Название поля, когда не выбрано значение. */
    label: React.ReactNode;
    /** Лейбл, отображаемый вместо выбранного значения. */
    displayedValue?: React.ReactNode;
    /** Свойства компонента Chip. */
    targetProps?: IChipSuggestTargetProps<T>;
    /** Свойства компонента Dropdown. */
    dropdownProps?: IChipSuggestDropdownProps<T>;
}

/** Свойства компонента ChipSuggestTarget. */
export interface IChipSuggestTargetProps<T extends ISuggestOption> extends Omit<IChipProps, "prefix" | "postfix"> {
    /** Функция отмены выбора. */
    clearSelected?: () => void;
}

/** Свойства компонента ChipSuggestDropdown. */
export interface IChipSuggestDropdownProps<T extends ISuggestOption>
    extends Omit<IDropdownProps, "opened" | "setOpened"> {
    /** Свойства FocusTrap. Используется npm-пакет focus-trap-react. */
    focusTrapProps?: FocusTrapProps;
}
