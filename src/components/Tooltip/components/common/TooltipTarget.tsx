import React, { useContext } from "react";
import { TooltipContext } from "@sberbusiness/triplex-next/components/Tooltip/TootlipContext";
import { isKey } from "@sberbusiness/triplex-next/utils/keyboard";
import { ITooltipTargetProps } from "@sberbusiness/triplex-next/components/Tooltip/types";

/** Целевой элемент компонента Tooltip. */
export const TooltipTarget: React.FC<ITooltipTargetProps> = ({ children }) => {
    const { toggleType, tooltipOpen, targetHoveredRef, setTooltipOpen } = useContext(TooltipContext);
    const child = React.Children.only(children);

    /** Обработчик нажатия клавиши. */
    const handleKeyDown = (onKeyDown?: React.KeyboardEventHandler) => (event: React.KeyboardEvent) => {
        const key = event.code || event.keyCode;

        if (isKey(key, "TAB")) {
            if (tooltipOpen) {
                setTooltipOpen(false);
            }
        }
        onKeyDown?.(event);
    };

    /** Обработчик клика. */
    const handleClick = (onClick?: React.MouseEventHandler) => (event: React.MouseEvent) => {
        if (
            toggleType === "click" ||
            (toggleType === "hover" && !targetHoveredRef.current && event.currentTarget.contains(event.target as Node))
        ) {
            setTooltipOpen(!tooltipOpen);
        }
        onClick?.(event);
    };

    if (React.isValidElement<React.HTMLAttributes<Element>>(child)) {
        return React.cloneElement(child, {
            onClick: handleClick(child.props.onClick),
            onKeyDown: handleKeyDown(child.props.onKeyDown),
        });
    }

    return child;
};
