import React, { useState, useEffect, useRef } from "react";
import clsx from "clsx";
import {
    EOverlayDirection,
    IOverlayBaseProps,
    OverlayBase,
    IOverlayChildrenProvideProps,
} from "../../Overlay/OverlayBase";
import { OverlayMask } from "../../Overlay/OverlayMask";
import { LightBoxSideOverlayLoader } from "./LightBoxSideOverlayLoader";
import FocusTrap, { FocusTrapProps } from "focus-trap-react";
import { FocusTrapUtils } from "../../../utils/focus/FocusTrapUtils";
import { LightBoxSideOverlayCloseMobile } from "./LightBoxSideOverlayCloseMobile";
import { LightBoxSideOverlayCloseDesktop } from "./LightBoxSideOverlayCloseDesktop";
import { EComponentSize } from "../../../enums/EComponentSize";
import { createSizeToClassNameMap } from "../../../utils/classNameMaps";
import styles from "./styles/LightBoxSideOverlay.module.less";

/** Свойства компонента LightBoxSideOverlay. */
export interface ILightBoxSideOverlayProps
    extends React.HTMLAttributes<HTMLDivElement>,
        Pick<IOverlayBaseProps, "opened" | "onClose" | "onOpen"> {
    /** Свойства FocusTrap. Используется npm-пакет focus-trap-react. */
    focusTrapProps?: FocusTrapProps;
    /** Состояние загрузки. */
    isLoading?: boolean;
    /** Текст под спиннером. */
    loadingTitle?: React.ReactNode;
    /** Открыт другой SideOverlay поверх текущего. */
    isTopLevelSideOverlayOpened?: boolean;
    /** Открыт TopOverlay в текущем SideOverlay. */
    isTopOverlayOpened?: boolean;
    /** Размер компонента. */
    size?: EComponentSize;
}

export interface ILightBoxSideOverlayFC extends React.FC<ILightBoxSideOverlayProps> {
    CloseDesktop: typeof LightBoxSideOverlayCloseDesktop;
    CloseMobile: typeof LightBoxSideOverlayCloseMobile;
}

const sizeToClassNameMap = createSizeToClassNameMap(styles);

/**
 * Боковая панель LightBox.
 * Выезжает из правой границы LightBox.
 */
export const LightBoxSideOverlay: ILightBoxSideOverlayFC = ({
    children,
    className,
    focusTrapProps,
    isLoading,
    loadingTitle,
    isTopLevelSideOverlayOpened,
    isTopOverlayOpened,
    onClose,
    onOpen,
    opened,
    size = EComponentSize.MD,
    ...htmlDivAttributes
}) => {
    // Флаг, в текущий момент оверлей закрывается.
    const [closing, setClosing] = useState(false);
    // Флаг, в текущий момент оверлей открывается.
    const [opening, setOpening] = useState(false);
    // Предыдущее состояние открыт/закрыт.
    const prevOpened = useRef(opened);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (prevOpened.current && !opened) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setOpening(false); // opened меняется в процессе анимации открытия.
            setClosing(true);
        } else if (!prevOpened.current && opened) {
            setClosing(false); // opened меняется в процессе анимации закрытия.
            setOpening(true);
        }

        prevOpened.current = opened;
    }, [opened]);

    const handleTransitionEnd = (event: React.TransitionEvent<HTMLDivElement>) => {
        const { target, currentTarget } = event;

        if (target === currentTarget) {
            if (closing) {
                setClosing(false);
                onClose?.();
            } else if (opening) {
                setOpening(false);
                onOpen?.();
            }
        }
    };

    const renderMask = ({ opened }: IOverlayChildrenProvideProps) => (
        <OverlayMask opened={opened} className={styles.lightBoxSideOverlayMask} />
    );

    const renderPanel = () => (
        <div
            className={clsx(styles.lightBoxSideOverlayContent, {
                [styles.closing]: closing,
                [styles.opening]: opening,
                [styles.opened]: opened,
            })}
            onTransitionEnd={handleTransitionEnd}
            ref={contentRef}
        >
            {children}

            {isLoading && <LightBoxSideOverlayLoader loadingTitle={loadingTitle} />}
        </div>
    );

    const setOpened = () => {};

    const classNameOverlayWrapper = clsx(className, styles.lightBoxSideOverlayWrapper, sizeToClassNameMap[size], {
        [styles.closing]: closing,
        [styles.opened]: opened,
        [styles.overflowXHidden]: Boolean(isTopLevelSideOverlayOpened) || Boolean(isLoading),
        [styles.overflowYHidden]:
            Boolean(isTopLevelSideOverlayOpened) || Boolean(isLoading) || Boolean(isTopOverlayOpened),
    });

    const renderOverlay = (provideProps: IOverlayChildrenProvideProps) => (
        <>
            {renderMask(provideProps)}
            {renderPanel()}
        </>
    );

    const content = (
        <div
            className={clsx(styles.lightBoxSideOverlay, {
                [styles.closing]: closing,
                [styles.opening]: opening,
            })}
        >
            <OverlayBase direction={EOverlayDirection.RIGHT} opened={opened} setOpened={setOpened}>
                {renderOverlay}
            </OverlayBase>
        </div>
    );

    return (
        <FocusTrap
            active={opened && !opening && !closing}
            {...focusTrapProps}
            focusTrapOptions={{
                clickOutsideDeactivates: true,
                initialFocus: () => FocusTrapUtils.getFirstInteractionElementByDataAttr(contentRef.current),
                preventScroll: true,
                ...focusTrapProps?.focusTrapOptions,
            }}
        >
            <div className={classNameOverlayWrapper} role="dialog" aria-modal="true" {...htmlDivAttributes}>
                {content}
            </div>
        </FocusTrap>
    );
};

LightBoxSideOverlay.displayName = "LightBoxSideOverlay";
LightBoxSideOverlay.CloseDesktop = LightBoxSideOverlayCloseDesktop;
LightBoxSideOverlay.CloseMobile = LightBoxSideOverlayCloseMobile;
