import React from "react";
import { IKeyDownListenerProps, KeyDownListener } from "./KeyDownListener";

/** Свойства компонента ComposedKeyDownListener. */
export interface IComposedKeyDownListenerProps {
    /** Содержимое. Рендерится как есть, без обёртки и без собственной разметки. */
    children?: React.ReactNode;
    /** Массив-конфигуратор keydown слушателей. Поле children каждого элемента не используется. */
    keyDownListeners: IKeyDownListenerProps[];
}

/**
 * Композитор слушателей нажатия клавиш. Рендерит по одному KeyDownListener на элемент
 * keyDownListeners соседями к children: каждый слушатель подписывается на window независимо,
 * а children не зависят от длины и порядка массива и не перемонтируются при его изменении.
 */
export const ComposedKeyDownListener: React.FC<IComposedKeyDownListenerProps> = ({ keyDownListeners, children }) => (
    <>
        {keyDownListeners.map(({ eventKeyCode, onMatch }, index) => (
            // Ключ по индексу: элементы конфигурации не имеют собственной идентичности, а сам
            // KeyDownListener не рендерит разметку и не хранит state — переиспользование инстанса
            // по позиции безопасно.
            <KeyDownListener key={index} eventKeyCode={eventKeyCode} onMatch={onMatch} />
        ))}
        {children}
    </>
);

ComposedKeyDownListener.displayName = "ComposedKeyDownListener";
