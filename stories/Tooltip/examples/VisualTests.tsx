import React, { useRef } from "react";
import { QuestioncircleFilledSrvIcon16 } from "@sberbusiness/icons-next";
import { ButtonIcon, ETooltipAlign, ETooltipPreferPlace, ETooltipSize, Tooltip } from "@sberbusiness/triplex-next";

const LONG_TEXT =
    "Длинный текст подсказки в несколько строк: проверяет перенос строк, внутренние отступы и отступ до кнопки закрытия.";

/** Подсказка с указателем, выровненным по началу целевого элемента. */
const AlignedStart = () => {
    const targetRef = useRef<HTMLButtonElement | null>(null);

    return (
        <Tooltip
            size={ETooltipSize.SM}
            toggleType="hover"
            preferPlace={ETooltipPreferPlace.BELOW}
            alignTip={ETooltipAlign.START}
            isOpen
            disableAdaptiveMode
            targetRef={targetRef}
        >
            <Tooltip.Target>
                <ButtonIcon aria-label="Указатель в начале" ref={targetRef}>
                    <QuestioncircleFilledSrvIcon16 paletteIndex={5} />
                </ButtonIcon>
            </Tooltip.Target>
            <Tooltip.Body>alignTip: start</Tooltip.Body>
        </Tooltip>
    );
};

/** Широкая подсказка с длинным текстом, ссылкой и кнопкой закрытия. */
const LargeWithLinkAndClose = () => {
    const targetRef = useRef<HTMLButtonElement | null>(null);

    return (
        <Tooltip
            size={ETooltipSize.LG}
            toggleType="click"
            preferPlace={ETooltipPreferPlace.BELOW}
            isOpen
            disableAdaptiveMode
            targetRef={targetRef}
        >
            <Tooltip.Target>
                <ButtonIcon aria-label="Широкая подсказка" ref={targetRef}>
                    <QuestioncircleFilledSrvIcon16 paletteIndex={5} />
                </ButtonIcon>
            </Tooltip.Target>
            <Tooltip.Body>{LONG_TEXT}</Tooltip.Body>
            <Tooltip.Link href="https://triplex-design.ru" target="_blank">
                Подробнее
            </Tooltip.Link>
            <Tooltip.XButton aria-label="Закрыть подсказку" />
        </Tooltip>
    );
};

export const VisualTests = () => (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", padding: "64px 0" }}>
            <AlignedStart />
        </div>
        <div style={{ display: "flex", alignItems: "center", padding: "104px 0" }}>
            <LargeWithLinkAndClose />
        </div>
    </div>
);
