import { CaretleftStrokeSrvIcon32, CaretleftStrokeSrvIcon20, CaretleftStrokeSrvIcon24 } from "@sberbusiness/icons-next";
import { ButtonIcon } from "../../Button/ButtonIcon";
import { EButtonIconShape } from "../../Button/enums";
import { TriggerClickOnKeyDownEvent } from "../../Triggers/TriggerClickOnKeyDownEvent";
import { EVENT_KEY_CODES } from "../../../utils/keyboard";
import React, { Ref, useRef } from "react";
import { MobileView } from "../../MobileView/MobileView";
import clsx from "clsx";
import styles from "../styles/LightBoxControls.module.less";

/** Свойства LightBoxPrev. */
interface ILightBoxPrevProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Кликнуть по кнопке при нажатии стрелки влево на клавиатуре. */
    clickByArrowLeft?: boolean;
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

/** Стрелка лайтбокса "Назад". */
export const LightBoxPrev: React.FC<ILightBoxPrevProps> = ({
    className,
    clickByArrowLeft,
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
            data-test-id={params?.addDataTestId ? "lightBox-prev" : undefined}
            data-tutorial-id={dataTutorialId}
            onClick={onClick}
            title={title}
            shape={EButtonIconShape.CIRCLE}
            ref={params?.buttonRef}
        >
            {/* Большая стрелка слева от LightBox. */}
            <span className={styles.lightBoxControlsBig}>
                <CaretleftStrokeSrvIcon32 paletteIndex={0} />
            </span>
            {/* Маленькая стрелка сверху LightBox. */}
            <span className={styles.lightBoxControlsSmall}>
                <MobileView fallback={<CaretleftStrokeSrvIcon24 paletteIndex={0} />}>
                    <CaretleftStrokeSrvIcon20 paletteIndex={0} />
                </MobileView>
            </span>
        </ButtonIcon>
    );

    return (
        <div className={clsx(className, styles.lightBoxPrev)} {...htmlDivAttributes}>
            {clickByArrowLeft ? (
                <span>
                    {/* Кнопка с триггером при нажатии стрелки на клавиатуре. */}
                    <span className={styles.withKeyboardEvent}>
                        <TriggerClickOnKeyDownEvent targetRef={ref} eventKeyCode={EVENT_KEY_CODES.ARROW_LEFT}>
                            {renderButton({ addDataTestId: true, buttonRef: ref })}
                        </TriggerClickOnKeyDownEvent>
                    </span>
                    {/* Кнопка без триггера при нажатии стрелки на клавиатуре. Нельзя нажать, когда открыт
                         SideOverlay. */}
                    <span className={styles.withoutKeyboardEvent}>{renderButton()}</span>
                </span>
            ) : (
                renderButton({ addDataTestId: true })
            )}
        </div>
    );
};

LightBoxPrev.displayName = "LightBoxPrev";
