import { ClosemediumNavIcon20 } from "@sberbusiness/icons/ClosemediumNavIcon20";
import { ButtonIcon, IButtonIconProps } from "@sber-business/triplex/components/Button/ButtonIcon";
import { TriggerClickOnKeyDownEvent } from "@sber-business/triplex/components/Triggers/TriggerClickOnKeyDownEvent";
import { EVENT_KEY_CODES } from "@sber-business/triplex/utils/keyboard";
import React, { useRef } from "react";

/**
 * Свойства компонента кнопки закрытия модального окна.
 */
interface IModalWindowCloseProps extends Omit<IButtonIconProps, "children"> {
    /** Дочерний элемент. */
    children?: never;
    /** Обработчик закрытия. */
    onClick: () => void;
}

/**
 * Компонент кнопки закрытия модального окна.
 */
export const ModalWindowClose: React.FC<IModalWindowCloseProps> = ({ title, ...restProps }) => {
    const ref = useRef<HTMLButtonElement>(null);

    return (
        <div className="cssClass[modalWindowClose]">
            <TriggerClickOnKeyDownEvent eventKeyCode={EVENT_KEY_CODES.ESCAPE} targetRef={ref}>
                <ButtonIcon {...restProps} title={title ?? "Закрыть"} ref={ref}>
                    <ClosemediumNavIcon20 />
                </ButtonIcon>
            </TriggerClickOnKeyDownEvent>
        </div>
    );
};

ModalWindowClose.displayName = "ModalWindowClose";
