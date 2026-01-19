import React, { useContext } from "react";
import {
    DropdownMobileClose,
    IDropdownMobileCloseProps,
} from "@sberbusiness/triplex-next/components/Dropdown/mobile/DropdownMobileClose";
import { TooltipContext } from "@sberbusiness/triplex-next/components/Tooltip/TootlipContext";

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

    return <DropdownMobileClose onClick={handleClick} {...rest} />;
};
