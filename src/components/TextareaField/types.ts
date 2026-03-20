import { ITextFieldBaseProps } from "../../components/TextField/TextFieldBase";
import { IFormFieldTextareaProps } from "../FormField";
import { DataAttributes } from "../../types/CoreTypes";

/** Свойства компонента TextareaField. */
export interface ITextareaFieldProps extends Omit<ITextFieldBaseProps, "children"> {
    /** Свойства компонента FormFieldTextarea. */
    textareaProps: IFormFieldTextareaProps & DataAttributes & React.RefAttributes<HTMLTextAreaElement>;
}
