import React, { useState, useRef, useId } from "react";
import { FocusTrap, FocusTrapProps } from "focus-trap-react";
import { ISingleColorIconProps, QuestioncircleFilledSrvIcon16 } from "@sberbusiness/icons-next";
import { ButtonIcon } from "../Button/ButtonIcon";
import { EButtonIconShape } from "../Button/enums";
import { Tooltip } from "../Tooltip/Tooltip";
import { ITooltipProps } from "../Tooltip/types";
import { ETooltipSize } from "../Tooltip/enums";
import { TooltipMobileHeader } from "../Tooltip/components/mobile/components/TooltipMobileHeader";
import { MobileView } from "../MobileView/MobileView";
import { getDataHTMLAttributes, TDataHTMLAttributes } from "../../utils/html/DataAttributes";
import { getAriaHTMLAttributes, TAriaHTMLAttributes } from "../../utils/html/AriaAttributes";
import styles from "./styles/HelpBox.module.less";
import clsx from "clsx";

/** Свойства компонента HelpBox. */
export interface IHelpBoxProps
    extends React.HTMLAttributes<HTMLButtonElement>,
        Pick<ITooltipProps, "isOpen" | "preferPlace" | "onShow" | "toggle"> {
    /** Свойства FocusTrap. Используется npm-пакет focus-trap-react. */
    focusTrapProps?: FocusTrapProps;
    /** Aria-атрибуты Tooltip. */
    tooltipAriaAttributes?: TAriaHTMLAttributes;
    /** Data-атрибуты Tooltip. */
    tooltipDataAttributes?: TDataHTMLAttributes;
    /** Размер Tooltip. */
    tooltipSize: ETooltipSize;
    /** Контент заголовка TooltipMobile. */
    mobileHeaderContent?: React.ReactNode;
    /** Свойства иконки. */
    iconProps?: ISingleColorIconProps;
}

/** Иконка "?" со всплывающей подсказкой выбранного размера. */
export const HelpBox: React.FC<IHelpBoxProps> = ({
    children,
    className,
    focusTrapProps,
    mobileHeaderContent,
    isOpen: openProp,
    onShow,
    tooltipSize,
    preferPlace,
    toggle,
    tooltipAriaAttributes,
    tooltipDataAttributes,
    iconProps,
    ...targetHtmlAttrs
}) => {
    const ref = useRef<HTMLButtonElement>(null);
    const [openState, setOpenState] = useState(Boolean(openProp));
    const [focusTrapNode, setFocusTrapNode] = useState<HTMLDivElement | null>(null);
    const tooltipId = useId();
    const open = openProp ?? openState;

    /** Обработчик закрытия/открытия Tooltip. */
    const handleTooltipToggle = (open: boolean) => {
        if (openProp === undefined) {
            setOpenState(open);
        }

        if (!open) {
            setFocusTrapNode(null);
        }

        toggle?.(open);
    };

    /** Обработчик появления Tooltip. */
    const handleTooltipShow = (node: HTMLDivElement) => {
        setFocusTrapNode(node);
        onShow?.(node);
    };

    /** Рендер ловушки фокуса. */
    const renderFocusTrap = (node: HTMLDivElement) => (
        <MobileView
            fallback={
                <FocusTrap
                    active={open}
                    {...focusTrapProps}
                    focusTrapOptions={{
                        clickOutsideDeactivates: true,
                        initialFocus: `[id='${tooltipId}']`,
                        preventScroll: true,
                        ...focusTrapProps?.focusTrapOptions,
                    }}
                    containerElements={[node]}
                />
            }
        >
            {null}
        </MobileView>
    );

    return (
        <>
            <Tooltip
                id={tooltipId}
                tabIndex={-1}
                role="dialog"
                toggleType="hover"
                size={tooltipSize}
                preferPlace={preferPlace}
                isOpen={open}
                toggle={handleTooltipToggle}
                onShow={handleTooltipShow}
                targetRef={ref}
                {...(Boolean(tooltipAriaAttributes) && getAriaHTMLAttributes(tooltipAriaAttributes!))}
                {...(Boolean(tooltipDataAttributes) && getDataHTMLAttributes(tooltipDataAttributes!))}
            >
                <Tooltip.Target>
                    <ButtonIcon
                        className={clsx(styles.helpBoxButton, className)}
                        aria-label="Подсказка"
                        shape={EButtonIconShape.CIRCLE}
                        ref={ref}
                        {...targetHtmlAttrs}
                    >
                        <QuestioncircleFilledSrvIcon16 paletteIndex={5} {...iconProps} />
                    </ButtonIcon>
                </Tooltip.Target>
                {mobileHeaderContent && <TooltipMobileHeader>{mobileHeaderContent}</TooltipMobileHeader>}
                <Tooltip.Body>{children}</Tooltip.Body>
                <Tooltip.XButton aria-label="Закрыть" />
            </Tooltip>
            {open && focusTrapNode && renderFocusTrap(focusTrapNode)}
        </>
    );
};

HelpBox.displayName = "HelpBox";
