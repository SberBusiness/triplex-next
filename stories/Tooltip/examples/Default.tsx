import React, { useRef } from "react";
import { QuestioncircleFilledSrvIcon16 } from "@sberbusiness/icons-next";
import { ButtonIcon, ETooltipPreferPlace, ETooltipSize, Tooltip } from "@sberbusiness/triplex-next";

export const Default = () => {
    const targetRef = useRef<HTMLButtonElement | null>(null);

    return (
        <div style={{ display: "flex", justifyContent: "center", padding: "80px 0" }}>
            <Tooltip
                size={ETooltipSize.SM}
                toggleType="hover"
                preferPlace={ETooltipPreferPlace.BELOW}
                targetRef={targetRef}
            >
                <Tooltip.Target>
                    <ButtonIcon aria-label="Показать подсказку" ref={targetRef}>
                        <QuestioncircleFilledSrvIcon16 paletteIndex={5} />
                    </ButtonIcon>
                </Tooltip.Target>
                <Tooltip.Body>Текст подсказки</Tooltip.Body>
            </Tooltip>
        </div>
    );
};
