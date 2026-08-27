import React, { useState, useEffect, useRef } from "react";
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

/** Inline-стиль обёртки: рассчитанная позиция уходит в runtime-переменную, а не в свойство top. */
interface ITopOverlayWrapperStyle extends React.CSSProperties {
    "--triplex-next-runtime-TopOverlay-Top"?: string;
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
        // Позиция top обёртки оверлея, высчитывается исходя из scrollTop родителя. undefined — ещё не рассчитана.
        const [overlayWrapperTopPosition, setOverlayWrapperTopPosition] = useState<number | undefined>(undefined);
        // Предыдущее состояние открыт/закрыт.
        const prevOpened = useRef(opened);
        // Флаг первого рендера. Отличает открытие на маунте от открытия переходом.
        const isFirstRender = useRef(true);
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

            setOverlayWrapperTopPosition((topPosition) => getNextTopPosition(topPosition ?? 0, top, lightBoxScreenTop));
        };

        const handleOpen = () => {
            // При открытии на маунте позиция не пересчитывается: лайтбокс в этот момент ещё не на своём месте
            // (у него собственная анимация появления), а getBoundingClientRect учитывает transform родителей —
            // измерение дало бы смещение в никуда. Позиция остаётся заданной стилями, коррекция применяется
            // при следующем открытии переходом false → true.
            if (!isFirstRender.current) {
                updateTopPosition();
            }

            setActiveFocusTrap(true);
            onOpen?.();
        };

        useEffect(() => {
            isFirstRender.current = false;
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
            setOverlayWrapperTopPosition(undefined);
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

        // Рассчитанная позиция публикуется runtime-переменной, которую читает .topOverlayWrapper в LESS: inline
        // styles в компонентах запрещены (docs/ai/codestyle.md). Ноль здесь такой же результат расчёта, как любой
        // другой, поэтому признак «не рассчитано» — undefined, а не 0.
        const wrapperStyle: ITopOverlayWrapperStyle | undefined =
            overlayWrapperTopPosition === undefined
                ? style
                : { ...style, "--triplex-next-runtime-TopOverlay-Top": `${overlayWrapperTopPosition}px` };

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
                    style={wrapperStyle}
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
