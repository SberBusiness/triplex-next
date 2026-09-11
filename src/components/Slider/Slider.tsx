import React from "react";
import { ISliderExtendedProps, SliderExtended } from "../SliderExtended/SliderExtended";
import { ISliderExtendedDotProps } from "../SliderExtended/components/SliderExtendedDot/SliderExtendedDot";

/** Лейбл под полосой слайдера. */
export interface ISliderMark {
    /** Значение расположения метки, должно быть в диапазоне от min до max. */
    value: number;
    /** Содержимое метки. */
    label: React.ReactNode;
}

/** Свойства компонента Slider. */
export interface ISliderProps
    extends Omit<ISliderExtendedProps, "onChange" | "step">, Pick<ISliderExtendedDotProps, "onChange" | "value"> {
    /** Слайдер собирается компонентом и не принимает содержимого. */
    children?: never;
    /** Массив меток под полосой слайдера. */
    marks: ISliderMark[];
    /**
     * Длина шага, например при длине шага 1, с min-0. max-100, слайдер будет разделен на 100 шагов.
     * Вместо длины шага можно передать массив шагов, например [0, 25, 50, 75, 100]. Будет 3 возможные позиции между min и max. Начальное значение должно быть равно min, последнее значение должно быть равно max.
     * По умолчанию 1.
     */
    step?: number | number[];
    /** Содержимое тултипа, отображаемого при наведении на точку и перемещении. */
    renderTooltipContent?: (value: number) => React.ReactNode;
}

/**
 * Слайдер с одним ползунком — готовая сборка SliderExtended: полоса, ползунок, трек и метки.
 * Значение контролируемое: компонент сообщает новое значение через onChange и ждёт его в value.
 */
export const Slider: React.FC<ISliderProps> = ({
    marks,
    onChange,
    step = 1,
    value,
    renderTooltipContent,
    ...sliderExtendedAttributes
}) => (
    <SliderExtended step={step} {...sliderExtendedAttributes}>
        <SliderExtended.Rail />
        <SliderExtended.Dot value={value} onChange={onChange}>
            {renderTooltipContent && (
                <SliderExtended.Tooltip value={value}>{renderTooltipContent(value)}</SliderExtended.Tooltip>
            )}
        </SliderExtended.Dot>

        <SliderExtended.Track />

        <SliderExtended.Marks>
            {marks.map((mark) => (
                <SliderExtended.Mark key={mark.value} value={mark.value}>
                    {mark.label}
                </SliderExtended.Mark>
            ))}
        </SliderExtended.Marks>
    </SliderExtended>
);

Slider.displayName = "Slider";
