import React, { useEffect, useRef } from "react";
import FocusTrap from "focus-trap-react";
import { classnames } from "@sber-business/triplex/utils/classnames/classnames";
import { LightBoxContent } from "@sber-business/triplex/components/LightBox/components/LightBoxContent";
import { LightBoxControls } from "@sber-business/triplex/components/LightBox/LightBoxControls/LightBoxControls";
import { LightBoxSideOverlay } from "@sber-business/triplex/components/LightBox/LightBoxSideOverlay/LightBoxSideOverlay";
import { Portal } from "@sber-business/triplex/components/Portal/Portal";
import { addClassNameWithScrollbarWidth } from "@sber-business/triplex/utils/scroll/scrollbar";
import { LightBoxTopOverlay } from "@sber-business/triplex/components/LightBox/LightBoxTopOverlay/LightBoxTopOverlay";
import { LightBoxViewManager } from "@sber-business/triplex/components/LightBox/LightBoxViewManager/LightBoxViewManager";
import { MobileView } from "@sber-business/triplex/components/MobileView/MobileView";
import { FocusTrapUtils } from "@sber-business/triplex/utils/focus/FocusTrapUtils";
import { useToken } from "@sber-business/triplex/components/ThemeProvider/useToken";

// Идентификатор DOM-элемента, в который рендерится лайтбокс. При отсутствии элемента в DOM – создается в body.
export const lightBoxMountNodeIdDefault = "LightBox-mount-node";

// Идентификатор DOM-элемента, в визуальных границах (левая и правая координата) которого рендерится лайтбокс.
export const lightBoxViewManagerNodeIdDefault = "LightBox-view-manager-node";

/** Свойства компонента LightBox. */
export interface ILightBoxProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactElement[];
    /** Свойства FocusTrap. Используется npm-пакет focus-trap-react. */
    focusTrapProps?: FocusTrap.Props;
    /** Ref на контейнер LightBox. */
    forwardRef?: React.MutableRefObject<HTMLElement | null>;
    /** DOM-нода в которую будет рендерится лайтбокс. */
    mountNode?: HTMLDivElement;
    /** Идентификатор DOM-элемента, в визуальных границах (левая и правая координата) которого рендерится лайтбокс. */
    lightBoxViewManagerNodeId?: string;
    /** Флаг состояния загрузки. */
    isLoading?: boolean;
    /** Флаг открытия боковой панели. */
    isSideOverlayOpened?: boolean;
    /** Флаг открытия верхней панели. */
    isTopOverlayOpened?: boolean;
}

interface ILightBoxFC extends React.FC<ILightBoxProps> {
    Content: typeof LightBoxContent;
    SideOverlay: typeof LightBoxSideOverlay;
    TopOverlay: typeof LightBoxTopOverlay;
    Controls: typeof LightBoxControls;
}

const bodyClassNamesIsLightBoxOpen = ["cssClass[bodyOverflowHidden]"];

