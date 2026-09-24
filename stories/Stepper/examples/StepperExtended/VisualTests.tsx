import React from "react";
import { CaretleftStrokeSrvIcon24, CaretrightStrokeSrvIcon24 } from "@sberbusiness/icons-next";
import {
    ButtonIcon,
    CarouselExtended,
    ICarouselExtendedButtonProvideProps,
    StepperExtended,
    StepperStepIcon,
    EComponentSize,
    EStepperStepIconType,
    EStepperStepType,
} from "@sberbusiness/triplex-next";

const TYPE_TO_ICON_TYPE_MAP: Record<EStepperStepType, EStepperStepIconType> = {
    [EStepperStepType.NEUTRAL]: EStepperStepIconType.FILLED,
    [EStepperStepType.ERROR]: EStepperStepIconType.ERROR,
    [EStepperStepType.WARNING]: EStepperStepIconType.WARNING,
};

/** Величина прокрутки за один клик по кнопке. */
const SCROLL_STEP = 200;

/** Пока прокрутка не нужна, компонент передаёт hidden: кнопка не рендерится. */
const renderPrevButton = ({ hidden, ...buttonProps }: ICarouselExtendedButtonProvideProps) =>
    hidden ? null : (
        <ButtonIcon aria-label="Прокрутить назад" {...buttonProps}>
            <CaretleftStrokeSrvIcon24 paletteIndex={5} />
        </ButtonIcon>
    );

const renderNextButton = ({ hidden, ...buttonProps }: ICarouselExtendedButtonProvideProps) =>
    hidden ? null : (
        <ButtonIcon aria-label="Прокрутить вперёд" {...buttonProps}>
            <CaretrightStrokeSrvIcon24 paletteIndex={5} />
        </ButtonIcon>
    );

interface IStepperSampleProps {
    size: EComponentSize;
    type: EStepperStepType;
}

/** Степпер со всеми состояниями шага сразу: пройденный, недоступный, выбранный и непройденный. */
const StepperSample = ({ size, type }: IStepperSampleProps) => (
    <div>
        <div style={{ marginBottom: 8, fontSize: 14, fontWeight: 700 }}>
            {size.toUpperCase()} / {type.toUpperCase()}
        </div>
        <CarouselExtended
            style={{ display: "flex", alignItems: "center", maxWidth: "640px" }}
            buttonPrev={renderPrevButton}
            buttonNext={renderNextButton}
            stepPrev={SCROLL_STEP}
            stepNext={SCROLL_STEP}
        >
            <StepperExtended size={size} selectedStepId="selected" onSelectStep={() => {}}>
                <StepperExtended.Step
                    id="passed"
                    type={type}
                    icon={<StepperStepIcon type={TYPE_TO_ICON_TYPE_MAP[type]} />}
                >
                    Passed
                </StepperExtended.Step>
                <StepperExtended.Step id="disabled" type={type} disabled>
                    Disabled
                </StepperExtended.Step>
                <StepperExtended.Step
                    id="selected"
                    type={type}
                    icon={<StepperStepIcon type={EStepperStepIconType.WAIT} />}
                >
                    Selected
                </StepperExtended.Step>
                <StepperExtended.Step id="not-passed" type={type} isInActiveStep>
                    Not passed
                </StepperExtended.Step>
            </StepperExtended>
        </CarouselExtended>
    </div>
);

export const VisualTests = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <StepperSample size={EComponentSize.SM} type={EStepperStepType.NEUTRAL} />
        <StepperSample size={EComponentSize.MD} type={EStepperStepType.NEUTRAL} />
        <StepperSample size={EComponentSize.LG} type={EStepperStepType.NEUTRAL} />
        <StepperSample size={EComponentSize.MD} type={EStepperStepType.ERROR} />
        <StepperSample size={EComponentSize.MD} type={EStepperStepType.WARNING} />
    </div>
);
