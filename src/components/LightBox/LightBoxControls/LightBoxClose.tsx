import React, { Ref, useRef } from "react";
import { ClosemediumNavIcon20 } from "@sberbusiness/icons/ClosemediumNavIcon20";
import { CloselargeNavIcon32 } from "@sberbusiness/icons/CloselargeNavIcon32";
import { classnames } from "@sber-business/triplex/utils/classnames/classnames";
import { ButtonIcon } from "@sber-business/triplex/components/Button/ButtonIcon";
import { TriggerClickOnKeyDownEvent } from "@sber-business/triplex/components/Triggers/TriggerClickOnKeyDownEvent";
import { EVENT_KEY_CODES } from "@sber-business/triplex/utils/keyboard";
import { MobileView } from "@sber-business/triplex/components/MobileView/MobileView";

/** Свойства LightBoxClose. */
interface ILightBoxCloseProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Обработчик закрытия лайтбокса. */
    onClick: () => void;
}

/** Кнопка закрытия лайтбокса. */
export const LightBoxClose: React.FC<ILightBoxCloseProps> = ({
    className,
    onClick,
    title = "Закрыть",
    ...htmlDivAttributes
}) => {
    const ref = useRef<HTMLButtonElement>(null);

    const renderButton = (buttonRef?: Ref<HTMLButtonElement>) => (
        <ButtonIcon onClick={onClick} title={title} data-exclude-modal-focus ref={buttonRef}>
            <MobileView fallback={<CloselargeNavIcon32 />}>
                <ClosemediumNavIcon20 />
            </MobileView>
        </ButtonIcon>
    );

    return (
        <div className={classnames(className, "cssClass[lightBoxClose]")} {...htmlDivAttributes}>
            {/* Кнопка с триггером по Esc. */}
            <span className="cssClass[withKeyboardEvent]">
                <TriggerClickOnKeyDownEvent eventKeyCode={EVENT_KEY_CODES.ESCAPE} targetRef={ref}>
                    {renderButton(ref)}
                </TriggerClickOnKeyDownEvent>
            </span>

            {/* Кнопка без триггера по Esc. Отображается, когда открыт SideOverlay. */}
            <span className="cssClass[withoutKeyboardEvent]">{renderButton()}</span>
        </div>
    );
};

LightBoxClose.displayName = "LightBoxClose";
