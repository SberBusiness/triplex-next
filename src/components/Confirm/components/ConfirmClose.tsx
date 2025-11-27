import React, { useRef } from "react";
import { TriggerClickOnKeyDownEvent } from "@sber-business/triplex/components/Triggers/TriggerClickOnKeyDownEvent";
import { EVENT_KEY_CODES } from "@sber-business/triplex/utils/keyboard";
import { ConfirmCloseButton, IConfirmCloseButtonProps } from "./ConfirmCloseButton";

export interface IConfirmCloseProps extends IConfirmCloseButtonProps {
    /**
     * Триггер click по нажатию Esc.
     */
    clickByEsc: boolean;
}

/**
 * Компонент закрытия.
 */
export const ConfirmClose: React.FC<IConfirmCloseProps> = ({ clickByEsc, ...buttonProps }) => {
    const ref = useRef<HTMLButtonElement>(null);

    if (clickByEsc) {
        return (
            <TriggerClickOnKeyDownEvent targetRef={ref} eventKeyCode={EVENT_KEY_CODES.ESCAPE}>
                <ConfirmCloseButton {...buttonProps} ref={ref} />
            </TriggerClickOnKeyDownEvent>
        );
    }

    return <ConfirmCloseButton {...buttonProps} />;
};
