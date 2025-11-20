import React, { useState, useEffect, useRef } from "react";
import clsx from "clsx";
import {
    EOverlayDirection,
    IOverlayBaseProps,
    OverlayBase,
    IOverlayChildrenProvideProps,
} from "../../Overlay/OverlayBase";
import { OverlayMask } from "../../Overlay/OverlayMask";
import { LightBoxSideOverlayClose } from "./LightBoxSideOverlayClose";
import { LightBoxSideOverlayLoader } from "./LightBoxSideOverlayLoader";
import FocusTrap, { FocusTrapProps } from "focus-trap-react";
import { FocusTrapUtils } from "../../../utils/focus/FocusTrapUtils";
import styles from "./styles/LightBoxSideOverlay.module.less";

export enum ELightBoxSideOverlaySize {
    SM,
    MD,
    LG,
}

/** Свойства компонента LightBoxSideOverlay. */
export interface ILightBoxSideOverlayProps
    extends React.HTMLAttributes<HTMLDivElement>,
        Pick<IOverlayBaseProps, "opened" | "onClose" | "onOpen"> {
    /** Свойства FocusTrap. Используется npm-пакет focus-trap-react. */
    focusTrapProps?: FocusTrapProps;
    isLoading?: boolean;
    /** Текст под спиннером. */
    loadingTitle?: React.ReactNode;
    /** Открыт другой SideOverlay поверх текущего. */
    isTopLevelSideOverlayOpened?: boolean;
    /** Открыт TopOverlay в текущей SideOverlay. */
    isTopOverlayOpened?: boolean;
    size?: ELightBoxSideOverlaySize;
}

export interface ILightBoxSideOverlayFC extends React.FC<ILightBoxSideOverlayProps> {
    Close: typeof LightBoxSideOverlayClose;
}

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
    size = ELightBoxSideOverlaySize.MD,
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

    const renderMask = ({ opened, setOpened }: IOverlayChildrenProvideProps) =>
        // Маска рендерится у SideOverlay самого верхнего уровня, чтобы маски не накладывались друг на друга.
        isTopLevelSideOverlayOpened ? null : <OverlayMask opened={opened} className={styles.lightBoxSideOverlayMask} />;

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

    const classNameOverlayWrapper = clsx(className, styles.lightBoxSideOverlayWrapper, {
        [styles.closing]: closing,
        [styles.opened]: opened,
        [styles.openedTopLevelSideOverlay]: Boolean(isTopLevelSideOverlayOpened),
        [styles.overflowXHidden]: Boolean(isTopLevelSideOverlayOpened) || Boolean(isLoading),
        [styles.overflowYHidden]:
            Boolean(isTopLevelSideOverlayOpened) || Boolean(isLoading) || Boolean(isTopOverlayOpened),
        [styles.sizeSM]: size === ELightBoxSideOverlaySize.SM,
        [styles.sizeMD]: size === ELightBoxSideOverlaySize.MD,
        [styles.sizeLG]: size === ELightBoxSideOverlaySize.LG,
    });

    const renderOverlay = (provideProps: IOverlayChildrenProvideProps) => (
        <>
            {renderMask(provideProps)}
            {renderPanel()}
        </>
    );

    const content = (
        <div
            className={clsx(styles.lightBoxSideOverlay, styles.globalLightBoxSideOverlay, {
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
LightBoxSideOverlay.Close = LightBoxSideOverlayClose;
