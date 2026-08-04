import React from "react";
import { EVENT_KEY_CODES } from "@sberbusiness/triplex-next/utils/keyboard";

/** Числовой код клавиши — одно из значений EVENT_KEY_CODES. */
type TKeyCode = (typeof EVENT_KEY_CODES)[keyof typeof EVENT_KEY_CODES];

/** Свойства компонента KeyDownListener. */
export interface IKeyDownListenerProps {
    /** Содержимое. Рендерится как есть, без обёртки и без собственной разметки. */
    children?: React.ReactNode;
    /** Код клавиши из EVENT_KEY_CODES или массив кодов, на которые реагирует слушатель. */
    eventKeyCode: TKeyCode | TKeyCode[];
    /** Обработчик совпадения нужной клавиши. */
    onMatch: (event: KeyboardEvent) => void;
}

/**
 * Слушатель нажатия клавиш. Пока компонент смонтирован, слушает keydown на window
 * и при совпадении кода нажатой клавиши с eventKeyCode вызывает onMatch.
 */
export class KeyDownListener extends React.Component<IKeyDownListenerProps> {
    public componentDidMount(): void {
        window.addEventListener("keydown", this.handleKeyDown);
    }

    public componentWillUnmount(): void {
        window.removeEventListener("keydown", this.handleKeyDown);
    }

    /** Обработчик для нажатия клавиш. Вызывает onMatch, если код нажатой клавиши указан в eventKeyCode. */
    public handleKeyDown = (event: KeyboardEvent): void => {
        const { eventKeyCode, onMatch } = this.props;
        const eventKeyCodes = Array.isArray(eventKeyCode) ? eventKeyCode : [eventKeyCode];

        if (eventKeyCodes.includes(event.keyCode)) {
            onMatch(event);
        }
    };

    public render(): React.ReactNode {
        return this.props.children || null;
    }
}
