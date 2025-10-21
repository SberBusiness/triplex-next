import { LightboxpaginatorrightNavIcon64 } from "@sberbusiness/icons/LightboxpaginatorrightNavIcon64";
import { PaginatorrightNavIcon32 } from "@sberbusiness/icons/PaginatorrightNavIcon32";
import { CaretrightSrvxIcon24 } from "@sberbusiness/icons/CaretrightSrvxIcon24";
import { ButtonIcon } from "@sber-business/triplex/components/Button/ButtonIcon";
import { EButtonIconShape } from "@sber-business/triplex/components/Button/enums";
import { TriggerClickOnKeyDownEvent } from "@sber-business/triplex/components/Triggers/TriggerClickOnKeyDownEvent";
import { classnames } from "@sber-business/triplex/utils/classnames/classnames";
import { EVENT_KEY_CODES } from "@sber-business/triplex/utils/keyboard";
import React, { Ref, useRef } from "react";
import { MobileView } from "@sber-business/triplex/components/MobileView/MobileView";

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
                <LightboxpaginatorrightNavIcon64 />
            </span>
            {/* Маленькая стрелка сверху LightBox. */}
            <span className="cssClass[lightBoxControlsSmall]">
                <MobileView fallback={<PaginatorrightNavIcon32 />}>
                    <CaretrightSrvxIcon24 />
                </MobileView>
            </span>
        </ButtonIcon>
    );

    return (
        <div className={classnames(className, "cssClass[lightBoxNext]")} {...htmlDivAttributes}>
            {clickByArrowRight ? (
                <span>
                    {/* Кнопка с триггером при нажатии стрелки на клавиатуре. */}
                    <span className="cssClass[withKeyboardEvent]">
                        <TriggerClickOnKeyDownEvent targetRef={ref} eventKeyCode={EVENT_KEY_CODES.ARROW_RIGHT}>
                            {renderButton({ addDataTestId: true, buttonRef: ref })}
                        </TriggerClickOnKeyDownEvent>
                    </span>
                    {/* Кнопка без триггера при нажатии стрелки на клавиатуре. Нельзя нажать, когда открыт SideOverlay. */}
                    <span className="cssClass[withoutKeyboardEvent]">{renderButton()}</span>
                </span>
            ) : (
                renderButton({ addDataTestId: true })
            )}
        </div>
    );
};

LightBoxNext.displayName = "LightBoxNext";
