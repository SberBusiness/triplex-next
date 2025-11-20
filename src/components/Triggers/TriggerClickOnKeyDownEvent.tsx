import { IKeyDownListenerProps, KeyDownListener } from "../KeyDownListener/KeyDownListener";
import React from "react";

/**
 * Свойства TriggerClickOnKeyDownEvent.
 */
interface ITriggerClickOnKeyDownEventProps extends Pick<IKeyDownListenerProps, "eventKeyCode"> {
    /** Ссылка на оборачиваемую кнопку. */
    targetRef: React.RefObject<HTMLButtonElement>;
    children: React.ReactElement;
}

/**
 * При нажатии на клавишу вызывает onClick на дочерний элемент.
 */
export const TriggerClickOnKeyDownEvent: React.FC<ITriggerClickOnKeyDownEventProps> = ({
    children,
    eventKeyCode,
    targetRef,
}) => {
    const handleKeyDown = () => {
        const buttonEl = targetRef.current;
        if (!buttonEl) {
            return;
        }

        /**
         * Проверка: node не имеет свойства display: none, иначе происходит триггер на скрытых элементах.
         * https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/offsetParent
         */
        if (buttonEl.offsetParent !== null) {
            buttonEl.click();
        }
    };

    return (
        <KeyDownListener onMatch={handleKeyDown} eventKeyCode={eventKeyCode}>
            {children}
        </KeyDownListener>
    );
};

TriggerClickOnKeyDownEvent.displayName = "TriggerClickOnKeyDownEvent";
