import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { Portal } from "../Portal";
import { FocusTrapExtended, IFocusTrapExtendedProps } from "../FocusTrapExtended";
import { LightBoxContent } from "./LightBoxContent";
import { LightBoxControls } from "./LightBoxControls/LightBoxControls";
import { LightBoxSideOverlay } from "./LightBoxSideOverlay/LightBoxSideOverlay";
import { addClassNameWithScrollbarWidth } from "../../utils/scroll/scrollbar";
import { TopOverlay } from "../TopOverlay/TopOverlay";
import { LightBoxViewManager } from "./LightBoxViewManager/LightBoxViewManager";
import { FocusTrapUtils } from "../../utils/focus/FocusTrapUtils";
import { useToken } from "../ThemeProvider/useToken";
import { LightBoxLeftSidebar } from "./LightBoxSidebars/LightBoxLeftSidebar";
import { LightBoxRightSidebar } from "./LightBoxSidebars/LightBoxRightSidebar";
import { ELightBoxSize } from "./enums";
import styles from "./styles/LightBox.module.less";
import scrollStyles from "./styles/LightBoxScroll.module.less";

/** Идентификатор DOM-элемента, в который рендерится лайтбокс. При отсутствии элемента в DOM – создается в body. */
export const lightBoxMountNodeIdDefault = "LightBox-next-mount-node";

/** Идентификатор DOM-элемента, в визуальных границах (левая и правая координата) которого рендерится лайтбокс. */
export const lightBoxViewManagerNodeIdDefault = "LightBox-next-view-manager-node";

/** Свойства компонента LightBox. */
export interface ILightBoxProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Содержимое лайтбокса. */
    children: React.ReactElement[];
    /** Свойства компонента FocusTrapExtended. */
    focusTrapProps?: IFocusTrapExtendedProps;
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
    /** Размер контента LightBox. */
    size?: ELightBoxSize;
}

/** CSS-классы, добавляемые на корневой элемент документа, пока лайтбокс открыт. */
const bodyClassNamesIsLightBoxOpen = [styles.bodyOverflowHidden];

/** Добавляет CSS-классы открытого лайтбокса на корневой элемент документа. */
const addClassNamesToDocumentElement = () => {
    bodyClassNamesIsLightBoxOpen.forEach((className) => document.documentElement.classList.add(className));
};

/** Удаляет CSS-классы открытого лайтбокса с корневого элемента документа. */
const removeClassNamesFromDocumentElement = () => {
    bodyClassNamesIsLightBoxOpen.forEach((className) => document.documentElement.classList.remove(className));
};

/**
 * Количество смонтированных лайтбоксов. При переключении между лайтбоксами через роутер второй может
 * смонтироваться раньше, чем размонтируется первый, поэтому классы с documentElement снимаются только
 * при размонтировании последнего лайтбокса.
 */
let mountedLightBoxCount = 0;

