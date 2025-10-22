import {
    CaretrightStrokeSrvIcon32,
    CaretrightStrokeSrvIcon20,
    CaretrightStrokeSrvIcon24,
} from "@sberbusiness/icons-next";
import { ButtonIcon } from "../../Button/ButtonIcon";
import { EButtonIconShape } from "../../Button/enums";
import { TriggerClickOnKeyDownEvent } from "../../Triggers/TriggerClickOnKeyDownEvent";
import { EVENT_KEY_CODES } from "../../../utils/keyboard";
import React, { Ref, useRef } from "react";
import { MobileView } from "../../MobileView/MobileView";
import clsx from "clsx";
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
        <ButtonIcon
            data-test-id={params?.addDataTestId ? "lightBox-next" : undefined}
            data-tutorial-id={dataTutorialId}
            onClick={onClick}
            title={title}
            shape={EButtonIconShape.CIRCLE}
            ref={params?.buttonRef}
        >
            {/* Большая стрелка справа от LightBox. */}
            <span className="cssClass[lightBoxControlsBig]">
                <CaretrightStrokeSrvIcon32 paletteIndex={0} />
            </span>
            {/* Маленькая стрелка сверху LightBox. */}
            <span className="cssClass[lightBoxControlsSmall]">
                <MobileView fallback={<CaretrightStrokeSrvIcon24 paletteIndex={0} />}>
                    <CaretrightStrokeSrvIcon20 paletteIndex={0} />
                </MobileView>
            </span>
        </ButtonIcon>
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
