import React, { useState, useEffect, useLayoutEffect, useRef } from "react";
import clsx from "clsx";
import { FocusTrapExtended, IFocusTrapExtendedProps } from "../FocusTrapExtended";
import { Overlay, IOverlayProps } from "../Overlay/Overlay";
import { EOverlayDirection, IOverlayChildrenProvideProps } from "../Overlay/OverlayBase";
import { getLightBoxScreenTop, getNextTopPosition } from "./utils";
import styles from "./styles/TopOverlay.module.less";

/** Свойства компонента TopOverlay. */
export interface ITopOverlayProps
    extends
        Pick<IOverlayProps, "opened" | "onOpen" | "onClose">,
        Omit<React.HTMLAttributes<HTMLDivElement>, "children" | "onClose"> {
    /** Содержимое верхней панели. */
    children?: React.ReactNode;
    /** Свойства компонента FocusTrapExtended. */
    focusTrapProps?: IFocusTrapExtendedProps;
}

// Overlay требует setOpened, но TopOverlay полностью управляется свойством opened и наружу состояние не поднимает.
const noopSetOpened = () => {};

/**
 * Верхняя панель поверх контента LightBox: затемняющая маска на всю ширину экрана и выезжающая сверху панель.
 * Открытием управляет свойство `opened`, на время открытия фокус удерживается внутри панели.
 */
export const TopOverlay = React.forwardRef<HTMLDivElement, ITopOverlayProps>(
    ({ children, className, focusTrapProps, opened, onClose, onOpen, style, ...htmlDivAttributes }, ref) => {
        // Флаг, в текущий момент оверлей закрывается.
        const [closing, setClosing] = useState(false);
        // FocusTrap активен.
        const [activeFocusTrap, setActiveFocusTrap] = useState(false);
        // Позиция top обёртки оверлея, высчитывается исходя из scrollTop родителя.
        const [overlayWrapperTopPosition, setOverlayWrapperTopPosition] = useState(0);
        // Предыдущее состояние открыт/закрыт.
        const prevOpened = useRef(opened);
        // Ref контейнера.
        const overlayWrapperRef = useRef<HTMLDivElement | null>(null);

        // Пересчет позиционирования оверлея. Бывает неверная позиция, например, при открытии во время скролла родителя.
        const updateTopPosition = () => {
            const overlayWrapper = overlayWrapperRef.current;

            if (!overlayWrapper) {
                return;
            }

            // Верхняя граница экрана LightBox.
            const lightBoxScreenTop = getLightBoxScreenTop(overlayWrapper);
            // Текущее положение оверлея во вьюпорте.
            const { top } = overlayWrapper.getBoundingClientRect();

            setOverlayWrapperTopPosition((topPosition) => getNextTopPosition(topPosition, top, lightBoxScreenTop));
        };

        const handleOpen = () => {
            updateTopPosition();
            setActiveFocusTrap(true);
            onOpen?.();
        };

        // Монтирование сразу с opened={true}: анимации открытия нет, поэтому позицию нужно посчитать до первой
        // отрисовки — в пассивном эффекте кадр с неверным top успел бы попасть на экран.
        useLayoutEffect(() => {
            if (opened) {
                updateTopPosition();
            }
            // Эффект только на маунте: переходы opened обрабатывает эффект ниже.
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, []);

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

        const setOverlayWrapperRef = (instance: HTMLDivElement | null) => {
            overlayWrapperRef.current = instance;

            if (typeof ref === "function") {
                ref(instance);
            } else if (ref) {
                ref.current = instance;
            }
        };

        const renderOverlay = (overlayProps: IOverlayChildrenProvideProps) => (
            <>
                <Overlay.Mask opened={overlayProps.opened} className={styles.topOverlayMask} />
                <Overlay.Panel className={styles.topOverlayPanel} {...overlayProps}>
                    {children}
                </Overlay.Panel>
            </>
        );

        const classNameOverlayWrapper = clsx(
            styles.topOverlayWrapper,
            {
                [styles.closing]: closing,
                [styles.opened]: opened,
            },
            className,
        );

        return (
            <FocusTrapExtended
                active={activeFocusTrap}
                {...focusTrapProps}
                focusTrapOptions={{
                    preventScroll: true,
                    ...focusTrapProps?.focusTrapOptions,
                }}
            >
                <div
                    className={classNameOverlayWrapper}
                    {...htmlDivAttributes}
                    // Вычисленный top перекрывает пользовательский: на нём держится позиционирование панели.
                    style={overlayWrapperTopPosition ? { ...style, top: `${overlayWrapperTopPosition}px` } : style}
                    ref={setOverlayWrapperRef}
                >
                    <Overlay
                        onClose={handleClose}
                        onClosing={handleClosing}
                        onOpen={handleOpen}
                        opened={opened}
                        setOpened={noopSetOpened}
                        className={styles.topOverlay}
                        direction={EOverlayDirection.TOP}
                    >
                        {renderOverlay}
                    </Overlay>
                </div>
            </FocusTrapExtended>
        );
    },
);

TopOverlay.displayName = "TopOverlay";