const LightBoxBase: React.FC<ILightBoxProps> = ({
    children,
    className,
    focusTrapProps,
    forwardRef,
    mountNode,
    lightBoxViewManagerNodeId = lightBoxViewManagerNodeIdDefault,
    isLoading,
    isSideOverlayOpened,
    isTopOverlayOpened,
    size = ELightBoxSize.MD,
    ...htmlDivAttributes
}) => {
    // Скрытый элемент для вызова ререндера при закрытии оверлея, фикс бага в Safari - DCBSWT-2866.
    const tempButtonRef = useRef<HTMLSpanElement>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);

    const { scopeClassName } = useToken();

    const getLightBoxMountNode = (): HTMLDivElement => {
        if (mountNode) {
            return mountNode;
        }

        let lightBoxMountNode = document.querySelector<HTMLDivElement>(`#${lightBoxMountNodeIdDefault}`);

        if (!lightBoxMountNode) {
            lightBoxMountNode = document.createElement("div");
            lightBoxMountNode.setAttribute("id", lightBoxMountNodeIdDefault);
            document.body.appendChild(lightBoxMountNode);
        }

        return lightBoxMountNode;
    };

    const getLightBoxViewManagerMountNode = (): HTMLDivElement => {
        let lightBoxViewManagerMountNode: HTMLDivElement | null = null;

        if (lightBoxViewManagerNodeId) {
            lightBoxViewManagerMountNode = document.querySelector<HTMLDivElement>(`#${lightBoxViewManagerNodeId}`);
        }

        if (!lightBoxViewManagerMountNode) {
            lightBoxViewManagerMountNode = document.createElement("div");
            lightBoxViewManagerMountNode.setAttribute("id", lightBoxViewManagerNodeIdDefault);
            document.body.appendChild(lightBoxViewManagerMountNode);
        }

        return lightBoxViewManagerMountNode;
    };

    /** DOM node, в которую рендерится лайтбокс. */
    const [lightBoxMountNode] = useState<HTMLDivElement>(getLightBoxMountNode);
    /**
     * DOM node, в визуальных границах которой рендерится лайтбокс.
     * Левая и правая граница LightBox будут соответствовать левой и правой границе lightBoxViewManagerNode.
     */
    const [lightBoxViewManagerNode] = useState<HTMLDivElement>(getLightBoxViewManagerMountNode);

    useEffect(() => {
        addClassNameWithScrollbarWidth(scrollStyles);
        mountedLightBoxCount += 1;
        addClassNamesToDocumentElement();

        return () => {
            mountedLightBoxCount -= 1;

            if (mountedLightBoxCount === 0) {
                removeClassNamesFromDocumentElement();
            }
        };
    }, []);

    useEffect(() => {
        if (!isSideOverlayOpened && tempButtonRef.current) {
            // Изменение z-index у скрытого элемента вызывает repaint. Фикс бага в Safari - DCBSWT-2866.
            const nextZIndex = Math.round(Math.random() * 100);
            tempButtonRef.current.style.zIndex = nextZIndex.toString();
        }
    }, [isSideOverlayOpened]);

    const setRef = (instance: HTMLDivElement | null) => {
        containerRef.current = instance;

        if (forwardRef) {
            forwardRef.current = instance;
        }
    };

    const classNames = clsx(
        scopeClassName,
        styles.lightBox,
        styles[size],
        {
            [styles.lightBoxSideOverlayActive]: Boolean(isSideOverlayOpened),
            [styles.lightBoxTopOverlayActive]: Boolean(isTopOverlayOpened),
        },
        className,
    );

    return (
        <>
            <Portal container={lightBoxMountNode}>
                <FocusTrapExtended
                    active={!isLoading}
                    {...focusTrapProps}
                    focusTrapOptions={{
                        initialFocus: () => FocusTrapUtils.getFirstInteractionElementByDataAttr(containerRef.current),
                        preventScroll: true,
                        ...focusTrapProps?.focusTrapOptions,
                    }}
                >
                    <div className={classNames} role="dialog" aria-modal="true" {...htmlDivAttributes} ref={setRef}>
                        <div className={styles.lightBoxBackdrop} />
                        {children}
                        <span ref={tempButtonRef} className={styles.tempElSafariBug} />
                    </div>
                </FocusTrapExtended>
            </Portal>

            <LightBoxViewManager
                lightBoxViewManagerNode={lightBoxViewManagerNode}
                lightBoxMountNode={lightBoxMountNode}
            />
        </>
    );
};

LightBoxBase.displayName = "LightBoxBase";

/** Лайтбокс — полноэкранный диалог поверх страницы с контентом, кнопками управления и боковыми панелями. */
export const LightBox = Object.assign(LightBoxBase, {
    Content: LightBoxContent,
    SideOverlay: LightBoxSideOverlay,
    TopOverlay,
    Controls: LightBoxControls,
    LeftSidebar: LightBoxLeftSidebar,
    RightSidebar: LightBoxRightSidebar,
});
