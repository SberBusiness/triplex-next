import React, { useRef } from "react";
import { QuestioncircleFilledSrvIcon16 } from "@sberbusiness/icons-next";
import { ButtonIcon, ETooltipPreferPlace, ETooltipSize, Tooltip } from "@sberbusiness/triplex-next";

const TEXT_BY_SIZE: Record<ETooltipSize, string> = {
    [ETooltipSize.SM]: "Узкая подсказка шириной 192 пикселя.",
    [ETooltipSize.LG]: "Широкая подсказка шириной 384 пикселя. Подходит для текста в несколько строк.",
};

interface ISizeItemProps {
    size: ETooltipSize;
}

const SizeItem = ({ size }: ISizeItemProps) => {
    const targetRef = useRef<HTMLButtonElement | null>(null);

    return (
        <div style={{ display: "flex", alignItems: "center", gap: "16px", padding: "64px 0" }}>
            <div style={{ fontSize: "16px", fontWeight: "700", width: "40px" }}>{size.toUpperCase()}</div>
            <Tooltip
                size={size}
                toggleType="hover"
                preferPlace={ETooltipPreferPlace.BELOW}
                // Подсказка открыта постоянно, чтобы в примере были видны оба размера сразу.
                isOpen
                // Размер влияет только на десктопную версию: в адаптиве подсказка занимает всю ширину экрана.
                disableAdaptiveMode
                targetRef={targetRef}
            >
                <Tooltip.Target>
                    <ButtonIcon aria-label={`Подсказка размера ${size}`} ref={targetRef}>
                        <QuestioncircleFilledSrvIcon16 paletteIndex={5} />
                    </ButtonIcon>
                </Tooltip.Target>
                <Tooltip.Body>{TEXT_BY_SIZE[size]}</Tooltip.Body>
            </Tooltip>
        </div>
    );
};

const SIZES = Object.values(ETooltipSize);

export const Sizes = () => (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        {SIZES.map((size) => (
            <SizeItem key={size} size={size} />
        ))}
    </div>
);
