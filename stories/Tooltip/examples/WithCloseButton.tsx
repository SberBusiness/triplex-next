import React, { useRef, useState } from "react";
import { QuestioncircleFilledSrvIcon16 } from "@sberbusiness/icons-next";
import { ButtonIcon, ETooltipPreferPlace, ETooltipSize, Tooltip } from "@sberbusiness/triplex-next";

export const WithCloseButton = () => {
    const targetRef = useRef<HTMLButtonElement | null>(null);
    const [opened, setOpened] = useState(true);

    return (
        <div style={{ display: "flex", justifyContent: "center", height: "220px" }}>
            <Tooltip
                size={ETooltipSize.LG}
                toggleType="click"
                preferPlace={ETooltipPreferPlace.BELOW}
                isOpen={opened}
                toggle={setOpened}
                disableAdaptiveMode
                targetRef={targetRef}
            >
                <Tooltip.Target>
                    <ButtonIcon aria-label="Показать подсказку" ref={targetRef}>
                        <QuestioncircleFilledSrvIcon16 paletteIndex={5} />
                    </ButtonIcon>
                </Tooltip.Target>
                <Tooltip.Body>
                    Подсказку с кнопкой закрытия пользователь закрывает сам — по клику на крестик, по Escape или по
                    клику вне подсказки.
                </Tooltip.Body>
                <Tooltip.XButton aria-label="Закрыть подсказку" />
            </Tooltip>
        </div>
    );
};
