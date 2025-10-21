import React, { useState, useEffect, useRef } from "react";
import { classnames } from "@sber-business/triplex/utils/classnames/classnames";
import {
    EOverlayDirection,
    IOverlayBaseProps,
    OverlayBase,
    IOverlayChildrenProvideProps,
} from "@sber-business/triplex/components/Overlay/OverlayBase";
import { OverlayMask } from "../../Overlay/OverlayMask";
import { LightBoxSideOverlayClose } from "./LightBoxSideOverlayClose";
import { LightBoxSideOverlayLoader } from "./LightBoxSideOverlayLoader";
import FocusTrap from "focus-trap-react";
import { FocusTrapUtils } from "@sber-business/triplex/utils/focus/FocusTrapUtils";

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
    focusTrapProps?: FocusTrap.Props;
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
        isTopLevelSideOverlayOpened ? null : (
            <OverlayMask opened={opened} className="cssClass[lightBoxSideOverlayMask]" />
        );

    const renderPanel = () => (
        <div
            className={classnames("cssClass[lightBoxSideOverlayContent]", {
                "cssClass[closing]": closing,
                "cssClass[opening]": opening,
                "cssClass[opened]": opened,
            })}
            onTransitionEnd={handleTransitionEnd}
            ref={contentRef}
        >
            {children}

            {isLoading && <LightBoxSideOverlayLoader loadingTitle={loadingTitle} />}
        </div>
    );

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const setOpened = () => {};

    const classNameOverlayWrapper = classnames(className, "cssClass[lightBoxSideOverlayWrapper]", {
        "cssClass[closing]": closing,
        "cssClass[opened]": opened,
        "cssClass[openedTopLevelSideOverlay]": Boolean(isTopLevelSideOverlayOpened),
        "cssClass[overflowXHidden]": Boolean(isTopLevelSideOverlayOpened) || Boolean(isLoading),
        "cssClass[overflowYHidden]":
            Boolean(isTopLevelSideOverlayOpened) || Boolean(isLoading) || Boolean(isTopOverlayOpened),
        "cssClass[sizeSM]": size === ELightBoxSideOverlaySize.SM,
        "cssClass[sizeMD]": size === ELightBoxSideOverlaySize.MD,
        "cssClass[sizeLG]": size === ELightBoxSideOverlaySize.LG,
    });

    const renderOverlay = (provideProps: IOverlayChildrenProvideProps) => (
        <>
            {renderMask(provideProps)}
            {renderPanel()}
        </>
    );

    const content = (
        <div
            className={classnames("cssClass[lightBoxSideOverlay]", "cssClass[globalLightBoxSideOverlay]", {
                "cssClass[closing]": closing,
                "cssClass[opening]": opening,
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
