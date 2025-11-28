import React, { useEffect, useRef, useState } from "react";
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
    children: React.ReactElement;
    /** ClassName контейнера модального окна. */
    containerClassName?: string;
    /** Свойства FocusTrap. Используется npm-пакет focus-trap-react. */
    focusTrapProps?: FocusTrapProps;
    /** Состояние загрузки. */
    isLoading?: boolean;
    /** Callback после анимации закрытия модального окна. */
    onExited?: () => void;
    /** Кнопка закрыть. */
    closeButton: React.ReactNode;
    /** Размер модального окна. */
    size?: EComponentSize;
}

/** Имя класса для некоторых элементов связанных с компонентом. */
const modalNodeName = "ufs-modal-window";

/** Время css-анимации скрытия модального окна. */
const animationExitTime = 300;

/** Класс от Layout(сббола), который блюрит(blur) фоновый контент. */
const bodyClassNameModalOpen = ["modal-open", "no-hash-overflow-hidden"];

const sizeToClassNameMap = createSizeToClassNameMap(styles);

export const ModalWindow = React.forwardRef<HTMLDivElement, IModalWindowProps>((props, ref) => {
    const {
        isOpen,
        children,
        containerClassName,
        focusTrapProps,
        isLoading,
        onExited,
        closeButton,
        size = EComponentSize.MD,
        className,
        ...rest
    } = props;

    const [renderPortal, setRenderPortal] = useState(false);

    const mountNode = useRef<HTMLDivElement | null>(null);

    const { scopeClassName } = useToken();

    useEffect(() => {
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

    const classNameContainer = clsx(scopeClassName, styles.modalWindowContainer, containerClassName);

    const classNameModalWindow = clsx(styles.modalWindow, sizeToClassNameMap[size], className);

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
                            <div className={styles.modalWindowBackdrop} />
                            <div
                                role="dialog"
                                aria-modal="true"
                                {...rest}
                                ref={setRef}
                                className={classNameModalWindow}
                            >
                                <div className={styles.modalWindowContentWrapper}>
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
