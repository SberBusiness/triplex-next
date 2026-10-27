import React, { useContext } from "react";
import { TooltipContext } from "../../../TootlipContext";
import { TooltipMobileCloseButton } from "./TooltipMobileCloseButton";
import { Text } from "../../../../Typography/Text";
import { EFontType, ETextSize } from "../../../../Typography/enums";
import { ITooltipMobileHeaderProps } from "../../../types";
import { PullerHeader } from "../../../../Puller/PullerHeader";

/**
 * Заголовок компонента TooltipMobile.
 * Кнопку закрытия подставляет сам, наследуя props переданного в Tooltip TooltipXButton.
 */
export const TooltipMobileHeader: React.FC<ITooltipMobileHeaderProps> = ({ children, ...rest }) => {
    const { elements } = useContext(TooltipContext);

    /** Кнопка закрытия мобильной версии подсказки. */
    const closeButton = <TooltipMobileCloseButton {...elements.closeButton?.props} />;

    return (
        <PullerHeader controlButtons={closeButton} {...rest}>
            <Text size={ETextSize.B3} type={EFontType.PRIMARY} tag="div">
                {children}
            </Text>
        </PullerHeader>
    );
};
