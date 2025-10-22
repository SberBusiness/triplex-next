import React, { useState, useEffect, useRef } from "react";
import FocusTrap, { FocusTrapProps } from "focus-trap-react";
import clsx from "clsx";
import { EOverlayDirection, IOverlayChildrenProvideProps } from "../../Overlay/OverlayBase";
import { Overlay, IOverlayProps } from "../../Overlay/Overlay";
import styles from "./styles/LightBoxTopOverlay.module.less";

/** Свойства компонента LightBoxTopOverlay. */
export interface ILightBoxTopOverlayProps extends Pick<IOverlayProps, "opened" | "onOpen" | "onClose"> {
    children?: React.ReactNode;
    /** Свойства FocusTrap. Используется npm-пакет focus-trap-react. */
    focusTrapProps?: FocusTrapProps;
}

export const LightBoxTopOverlay: React.FC<ILightBoxTopOverlayProps> = ({
    children,
    focusTrapProps,
    opened,
    onClose,
    onOpen,
    ...OverlayBaseProps
}) => {
    // Флаг, в текущий момент оверлей закрывается.
    const [closing, setClosing] = useState(false);
    // FocusTrap активен.
    const [activeFocusTrap, setActiveFocusTrap] = useState(false);
    // Позиция top для lightBoxTopOverlayWrapper, высчитывается исходя из scrollTop родителя.
    const [overlayWrapperTopPosition, setOverlayWrapperTopPosition] = useState<number | string>(0);
    // Предыдущее состояние открыт/закрыт.
    const prevOpened = useRef(opened);
    // Ref контейнера.
    const overlayWrapperRef = useRef<HTMLDivElement | null>(null);

    // Пересчет позиционирования оверлея. Бывает неверная позиция, например, при открытии во время скролла.
    const updateTopPosition = () => {
        // Перерасчет позиционирования оверлея, если он был открыт во время скролла родителя.
        if (overlayWrapperRef.current) {
            // Верхняя позиция LightBox.
            const lightBoxTopPosition =
                getComputedStyle(overlayWrapperRef.current).getPropertyValue("--lightBox-screen-top") || "0";
            // Текущее положение оверлея.
            const position = overlayWrapperRef.current.getBoundingClientRect();
            // Оверлей расположен выше, чем нужно.
            if (position.top < 0) {
                setOverlayWrapperTopPosition(
                    (overlayWrapperTopPositionPrev) =>
                        parseInt(overlayWrapperTopPositionPrev as string, 10) +
                        Math.abs(position.top) +
                        parseInt(lightBoxTopPosition, 10),
                );
            } else {
                setOverlayWrapperTopPosition(
                    // Оверлей расположен ниже, чем нужно.
                    (overlayWrapperTopPositionPrev) =>
                        parseInt(overlayWrapperTopPositionPrev as string, 10) -
                        position.top +
                        parseInt(lightBoxTopPosition, 10),
                );
            }
        }
    };

    const handleOpen = () => {
        updateTopPosition();
        setActiveFocusTrap(true);
        onOpen?.();
    };

    useEffect(() => {
        // Флаг opened поменялся на false.
        if (prevOpened.current && !opened) {
            setClosing(true);

            // Флаг opened поменялся на true.
        } else if (!prevOpened.current && opened) {
            updateTopPosition();
        }

        prevOpened.current = opened;
    }, [opened]);

    const handleClose = () => {
        setClosing(false);
        setOverlayWrapperTopPosition(0);
        onClose?.();
    };

    const handleClosing = () => setActiveFocusTrap(false);

    const renderOverlay = (overlayProps: IOverlayChildrenProvideProps) => (
        <>
            <Overlay.Mask opened={overlayProps.opened} className={styles.lightBoxTopOverlayMask} />
            <Overlay.Panel className={styles.lightBoxTopOverlayPanel} {...overlayProps}>
                {children}
            </Overlay.Panel>
        </>
    );

    const setOpened = () => {};

    const classNameOverlayWrapper = clsx(styles.lightBoxTopOverlayWrapper, {
        [styles.closing]: closing,
        [styles.opened]: opened,
    });

    const overlay = (
        <Overlay
            onClose={handleClose}
            onClosing={handleClosing}
            onOpen={handleOpen}
            opened={opened}
            setOpened={setOpened}
            {...OverlayBaseProps}
            className={styles.lightBoxTopOverlay}
            direction={EOverlayDirection.TOP}
        >
            {renderOverlay}
        </Overlay>
    );

    return (
        <FocusTrap
            active={activeFocusTrap}
            {...focusTrapProps}
            focusTrapOptions={{
                clickOutsideDeactivates: true,
                preventScroll: true,
                ...focusTrapProps?.focusTrapOptions,
            }}
        >
            <div
                className={classNameOverlayWrapper}
                ref={overlayWrapperRef}
                style={overlayWrapperTopPosition ? { top: `${overlayWrapperTopPosition}px` } : undefined}
            >
                {overlay}
            </div>
        </FocusTrap>
    );
};

LightBoxTopOverlay.displayName = "LightBoxTopOverlay";
