import React from "react";
import clsx from "clsx";
import { MaskedInput, IMaskedInputProps } from "../../MaskedInput";
import styles from "../styles/DropdownMobileMaskedInput.module.less";

/** Маскированное поле ввода мобильной версии Dropdown. */
export const DropdownMobileMaskedInput = Object.assign(
    React.forwardRef<HTMLInputElement, IMaskedInputProps>(({ className, ...restProps }, ref) => (
        <MaskedInput className={clsx(/*styles.dropdownMobileMaskedInput,*/ className)} {...restProps} ref={ref} />
    )),
    { presets: MaskedInput.presets },
);
