import { LightboxpaginatorleftNavIcon64 } from "@sberbusiness/icons/LightboxpaginatorleftNavIcon64";
import { PaginatorleftNavIcon32 } from "@sberbusiness/icons/PaginatorleftNavIcon32";
import { CaretleftSrvxIcon24 } from "@sberbusiness/icons/CaretleftSrvxIcon24";
import { ButtonIcon } from "@sber-business/triplex/components/Button/ButtonIcon";
import { EButtonIconShape } from "@sber-business/triplex/components/Button/enums";
import { TriggerClickOnKeyDownEvent } from "@sber-business/triplex/components/Triggers/TriggerClickOnKeyDownEvent";
import { classnames } from "@sber-business/triplex/utils/classnames/classnames";
import { EVENT_KEY_CODES } from "@sber-business/triplex/utils/keyboard";
import React, { Ref, useRef } from "react";
import { MobileView } from "@sber-business/triplex/components/MobileView/MobileView";

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
            <span className="cssClass[lightBoxControlsBig]">
                <LightboxpaginatorleftNavIcon64 />
            </span>
            {/* Маленькая стрелка сверху LightBox. */}
            <span className="cssClass[lightBoxControlsSmall]">
                <MobileView fallback={<PaginatorleftNavIcon32 />}>
                    <CaretleftSrvxIcon24 />
                </MobileView>
            </span>
        </ButtonIcon>
    );

    return (
        <div className={classnames(className, "cssClass[lightBoxPrev]")} {...htmlDivAttributes}>
            {clickByArrowLeft ? (
                <span>
                    {/* Кнопка с триггером при нажатии стрелки на клавиатуре. */}
                    <span className="cssClass[withKeyboardEvent]">
                        <TriggerClickOnKeyDownEvent targetRef={ref} eventKeyCode={EVENT_KEY_CODES.ARROW_LEFT}>
                            {renderButton({ addDataTestId: true, buttonRef: ref })}
                        </TriggerClickOnKeyDownEvent>
                    </span>
                    {/* Кнопка без триггера при нажатии стрелки на клавиатуре. Нельзя нажать, когда открыт
                         SideOverlay. */}
                    <span className="cssClass[withoutKeyboardEvent]">{renderButton()}</span>
                </span>
            ) : (
                renderButton({ addDataTestId: true })
            )}
        </div>
    );
};

LightBoxPrev.displayName = "LightBoxPrev";
