import React, { useCallback, useRef } from "react";
import { TriggerClickOnKeyDownEvent } from "../../Triggers/TriggerClickOnKeyDownEvent";
import { EVENT_KEY_CODES } from "../../../utils/keyboard";
import { setForwardedRef } from "../../../helpers/setForwardedRef";
import { ConfirmCloseButton, IConfirmCloseButtonProps } from "./ConfirmCloseButton";

/** Свойства компонента ConfirmClose. */
export interface IConfirmCloseProps extends IConfirmCloseButtonProps {
    /** Глобальный Esc вызывает click по кнопке, если её offsetParent не null. */
    clickByEsc: boolean;
}

/**
 * Кнопка закрытия Confirm с опциональным глобальным Esc→click для видимой кнопки.
 * Сам Confirm не закрывает: действие и доступное имя кнопки задаёт потребитель.
 */
export const ConfirmClose = React.forwardRef<HTMLButtonElement, IConfirmCloseProps>(
    ({ clickByEsc, ...buttonProps }, ref) => {
        // Кнопка нужна самому компоненту (клик по Esc) и потребителю через forwarded ref.
        const buttonRef = useRef<HTMLButtonElement | null>(null);

        const setButtonRef = useCallback(
            (instance: HTMLButtonElement | null) => {
                buttonRef.current = instance;

                setForwardedRef(ref, instance);
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
