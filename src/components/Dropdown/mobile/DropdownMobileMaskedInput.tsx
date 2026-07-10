import React from "react";
import clsx from "clsx";
import { FormFieldMaskedInput, IFormFieldMaskedInputProps } from "../../FormField/components/FormFieldMaskedInput";
import styles from "../styles/DropdownMobileMaskedInput.module.less";

/** Свойства компонента DropdownMobileMaskedInput. */
export interface IDropdownMobileMaskedInputProps extends IFormFieldMaskedInputProps {}

const DropdownMobileMaskedInputBase = React.forwardRef<HTMLDivElement, IDropdownMobileMaskedInputProps>(
    ({ className, ...restProps }, ref) => (
        <FormFieldMaskedInput className={clsx(styles.dropdownMobileMaskedInput, className)} {...restProps} ref={ref} />
    ),
);

DropdownMobileMaskedInputBase.displayName = "DropdownMobileMaskedInput";

/** Маскированное поле ввода мобильной версии Dropdown. */
export const DropdownMobileMaskedInput = Object.assign(DropdownMobileMaskedInputBase, {
    presets: FormFieldMaskedInput.presets,
});
