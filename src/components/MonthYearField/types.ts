import { IDatePickerExtendedProps } from "../DatePickerExtended/DatePickerExtended";
import { ITextFieldProps } from "../TextField/TextField";

/** Свойства компонента MonthYearField. */
export interface IMonthYearFieldProps
    extends Omit<
            IDatePickerExtendedProps,
            "pickedDate" | "onDateChange" | "renderTarget" | "renderDropdownHeaderTarget"
        >,
        Pick<ITextFieldProps, "size" | "status" | "label"> {
    /** Значение даты. */
    value: string;
    /** Текст подсказки. */
    placeholder?: string;
    /** Функция, вызывающаяся при изменении значения. */
    onChange: (value: string) => void;
    /** Свойства TextField. */
    targetProps?: ITextFieldProps;
}
