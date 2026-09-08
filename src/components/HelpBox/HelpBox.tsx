import React, { useCallback, useRef, useState } from "react";
import clsx from "clsx";
import { uniqueId } from "lodash-es";
import { FocusTrap, FocusTrapProps } from "focus-trap-react";
import { ISingleColorIconProps, QuestioncircleFilledSrvIcon16 } from "@sberbusiness/icons-next";
import { ButtonIcon } from "../Button/ButtonIcon";
import { EButtonIconShape } from "../Button/enums";
import { Tooltip } from "../Tooltip/Tooltip";
import { ITooltipProps, ITooltipXButtonProps } from "../Tooltip/types";
import { ETooltipSize } from "../Tooltip/enums";
import { MobileView } from "../MobileView/MobileView";
import { getDataHTMLAttributes, TDataHTMLAttributes } from "../../utils/html/DataAttributes";
import { getAriaHTMLAttributes, TAriaHTMLAttributes } from "../../utils/html/AriaAttributes";
import styles from "./styles/HelpBox.module.less";

/** Индекс палитры иконки "?" по умолчанию. Переопределяется через iconProps. */
const DEFAULT_ICON_PALETTE_INDEX = 5;
/** Префикс идентификатора Tooltip. */
const TOOLTIP_ID_PREFIX = "HelpBox-";

/** Свойства компонента HelpBox. */
export interface IHelpBoxProps
    extends
        React.HTMLAttributes<HTMLButtonElement>,
        Pick<ITooltipProps, "isOpen" | "preferPlace" | "onShow" | "toggle"> {
    /** Свойства FocusTrap. Используется npm-пакет focus-trap-react. */
    focusTrapProps?: FocusTrapProps;
    /** Aria-атрибуты Tooltip. */
    tooltipAriaAttributes?: TAriaHTMLAttributes;
    /** Data-атрибуты Tooltip. */
    tooltipDataAttributes?: TDataHTMLAttributes;
    /** Размер Tooltip. */
    tooltipSize: ETooltipSize;
    /** Контент заголовка TooltipMobile. Отображается только в мобильной версии. */
    mobileHeaderContent?: React.ReactNode;
    /** Свойства иконки. По умолчанию paletteIndex равен 5. */
    iconProps?: ISingleColorIconProps;
    /** Свойства кнопки закрытия Tooltip. */
    tooltipXButtonProps?: ITooltipXButtonProps;
}

/** Иконка "?" со всплывающей подсказкой выбранного размера. */
export const HelpBox = React.forwardRef<HTMLButtonElement, IHelpBoxProps>(
    (
        {
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
            tooltipXButtonProps,
            ...targetHtmlAttrs
        },
        ref,
    ) => {
        const buttonRef = useRef<HTMLButtonElement | null>(null);
        // Внутреннее состояние открытия используется, только когда isOpen не передан (uncontrolled-режим).
        const [openState, setOpenState] = useState(Boolean(openProp));
        // Нода открытого Tooltip, в которую монтируется ловушка фокуса. Приходит из onShow.
        const [focusTrapNode, setFocusTrapNode] = useState<HTMLDivElement | null>(null);
        const [tooltipId] = useState(() => uniqueId(TOOLTIP_ID_PREFIX));
        const open = openProp ?? openState;

        /** Установка ссылки на кнопку-триггер: во внутренний ref (для позиционирования) и во внешний forwarded ref. */
        const setButtonRef = useCallback(
            (instance: HTMLButtonElement | null) => {
                buttonRef.current = instance;

                if (typeof ref === "function") {
                    ref(instance);
                } else if (ref) {
                    ref.current = instance;
                }
            },
            [ref],
        );

        /** Обработчик закрытия/открытия Tooltip. */
        const handleTooltipToggle = (nextOpen: boolean) => {
            if (openProp === undefined) {
                setOpenState(nextOpen);
            }

            if (!nextOpen) {
                setFocusTrapNode(null);
            }

            toggle?.(nextOpen);
        };

        /** Обработчик появления Tooltip. Сохраняет его ноду для ловушки фокуса. */
        const handleTooltipShow = (node: HTMLDivElement) => {
            setFocusTrapNode(node);
            onShow?.(node);
        };

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
                    targetRef={buttonRef}
                    {...(tooltipAriaAttributes && getAriaHTMLAttributes(tooltipAriaAttributes))}
                    {...(tooltipDataAttributes && getDataHTMLAttributes(tooltipDataAttributes))}
                >
                    <Tooltip.Target>
                        <ButtonIcon
                            className={clsx(styles.helpBoxButton, className)}
                            shape={EButtonIconShape.CIRCLE}
                            ref={setButtonRef}
                            {...targetHtmlAttrs}
                        >
                            <QuestioncircleFilledSrvIcon16 paletteIndex={DEFAULT_ICON_PALETTE_INDEX} {...iconProps} />
                        </ButtonIcon>
                    </Tooltip.Target>
                    {mobileHeaderContent && <Tooltip.MobileHeader>{mobileHeaderContent}</Tooltip.MobileHeader>}
                    <Tooltip.Body>{children}</Tooltip.Body>
                    <Tooltip.XButton {...tooltipXButtonProps} />
                </Tooltip>
                {/* Ловушка фокуса нужна только на desktop и только когда Tooltip уже появился в DOM. */}
                {open && focusTrapNode && (
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
                                containerElements={[focusTrapNode]}
                            />
                        }
                    >
                        {null}
                    </MobileView>
                )}
            </>
        );
    },
);

HelpBox.displayName = "HelpBox";
