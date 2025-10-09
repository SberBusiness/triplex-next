import React from "react";
import { IKeyDownListenerProps, KeyDownListener } from "./KeyDownListener";

/** Свойства компонента ComposedKeyDownListener. */
interface IKeyDownListenerManagerProps {
    children?: React.ReactNode;
    /** Массив-конфигуратор keydown слушателей. */
    keyDownListeners: IKeyDownListenerProps[];
}

/** Композитор слушателей нажатия клавиш. */
export const ComposedKeyDownListener: React.FC<IKeyDownListenerManagerProps> = ({ keyDownListeners, children }) => {
    let accumulatedElement = children as JSX.Element;

    if (keyDownListeners.length) {
        for (let i = 0; i < keyDownListeners.length; i++) {
            accumulatedElement = (
                <KeyDownListener onMatch={keyDownListeners[i].onMatch} eventKeyCode={keyDownListeners[i].eventKeyCode}>
                    {accumulatedElement}
                </KeyDownListener>
            );
        }
    }

    return accumulatedElement;
};
