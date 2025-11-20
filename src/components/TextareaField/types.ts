import { ITextFieldBaseProps } from "@sberbusiness/triplex-next/components/TextField/TextFieldBase";
import { IFormFieldTextareaProps } from "../FormField";

/** Свойства компонента TextareaField. */
export interface ITextareaFieldProps extends Omit<ITextFieldBaseProps, "children"> {
    /** Свойства компонента FormFieldTextarea. */
    textareaProps: IFormFieldTextareaProps & React.RefAttributes<HTMLTextAreaElement>;
}
