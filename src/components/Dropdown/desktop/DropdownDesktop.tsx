import React, { useState, useRef, useCallback, useEffect } from "react";
import clsx from "clsx";
import { EDropdownAlignment, EDropdownDirection } from "../enums";
import { EComponentSize } from "../../../enums/EComponentSize";
import { createSizeToClassNameMap } from "../../../utils/classNameMaps";
import { useToken } from "../../ThemeProvider/useToken";
import { isKey } from "../../../utils/keyboard";
import styles from "../styles/DropdownDesktop.module.less";

/** Свойства компонента DropdownDesktop. */
export interface IDropdownDesktopProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Открыт. */
    opened: boolean;
    /** Устанавливает флаг opened. */
    setOpened: (opened: boolean) => void;
    /** Ссылка на управляющий элемент. */
    targetRef: React.RefObject<HTMLElement>;
    /** Направление выпадающего меню. */
    direction?: EDropdownDirection;
    /** Выравнивание списка относительно управляющего элемента. */
    alignment?: EDropdownAlignment;
    /** Фиксированная ширина по управляющему элементу. */
    fixedWidth?: boolean;
    /** Размер дропдауна. */
    size?: EComponentSize;
}

const sizeToClassNameMap = createSizeToClassNameMap(styles);

const overflowHiddenClassName = styles.dropdownDesktopOverflowHidden;

