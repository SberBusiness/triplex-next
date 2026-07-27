import React, { Ref, useRef } from "react";
import clsx from "clsx";
import { TriggerClickOnKeyDownEvent } from "../../Triggers/TriggerClickOnKeyDownEvent";
import { EButtonTheme } from "../../Button/enums";
import { Button } from "../../Button/Button";
import { EComponentSize } from "@sberbusiness/triplex-next/enums/EComponentSize";
import styles from "../styles/LightBoxControls.module.less";

/** Свойства LightBoxArrow. */
interface ILightBoxArrowProps extends React.HTMLAttributes<HTMLDivElement> {
    /** CSS-класс кнопки (десктопной и мобильной). */
    buttonClassName: string;
    /** Кликнуть по кнопке при нажатии соответствующей стрелки на клавиатуре. */
    clickByArrowKey?: boolean;
    /** Значение data-test-id кнопки. */
    dataTestId: string;
    /** Идентификатор для обучающего тура. */
    dataTutorialId?: string;
    /** Код клавиши, при нажатии которой происходит клик по кнопке. */
    eventKeyCode: number;
    /** Иконка кнопки для экранов шире 1024px. */
    iconDesktop: React.ReactElement;
    /** Иконка кнопки для экранов менее 1024px. */
    iconMobile: React.ReactElement;
    /** Обработчик клика по кнопке. */
    onClick: () => void;
}

interface IRenderButtonParams {
    /** Флаг, добавляющий data-test-id. Нужен, чтобы data-test-id не дублировался несколько раз на странице. */
    addDataTestId: boolean;
    /** Установка ссылки на десктопную кнопку. */
    desktopButtonRef?: Ref<HTMLButtonElement>;
    /** Установка ссылки на мобильную кнопку. */
    mobileButtonRef?: Ref<HTMLButtonElement>;
}

/** Внутренний компонент стрелки лайтбокса (общая реализация для LightBoxPrev и LightBoxNext). */
export const LightBoxArrow: React.FC<ILightBoxArrowProps> = ({
    buttonClassName,
    className,
    clickByArrowKey,
    dataTestId,
    dataTutorialId,
    eventKeyCode,
    iconDesktop,
    iconMobile,
    onClick,
    title,
    ...htmlDivAttributes
}) => {
    // Отдельные ссылки на десктопную и мобильную кнопки: видимой в каждый момент является только одна,
    // а TriggerClickOnKeyDownEvent кликает только по видимой (offsetParent !== null).
    const desktopButtonRef = useRef<HTMLButtonElement>(null);
    const mobileButtonRef = useRef<HTMLButtonElement>(null);

    /**
     * Отображение кнопки.
     */
    const renderButton = (params?: IRenderButtonParams) => (
        <>
            {/* Кнопка для экранов шире 1024px */}
            <Button
                className={clsx(styles.lightBoxControlsDesktop, buttonClassName)}
                data-test-id={params?.addDataTestId ? dataTestId : undefined}
                data-tutorial-id={dataTutorialId}
                onClick={onClick}
                title={title}
                ref={params?.desktopButtonRef}
                icon={iconDesktop}
                size={EComponentSize.LG}
                theme={EButtonTheme.SECONDARY_LIGHT}
            />
            {/* Кнопка для экранов менее 1024px */}
            <Button
                className={clsx(styles.lightBoxControlsMobile, buttonClassName)}
                data-test-id={params?.addDataTestId ? dataTestId : undefined}
                data-tutorial-id={dataTutorialId}
                onClick={onClick}
                title={title}
                ref={params?.mobileButtonRef}
                icon={iconMobile}
                size={EComponentSize.MD}
                theme={EButtonTheme.SECONDARY_LIGHT}
            />
        </>
    );

    return (
        <div className={className} {...htmlDivAttributes}>
            {clickByArrowKey ? (
                <span>
                    {/* Кнопка с триггером при нажатии стрелки на клавиатуре. */}
                    <span className={styles.withKeyboardEvent}>
                        <TriggerClickOnKeyDownEvent targetRef={desktopButtonRef} eventKeyCode={eventKeyCode}>
                            <TriggerClickOnKeyDownEvent targetRef={mobileButtonRef} eventKeyCode={eventKeyCode}>
                                {renderButton({ addDataTestId: true, desktopButtonRef, mobileButtonRef })}
                            </TriggerClickOnKeyDownEvent>
                        </TriggerClickOnKeyDownEvent>
                    </span>
                    {/* Кнопка без триггера при нажатии стрелки на клавиатуре. Нельзя нажать, когда открыт SideOverlay. */}
                    <span className={styles.withoutKeyboardEvent}>{renderButton()}</span>
                </span>
            ) : (
                renderButton({ addDataTestId: true })
            )}
        </div>
    );
};

LightBoxArrow.displayName = "LightBoxArrow";
