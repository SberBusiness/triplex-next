import React, { useEffect, useState } from "react";
import { CSSTransition } from "react-transition-group";
import { Portal } from "../Portal/Portal";
import { FocusTrap, FocusTrapProps } from "focus-trap-react";
import { ModalWindowViewManager } from "./components/ModalWindowViewManager";
import { useToken } from "../ThemeProvider/useToken";
import clsx from "clsx";
import styles from "./styles/ModalWindow.module.less";
import { EComponentSize } from "@sberbusiness/triplex-next/enums/EComponentSize";
import { createSizeToClassNameMap } from "@sberbusiness/triplex-next/utils/classNameMaps";

/** Свойства компонента модального окна. */
export interface IModalWindowProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Открыто ли модальное окно. */
    isOpen: boolean;
    /** Содержимое модального окна. Обычно — `ModalWindowContent` с вложенными `ModalWindowHeader`, `ModalWindowBody`, `ModalWindowFooter`. */
    children: React.ReactElement;
    /** ClassName контейнера модального окна. */
    containerClassName?: string;
    /** Свойства FocusTrap. Используется npm-пакет focus-trap-react. */
    focusTrapProps?: FocusTrapProps;
    /** Callback после анимации закрытия модального окна. */
    onExited?: () => void;
    /** Кнопка закрыть. Обычно — `ModalWindowClose`. Рендерится внутри корневого dialog-элемента поверх контента. */
    closeButton: React.ReactNode;
    /** Размер модального окна. По умолчанию `EComponentSize.MD`. */
    size?: EComponentSize;
    /** Отступ сверху модального окна, px. По умолчанию `100`. */
    topPosition?: number;
}

/** Имя класса для некоторых элементов связанных с компонентом. */
const modalNodeName = "ufs-modal-window";

/** Время css-анимации скрытия модального окна. */
const animationExitTime = 300;

/** Класс от Layout(сббола), который блюрит(blur) фоновый контент. */
const bodyClassNameModalOpen = ["modal-open", "no-hash-overflow-hidden"];

const sizeToClassNameMap = createSizeToClassNameMap(styles);

/** Создаёт портальную ноду модалки и прикрепляет её к общему wrapper в body. */
const getOrCreateMountNode = (): HTMLDivElement => {
    let wrapperNode = document.querySelector<HTMLDivElement>(`#${modalNodeName}-wrapper`);

    if (!wrapperNode) {
        wrapperNode = document.createElement("div");
        wrapperNode.setAttribute("id", `${modalNodeName}-wrapper`);
        document.body.appendChild(wrapperNode);
    }

    const node = document.createElement("div");
    node.className = `${modalNodeName}-portal-node`;
    wrapperNode.appendChild(node);
    return node;
};

/**
 * Модальное окно. Рендерится через Portal поверх контента страницы, добавляет
 * затемнённый backdrop, удерживает фокус внутри (FocusTrap) и блокирует скролл
 * `body` через классы `modal-open` + `no-hash-overflow-hidden`.
 */
export const ModalWindow = React.forwardRef<HTMLDivElement, IModalWindowProps>((props, ref) => {
    const {
        isOpen,
        children,
        containerClassName,
        focusTrapProps,
        onExited,
        closeButton,
        size = EComponentSize.MD,
        className,
        topPosition = 100,
        ...rest
    } = props;

    // topPosition нужен, чтобы команда могла переопределить значение.
    const topPositionStyle = { "--modal-window-top": `${topPosition}px` } as React.CSSProperties;

    // Контейнер портала. Создаётся и сразу же прикрепляется к wrapper в DOM при первом рендере —
    // это нужно, чтобы FocusTrap при mount нашёл tabbable-узлы внутри модалки (если делать attach
    // позже, в onEnter CSSTransition, FocusTrap активируется раньше и падает с
    // "must have at least one container with at least one tabbable node").
    // Сама модалка скрывается/показывается через CSSTransition (mountOnEnter / unmountOnExit).
    const [mountNode] = useState<HTMLDivElement>(getOrCreateMountNode);

    const { scopeClassName } = useToken();

    /** Удаление стилей body. */
    const removeBodyClasses = () => {
        const bodyClassList = document.body.classList;

        if (bodyClassList.contains(bodyClassNameModalOpen[0])) {
            bodyClassList.remove(...bodyClassNameModalOpen);
        }
    };

    /** Вспомогательный обработчик при открытии модального окна (CSSTransition onEnter). */
    const handleOpenModal = () => {
        const bodyClassList = document.body.classList;
        if (!bodyClassList.contains(bodyClassNameModalOpen[0])) {
            bodyClassList.add(...bodyClassNameModalOpen);
        }
    };

    /** Вспомогательный обработчик после анимации закрытия модального окна (CSSTransition onExited). */
    const handleCloseModal = () => {
        removeBodyClasses();
        onExited?.();
    };

    /** Установка ref. */
    const setRef = (instance: HTMLDivElement | null) => {
        if (typeof ref === "function") {
            ref(instance);
        } else if (ref) {
            ref.current = instance;
        }
    };

    useEffect(() => {
        return () => {
            mountNode.parentNode?.removeChild(mountNode);
            removeBodyClasses();
        };
    }, [mountNode]);

    const classNameContainer = clsx(scopeClassName, styles.modalWindowContainer, containerClassName);

    const classNameModalWindow = clsx(styles.modalWindow, sizeToClassNameMap[size], className);

    return (
        <>
            <Portal container={mountNode}>
                <CSSTransition
                    in={isOpen}
                    timeout={animationExitTime}
                    classNames="global-modalWindowTransition"
                    appear // Нужен для срабатывания onEnter.
                    enter
                    exit
                    onEnter={handleOpenModal}
                    onExited={handleCloseModal}
                    mountOnEnter
                    unmountOnExit
                >
                    <FocusTrap
                        active={isOpen}
                        {...focusTrapProps}
                        focusTrapOptions={{
                            allowOutsideClick: true,
                            preventScroll: true,
                            ...focusTrapProps?.focusTrapOptions,
                        }}
                    >
                        <div className={classNameContainer} style={topPositionStyle}>
                            <div className={styles.modalWindowBackdrop} />
                            <div
                                role="dialog"
                                aria-modal="true"
                                {...rest}
                                ref={setRef}
                                className={classNameModalWindow}
                            >
                                <div className={styles.modalWindowContentWrapper}>
                                    {children}
                                    {closeButton}
                                </div>
                            </div>
                        </div>
                    </FocusTrap>
                </CSSTransition>
            </Portal>
            <ModalWindowViewManager />
        </>
    );
});

ModalWindow.displayName = "ModalWindow";
