import { EVENT_KEY_CODES } from "@sberbusiness/triplex-next/utils/keyboard";
import React from "react";

type keyCode = (typeof EVENT_KEY_CODES)[keyof typeof EVENT_KEY_CODES];

export interface IKeyDownListenerProps {
    children?: React.ReactNode;
    eventKeyCode: keyCode | keyCode[];
    /** Обработчик совпадения нужной клавиши. */
    onMatch: (event: KeyboardEvent) => void;
}

/** Слушатель нажатия клавиш. При совпадении нужной клавиши вызывает onMatch. */
export class KeyDownListener extends React.Component<IKeyDownListenerProps> {
    public componentDidMount(): void {
        window.addEventListener("keydown", this.handleKeyDown);
    }

    public componentWillUnmount(): void {
        window.removeEventListener("keydown", this.handleKeyDown);
    }

    /** Обработчик для нажатия клавиш. */
    public handleKeyDown = (event: KeyboardEvent): void => {
        const { eventKeyCode, onMatch } = this.props;

        if (typeof eventKeyCode === "number") {
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            eventKeyCode === event.keyCode && onMatch(event);
        } else if (eventKeyCode.includes(event.keyCode)) {
            onMatch(event);
        }
    };

    public render(): React.ReactNode {
        return this.props.children || null;
    }
}
