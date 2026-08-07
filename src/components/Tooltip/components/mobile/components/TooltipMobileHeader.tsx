import React, { useContext } from "react";
import { DropdownMobileHeader } from "@sberbusiness/triplex-next/components/Dropdown/mobile/DropdownMobileHeader";
import { TooltipContext } from "@sberbusiness/triplex-next/components/Tooltip/TootlipContext";
import { TooltipMobileCloseButton } from "@sberbusiness/triplex-next/components/Tooltip/components/mobile/components/TooltipMobileCloseButton";
import { Text } from "@sberbusiness/triplex-next/components/Typography/Text";
import { EFontType, ETextSize } from "@sberbusiness/triplex-next/components/Typography/enums";
import { ITooltipMobileHeaderProps } from "@sberbusiness/triplex-next/components/Tooltip/types";

/**
 * Заголовок компонента TooltipMobile.
 * Кнопку закрытия подставляет сам, наследуя props переданного в Tooltip TooltipXButton.
 */
export const TooltipMobileHeader: React.FC<ITooltipMobileHeaderProps> = ({ children, ...rest }) => {
    const { elements } = useContext(TooltipContext);

    /** Кнопка закрытия мобильной версии подсказки. */
    const closeButton = <TooltipMobileCloseButton {...elements.closeButton?.props} />;

    return (
        <DropdownMobileHeader controlButtons={closeButton} {...rest}>
            <Text size={ETextSize.B3} type={EFontType.PRIMARY} tag="div">
                {children}
            </Text>
        </DropdownMobileHeader>
    );
};
