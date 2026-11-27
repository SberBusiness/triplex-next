import React, { useState, useRef, useCallback, useEffect } from "react";
import clsx from "clsx";
import { EDropdownAlignment, EDropdownDirection, EDropdownWidth } from "./enums";
import { EComponentSize } from "../../../enums/EComponentSize";
import { setForwardedRef } from "../../../helpers/setForwardedRef";
import { createSizeToClassNameMap } from "../../../utils/classNameMaps";
import { useToken } from "../../ThemeProvider/useToken";
import { isKey } from "../../../utils/keyboard";
import { lockBodyScroll } from "../../../utils/scroll/bodyScrollLock";
import styles from "../styles/DropdownDesktop.module.less";

/** Свойства компонента DropdownDesktop. */
export interface IDropdownDesktopProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Управляемое состояние открытия меню. */
    opened: boolean;
    /** Колбэк общего контракта с Dropdown. Вызывается мобильной веткой Dropdown, десктопная читает opened. */
    setOpened: (opened: boolean) => void;
    /** Ссылка на управляющий элемент, относительно которого вычисляется положение меню. */
    targetRef: React.RefObject<HTMLElement>;
    /** Размер скругления меню. По умолчанию EComponentSize.MD. */
    size?: EComponentSize;
    /** Направление раскрытия меню. По умолчанию EDropdownDirection.AUTO. */
    direction?: EDropdownDirection;
    /** Горизонтальное выравнивание относительно управляющего элемента. По умолчанию EDropdownAlignment.LEFT. */
    alignment?: EDropdownAlignment;
    /** Способ расчёта ширины меню. По умолчанию EDropdownWidth.CONTENT. */
    width?: EDropdownWidth;
}

const SIZE_TO_CLASS_NAME = createSizeToClassNameMap(styles);

/** Поверхностное сравнение inline-стилей позиционирования. */
const isSameStyle = (a: React.CSSProperties, b: React.CSSProperties) => {
    const keys = Object.keys(a) as (keyof React.CSSProperties)[];
    return keys.length === Object.keys(b).length && keys.every((key) => key in b && a[key] === b[key]);
};

/** Стиль до первого расчёта позиции. Один и тот же объект, чтобы повторная установка не вызывала рендер. */
const HIDDEN_STYLE: React.CSSProperties = { opacity: 0 };

/** Клавиши прокрутки страницы. */
const SCROLL_KEYS = [
    "SPACE",
    "PAGE_UP",
    "PAGE_DOWN",
    "END",
    "HOME",
    "ARROW_LEFT",
    "ARROW_UP",
    "ARROW_RIGHT",
    "ARROW_DOWN",
] as const;

/** Запрещает клавишам прокрутки двигать страницу, пока фокус на body. */
const createKeyDownHandler = () => (event: KeyboardEvent) => {
    if (event.target === document.body) {
        const key = event.code || event.keyCode;

        if (SCROLL_KEYS.some((scrollKey) => isKey(key, scrollKey))) {
            event.preventDefault();
        }
    }
};

/** Отступ между управляющим элементом и выпадающим меню, px. */
const TARGET_OFFSET = 4;

