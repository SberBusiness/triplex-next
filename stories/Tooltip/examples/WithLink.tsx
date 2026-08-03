import React, { useRef } from "react";
import { QuestioncircleFilledSrvIcon16 } from "@sberbusiness/icons-next";
import { ButtonIcon, ETooltipPreferPlace, ETooltipSize, Tooltip } from "@sberbusiness/triplex-next";

export const WithLink = () => {
    const targetRef = useRef<HTMLButtonElement | null>(null);

    return (
        <div style={{ display: "flex", justifyContent: "center", height: "220px" }}>
            <Tooltip
                size={ETooltipSize.LG}
                toggleType="click"
                preferPlace={ETooltipPreferPlace.BELOW}
                // Подсказка открыта постоянно, чтобы в примере была видна ссылка.
                isOpen
                disableAdaptiveMode
                targetRef={targetRef}
            >
                <Tooltip.Target>
                    <ButtonIcon aria-label="Показать подсказку" ref={targetRef}>
                        <QuestioncircleFilledSrvIcon16 paletteIndex={5} />
                    </ButtonIcon>
                </Tooltip.Target>
                <Tooltip.Body>Ссылка ведёт на страницу с подробным описанием.</Tooltip.Body>
                <Tooltip.Link href="https://triplex-design.ru" target="_blank">
                    Подробнее
                </Tooltip.Link>
            </Tooltip>
        </div>
    );
};
