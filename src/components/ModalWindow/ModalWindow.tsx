import React, { useEffect, useRef, useState } from "react";
import { CSSTransition } from "react-transition-group";
import { classnames } from "@sber-business/triplex/utils/classnames/classnames";
import { EModalWindowSize } from "@sber-business/triplex/components/ModalWindow/enums";
import { mapModalWindowSizeToClassName } from "@sber-business/triplex/components/ModalWindow/utils";
import { overlayDataAttributeIsOpen } from "@sber-business/triplex/components/ModalWindow/components/ModalWindowTopOverlay";
import { Portal } from "@sber-business/triplex/components/Portal/Portal";
import FocusTrap from "focus-trap-react";
import { ModalWindowViewManager } from "@sber-business/triplex/components/ModalWindow/components/ModalWindowViewManager";
import { useToken } from "@sber-business/triplex/components/ThemeProvider/useToken";

/** Свойства компонента модального окна. */
export interface IModalWindowProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Открыто ли модальное окно. */
    isOpen: boolean;
    children: React.ReactElement;
    /** ClassName контейнера модального окна. */
    containerClassName?: string;
    /** Свойства FocusTrap. Используется npm-пакет focus-trap-react. */
    focusTrapProps?: FocusTrap.Props;
    /** Состояние загрузки. */
    isLoading?: boolean;
    /** Callback после анимации закрытия модального окна. */
    onExited?: () => void;
    /** Кнопка закрыть. */
    closeButton: React.ReactNode;
    /** Размер модального окна. */
    size?: EModalWindowSize;
}

/** Имя класса для некоторых элементов связанных с компонентом. */
const modalNodeName = "ufs-modal-window";

/** Время css-анимации скрытия модального окна. */
const animationExitTime = 300;

/** Класс от Layout(сббола), который блюрит(blur) фоновый контент. */
const bodyClassNameModalOpen = ["modal-open", "no-hash-overflow-hidden"];

export const ModalWindow = React.forwardRef<HTMLDivElement, IModalWindowProps>((props, ref) => {
    const {
        isOpen,
        children,
        containerClassName,
        focusTrapProps,
        isLoading,
        onExited,
        closeButton,
        size = EModalWindowSize.MD,
        className,
        ...rest
    } = props;

    const [renderPortal, setRenderPortal] = useState(false);
    const [isTopOverlayOpen, setIsTopOverlayOpen] = useState(false);

    const mountNode = useRef<HTMLDivElement | null>(null);
    const modalWindowNode = useRef<HTMLDivElement | null>(null);

    const { scopeClassName } = useToken();

    useEffect(() => {
        checkTopOverlaysIsOpen();

        return () => {
            unmountPortalNode();
            removeBodyClasses();
        };
    }, []);

    useEffect(() => {
        if (isOpen) {
            mountPortalNode();
            setRenderPortal(true);
        }
    }, [isOpen]);

    useEffect(() => {
        checkTopOverlaysIsOpen();
    }, [children]);

    /**
     * Проверка открытости TopOverlay.
     */
    const checkTopOverlaysIsOpen = () => {
        const nextTopOverlayIsOpen = Boolean(
            mountNode.current && mountNode?.current.querySelectorAll(`[${overlayDataAttributeIsOpen}]`).length > 0
        );

        if (isTopOverlayOpen !== nextTopOverlayIsOpen) {
            setIsTopOverlayOpen(nextTopOverlayIsOpen);

            if (nextTopOverlayIsOpen && modalWindowNode.current) {
                modalWindowNode.current.scrollTop = 0;
            }
        }
    };

    /** Подключение собственной node для портала. */
    const mountPortalNode = () => {
        let wrapperNode = document.querySelector<HTMLDivElement>(`#${modalNodeName}-wrapper`);

        if (!wrapperNode) {
            wrapperNode = document.createElement("div");
            wrapperNode.setAttribute("id", `${modalNodeName}-wrapper`);
            document.body.appendChild(wrapperNode);
        }

        mountNode.current = document.createElement("div");
        mountNode.current.className = `${modalNodeName}-portal-node`;

        if (wrapperNode) {
            wrapperNode.appendChild(mountNode.current);
        }
    };

    /** Удаление созданной node для портала.
     * (За исключением <div id="ufs-modal-window-wrapper"></div> - это div во внешнем лайауте, куда должна встраиваться модалка)
     */
    const unmountPortalNode = () => {
        if (mountNode.current) {
            mountNode.current.parentNode?.removeChild(mountNode.current);
        }
    };

    /** Удаление стилей body. */
    const removeBodyClasses = () => {
        const bodyClassList = document.body.classList;

        if (bodyClassList.contains(bodyClassNameModalOpen[0])) {
            bodyClassList.remove(...bodyClassNameModalOpen);
        }
    };

    /** Вспомогательный обработчик при открытии модального окна. */
    const handleOpenModal = () => {
        const bodyClassList = document.body.classList;
        if (!bodyClassList.contains(bodyClassNameModalOpen[0])) {
            bodyClassList.add(...bodyClassNameModalOpen);
        }
    };

    /** Вспомогательный обработчик при закрытии модального окна. */
    const handleCloseModal = () => {
        unmountPortalNode();
        removeBodyClasses();

        setRenderPortal(false);

        if (onExited) {
            onExited();
        }
    };

    /** Установка ref. */
    const setRef = (instance: HTMLDivElement | null) => {
        if (typeof ref === "function") {
            ref(instance);
        } else if (ref) {
            ref.current = instance;
        }
    };

    if (!renderPortal || !mountNode.current) return null;

    const classNameContainer = classnames(
        "cssClass[modalWindowContainer]",
        { "cssClass[modalTopOverlayActive]": isTopOverlayOpen },
        containerClassName
    );

    const classNameModalWindow = classnames(
        scopeClassName,
        "cssClass[modalWindow]",
        mapModalWindowSizeToClassName[size],
        className
    );

    return (
        <>
            <Portal container={mountNode.current}>
                <CSSTransition
                    in={isOpen}
                    timeout={animationExitTime}
                    classNames="modalWindowTransition"
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
                            clickOutsideDeactivates: true,
                            preventScroll: true,
                            ...focusTrapProps?.focusTrapOptions,
                        }}
                    >
                        <div className={classNameContainer}>
                            <div className="cssClass[modalWindowBackdrop]" />
                            <div
                                role="dialog"
                                aria-modal="true"
                                {...rest}
                                ref={setRef}
                                className={classNameModalWindow}
                            >
                                <div className="cssClass[modalWindowContentWrapper]">
                                    {React.cloneElement(children, { isLoading, key: "content" })}
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
