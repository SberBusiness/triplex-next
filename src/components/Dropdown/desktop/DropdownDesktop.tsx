import React, { useState, useRef, useCallback, useEffect } from "react";
import clsx from "clsx";
import { EDropdownAlignment, EDropdownDirection, EDropdownWidth } from "./enums";
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
    /** Размер дропдауна. */
    size?: EComponentSize;
    /** Направление выпадающего меню. */
    direction?: EDropdownDirection;
    /** Выравнивание списка относительно управляющего элемента. */
    alignment?: EDropdownAlignment;
    /** Вариант расчёта ширины выпадающего списка. */
    width?: EDropdownWidth;
}

const sizeToClassNameMap = createSizeToClassNameMap(styles);

const overflowHiddenClassName = styles.dropdownDesktopOverflowHidden;

/** Выпадающее меню. */
export const DropdownDesktop = React.forwardRef<HTMLDivElement, IDropdownDesktopProps>((props, ref) => {
    const {
        children,
        className,
        style: styleProp,
        size = EComponentSize.MD,
        direction = EDropdownDirection.AUTO,
        alignment = EDropdownAlignment.LEFT,
        width = EDropdownWidth.CONTENT,
        opened,
        targetRef,
        setOpened,
        ...rest
    } = props;
    const [styleState, setStyleState] = useState<React.CSSProperties>({ opacity: 0 });
    const dropdownRef = useRef<HTMLDivElement | null>(null);

    const { scopeClassName } = useToken();
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
        (css: React.CSSProperties, targetRect: DOMRect, expectedWidth: number) => {
            const clientWidth = document.documentElement.clientWidth;

            const leftPos = targetRect.left;
            const rightPos = targetRect.right - expectedWidth;

            if (alignment === EDropdownAlignment.LEFT) {
                const fitsRightSide = leftPos + expectedWidth <= clientWidth;
                css.left = fitsRightSide ? leftPos : Math.max(0, rightPos);
            } else {
                const fitsLeftSide = rightPos >= 0;
                css.left = fitsLeftSide ? rightPos : Math.max(0, Math.min(leftPos, clientWidth - expectedWidth));
            }
        },
        [alignment],
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
        if (dropdownRef.current === null || targetRef.current === null) return;

        const dropdownRect = dropdownRef.current.getBoundingClientRect();
        const targetRect = targetRef.current.getBoundingClientRect();
        const css: React.CSSProperties = {};
        let expectedWidth = dropdownRect.width;

        if (width === EDropdownWidth.TARGET) {
            expectedWidth = targetRect.width;
            css.width = targetRect.width;
        } else if (width === EDropdownWidth.MIN_TARGET) {
            expectedWidth = Math.max(dropdownRect.width, targetRect.width);
            css.minWidth = targetRect.width;
        }

        calculatePositionVertical(css, dropdownRect, targetRect);
        calculatePositionHorizontal(css, targetRect, expectedWidth);

        setStyleState(css);
    }, [targetRef, width, calculatePositionVertical, calculatePositionHorizontal]);

    useEffect(() => {
        if (opened) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setPosition();
        } else {
            setStyleState({ opacity: 0 });
        }
    }, [opened, setPosition]);

    useEffect(() => {
        if (!opened || dropdownRef.current === null || targetRef.current === null) return;

        const observer = new ResizeObserver(setPosition);

        observer.observe(dropdownRef.current);
        observer.observe(targetRef.current);
        return () => observer.disconnect();
    }, [opened, targetRef, setPosition]);

    /** Планирует перерасчет позиции дропдауна в следующем кадре. */
    const updatePosition = useCallback(() => {
        setTimeout(setPosition);
    }, [setPosition]);

    useEffect(() => {
        if (opened) {
            document.addEventListener("scroll", updatePosition, true);
            window.addEventListener("resize", updatePosition);
            toggleScrollEventListener(true);
            document.body.classList.add(overflowHiddenClassName);
            updatePosition();

            return () => {
                document.removeEventListener("scroll", updatePosition, true);
                window.removeEventListener("resize", updatePosition);
                toggleScrollEventListener(false);
                document.body.classList.remove(overflowHiddenClassName);
            };
        }
    }, [opened, updatePosition, toggleScrollEventListener]);

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
