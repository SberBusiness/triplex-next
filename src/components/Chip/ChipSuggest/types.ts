import { ISuggestProps, ISuggestOption } from "../../Suggest/types";
import { IChipProps } from "../Chip";
import { IDropdownProps } from "../../Dropdown";
import { FocusTrapProps } from "focus-trap-react";

/** Свойства компонента ChipSuggest. */
export interface IChipSuggestProps<T extends ISuggestOption = ISuggestOption>
    extends ISuggestProps<T>, Pick<IChipProps, "type"> {
    /** Название поля, когда не выбрано значение. */
    label: React.ReactNode;
    /** Лейбл, отображаемый вместо label выбранного значения. */
    displayedValue?: React.ReactNode;
    /** Свойства target-элемента (ChipSuggestTarget поверх Chip). Здесь же передаётся clearSelected. */
    targetProps?: IChipSuggestTargetProps<T>;
    /** Свойства выпадающего списка (ChipSuggestDropdown поверх Dropdown). targetRef проставляет ChipSuggest. */
    dropdownProps?: Omit<IChipSuggestDropdownProps<T>, "targetRef">;
}

/** Свойства компонента ChipSuggestTarget. */
// Параметр T не используется в теле интерфейса, но входит в публичную generic-сигнатуру
// ChipSuggestTarget: убрать его — breaking change для потребителей, явно указывающих тип опции.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export interface IChipSuggestTargetProps<T extends ISuggestOption> extends Omit<IChipProps, "prefix" | "postfix"> {
    /** Функция отмены выбора. Вызывается по клику на кнопку очистки. */
    clearSelected?: () => void;
}

/** Свойства компонента ChipSuggestDropdown. */
// Параметр T не используется в теле интерфейса, но входит в публичную generic-сигнатуру
// ChipSuggestDropdown: убрать его — breaking change для потребителей, явно указывающих тип опции.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export interface IChipSuggestDropdownProps<T extends ISuggestOption> extends Omit<
    IDropdownProps,
    "opened" | "setOpened"
> {
    /** Свойства FocusTrap. Используется npm-пакет focus-trap-react. */
    focusTrapProps?: FocusTrapProps;
}