/** Выпадающее меню. */
export const DropdownDesktop = React.forwardRef<HTMLDivElement, IDropdownDesktopProps>((props, ref) => {
    const {
        alignment = EDropdownAlignment.AUTO,
        children,
        fixedWidth,
        className,
        direction = EDropdownDirection.AUTO,
        opened,
        setOpened,
        style: styleProp,
        targetRef,
        size = EComponentSize.MD,
        ...rest
    } = props;
    const { scopeClassName } = useToken();

    const [styleState, setStyleState] = useState<React.CSSProperties>({ opacity: 0 });
    const dropdownRef = useRef<HTMLDivElement | null>(null);
    const dropdownRes = useRef<{ width: number; height: number }>({ height: 0, width: 0 });
    const classNames = clsx(styles.dropdownDesktop, sizeToClassNameMap[size], scopeClassName, className);

    /** Блокировка скролла вне дропдауна. */
    const wheelHandler = useCallback(
        (event: WheelEvent) => {
            if (!dropdownRef.current?.contains(event.target as Node)) {
                event.preventDefault();
            }
        },
        [dropdownRef],
    );

    const keyDownHandler = useCallback((event: KeyboardEvent) => {
        if (event.target === document.body) {
            const key = event.code || event.keyCode;

            if (
                isKey(key, "SPACE") ||
                isKey(key, "PAGE_UP") ||
                isKey(key, "PAGE_DOWN") ||
                isKey(key, "END") ||
                isKey(key, "HOME") ||
                isKey(key, "ARROW_LEFT") ||
                isKey(key, "ARROW_UP") ||
                isKey(key, "ARROW_RIGHT") ||
                isKey(key, "ARROW_DOWN")
            ) {
                event.preventDefault();
            }
        }
    }, []);

    /** Управление скроллом внешней области.  */
    const toggleScrollEventListener = useCallback(
        /** Запрет скролла всей страницы. */
        (add: boolean) => {
            if (add) {
                document.addEventListener("wheel", wheelHandler, { passive: false });
                document.addEventListener("keydown", keyDownHandler);
            } else {
                document.removeEventListener("wheel", wheelHandler);
                document.removeEventListener("keydown", keyDownHandler);
            }
        },
        [wheelHandler, keyDownHandler],
    );

    /** Расчёт положения по горизонтали. */
    const calculatePositionHorizontal = useCallback(
        (css: React.CSSProperties, dropdownRect: DOMRect, targetRect: DOMRect) => {
            const width = fixedWidth ? targetRect.width : Math.max(targetRect.width, dropdownRect.width);

            if (alignment === EDropdownAlignment.AUTO) {
                if (targetRect.right - width > 0) {
                    // Если влезает слева.
                    css.left = targetRect.right - width;
                } else if (targetRect.left + width < document.documentElement.clientWidth) {
                    // Если влезает справа.
                    css.left = targetRect.left;
                } else {
                    // Если не влезает слева и справа.
                    css.left = targetRect.right - width;
                }
            } else if (alignment === EDropdownAlignment.RIGHT) {
                css.left = targetRect.right - width;
            } else if (alignment === EDropdownAlignment.LEFT) {
                css.left = targetRect.left;
            }
        },
        [alignment, fixedWidth],
    );

    /** Расчёт положения по вертикали. */
    const calculatePositionVertical = useCallback(
        (css: React.CSSProperties, dropdownRect: DOMRect, targetRect: DOMRect) => {
            // Отступ между target и dropdown.
            const offset = 4;

            if (direction === EDropdownDirection.AUTO) {
                if (targetRect.bottom + offset + dropdownRect.height < document.documentElement.clientHeight) {
                    // Если влезает снизу.
                    css.top = targetRect.bottom + offset;
                } else if (targetRect.top - offset - dropdownRect.height > 0) {
                    // Если не влезает снизу, но влезает сверху.
                    css.bottom = document.documentElement.clientHeight - targetRect.top + offset;
                } else {
                    // Если не влезает снизу и сверху.
                    css.top = targetRect.bottom + offset;
                }
            } else if (direction === EDropdownDirection.BOTTOM) {
                css.top = targetRect.bottom + offset;
            } else if (direction === EDropdownDirection.TOP) {
                css.bottom = document.documentElement.clientHeight - targetRect.top + offset;
            }
        },
        [direction],
    );

    /** Установка положения меню. */
    const setPosition = useCallback(() => {
        const { current: dropdown } = dropdownRef;
        const { current: target } = targetRef;

        if (dropdown && target) {
            const dropdownRect = dropdown.getBoundingClientRect();
            const targetRect = target.getBoundingClientRect();
            const css: React.CSSProperties = {};

            if (fixedWidth) {
                css.width = targetRect.width;
            } else {
                css.minWidth = targetRect.width;
            }

            calculatePositionVertical(css, dropdownRect, targetRect);
            calculatePositionHorizontal(css, dropdownRect, targetRect);

            dropdownRes.current = { height: dropdownRect.height, width: dropdownRect.width };
            setStyleState(css);
        }
    }, [targetRef, fixedWidth, calculatePositionVertical, calculatePositionHorizontal]);

    useEffect(() => {
        if (opened) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setPosition();
        } else {
            dropdownRes.current = { height: 0, width: 0 };
            setStyleState({ opacity: 0 });
        }
    }, [opened, setPosition]);

    // При любом изменении контента внутри Dropdown.
    useEffect(() => {
        if (dropdownRef.current) {
            const { width, height } = dropdownRef.current.getBoundingClientRect();

            // Если разрешение не изменилось, позицию не пересчитываем.
            if (width != dropdownRes.current.width || height != dropdownRes.current.height) {
                // eslint-disable-next-line react-hooks/set-state-in-effect
                setPosition();
            }
        }
    }, [children, setPosition]);

    /** Обработчик изменения положения меню. */
    const handleReposition = useCallback(() => {
        setTimeout(setPosition);
    }, [setPosition]);

    useEffect(() => {
        if (opened) {
            document.addEventListener("scroll", handleReposition, true);
            window.addEventListener("resize", handleReposition);
            toggleScrollEventListener(true);
            document.body.classList.add(overflowHiddenClassName);
            handleReposition();

            return () => {
                document.removeEventListener("scroll", handleReposition, true);
                window.removeEventListener("resize", handleReposition);
                toggleScrollEventListener(false);
                document.body.classList.remove(overflowHiddenClassName);
            };
        }
    }, [opened, handleReposition, toggleScrollEventListener]);

    /** Функция для хранения ссылки. */
    const setRef = (instance: HTMLDivElement | null) => {
        dropdownRef.current = instance;
        if (typeof ref === "function") {
            ref(instance);
        } else if (ref) {
            ref.current = instance;
        }
    };

    if (!opened) {
        return null;
    }

    return (
        <div
            className={classNames}
            style={{ ...styleState, ...styleProp }}
            {...rest}
            data-tx={process.env.npm_package_version}
            ref={setRef}
        >
            {children}
        </div>
    );
});

DropdownDesktop.displayName = "DropdownDesktop";
