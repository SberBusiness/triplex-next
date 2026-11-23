import React from "react";
import clsx from "clsx";
import { FormFieldMaskedInput, IFormFieldMaskedInputProps } from "../FormField/components/FormFieldMaskedInput";
import styles from "./styles/PullerMaskedInput.module.less";

/** Свойства компонента PullerMaskedInput. */
export interface IPullerMaskedInputProps extends IFormFieldMaskedInputProps {}

const PullerMaskedInputBase = React.forwardRef<HTMLDivElement, IPullerMaskedInputProps>(
    ({ className, ...restProps }, ref) => (
        <FormFieldMaskedInput className={clsx(styles.pullerMaskedInput, className)} {...restProps} ref={ref} />
    ),
);

PullerMaskedInputBase.displayName = "PullerMaskedInput";

/** Маскированное поле ввода для шапки Puller. */
export const PullerMaskedInput = Object.assign(PullerMaskedInputBase, {
    presets: FormFieldMaskedInput.presets,
});
