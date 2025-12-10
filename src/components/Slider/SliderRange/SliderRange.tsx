import React from "react";
import { ISliderExtendedProps, SliderExtended } from "../SliderExtended/SliderExtended";

/**
 * Значения Range - массив из двух чисел, в соответствии которому строятся ползунки.
 * Оба числа должны быть в диапазоне от min до max. Левое число меньше правого.
 */
export type TSliderRangeValues = [number, number];

/** Лейбл под полосой слайдера. */
export interface ISliderRangeMark {
    /** Значение расположения метки, должно быть в диапазоне от min до max. */
    value: number;
    label: React.ReactNode;
}

export interface ISliderRangeProps extends Omit<ISliderExtendedProps, "onChange" | "step"> {
    children?: never;
    /** Трек можно передвигать. По-умолчанию true. */
    draggableTrack?: boolean;
    /** Массив меток под полосой слайдера. */
    marks: ISliderRangeMark[];
    /** Обработчик изменения значений. */
    onChange: (values: TSliderRangeValues) => void;
    /**
     * Длина шага, например при длине шага 1, с min-0. max-100, слайдер будет разделен на 100 шагов.
     * Вместо длины шага можно передать массив шагов, например [0, 25, 50, 75, 100]. Начальное значение должно быть равно min, последнее значение должно быть равно max.
     */
    step?: number | number[];
    /** Значения Range - массив из двух чисел, в соответствии которому строятся ползунки. Оба числа должны быть в диапазоне от min до max. */
    values: TSliderRangeValues;
    /** Содержимое тултипа, отображаемого при наведении на точку и перемещении. */
    renderTooltipContent?: (value: number) => React.ReactNode;
}

interface ISliderRangeState {
    /** Внутренние значения values, они не отсортированы так, что первое значение всегда меньше второго. */
    innerValues: TSliderRangeValues;
}

/** Слайдер с двумя ползунками. */
class SliderRange extends React.Component<ISliderRangeProps, ISliderRangeState> {
    public static displayName = "SliderRange";

    public static defaultProps: Partial<ISliderRangeProps> = {
        step: 1,
    };

    constructor(props: ISliderRangeProps) {
        super(props);

        this.state = {
            innerValues: [...props.values],
        };

        this.validateValues();
    }

    public componentDidUpdate(prevProps: ISliderRangeProps): void {
        const { values } = this.props;
        const { values: prevValues } = prevProps;
        const { innerValues } = this.state;

        this.validateValues();

        // Values изменились.
        if (values.join("") !== prevValues.join("")) {
            // Первое значение innerValues меньше второго значения. Присвоение values происходит в обычном порядке.
            if (innerValues[0] <= innerValues[1]) {
                const nextInnerValues = [...values];
                // Новые values отличаются от innerValues.
                if (nextInnerValues.join("") !== innerValues.join("")) {
                    this.setState({
                        innerValues: [...values],
                    });
                }

                // Первое значение innerValues больше второго значения . Присвоение values происходит в обратном порядке. Новые values отличаются от innerValues.
            } else if ([values[1], values[0]].join("") !== innerValues.join("")) {
                this.setState({
                    innerValues: [values[1], values[0]],
                });
            }
        }
    }

    public render(): React.ReactNode {
        const {
            draggableTrack,
            marks,
            onChange,
            step = 1,
            values,
            renderTooltipContent,
            size,
            ...sliderExtendedAttributes
        } = this.props;
        const { innerValues } = this.state;

        return (
            <SliderExtended step={step} size={size} {...sliderExtendedAttributes}>
                <SliderExtended.Rail />

                <SliderExtended.Dot key={"1"} value={innerValues[0]} onChange={this.handleChange(0)}>
                    {renderTooltipContent && (
                        <SliderExtended.Tooltip value={innerValues[0]}>
                            {renderTooltipContent(innerValues[0])}
                        </SliderExtended.Tooltip>
                    )}
                </SliderExtended.Dot>
                <SliderExtended.Track draggable={draggableTrack} />
                <SliderExtended.Dot key={"2"} value={innerValues[1]} onChange={this.handleChange(1)}>
                    {renderTooltipContent && (
                        <SliderExtended.Tooltip value={innerValues[1]}>
                            {renderTooltipContent(innerValues[1])}
                        </SliderExtended.Tooltip>
                    )}
                </SliderExtended.Dot>

                <SliderExtended.Marks>
                    {marks.map((m) => (
                        <SliderExtended.Mark key={m.value} value={m.value}>
                            {m.label}
                        </SliderExtended.Mark>
                    ))}
                </SliderExtended.Marks>
            </SliderExtended>
        );
    }

    /** Проверка values, меньшее значение, должно быть перед большим. */
    private validateValues = () => {
        const { onChange, values } = this.props;
        if (values[0] > values[1]) {
            onChange(this.sortValues(values));
        }
    };

    private sortValues = (values: TSliderRangeValues): TSliderRangeValues =>
        [...values].sort((a, b) => a - b) as TSliderRangeValues;

    private handleChange = (valueIndex: number) => {
        return (value: number) => {
            const { onChange } = this.props;

            this.setState((prevState) => {
                const { innerValues } = prevState;
                const nextVal = [...innerValues] as TSliderRangeValues;
                nextVal[valueIndex] = value;

                // Сортируем значения для передачи в onChange
                const sortedVal = nextVal[0] > nextVal[1] ? this.sortValues(nextVal) : nextVal;
                onChange(sortedVal);

                return { innerValues: nextVal };
            });
        };
    };
}

export { SliderRange };
