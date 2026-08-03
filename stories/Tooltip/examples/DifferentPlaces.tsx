import React, { useRef } from "react";
import { QuestioncircleFilledSrvIcon16 } from "@sberbusiness/icons-next";
import { ButtonIcon, ETooltipPreferPlace, ETooltipSize, Tooltip } from "@sberbusiness/triplex-next";

interface IPlaceItemProps {
    place: ETooltipPreferPlace;
}

const PlaceItem = ({ place }: IPlaceItemProps) => {
    const targetRef = useRef<HTMLButtonElement | null>(null);

    return (
        <div style={{ display: "flex", alignItems: "center", gap: "16px", padding: "64px 0" }}>
            <div style={{ fontSize: "16px", fontWeight: "700", width: "56px" }}>{place}</div>
            <Tooltip
                size={ETooltipSize.SM}
                toggleType="hover"
                preferPlace={place}
                // Подсказки открыты постоянно, чтобы в примере были видны все варианты расположения сразу.
                isOpen
                // preferPlace влияет только на десктопную версию: в адаптиве подсказка открывается снизу экрана.
                disableAdaptiveMode
                targetRef={targetRef}
            >
                <Tooltip.Target>
                    <ButtonIcon aria-label={`Подсказка ${place}`} ref={targetRef}>
                        <QuestioncircleFilledSrvIcon16 paletteIndex={5} />
                    </ButtonIcon>
                </Tooltip.Target>
                <Tooltip.Body>Расположение {place}</Tooltip.Body>
            </Tooltip>
        </div>
    );
};

const PLACES = Object.values(ETooltipPreferPlace);

export const DifferentPlaces = () => (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        {PLACES.map((place) => (
            <PlaceItem key={place} place={place} />
        ))}
    </div>
);
