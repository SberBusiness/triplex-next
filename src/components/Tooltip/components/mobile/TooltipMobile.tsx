import React, { useEffect, useContext, useRef } from "react";
import clsx from "clsx";
import { TooltipContext } from "../../TootlipContext";
import { TooltipMobileCloseButton } from "./components/TooltipMobileCloseButton";
import { ITooltipProps } from "../../types";
import { Puller } from "../../../Puller/Puller";
import { PullerBody } from "../../../Puller/PullerBody";
import styles from "../../styles/TooltipMobile.module.less";

/** Свойства компонента TooltipMobile. */
export interface ITooltipMobileProps extends Omit<ITooltipProps, "preferPlace" | "toggle"> {
    /** Признак открыт ли TooltipMobile. */
    isOpen: boolean;
    /** Дочерние элементы. */
    children?: never;
}

/**
 * Мобильная версия Tooltip.
 * Рендерится в document.body поверх страницы как нижний оверлей (Puller).
 */
export const TooltipMobile: React.FC<ITooltipMobileProps> = ({
    // children, targetRef, disableAdaptiveMode, size и alignTip не нужны мобильной версии и не должны
    // попасть в DOM. renderContainer не передаётся в Puller: в мобильном режиме тема ставится
    // на document.body (см. Tooltip.tsx).
    children,
    renderContainer,
    targetRef,
    disableAdaptiveMode,
    size,
    alignTip,
    className,
    isOpen,
    onShow,
    ...rest
}) => {
    const { elements, setTooltipOpen } = useContext(TooltipContext);
    const tooltipRef = useRef<HTMLDivElement | null>(null);
    const classNames = clsx(styles.tooltipMobile, { [styles.headerless]: elements.mobileHeader === null }, className);

    useEffect(() => {
        if (isOpen && tooltipRef.current) {
            onShow?.(tooltipRef.current);
        }
        // onShow намеренно вне зависимостей: колбэк вызывается только на открытие подсказки,
        // иначе нестабильная inline-функция вызывала бы его на каждый рендер.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOpen]);

    /** Рендер кнопки закрытия. */
    const renderCloseButton = () => {
        return (
            <div className={styles.closeButton}>
                <TooltipMobileCloseButton {...elements.closeButton?.props} />
            </div>
        );
    };

    return (
        <>
            {elements.target}
            <Puller
                className={classNames}
                tabIndex={-1}
                opened={isOpen}
                setOpened={setTooltipOpen}
                {...rest}
                ref={tooltipRef}
            >
                {elements.mobileHeader}
                <PullerBody className={styles.tooltipMobileContent}>
                    {elements.body}
                    {elements.link}
                    {elements.mobileHeader === null && renderCloseButton()}
                </PullerBody>
            </Puller>
        </>
    );
};
