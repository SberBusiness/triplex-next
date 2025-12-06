import React from "react";
import clsx from "clsx";
import {
    FormFieldMaskedInput,
    IFormFieldMaskedInputProps,
    IFormFieldIMaskedInputFC,
} from "../../FormField/components/FormFieldMaskedInput";
import styles from "../styles/DropdownMobileMaskedInput.module.less";

/** Свойства компонента DropdownMobileMaskedInput. */
export interface IDropdownMobileMaskedInputProps extends IFormFieldMaskedInputProps {}

/** Сущность компонента DropdownMobileMaskedInput.  */
export interface IDropdownMobileMaskedInputFC extends IFormFieldIMaskedInputFC {}

/** Маскированное поле ввода мобильной версии Dropdown. */
export const DropdownMobileMaskedInput: IDropdownMobileMaskedInputFC = ({ className, ...rest }) => (
    <FormFieldMaskedInput className={clsx(styles.dropdownMobileMaskedInput, className)} {...rest} />
);

DropdownMobileMaskedInput.presets = FormFieldMaskedInput.presets;
