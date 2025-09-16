import React from 'react';
import {useState, useEffect, useRef, useLayoutEffect} from 'react';

export enum EOverlayDirection {
    BOTTOM = 'bottom',
    LEFT = 'left',
    RIGHT = 'right',
    TOP = 'top',
}

export interface IOverlayBaseProps {
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
 * Свойства, передаваемые в render-фцнкцию панели оверлея.
 */
export interface IOverlayChildrenProvideProps extends Pick<IOverlayBaseProps, 'direction' | 'opened' | 'setOpened'> {
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
    // Флаг, компонент примонтировался.
    const [isMount, setIsMount] = useState(false);
    // Флаг, в текущий момент оверлей закрывается.
    const [closing, setClosing] = useState(false);
    // Флаг, в текущий момент оверлей открывается.
    const [opening, setOpening] = useState(false);
    // Предыдущее состояние opened.
    const prevOpened = useRef(opened);

    useEffect(() => {
        setIsMount(true);
    }, []);

    // Здесь намеренно используется useLayoutEffect, а не useEffect, иначе в браузере может быть морганме при закрытии.
    useLayoutEffect(() => {
        if (prevOpened.current && !opened) {
            setOpening(false); // opened меняется в процессе анимации открытия.
            setClosing(true);
            onClosing?.();
        } else if (!prevOpened.current && opened) {
            setClosing(false); // opened меняется в процессе анимации закрытия.
            setOpening(true);
            onOpening?.();
        }

        prevOpened.current = opened;
    }, [opened]);

    useEffect(() => {
        if (!isMount) {
            return;
        }

        if (closing) {
            onClosing?.();
        } else {
            onClose?.();
        }
    }, [closing]);

    useEffect(() => {
        if (!isMount) {
            return;
        }

        if (opening) {
            onOpening?.();
        } else {
            onOpen?.();
        }
    }, [opening]);

    return children({closing, direction, opened, opening, setClosing, setOpened, setOpening});
};
