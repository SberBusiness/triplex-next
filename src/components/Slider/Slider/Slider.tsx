import React from "react";
import { ISliderExtendedProps, SliderExtended } from "../SliderExtended/SliderExtended";
import { ISliderExtendedDotProps } from "../SliderExtended/components/SliderExtendedDot/SliderExtendedDot";

/** Лейбл под полосой слайдера. */
export interface ISliderMark {
    /** Значение расположения метки, должно быть в диапазоне от min до max. */
    value: number;
    label: React.ReactNode;
}

export interface ISliderProps
    extends Omit<ISliderExtendedProps, "onChange" | "step">,
        Pick<ISliderExtendedDotProps, "onChange" | "value"> {
    children?: never;
    /** Массив меток под полосой слайдера. */
    marks: ISliderMark[];
    /**
     * Длина шага, например при длине шага 1, с min-0. max-100, слайдер будет разделен на 100 шагов.
     * Вместо длины шага можно передать массив шагов, например [0, 25, 50, 75, 100]. Будет 3 возможные позиции между min и max. Начальное значение должно быть равно min, последнее значение должно быть равно max.
     */
    step?: number | number[];
    /** Содержимое тултипа, отображаемого при наведении на точку и перемещении. */
    renderTooltipContent?: (value: number) => React.ReactNode;
}

/** Слайдер с одним ползунком. */
export const Slider: React.FC<ISliderProps> = ({
    marks,
    onChange,
    step = 1,
    value,
    renderTooltipContent,
    size,
    ...sliderExtendedAttributes
}) => (
    <SliderExtended step={step} size={size} {...sliderExtendedAttributes}>
        <SliderExtended.Rail />
        <SliderExtended.Dot value={value} onChange={onChange}>
            {renderTooltipContent && (
                <SliderExtended.Tooltip value={value}>{renderTooltipContent(value)}</SliderExtended.Tooltip>
            )}
        </SliderExtended.Dot>

        <SliderExtended.Track />

        <SliderExtended.Marks>
            {marks.map((m) => (
                <SliderExtended.Mark key={m.value} value={m.value}>
                    {m.label}
                </SliderExtended.Mark>
            ))}
        </SliderExtended.Marks>
    </SliderExtended>
);
