import { IDatePickerExtendedProps } from "../DatePickerExtended/DatePickerExtended";
import { IMaskedFieldProps } from "../MaskedField";
import { DeepPartial } from "../../types/CoreTypes";

/** Свойства компонента DateField. */
export interface IDateFieldProps
    extends
        Omit<IDatePickerExtendedProps, "pickedDate" | "onDateChange" | "renderTarget" | "renderDropdownHeaderTarget">,
        Pick<IMaskedFieldProps, "size" | "status" | "label"> {
    /** Значение даты в формате `format`. Пустая строка — значение не выбрано. */
    value: string;
    /** Символы для заполнения пустых редактируемых позиций в маске (например, строка вида "дд.мм.гггг"). */
    placeholderMask?: string;
    /** Текст подсказки в тултипе. Показывается, когда в поле введена полная, но недоступная для выбора дата. */
    invalidDateHint: React.ReactNode;
    /** Функция, вызывающаяся при изменении значения. Аргумент — дата в формате `format` либо пустая строка при очистке. */
    onChange: (value: string) => void;
    /** Обработчик очищения значения. Кнопка очистки рендерится, только если обработчик передан. */
    onClear?: React.MouseEventHandler<HTMLButtonElement>;
    /** Свойства MaskedField — управляющего элемента поля. */
    targetProps?: DeepPartial<IMaskedFieldProps>;
}

/** Свойства компонента DateFieldTarget. */
export interface IDateFieldTargetProps extends IMaskedFieldProps, Pick<IDateFieldProps, "onClear"> {}
