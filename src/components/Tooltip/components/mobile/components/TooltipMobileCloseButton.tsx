import React, { useContext } from "react";
import { TooltipContext } from "../../../TootlipContext";
import { PullerClose, IPullerCloseProps } from "../../../../Puller/PullerClose";

/** Свойства компонента TooltipMobileCloseButton. */
export interface ITooltipMobileCloseButton extends IPullerCloseProps {}

/** Кнопка закрытия TooltipMobile. */
export const TooltipMobileCloseButton: React.FC<ITooltipMobileCloseButton> = ({ onClick, ...rest }) => {
    const { setTooltipOpen } = useContext(TooltipContext);

    /** Обработчик клика. */
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setTooltipOpen(false);
        onClick?.(event);
    };

    return <PullerClose onClick={handleClick} {...rest} />;
};