/**
 * Десктопная версия выпадающего меню.
 * Позиционируется фиксированно относительно targetRef, пересчитывает положение при скролле,
 * ресайзе окна и изменении размеров меню или управляющего элемента. Пока меню открыто,
 * скролл страницы вне меню заблокирован. В закрытом состоянии ничего не рендерит.
 */
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
    const [styleState, setStyleState] = useState<React.CSSProperties>(HIDDEN_STYLE);
    const dropdownRef = useRef<HTMLDivElement | null>(null);
    const positionTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

    const { scopeClassName } = useToken();
    const classNames = clsx(styles.dropdownDesktop, SIZE_TO_CLASS_NAME[size], scopeClassName, className);

    /** Блокировка скролла вне дропдауна. */
    const wheelHandler = useCallback((event: WheelEvent) => {
        if (!dropdownRef.current?.contains(event.target as Node)) {
            event.preventDefault();
        }
    }, []);

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
            if (direction === EDropdownDirection.AUTO) {
                if (targetRect.bottom + TARGET_OFFSET + dropdownRect.height < document.documentElement.clientHeight) {
                    // Если влезает снизу.
                    css.top = targetRect.bottom + TARGET_OFFSET;
                } else if (targetRect.top - TARGET_OFFSET - dropdownRect.height > 0) {
                    // Если не влезает снизу, но влезает сверху.
                    css.bottom = document.documentElement.clientHeight - targetRect.top + TARGET_OFFSET;
                } else {
                    // Если не влезает снизу и сверху.
                    css.top = targetRect.bottom + TARGET_OFFSET;
                }
            } else if (direction === EDropdownDirection.BOTTOM) {
                css.top = targetRect.bottom + TARGET_OFFSET;
            } else if (direction === EDropdownDirection.TOP) {
                css.bottom = document.documentElement.clientHeight - targetRect.top + TARGET_OFFSET;
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

        // Без смены значений возвращаем прежний объект, чтобы скролл и ресайз не вызывали лишних рендеров.
        setStyleState((prev) => (isSameStyle(prev, css) ? prev : css));
    }, [targetRef, width, calculatePositionVertical, calculatePositionHorizontal]);

    useEffect(() => {
        if (opened) {
            // Положение можно посчитать только после того, как меню отрендерено и его размеры измеримы.
            setPosition();
        } else {
            setStyleState(HIDDEN_STYLE);
        }
    }, [opened, setPosition]);

    useEffect(() => {
        if (!opened || dropdownRef.current === null || targetRef.current === null) return;

        let frame: number | undefined;
        const observer = new ResizeObserver(() => {
            // Соседние поля могут изменить раскладку в том же цикле ResizeObserver.
            if (frame !== undefined) return;
            frame = requestAnimationFrame(() => {
                frame = undefined;
                setPosition();
            });
        });

        observer.observe(dropdownRef.current);
        observer.observe(targetRef.current);
        return () => {
            observer.disconnect();
            if (frame !== undefined) cancelAnimationFrame(frame);
        };
    }, [opened, targetRef, setPosition]);

    /** Планирует перерасчёт позиции меню после обработки текущего события. */
    const updatePosition = useCallback(() => {
        clearTimeout(positionTimeoutRef.current);
        positionTimeoutRef.current = setTimeout(setPosition);
    }, [setPosition]);

    useEffect(() => {
        if (opened) {
            document.addEventListener("scroll", updatePosition, true);
            window.addEventListener("resize", updatePosition);

            return () => {
                document.removeEventListener("scroll", updatePosition, true);
                window.removeEventListener("resize", updatePosition);
                clearTimeout(positionTimeoutRef.current);
            };
        }
    }, [opened, updatePosition]);

    /** Блокировка скролла страницы вне дропдауна. Не зависит от параметров позиционирования, чтобы не сниматься при их смене. */
    useEffect(() => {
        if (opened) {
            document.addEventListener("wheel", wheelHandler, { passive: false });
            // Обработчик уникален для экземпляра: иначе cleanup одного дропдауна снимет общий обработчик у остальных.
            const onKeyDown = createKeyDownHandler();
            document.addEventListener("keydown", onKeyDown);
            const unlockBodyScroll = lockBodyScroll(styles.dropdownDesktopScrollLock);

            return () => {
                document.removeEventListener("wheel", wheelHandler);
                document.removeEventListener("keydown", onKeyDown);
                unlockBodyScroll();
            };
        }
    }, [opened, wheelHandler]);

    /** Стабильный callback ref: внешний ref не вызывается с null/элементом на каждом рендере. */
    const setRef = useCallback(
        (instance: HTMLDivElement | null) => {
            dropdownRef.current = instance;
            setForwardedRef(ref, instance);
        },
        [ref],
    );

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
