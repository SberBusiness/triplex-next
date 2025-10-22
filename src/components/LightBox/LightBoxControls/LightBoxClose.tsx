import React, { Ref, useRef } from "react";
import { CrossStrokeSrvIcon20, CrossStrokeSrvIcon32 } from "@sberbusiness/icons-next";
import { ButtonIcon } from "../../Button/ButtonIcon";
import { TriggerClickOnKeyDownEvent } from "../../Triggers/TriggerClickOnKeyDownEvent";
import { EVENT_KEY_CODES } from "../../../utils/keyboard";
import { MobileView } from "../../MobileView/MobileView";
import clsx from "clsx";
import styles from "../styles/LightBoxControls.module.less";

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
            <MobileView fallback={<CrossStrokeSrvIcon32 paletteIndex={0} />}>
                <CrossStrokeSrvIcon20 paletteIndex={0} />
            </MobileView>
        </ButtonIcon>
    );

    return (
        <div className={clsx(className, styles.lightBoxClose)} {...htmlDivAttributes}>
            {/* Кнопка с триггером по Esc. */}
            <span className={styles.withKeyboardEvent}>
                <TriggerClickOnKeyDownEvent eventKeyCode={EVENT_KEY_CODES.ESCAPE} targetRef={ref}>
                    {renderButton(ref)}
                </TriggerClickOnKeyDownEvent>
            </span>

            {/* Кнопка без триггера по Esc. Отображается, когда открыт SideOverlay. */}
            <span className={styles.withoutKeyboardEvent}>{renderButton()}</span>
        </div>
    );
};

LightBoxClose.displayName = "LightBoxClose";
