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
    const [prevOpened, setPrevOpened] = useState(opened);
    // Флаг первого рендера. Эффекты по [closing]/[opening] не должны срабатывать на маунте.
    const isFirstRender = useRef(true);
    // Актуальные колбэки. Хранятся в ref, чтобы эффекты зависели только от своих state-триггеров.
    const callbacks = useRef({ onClose, onClosing, onOpen, onOpening });

    // Обновление ref с колбэками выполняется в layout-фазе до эффектов, читающих callbacks.current.
    useLayoutEffect(() => {
        callbacks.current = { onClose, onClosing, onOpen, onOpening };
    });

    // Флаги обновляются в рендере, а не в эффекте: иначе потомки на один рендер получат opened={false} при
    // closing={false}, и Puller размонтирует содержимое. В children передаются вычисленные значения: React вызывает
    // render-функцию и в том проходе, где вызван setState, — старые флаги не должны попасть даже туда.
    // Противоположный флаг сбрасывается: opened может смениться посреди другой анимации.
    const openedChanged = prevOpened !== opened;
    const currentClosing = openedChanged ? !opened : closing;
    const currentOpening = openedChanged ? opened : opening;

    if (openedChanged) {
        setPrevOpened(opened);
        setClosing(currentClosing);
        setOpening(currentOpening);
    }

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

    // Монтирование сразу с opened={true}: анимации открытия нет, оверлей уже в открытом состоянии, поэтому цикл
    // открытия считается завершённым и onOpen вызывается на маунте — так же, как после анимации при переходе
    // false → true. Эффект пассивный (а не layout): к этому моменту refs уже проставлены, и потребитель может
    // измерить DOM в onOpen. onOpening при этом не вызывается — анимации, о начале которой нужно сообщать, не было.
    useEffect(() => {
        if (opened) {
            callbacks.current.onOpen?.();
        }

        isFirstRender.current = false;
        // Эффект только на маунте: дальнейшие переходы обрабатывают эффекты по closing/opening.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return children({
        closing: currentClosing,
        direction,
        opened,
        opening: currentOpening,
        setClosing,
        setOpened,
        setOpening,
    });
};
