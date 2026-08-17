import React, { useMemo, useState } from "react";
import { range } from "lodash-es";
import clsx from "clsx";
import { EComponentSize } from "@sberbusiness/triplex-next/enums/EComponentSize";
import { createSizeToClassNameMap } from "@sberbusiness/triplex-next/utils/classNameMaps";
import { SliderExtendedDot } from "./components/SliderExtendedDot/SliderExtendedDot";
import { SliderExtendedMarks } from "./components/SliderExtendedMarks/SliderExtendedMarks";
import { SliderExtendedMark } from "./components/SliderExtendedMarks/SliderExtendedMark";
import { SliderExtendedRail } from "./components/SliderExtendedRail";
import { SliderExtendedTrack } from "./components/SliderExtendedTrack/SliderExtendedTrack";
import { SliderExtendedTooltip } from "./components/SliderExtendedTooltip/SliderExtendedTooltip";
import { ISliderExtendedDot, ISliderExtendedStep, SliderExtendedContext } from "./SliderExtendedContext";
import { SliderExtendedUtils } from "./SliderExtendedUtils";
import styles from "./styles/SliderExtended.module.less";

const sizeToClassNameMap = createSizeToClassNameMap(styles);

/** Свойства компонента SliderExtended. */
export interface ISliderExtendedProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Слайдер не активен. По умолчанию false. */
    disabled?: boolean;
    /** Максимальное значение слайдера. */
    max: number;
    /** Минимальное значение слайдера. */
    min: number;
    /** Реверсивный слайдер — значения возрастают справа налево. По умолчанию false. */
    reverse?: boolean;
    /**
     * Длина шага, например при длине шага 1, с min-0. max-100, слайдер будет разделен на 100 шагов.
     * Вместо длины шага можно передать массив шагов, например [0, 25, 50, 75, 100]. Будет 3 возможные позиции между min и max. Начальное значение должно быть равно min, последнее значение должно быть равно max.
     */
    step: number | number[];
    /** Размер компонента. */
    size: EComponentSize.MD | EComponentSize.LG;
}

/**
 * Слайдер, собираемый из субкомпонентов: Rail (полоса), Dot (ползунок), Track (заполненная часть),
 * Marks/Mark (метки) и Tooltip (подсказка над ползунком). Значения ползунков контролирует потребитель.
 */
const SliderExtendedBase = React.forwardRef<HTMLDivElement, ISliderExtendedProps>(
    ({ children, className, disabled, max, min, reverse = false, step, size, ...htmlDivAttributes }, ref) => {
        const [dots, setDots] = useState<ISliderExtendedDot[]>([]);
        const [focused, setFocused] = useState(false);
        const [isHoverOrDragTrack, setIsHoverOrDragTrack] = useState(false);
        const [railNode, setRailNode] = useState<HTMLDivElement | null>(null);

        /**
         * Массив точек остановки при перемещении Dot.
         * Для каждой точки указывается позиция на треке в % и value.
         */
        const steps = useMemo<ISliderExtendedStep[]>(() => {
            const values = typeof step === "number" ? [...range(min, max, step), max] : step;

            return values.map((value) => ({
                normalizedValue: SliderExtendedUtils.getNormalizedValue({ max, min, value }),
                value,
            }));
        }, [max, min, step]);

        const addDot = (dot: ISliderExtendedDot) => {
            setDots((prevDots) => [...prevDots, dot]);
        };

        const removeDot = (id: string) => {
            setDots((prevDots) => prevDots.filter((dot) => dot.id !== id));
        };

        /**
         * Обновляет данные точки.
         * Объект точки меняется на месте намеренно: обработчики перетаскивания подписываются на
         * document в момент нажатия и до конца перетаскивания видят массив dots того рендера.
         * Замена объекта на новый оставила бы их с устаревшими stepIndex и value.
         */
        const updateDot = (dot: Pick<ISliderExtendedDot, "id"> & Partial<ISliderExtendedDot>) => {
            setDots((prevDots) => {
                const prevDot = prevDots.find((d) => d.id === dot.id);

                if (prevDot) {
                    Object.assign(prevDot, dot);
                }

                return [...prevDots];
            });
        };

        if (!steps.length) {
            return null;
        }

        return (
            <SliderExtendedContext.Provider
                value={{
                    addDot,
                    disabled: Boolean(disabled),
                    dots,
                    focused,
                    isHoverOrDragTrack,
                    max,
                    min,
                    railNode,
                    removeDot,
                    reverse,
                    setFocused,
                    setIsHoverOrDragTrack,
                    setRailNode,
                    steps,
                    updateDot,
                    size,
                }}
            >
                <div
                    className={clsx(
                        styles.sliderExtended,
                        sizeToClassNameMap[size],
                        { [styles.disabled]: disabled },
                        className,
                    )}
                    {...htmlDivAttributes}
                    data-tx={process.env.npm_package_version}
                    ref={ref}
                >
                    {children}
                </div>
            </SliderExtendedContext.Provider>
        );
    },
);

SliderExtendedBase.displayName = "SliderExtended";

/** Компонент SliderExtended. */
export const SliderExtended = Object.assign(SliderExtendedBase, {
    Dot: SliderExtendedDot,
    Mark: SliderExtendedMark,
    Marks: SliderExtendedMarks,
    Rail: SliderExtendedRail,
    Track: SliderExtendedTrack,
    Tooltip: SliderExtendedTooltip,
});
