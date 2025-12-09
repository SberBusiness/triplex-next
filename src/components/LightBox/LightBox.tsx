import React, { useEffect, useRef } from "react";
import { FocusTrap, FocusTrapProps } from "focus-trap-react";
import { LightBoxContent } from "./LightBoxContent";
import { LightBoxControls } from "./LightBoxControls/LightBoxControls";
import { LightBoxSideOverlay } from "./LightBoxSideOverlay/LightBoxSideOverlay";
import { Portal } from "../Portal/Portal";
import { addClassNameWithScrollbarWidth } from "../../utils/scroll/scrollbar";
import { TopOverlay } from "../TopOverlay/TopOverlay";
import { LightBoxViewManager } from "./LightBoxViewManager/LightBoxViewManager";
import { MobileView } from "../MobileView/MobileView";
import { FocusTrapUtils } from "../../utils/focus/FocusTrapUtils";
import { useToken } from "../ThemeProvider/useToken";
import clsx from "clsx";
import styles from "./styles/LightBox.module.less";
import scrollStyles from "./styles/LightBoxScroll.module.less";

// Идентификатор DOM-элемента, в который рендерится лайтбокс. При отсутствии элемента в DOM – создается в body.
export const lightBoxMountNodeIdDefault = "LightBox-next-mount-node";

// Идентификатор DOM-элемента, в визуальных границах (левая и правая координата) которого рендерится лайтбокс.
export const lightBoxViewManagerNodeIdDefault = "LightBox-next-view-manager-node";

/** Свойства компонента LightBox. */
export interface ILightBoxProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactElement[];
    /** Свойства FocusTrap. Используется npm-пакет focus-trap-react. */
    focusTrapProps?: FocusTrapProps;
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
    TopOverlay: typeof TopOverlay;
    Controls: typeof LightBoxControls;
}

const bodyClassNamesIsLightBoxOpen = [styles.bodyOverflowHidden];

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

    const addClassNamesToDocumentElement = () => {
        bodyClassNamesIsLightBoxOpen.forEach((className) => document.documentElement.classList.add(className));
    };

    useEffect(() => {
        addClassNameWithScrollbarWidth(scrollStyles);
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

    /** Функция для хранения ссылки. */
    const setRef = (instance: HTMLDivElement | null) => {
        containerRef.current = instance;

        if (forwardRef) {
            forwardRef.current = instance;
        }
    };

    const classNameLightBox = clsx(
        scopeClassName,
        styles.lightBox,
        {
            [styles.isLoading]: Boolean(isLoading),
            [styles.lightBoxSideOverlayActive]: Boolean(isSideOverlayOpened),
            [styles.lightBoxTopOverlayActive]: Boolean(isTopOverlayOpened),
        },
        className,
    );

    if (!lightBoxMountNode.current) {
        return null;
    }

    const renderLightBox = () => (
        <div className={classNameLightBox} ref={setRef} role="dialog" aria-modal="true" {...htmlDivAttributes}>
            <div className={styles.lightBoxBackdrop} />
            {children}
            <span ref={tempButtonRef} className={styles.tempElSafariBug} />
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
LightBox.TopOverlay = TopOverlay;
LightBox.Controls = LightBoxControls;

LightBox.displayName = "LightBox";
