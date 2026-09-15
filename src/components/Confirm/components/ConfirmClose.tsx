import React, { useCallback, useRef } from "react";
import { TriggerClickOnKeyDownEvent } from "../../Triggers/TriggerClickOnKeyDownEvent";
import { EVENT_KEY_CODES } from "../../../utils/keyboard";
import { ConfirmCloseButton, IConfirmCloseButtonProps } from "./ConfirmCloseButton";

/** Свойства компонента ConfirmClose. */
export interface IConfirmCloseProps extends IConfirmCloseButtonProps {
    /**
     * Триггер click по нажатию Esc.
     */
    clickByEsc: boolean;
}

/**
 * Компонент закрытия.
 * При clickByEsc нажатие Esc в любом месте страницы вызывает click по кнопке закрытия.
 */
export const ConfirmClose = React.forwardRef<HTMLButtonElement, IConfirmCloseProps>(
    ({ clickByEsc, ...buttonProps }, ref) => {
        // Кнопка нужна самому компоненту (клик по Esc) и потребителю через forwarded ref.
        const buttonRef = useRef<HTMLButtonElement | null>(null);

        const setButtonRef = useCallback(
            (instance: HTMLButtonElement | null) => {
                buttonRef.current = instance;

                if (typeof ref === "function") {
                    ref(instance);
                } else if (ref) {
                    ref.current = instance;
                }
            },
            [ref],
        );

        if (clickByEsc) {
            return (
                <TriggerClickOnKeyDownEvent targetRef={buttonRef} eventKeyCode={EVENT_KEY_CODES.ESCAPE}>
                    <ConfirmCloseButton {...buttonProps} ref={setButtonRef} />
                </TriggerClickOnKeyDownEvent>
            );
        }

        return <ConfirmCloseButton {...buttonProps} ref={setButtonRef} />;
    },
);

ConfirmClose.displayName = "ConfirmClose";
