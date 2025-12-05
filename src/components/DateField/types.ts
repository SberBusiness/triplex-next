import { IDatePickerExtendedProps } from "../DatePickerExtended/DatePickerExtended";
import { IMaskedFieldProps } from "../TextField";
import { DeepPartial } from "../../types/CoreTypes";

/** Свойства компонента DateField. */
export interface IDateFieldProps
    extends Omit<
            IDatePickerExtendedProps,
            "pickedDate" | "onDateChange" | "renderTarget" | "renderDropdownHeaderTarget"
        >,
        Pick<IMaskedFieldProps, "size" | "status" | "label"> {
    /** Значение даты. */
    value: string;
    /** Символы для заполнения пустых редактируемых позиций в маске (например, строка вида "дд.мм.гггг"). */
    placeholderMask?: string;
    /** Текст подсказки в тултипе. */
    invalidDateHint: React.ReactNode;
    /** Функция, вызывающаяся при изменении значения. */
    onChange: (value: string) => void;
    /** Свойства MaskedField. */
    targetProps?: DeepPartial<IMaskedFieldProps>;
}
