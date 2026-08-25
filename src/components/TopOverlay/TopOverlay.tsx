import React, { useState, useEffect, useRef } from "react";
import clsx from "clsx";
import { FocusTrapExtended, IFocusTrapExtendedProps } from "../FocusTrapExtended";
import { Overlay, IOverlayProps } from "../Overlay/Overlay";
import { EOverlayDirection, IOverlayChildrenProvideProps } from "../Overlay/OverlayBase";
import { getLightBoxScreenTop, getNextTopPosition } from "./utils";
import styles from "./styles/TopOverlay.module.less";

/** Свойства компонента TopOverlay. */
export interface ITopOverlayProps extends Pick<IOverlayProps, "opened" | "onOpen" | "onClose"> {
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
export const TopOverlay: React.FC<ITopOverlayProps> = ({
    children,
    focusTrapProps,
    opened,
    onClose,
    onOpen,
    // По типам restProps пуст — все ключи ITopOverlayProps деструктурированы выше. Спред ниже сохранён ради
    // нетипизированных потребителей: Overlay кладёт неизвестные props на свой корневой div, и, например,
    // data-атрибуты доезжают до DOM. className и direction намеренно стоят после спреда — перекрыть их нельзя.
    ...restProps
}) => {
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
            <Overlay.Mask opened={overlayProps.opened} className={styles.topOverlayMask} />
            <Overlay.Panel className={styles.topOverlayPanel} {...overlayProps}>
                {children}
            </Overlay.Panel>
        </>
    );

    const classNameOverlayWrapper = clsx(styles.topOverlayWrapper, {
        [styles.closing]: closing,
        [styles.opened]: opened,
    });

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
                ref={overlayWrapperRef}
                style={overlayWrapperTopPosition ? { top: `${overlayWrapperTopPosition}px` } : undefined}
            >
                <Overlay
                    onClose={handleClose}
                    onClosing={handleClosing}
                    onOpen={handleOpen}
                    opened={opened}
                    setOpened={noopSetOpened}
                    {...restProps}
                    className={styles.topOverlay}
                    direction={EOverlayDirection.TOP}
                >
                    {renderOverlay}
                </Overlay>
            </div>
        </FocusTrapExtended>
    );
};

TopOverlay.displayName = "TopOverlay";
