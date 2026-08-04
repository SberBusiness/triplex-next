import React from "react";
import { IKeyDownListenerProps, KeyDownListener } from "./KeyDownListener";

/** Свойства компонента ComposedKeyDownListener. */
interface IComposedKeyDownListenerProps {
    /** Содержимое. Рендерится как есть, без обёртки и без собственной разметки. */
    children?: React.ReactNode;
    /** Массив-конфигуратор keydown слушателей. Поле children каждого элемента не используется. */
    keyDownListeners: IKeyDownListenerProps[];
}

/** Композитор слушателей нажатия клавиш. Оборачивает children в KeyDownListener на каждый элемент keyDownListeners. */
export const ComposedKeyDownListener: React.FC<IComposedKeyDownListenerProps> = ({ keyDownListeners, children }) => {
    const composedChildren = keyDownListeners.reduce<React.ReactNode>(
        (accumulatedChildren, { eventKeyCode, onMatch }) => (
            <KeyDownListener eventKeyCode={eventKeyCode} onMatch={onMatch}>
                {accumulatedChildren}
            </KeyDownListener>
        ),
        children,
    );

    return <>{composedChildren}</>;
};

ComposedKeyDownListener.displayName = "ComposedKeyDownListener";
