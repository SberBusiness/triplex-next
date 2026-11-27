import React, { useState, useEffect, useRef, useMemo } from "react";
import clsx from "clsx";
import { isKey } from "../../utils/keyboard";
import { mergeRefs } from "../../utils/refs";
import { FocusTrapExtended, IFocusTrapExtendedProps } from "../FocusTrapExtended";
import { IOverlayChildrenProvideProps } from "../Overlay/OverlayBase";
import { useToken } from "../ThemeProvider/useToken";
import styles from "./styles/Puller.module.less";

/** Свойства компонента PullerInner. */
export interface IPullerInnerProps extends IOverlayChildrenProvideProps, React.HTMLAttributes<HTMLDivElement> {
    /** Свойства ловушки фокуса. Ловушка включена по умолчанию, отключается через `{ active: false }`. */
    focusTrapProps?: IFocusTrapExtendedProps;
}

/** Внутренняя разметка Puller: подложка и контент с анимацией открытия/закрытия. */
export const PullerInner = React.forwardRef<HTMLDivElement, IPullerInnerProps>(
    (
        {
            children,
            className,
            opened: openedProp,
            opening: openingProp,
            closing,
            setOpened,
            setClosing,
            setOpening,
            focusTrapProps,
            tabIndex,
            ...restProps
        },
        ref,
    ) => {
        const focusTrapActive = focusTrapProps?.active !== false;
        // Внутренний ref нужен для initialFocus и fallbackFocus ловушки; наружу пробрасывается тот же узел.
        const contentRef = useRef<HTMLDivElement | null>(null);
        const setContentRef = useMemo(() => mergeRefs(contentRef, ref), [ref]);
        // Флаги догоняют props на следующем тике: без кадра в закрытом виде CSS-переход открытия не запустится.
        const [openingState, setOpeningState] = useState(false);
        const [openedState, setOpenedState] = useState(false);
        const { scopeClassName } = useToken();

        useEffect(() => {
            const timeoutId = setTimeout(() => setOpeningState(openingProp));

            return () => clearTimeout(timeoutId);
        }, [openingProp]);

        useEffect(() => {
            const timeoutId = setTimeout(() => setOpenedState(openedProp));

            return () => clearTimeout(timeoutId);
        }, [openedProp]);

        const handleTransitionEnd = (event: React.TransitionEvent<HTMLDivElement>) => {
            const { target, currentTarget } = event;

            if (target === currentTarget) {
                if (closing) {
                    setClosing(false);
                } else if (openingProp) {
                    setOpening(false);
                }
            }
        };

        const closePuller = () => {
            if (openedProp) {
                setOpened(false);
            }
        };

        // Escape закрывает шторку, когда фокус внутри неё. Всплытие останавливается: события портала идут по дереву
        // React, и иначе закрылись бы и внешняя шторка, и модальное окно со слушателем на window.
        const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
            if (isKey(event.key, "ESCAPE")) {
                event.stopPropagation();
                closePuller();
            }
        };

        if (!openingProp && !openedProp && !closing) {
            return null;
        }

        const animationClassNames = {
            [styles.opened]: openedState,
            [styles.opening]: openingState,
        };

        return (
            <FocusTrapExtended
                {...focusTrapProps}
                active={openedProp && focusTrapActive}
                focusTrapOptions={{
                    preventScroll: true,
                    escapeDeactivates: false,
                    // Фокус при открытии — на контейнер, а не на первый tabbable: иначе появляется обводка
                    // на кнопке закрытия, а текст поля ввода выделяется. Если фокус уже внутри (autoFocus поля),
                    // undefined оставляет его на месте — это поведение focus-trap по умолчанию.
                    initialFocus: () => {
                        const content = contentRef.current;

                        return content && !content.contains(document.activeElement) ? content : undefined;
                    },
                    fallbackFocus: () => contentRef.current ?? document.body,
                    ...focusTrapProps?.focusTrapOptions,
                }}
            >
                <div
                    // Шторка закрыта с момента setOpened(false), анимация закрытия — только визуальный хвост:
                    // на это время обёртка на весь экран пропускает клики и тапы к странице.
                    className={clsx(styles.pullerWrapper, { [styles.closing]: !openedProp }, scopeClassName, className)}
                    onKeyDown={handleKeyDown}
                >
                    <div
                        className={clsx(styles.pullerBackdrop, animationClassNames)}
                        onTransitionEnd={handleTransitionEnd}
                        onTouchStart={closePuller}
                        onMouseDown={closePuller}
                    />
                    <div
                        {...restProps}
                        // tabIndex нужен, чтобы ловушка могла поставить фокус на контейнер (initialFocus, fallbackFocus).
                        tabIndex={tabIndex ?? (focusTrapActive ? -1 : undefined)}
                        className={clsx(styles.puller, animationClassNames)}
                        ref={setContentRef}
                    >
                        {children}
                    </div>
                </div>
            </FocusTrapExtended>
        );
    },
);

PullerInner.displayName = "PullerInner";
