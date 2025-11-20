import React, { Ref, useRef } from "react";
import clsx from "clsx";
import { CrossStrokeSrvIcon32, CrossStrokeSrvIcon20 } from "@sberbusiness/icons-next";
import { TriggerClickOnKeyDownEvent } from "../../Triggers/TriggerClickOnKeyDownEvent";
import { EVENT_KEY_CODES } from "../../../utils/keyboard";
import { EButtonTheme } from "../../Button/enums";
import { Button } from "../../Button/Button";
import { EComponentSize } from "@sberbusiness/triplex-next/enums/EComponentSize";
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
        <>
            {/* Кнопка для экранов шире 1024px */}
            <Button
                className={styles.lightBoxControlsDesktop}
                onClick={onClick}
                title={title}
                data-exclude-modal-focus
                ref={buttonRef}
                icon={<CrossStrokeSrvIcon32 paletteIndex={0} />}
                size={EComponentSize.LG}
                theme={EButtonTheme.SECONDARY_LIGHT}
            />
            {/* Кнопка для экранов менее 1024px */}
            <Button
                className={styles.lightBoxControlsMobile}
                onClick={onClick}
                title={title}
                data-exclude-modal-focus
                icon={<CrossStrokeSrvIcon20 paletteIndex={0} />}
                size={EComponentSize.MD}
                theme={EButtonTheme.SECONDARY_LIGHT}
            />
        </>
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
