import React, { useState, useEffect, useCallback, useRef } from "react";
import { TooltipContext } from "./TootlipContext";
import { MobileView } from "../MobileView/MobileView";
import { TooltipDesktop } from "./components/desktop/TooltipDesktop";
import { TooltipMobile } from "./components/mobile/TooltipMobile";
import { TooltipBody } from "./components/common/TooltipBody";
import { TooltipLink } from "./components/common/TooltipLink";
import { TooltipTarget } from "./components/common/TooltipTarget";
import { TooltipXButton } from "./components/common/TooltipXButton";
import { TooltipMobileHeader } from "./components/mobile/components/TooltipMobileHeader";
import { ITooltipElements, ITooltipProps } from "./types";
import { useTooltipTheme } from "./utils/useTooltipTheme";
import { useMobileView } from "../MobileView";

/** Внутренние составляющие компонента Tooltip. */
interface ITooltipComposition {
    Target: typeof TooltipTarget;
    Body: typeof TooltipBody;
    Link: typeof TooltipLink;
    XButton: typeof TooltipXButton;
    MobileHeader: typeof TooltipMobileHeader;
}

/** Всплывающая подсказка. */
export const Tooltip: React.FC<ITooltipProps> & ITooltipComposition = ({
    children,
    toggleType,
    preferPlace,
    disableAdaptiveMode,
    isOpen: openProp,
    toggle,
    ...rest
}) => {
    const isMobileScreenWidth = useMobileView();
    const [openState, setOpenState] = useState(false);
    const targetHoveredRef = useRef(false);
    const open = openProp ?? openState;
    // renderContainer для mobile режима только document.body
    const isBodyOnlyRenderContainer = isMobileScreenWidth && !disableAdaptiveMode;
    useTooltipTheme(open, isBodyOnlyRenderContainer ? document.body : (rest.renderContainer ?? document.body));

    useEffect(() => {
        if (openProp === false) {
            targetHoveredRef.current = false;
        }
    }, [openProp]);

    /** Получить дочерние React-элементы. */
    const getChildrenElements = useCallback(() => {
        const elements: ITooltipElements = {
            body: null,
            link: null,
            closeButton: null,
            mobileHeader: null,
            target: null,
        };

        React.Children.map(children, (child) => {
            if (React.isValidElement<React.ReactElement>(child)) {
                if (child.type === TooltipTarget) {
                    elements.target = child as React.ReactElement;
                } else if (child.type === TooltipBody) {
                    elements.body = child as React.ReactElement;
                } else if (child.type === TooltipLink) {
                    elements.link = child as React.ReactElement;
                } else if (child.type === TooltipXButton) {
                    elements.closeButton = child as React.ReactElement;
                } else if (child.type === TooltipMobileHeader) {
                    elements.mobileHeader = child as React.ReactElement;
                }
            }
        });

        return elements;
    }, [children]);

    /** Обработчик изменения состояния компонента. */
    const handleOpen = (nextOpen: boolean) => {
        if (openProp === undefined) {
            if (!nextOpen) {
                targetHoveredRef.current = false;
            }
            setOpenState(nextOpen);
        }

        toggle?.(nextOpen);
    };

    /** Рендер десктоп версии компонента. */
    const renderDesktopTooltip = () => {
        return <TooltipDesktop isOpen={open} toggleType={toggleType} preferPlace={preferPlace} {...rest} />;
    };

    /** Рендер мобильной версии компонента. */
    const renderMobileTooltip = () => {
        return <TooltipMobile isOpen={open} {...rest} />;
    };

    return (
        <TooltipContext.Provider
            value={{
                elements: getChildrenElements(),
                setTooltipOpen: handleOpen,
                targetHoveredRef,
                toggleType,
                tooltipOpen: open,
            }}
        >
            {disableAdaptiveMode ? (
                renderDesktopTooltip()
            ) : (
                <MobileView fallback={renderDesktopTooltip()}>{renderMobileTooltip()}</MobileView>
            )}
        </TooltipContext.Provider>
    );
};

Tooltip.Target = TooltipTarget;
Tooltip.Body = TooltipBody;
Tooltip.Link = TooltipLink;
Tooltip.XButton = TooltipXButton;
Tooltip.MobileHeader = TooltipMobileHeader;
