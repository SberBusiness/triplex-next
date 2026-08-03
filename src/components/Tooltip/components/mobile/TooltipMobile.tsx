import React, { useEffect, useContext, useRef } from "react";
import { TooltipContext } from "@sberbusiness/triplex-next/components/Tooltip/TootlipContext";
import { Portal } from "@sberbusiness/triplex-next/components/Portal/Portal";
import { DropdownMobile } from "@sberbusiness/triplex-next/components/Dropdown/mobile/DropdownMobile";
import { DropdownMobileBody } from "@sberbusiness/triplex-next/components/Dropdown/mobile/DropdownMobileBody";
import { TooltipMobileCloseButton } from "@sberbusiness/triplex-next/components/Tooltip/components/mobile/components/TooltipMobileCloseButton";
import clsx from "clsx";
import styles from "@sberbusiness/triplex-next/components/Tooltip/styles/TooltipMobile.module.less";
import { ITooltipProps } from "@sberbusiness/triplex-next/components/Tooltip/types";

/** Свойства компонента TooltipMobile. */
export interface ITooltipMobileProps extends Omit<ITooltipProps, "preferPlace" | "toggle"> {
    /** Признак открыт ли TooltipMobile. */
    isOpen: boolean;
    /** Дочерние элементы. */
    children?: never;
}

/**
 * Мобильная версия Tooltip.
 * Рендерится в document.body поверх страницы как нижний оверлей (DropdownMobile).
 */
export const TooltipMobile: React.FC<ITooltipMobileProps> = ({
    // children, renderContainer, targetRef и disableAdaptiveMode не нужны мобильной версии
    // и не должны попадать в DOM — исключаются из rest.
    children,
    renderContainer,
    targetRef,
    disableAdaptiveMode,
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
            <Portal container={document.body}>
                <DropdownMobile
                    className={classNames}
                    tabIndex={-1}
                    opened={isOpen}
                    setOpened={setTooltipOpen}
                    {...rest}
                    ref={tooltipRef}
                >
                    {elements.mobileHeader}
                    <DropdownMobileBody className={styles.tooltipMobileContent}>
                        {elements.body}
                        {elements.link}
                        {elements.mobileHeader === null && renderCloseButton()}
                    </DropdownMobileBody>
                </DropdownMobile>
            </Portal>
        </>
    );
};
