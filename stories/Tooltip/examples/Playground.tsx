import React, { useRef } from "react";
import { action } from "storybook/actions";
import { QuestioncircleFilledSrvIcon16 } from "@sberbusiness/icons-next";
import {
    ButtonIcon,
    ETooltipAlign,
    ETooltipPreferPlace,
    ETooltipSize,
    Tooltip,
    TTooltipToggleType,
} from "@sberbusiness/triplex-next";

/** Свойства примера Playground. */
export interface IPlaygroundProps {
    /** Размер подсказки. */
    size: ETooltipSize;
    /** Способ открытия подсказки. */
    toggleType: TTooltipToggleType;
    /** Предпочитаемое место расположения подсказки. */
    preferPlace: ETooltipPreferPlace;
    /** Расположение указателя (стрелочки). */
    alignTip?: ETooltipAlign;
    /** Отключить адаптивный режим. */
    disableAdaptiveMode: boolean;
    /** Текст подсказки. */
    text: string;
    /** Заголовок адаптивной версии. */
    mobileHeader: string;
    /** Текст ссылки в подсказке. */
    linkText: string;
    /** Кнопка закрытия. */
    withCloseButton: boolean;
}

export const Playground = ({
    size,
    toggleType,
    preferPlace,
    alignTip,
    disableAdaptiveMode,
    text,
    mobileHeader,
    linkText,
    withCloseButton,
}: IPlaygroundProps) => {
    const targetRef = useRef<HTMLButtonElement | null>(null);

    return (
        <div style={{ display: "flex", justifyContent: "center", padding: "80px 0" }}>
            <Tooltip
                size={size}
                toggleType={toggleType}
                preferPlace={preferPlace}
                alignTip={alignTip}
                disableAdaptiveMode={disableAdaptiveMode}
                toggle={action("toggle")}
                targetRef={targetRef}
            >
                <Tooltip.Target>
                    <ButtonIcon aria-label="Показать подсказку" ref={targetRef}>
                        <QuestioncircleFilledSrvIcon16 paletteIndex={5} />
                    </ButtonIcon>
                </Tooltip.Target>
                <Tooltip.Body>{text}</Tooltip.Body>
                {linkText ? (
                    <Tooltip.Link href="#" target="_blank">
                        {linkText}
                    </Tooltip.Link>
                ) : null}
                {withCloseButton ? <Tooltip.XButton aria-label="Закрыть подсказку" /> : null}
                {mobileHeader ? <Tooltip.MobileHeader>{mobileHeader}</Tooltip.MobileHeader> : null}
            </Tooltip>
        </div>
    );
};
