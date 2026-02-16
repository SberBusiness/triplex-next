import React from "react";
import { ButtonIcon, IButtonIconProps } from "@sberbusiness/triplex-next/components/Button/ButtonIcon";
import { CrossStrokeSrvIcon16 } from "@sberbusiness/icons-next";
import clsx from "clsx";
import styles from "../styles/DropdownMobile.module.less";

/** Свойства компонента DropdownMobileClose. */
export interface IDropdownMobileCloseProps extends Omit<IButtonIconProps, "children"> {
    children?: never;
}

/** Кнопка закрытия мобильной версии Dropdown. */
export const DropdownMobileClose = React.forwardRef<HTMLButtonElement, IDropdownMobileCloseProps>(
    ({ className, ...buttonIconProps }, ref) => (
        <ButtonIcon className={clsx(styles.dropdownMobileClose, className)} ref={ref} {...buttonIconProps}>
            <CrossStrokeSrvIcon16 paletteIndex={5} />
        </ButtonIcon>
    ),
);

DropdownMobileClose.displayName = "DropdownMobileClose";
