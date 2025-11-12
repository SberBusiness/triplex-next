import React, { Ref, useRef } from "react";
import clsx from "clsx";
import { CaretrightStrokeSrvIcon20, CaretrightStrokeSrvIcon32 } from "@sberbusiness/icons-next";
import { TriggerClickOnKeyDownEvent } from "../../Triggers/TriggerClickOnKeyDownEvent";
import { EVENT_KEY_CODES } from "../../../utils/keyboard";
import { MobileView } from "../../MobileView/MobileView";
import { Button } from "../../Button/Button";
import { EButtonTheme } from "../../Button/enums";
import { EComponentSize } from "@sberbusiness/triplex-next/enums/EComponentSize";
import styles from "../styles/LightBoxControls.module.less";

/** Свойства LightBoxNext. */
interface ILightBoxNextProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Кликнуть по кнопке при нажатии стрелки вправо на клавиатуре. */
    clickByArrowRight?: boolean;
    /** Обработчик клика по кнопке. */
    onClick: () => void;
    /** Идентификатор для обучающего тура. */
    dataTutorialId?: string;
}

interface IRenderButtonParams {
    /** Флаг, добавляющий data-test-id. Нужен, чтобы data-test-id не дублировался несколько раз на странице. */
    addDataTestId: boolean;
    /** Установка ссылки на кнопку. */
    buttonRef?: Ref<HTMLButtonElement>;
}

/** Стрелка лайтбокса "Вперёд". */
export const LightBoxNext: React.FC<ILightBoxNextProps> = ({
    className,
    clickByArrowRight,
    dataTutorialId,
    onClick,
    title,
    ...htmlDivAttributes
}) => {
    const ref = useRef<HTMLButtonElement>(null);

    /**
     * Отображение кнопки.
     */
    const renderButton = (params?: IRenderButtonParams) => (
        <MobileView
            fallback={
                <Button
                    data-test-id={params?.addDataTestId ? "lightBox-next" : undefined}
                    data-tutorial-id={dataTutorialId}
                    onClick={onClick}
                    title={title}
                    ref={params?.buttonRef}
                    icon={<CaretrightStrokeSrvIcon32 paletteIndex={0} />}
                    size={EComponentSize.LG}
                    theme={EButtonTheme.SECONDARY_LIGHT}
                />
            }
        >
            <Button
                data-test-id={params?.addDataTestId ? "lightBox-next" : undefined}
                data-tutorial-id={dataTutorialId}
                onClick={onClick}
                title={title}
                ref={params?.buttonRef}
                icon={<CaretrightStrokeSrvIcon20 paletteIndex={0} />}
                size={EComponentSize.MD}
                theme={EButtonTheme.SECONDARY_LIGHT}
            />
        </MobileView>
    );

    return (
        <div className={clsx(className, styles.lightBoxNext)} {...htmlDivAttributes}>
            {clickByArrowRight ? (
                <span>
                    {/* Кнопка с триггером при нажатии стрелки на клавиатуре. */}
                    <span className={styles.withKeyboardEvent}>
                        <TriggerClickOnKeyDownEvent targetRef={ref} eventKeyCode={EVENT_KEY_CODES.ARROW_RIGHT}>
                            {renderButton({ addDataTestId: true, buttonRef: ref })}
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

LightBoxNext.displayName = "LightBoxNext";
