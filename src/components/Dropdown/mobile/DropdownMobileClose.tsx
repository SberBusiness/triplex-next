import React from "react";
import clsx from "clsx";
import { ButtonIcon, IButtonIconProps } from "@sberbusiness/triplex-next/components/Button/ButtonIcon";
import { CrossStrokeSrvIcon16 } from "@sberbusiness/icons-next";
import styles from "../styles/DropdownMobile.module.less";

/** Свойства компонента DropdownMobileClose. */
export interface IDropdownMobileCloseProps extends Omit<IButtonIconProps, "children"> {}

/** Кнопка закрытия мобильной версии Dropdown. */
export const DropdownMobileClose = React.forwardRef<HTMLButtonElement, IDropdownMobileCloseProps>(
    ({ className, ...restProps }, ref) => (
        <ButtonIcon className={clsx(styles.dropdownMobileClose, className)} {...restProps} ref={ref}>
            <CrossStrokeSrvIcon16 paletteIndex={5} />
        </ButtonIcon>
    ),
);

DropdownMobileClose.displayName = "DropdownMobileClose";
