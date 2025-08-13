import React from 'react';
import {
    FormField,
    FormFieldDescription,
    FormFieldLabel,
    FormFieldInput,
    // FormFieldSidebar,
    FormFieldPostfix,
    FormFieldClear,
    IFormFieldInputProps,
    IFormFieldClearProps,
    IFormFieldProps,
} from '@sberbusiness/triplex-next/components/FormField/';
import {FormGroup, FormGroupLine} from '@sberbusiness/triplex-next/components/FormGroup/';
// import {HelpBox, IHelpBoxProps} from '@sberbusiness/triplex-next/components/HelpBox/HelpBox';

/** Свойства TextField. */
export interface ITextFieldProps extends IFormFieldProps {
    /** Описание поля ввода. */
    description: React.ReactNode;
    /** Свойства кнопки очищения значения. Если свойства не переданы, кнопка не отображается т.к. нет обработчика действия. */
    clearButtonProps?: IFormFieldClearProps;
    /** Свойства HelpBox. */
    // helpBoxProps?: IHelpBoxProps;
    /** Свойства поля ввода. */
    inputProps: IFormFieldInputProps & {ref?: React.RefObject<HTMLInputElement>};
    /** Лейбл поля ввода. */
    label?: React.ReactNode;
}

/** Компонент текстового ввода.
 *  Является более компактным вариантом отображения инпутов, чем FormGroup.
 * */
export const TextField: React.FC<ITextFieldProps> = ({clearButtonProps, description, inputProps, /* helpBoxProps, */ label, ...formFieldProps}) => {
    // const showSidebar = helpBoxProps;

    return (
        <FormGroup>
            <FormGroupLine flex>
                <FormField {...formFieldProps}>
                    <FormFieldInput {...inputProps} />

                    {label ? <FormFieldLabel>{label}</FormFieldLabel> : null}

                    <FormFieldPostfix>
                        {clearButtonProps ? <FormFieldClear {...clearButtonProps} /> : null}
                    </FormFieldPostfix>
                </FormField>

                {/* {showSidebar ? <FormFieldSidebar>{helpBoxProps ? <HelpBox {...helpBoxProps} /> : null}</FormFieldSidebar> : null} */}
            </FormGroupLine>

            {description ? (
                <FormGroupLine>
                    <FormFieldDescription>{description}</FormFieldDescription>
                </FormGroupLine>
            ) : null}
        </FormGroup>
    );
};

TextField.displayName = 'TextField';
