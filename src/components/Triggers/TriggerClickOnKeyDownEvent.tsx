import React from "react";
import { IKeyDownListenerProps, KeyDownListener } from "../KeyDownListener/KeyDownListener";

/**
 * Свойства компонента TriggerClickOnKeyDownEvent.
 */
interface ITriggerClickOnKeyDownEventProps extends Pick<IKeyDownListenerProps, "eventKeyCode"> {
    /** Содержимое. Рендерится как есть, без обёртки и без собственной разметки. */
    children: React.ReactElement;
    /** Ссылка на кнопку, по которой выполняется клик. Скрытая кнопка кликом не вызывается. */
    targetRef: React.RefObject<HTMLButtonElement>;
}

/**
 * При нажатии на клавишу вызывает click на кнопке из targetRef.
 * Клавиша слушается на window (через KeyDownListener), собственной разметки компонент не рендерит.
 */
export const TriggerClickOnKeyDownEvent: React.FC<ITriggerClickOnKeyDownEventProps> = ({
    children,
    eventKeyCode,
    targetRef,
}) => {
    /**
     * Кликает по кнопке, если она смонтирована и видима.
     * offsetParent === null означает, что элемент или его предок скрыт через display: none —
     * без этой проверки триггер срабатывал бы и на скрытых кнопках (например, на мобильной копии кнопки).
     * https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/offsetParent
     */
    const handleKeyDown = (): void => {
        const buttonEl = targetRef.current;

        if (buttonEl && buttonEl.offsetParent !== null) {
            buttonEl.click();
        }
    };

    return (
        <KeyDownListener eventKeyCode={eventKeyCode} onMatch={handleKeyDown}>
            {children}
        </KeyDownListener>
    );
};

TriggerClickOnKeyDownEvent.displayName = "TriggerClickOnKeyDownEvent";
