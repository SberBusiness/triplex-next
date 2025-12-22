import React, { useContext } from "react";
import { DropdownMobileHeader } from "@sberbusiness/triplex-next/components/Dropdown/mobile/DropdownMobileHeader";
import { TooltipContext } from "@sberbusiness/triplex-next/components/Tooltip/TootlipContext";
import { TooltipMobileCloseButton } from "@sberbusiness/triplex-next/components/Tooltip/components/mobile/components/TooltipMobileCloseButton";
import { Text } from "@sberbusiness/triplex-next/components/Typography/Text";
import { EFontType, ETextSize } from "@sberbusiness/triplex-next/components/Typography/enums";
import { ITooltipMobileHeaderProps } from "@sberbusiness/triplex-next/components/Tooltip/types";

/** Заголовок компонента TooltipMobile. */
export const TooltipMobileHeader: React.FC<ITooltipMobileHeaderProps> = ({ children, ...rest }) => {
    const { elements } = useContext(TooltipContext);

    /** Рендер кнопки закрытия DropdownMobile. */
    const renderCloseButton = <TooltipMobileCloseButton {...elements.closeButton?.props} />;

    return (
        <DropdownMobileHeader controlButtons={renderCloseButton} {...rest}>
            <Text size={ETextSize.B3} type={EFontType.PRIMARY} tag="div">
                {children}
            </Text>
        </DropdownMobileHeader>
    );
};
