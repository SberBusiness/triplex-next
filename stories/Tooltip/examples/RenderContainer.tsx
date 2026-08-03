import React, { useRef, useState } from "react";
import { QuestioncircleFilledSrvIcon16 } from "@sberbusiness/icons-next";
import { ButtonIcon, ETooltipPreferPlace, ETooltipSize, Tooltip } from "@sberbusiness/triplex-next";

export const RenderContainer = () => {
    const targetRef = useRef<HTMLButtonElement | null>(null);
    // Callback-ref вместо useEffect: контейнер попадает в state сразу после монтирования.
    const [container, setContainer] = useState<HTMLElement | null>(null);

    return (
        <div style={{ display: "flex", justifyContent: "center", paddingBottom: "160px" }}>
            <div ref={setContainer} />

            {container ? (
                <Tooltip
                    size={ETooltipSize.SM}
                    toggleType="click"
                    preferPlace={ETooltipPreferPlace.BELOW}
                    renderContainer={container}
                    // Подсказка открыта постоянно, чтобы её было видно в примере.
                    isOpen
                    disableAdaptiveMode
                    targetRef={targetRef}
                >
                    <Tooltip.Target>
                        <ButtonIcon aria-label="Показать подсказку" ref={targetRef}>
                            <QuestioncircleFilledSrvIcon16 paletteIndex={5} />
                        </ButtonIcon>
                    </Tooltip.Target>
                    <Tooltip.Body>Подсказка отрендерена в заданный контейнер.</Tooltip.Body>
                </Tooltip>
            ) : null}
        </div>
    );
};
