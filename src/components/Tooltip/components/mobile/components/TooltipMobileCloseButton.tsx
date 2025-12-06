import React, { useContext } from "react";
import {
    DropdownMobileClose,
    IDropdownMobileCloseProps,
} from "@sberbusiness/triplex-next/components/Dropdown/mobile/DropdownMobileClose";
import { TooltipContext } from "@sberbusiness/triplex-next/components/Tooltip/TootlipContext";
import styles from "@sberbusiness/triplex-next/components/Tooltip/styles/TooltipMobile.module.less";

/** Свойства компонента TooltipMobileCloseButton. */
export interface ITooltipMobileCloseButton extends IDropdownMobileCloseProps {}

/** Кнопка закрытия TooltipMobile. */
export const TooltipMobileCloseButton: React.FC<ITooltipMobileCloseButton> = ({ onClick, ...rest }) => {
    const { setTooltipOpen } = useContext(TooltipContext);

    /** Обработчик клика. */
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setTooltipOpen(false);
        onClick?.(event);
    };

    return <DropdownMobileClose className={styles.tooltipXButton} onClick={handleClick} {...rest} />;
};