export const LightBox: ILightBoxFC = ({
    children,
    className,
    focusTrapProps,
    forwardRef,
    mountNode,
    lightBoxViewManagerNodeId = lightBoxViewManagerNodeIdDefault,
    isLoading,
    isSideOverlayOpened,
    isTopOverlayOpened,
    ...htmlDivAttributes
}) => {
    // Скрытый элемент для вызова ререндера при закрытии оверлея, фикс бага в Safari - DCBSWT-2866.
    const tempButtonRef = useRef<HTMLSpanElement>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);

    const { scopeClassName } = useToken();

    const getLightBoxMountNode = () => {
        let lightBoxMountNode: HTMLDivElement | null = null;
        if (mountNode) {
            lightBoxMountNode = mountNode;
        } else {
            lightBoxMountNode = document.querySelector(`#${lightBoxMountNodeIdDefault}`);

            if (!lightBoxMountNode) {
                lightBoxMountNode = document.createElement("div");
                lightBoxMountNode.setAttribute("id", lightBoxMountNodeIdDefault);
                document.body.appendChild(lightBoxMountNode);
            }
        }

        return lightBoxMountNode;
    };

    const getLightBoxViewManagerMountNode = () => {
        let lightBoxViewManagerMountNode: HTMLDivElement | null = null;
        if (lightBoxViewManagerNodeId) {
            lightBoxViewManagerMountNode = document.querySelector(`#${lightBoxViewManagerNodeId}`);
        }

        if (!lightBoxViewManagerMountNode) {
            lightBoxViewManagerMountNode = document.createElement("div");
            lightBoxViewManagerMountNode.setAttribute("id", lightBoxViewManagerNodeIdDefault);
            document.body.appendChild(lightBoxViewManagerMountNode);
        }

        return lightBoxViewManagerMountNode;
    };

    /**
     * DOM node, в которую рендерится лайтбокс.
     */
    const lightBoxMountNode = useRef<HTMLDivElement | null>(getLightBoxMountNode());
    /**
     * DOM node, в визуальных границах которой рендерится лайтбокс.
     * Левая и правая граница LightBox будут соответствовать левой и правой границе lightBoxViewManagerNode.
     */
    const lightBoxViewManagerNode = useRef<HTMLDivElement | null>(getLightBoxViewManagerMountNode());

    useEffect(() => {
        addClassNameWithScrollbarWidth();
        addClassNamesToDocumentElement();
        // Фикс бага в роутере - при переключении между лайтбоксами иногда сначала происходит componentDidMount 2го и затем componentWillUnmount первого, css классы удаляются.
        setTimeout(addClassNamesToDocumentElement, 100);

        return () =>
            bodyClassNamesIsLightBoxOpen.forEach((className) => document.documentElement.classList.remove(className));
    }, []);

    useEffect(() => {
        if (!isSideOverlayOpened && tempButtonRef.current) {
            // Изменение z-index у скрытого элемента вызывает repaint. Фикс бага в Safari - DCBSWT-2866.
            const nextZIndex = Math.round(Math.random() * 100);
            tempButtonRef.current.style.zIndex = nextZIndex.toString();
        }
    }, [isSideOverlayOpened]);

    const addClassNamesToDocumentElement = () => {
        bodyClassNamesIsLightBoxOpen.forEach((className) => document.documentElement.classList.add(className));
    };

    /** Функция для хранения ссылки. */
    const setRef = (instance: HTMLDivElement | null) => {
        containerRef.current = instance;

        if (forwardRef) {
            forwardRef.current = instance;
        }
    };

    const classNameLightBox = classnames(
        scopeClassName,
        "cssClass[lightBox]",
        {
            "cssClass[isLoading]": Boolean(isLoading),
            "cssClass[lightBoxSideOverlayActive]": Boolean(isSideOverlayOpened),
            "cssClass[lightBoxTopOverlayActive]": Boolean(isTopOverlayOpened),
        },
        className
    );

    if (!lightBoxMountNode.current) {
        return null;
    }

    const renderLightBox = () => (
        <div className={classNameLightBox} ref={setRef} role="dialog" aria-modal="true" {...htmlDivAttributes}>
            <div className="cssClass[lightBoxBackdrop]" />
            {children}
            <span ref={tempButtonRef} className="cssClass[tempElSafariBug]" />
        </div>
    );

    return (
        <>
            <Portal container={lightBoxMountNode.current}>
                <MobileView
                    fallback={
                        <FocusTrap
                            active={!isLoading}
                            {...focusTrapProps}
                            focusTrapOptions={{
                                clickOutsideDeactivates: true,
                                initialFocus: () =>
                                    FocusTrapUtils.getFirstInteractionElementByDataAttr(containerRef.current),
                                preventScroll: true,
                                ...focusTrapProps?.focusTrapOptions,
                            }}
                        >
                            {renderLightBox()}
                        </FocusTrap>
                    }
                >
                    {renderLightBox()}
                </MobileView>
            </Portal>

            {lightBoxViewManagerNode.current && (
                <LightBoxViewManager
                    lightBoxViewManagerNode={lightBoxViewManagerNode.current}
                    lightBoxMountNode={lightBoxMountNode.current}
                />
            )}
        </>
    );
};

LightBox.Content = LightBoxContent;
LightBox.SideOverlay = LightBoxSideOverlay;
LightBox.TopOverlay = LightBoxTopOverlay;
LightBox.Controls = LightBoxControls;

LightBox.displayName = "LightBox";
