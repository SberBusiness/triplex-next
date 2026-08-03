import React, { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { TooltipContext } from "./TootlipContext";
import { MobileView } from "../MobileView/MobileView";
import { TooltipDesktop } from "./components/desktop/TooltipDesktop";
import { TooltipMobile } from "./components/mobile/TooltipMobile";
import { TooltipBody } from "./components/common/TooltipBody";
import { TooltipLink } from "./components/common/TooltipLink";
import { TooltipTarget } from "./components/common/TooltipTarget";
import { TooltipXButton } from "./components/common/TooltipXButton";
import { TooltipMobileHeader } from "./components/mobile/components/TooltipMobileHeader";
import {
    ITooltipBodyProps,
    ITooltipElements,
    ITooltipLinkProps,
    ITooltipMobileHeaderProps,
    ITooltipProps,
    ITooltipTargetProps,
    ITooltipXButtonProps,
} from "./types";
import { useTooltipTheme } from "./utils/useTooltipTheme";
import { useMobileView } from "../MobileView";

/** Внутренние составляющие компонента Tooltip. */
interface ITooltipComposition {
    /** Целевой элемент, к которому привязана подсказка. */
    Target: typeof TooltipTarget;
    /** Содержимое подсказки. */
    Body: typeof TooltipBody;
    /** Гиперссылка внутри подсказки. */
    Link: typeof TooltipLink;
    /** Кнопка закрытия подсказки. */
    XButton: typeof TooltipXButton;
    /** Заголовок мобильной (адаптивной) версии подсказки. */
    MobileHeader: typeof TooltipMobileHeader;
}

/**
 * Разбирает children на именованные слоты Tooltip.
 * Узлы, не являющиеся субкомпонентами Tooltip, игнорируются.
 */
const collectTooltipElements = (children: React.ReactNode): ITooltipElements => {
    const elements: ITooltipElements = {
        body: null,
        link: null,
        closeButton: null,
        mobileHeader: null,
        target: null,
    };

    React.Children.forEach(children, (child) => {
        if (React.isValidElement<ITooltipTargetProps>(child) && child.type === TooltipTarget) {
            elements.target = child;
        } else if (React.isValidElement<ITooltipBodyProps>(child) && child.type === TooltipBody) {
            elements.body = child;
        } else if (React.isValidElement<ITooltipLinkProps>(child) && child.type === TooltipLink) {
            elements.link = child;
        } else if (React.isValidElement<ITooltipXButtonProps>(child) && child.type === TooltipXButton) {
            elements.closeButton = child;
        } else if (React.isValidElement<ITooltipMobileHeaderProps>(child) && child.type === TooltipMobileHeader) {
            elements.mobileHeader = child;
        }
    });

    return elements;
};

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
    const themeContainer = isBodyOnlyRenderContainer ? document.body : (rest.renderContainer ?? document.body);

    useTooltipTheme(open, themeContainer);

    useEffect(() => {
        if (openProp === false) {
            targetHoveredRef.current = false;
        }
    }, [openProp]);

    const elements = useMemo(() => collectTooltipElements(children), [children]);

    /** Обработчик изменения состояния компонента. */
    const handleOpen = useCallback(
        (nextOpen: boolean) => {
            if (openProp === undefined) {
                if (!nextOpen) {
                    targetHoveredRef.current = false;
                }
                setOpenState(nextOpen);
            }

            toggle?.(nextOpen);
        },
        [openProp, toggle],
    );

    const contextValue = useMemo(
        () => ({
            elements,
            setTooltipOpen: handleOpen,
            targetHoveredRef,
            toggleType,
            tooltipOpen: open,
        }),
        [elements, handleOpen, toggleType, open],
    );

    /** Рендер десктоп версии компонента. */
    const renderDesktopTooltip = () => (
        <TooltipDesktop isOpen={open} toggleType={toggleType} preferPlace={preferPlace} {...rest} />
    );

    /** Рендер мобильной версии компонента. */
    const renderMobileTooltip = () => <TooltipMobile isOpen={open} {...rest} />;

    return (
        <TooltipContext.Provider value={contextValue}>
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
