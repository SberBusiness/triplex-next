import React from "react";
import { useState, useEffect, useRef, useLayoutEffect } from "react";

export enum EOverlayDirection {
    BOTTOM = "bottom",
    LEFT = "left",
    RIGHT = "right",
    TOP = "top",
}

export interface IOverlayBaseProps {
    /**
     * Render-функция контента оверлея. Получает свойства состояния оверлея.
     */
    children: (props: IOverlayChildrenProvideProps) => React.ReactElement;
    /**
     * Расположение панели с контентом.
     */
    direction: EOverlayDirection;
    /**
     * Оверлей открыт.
     */
    opened: boolean;
    /**
     * Обработчик закрытия оверлея.
     */
    onClose?: () => void;
    /**
     * Обработчик события closing, вызывается перед закрытием.
     */
    onClosing?: () => void;
    /**
     * Обработчик открытия оверлея.
     */
    onOpen?: () => void;
    /**
     * Обработчик события opening, вызывается перед открытием.
     */
    onOpening?: () => void;
    /**
     * Устанавливает флаг opened.
     */
    setOpened: (opened: boolean) => void;
}

/**
 * Свойства, передаваемые в render-функцию панели оверлея.
 */
export interface IOverlayChildrenProvideProps extends Pick<IOverlayBaseProps, "direction" | "opened" | "setOpened"> {
    /**
     * Оверлей закрывается в текущий момент.
     */
    closing: boolean;
    /**
     * Оверлей открывается в текущий момент.
     */
    opening: boolean;
    /**
     * Устанавливает флаг closing.
     */
    setClosing: (closing: boolean) => void;
    /**
     * Устанавливает флаг opening.
     */
    setOpening: (opening: boolean) => void;
}

/**
 * Базовый функциональный компонент оверлея.
 */
export const OverlayBase: React.FC<IOverlayBaseProps> = ({
    children,
    direction = EOverlayDirection.RIGHT,
    opened,
    onClose,
    onClosing,
    onOpen,
    onOpening,
    setOpened,
}) => {
    // Флаг, в текущий момент оверлей закрывается.
    const [closing, setClosing] = useState(false);
    // Флаг, в текущий момент оверлей открывается.
    const [opening, setOpening] = useState(false);
    // Предыдущее состояние opened.
    const prevOpened = useRef(opened);
    // Флаг первого рендера. Эффекты по [closing]/[opening] не должны срабатывать на маунте.
    const isFirstRender = useRef(true);
    // Актуальные колбэки. Хранятся в ref, чтобы эффекты зависели только от своих state-триггеров.
    const callbacks = useRef({ onClose, onClosing, onOpen, onOpening });

    // Обновление ref с колбэками выполняется в layout-фазе до эффектов, читающих callbacks.current.
    useLayoutEffect(() => {
        callbacks.current = { onClose, onClosing, onOpen, onOpening };
    });

    // Здесь намеренно используется useLayoutEffect, а не useEffect, иначе в браузере может быть мерцание при закрытии.
    useLayoutEffect(() => {
        if (prevOpened.current && !opened) {
            setOpening(false); // opened меняется в процессе анимации открытия.
            setClosing(true);
            callbacks.current.onClosing?.();
        } else if (!prevOpened.current && opened) {
            setClosing(false); // opened меняется в процессе анимации закрытия.
            setOpening(true);
            callbacks.current.onOpening?.();
        }

        prevOpened.current = opened;
    }, [opened]);

    useEffect(() => {
        if (isFirstRender.current) {
            return;
        }

        if (closing) {
            callbacks.current.onClosing?.();
        } else {
            callbacks.current.onClose?.();
        }
    }, [closing]);

    useEffect(() => {
        if (isFirstRender.current) {
            return;
        }

        if (opening) {
            callbacks.current.onOpening?.();
        } else {
            callbacks.current.onOpen?.();
        }
    }, [opening]);

    useEffect(() => {
        isFirstRender.current = false;
    }, []);

    return children({ closing, direction, opened, opening, setClosing, setOpened, setOpening });
};
