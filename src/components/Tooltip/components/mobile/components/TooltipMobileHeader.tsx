import React, { useContext } from "react";
import {
    DropdownMobileHeader,
    IDropdownMobileHeaderProps,
} from "@sberbusiness/triplex-next/components/Dropdown/mobile/DropdownMobileHeader";
import { TooltipContext } from "@sberbusiness/triplex-next/components/Tooltip/TootlipContext";
import { TooltipMobileCloseButton } from "@sberbusiness/triplex-next/components/Tooltip/components/mobile/components/TooltipMobileCloseButton";
import { Text } from "@sberbusiness/triplex-next/components/Typography/Text";
import { EFontType, ETextSize } from "@sberbusiness/triplex-next/components/Typography/enums";

/** Свойства компонента TooltipMobileHeader. */
export interface ITooltipMobileHeaderProps extends Omit<IDropdownMobileHeaderProps, "closeButton"> {}

/** Заголовок компонента TooltipMobile. */
export const TooltipMobileHeader: React.FC<ITooltipMobileHeaderProps> = ({ children, ...rest }) => {
    const { elements } = useContext(TooltipContext);

    /** Рендер кнопки закрытия DropdownMobile. */
    const renderCloseButton = () => <TooltipMobileCloseButton {...elements.closeButton?.props} />;

    return (
        <DropdownMobileHeader closeButton={renderCloseButton} {...rest}>
            <Text size={ETextSize.B3} type={EFontType.PRIMARY} tag="div">
                {children}
            </Text>
        </DropdownMobileHeader>
    );
};
