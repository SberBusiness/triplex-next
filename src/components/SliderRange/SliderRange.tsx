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
    /** Содержимое метки. */
    label: React.ReactNode;
}

/** Свойства компонента SliderRange. */
export interface ISliderRangeProps extends Omit<ISliderExtendedProps, "onChange" | "step"> {
    /** Состав слайдера фиксирован, содержимое не передаётся. */
    children?: never;
    /** Трек можно передвигать. По умолчанию true. */
    draggableTrack?: boolean;
    /** Массив меток под полосой слайдера. */
    marks: ISliderRangeMark[];
    /** Обработчик изменения значений. Вызывается с отсортированной парой значений. */
    onChange: (values: TSliderRangeValues) => void;
    /**
     * Длина шага, например при длине шага 1, с min-0. max-100, слайдер будет разделен на 100 шагов.
     * Вместо длины шага можно передать массив шагов, например [0, 25, 50, 75, 100]. Начальное значение должно быть равно min, последнее значение должно быть равно max.
     * По умолчанию 1.
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

/** Возвращает пару значений, отсортированную по возрастанию. */
const sortValues = (values: TSliderRangeValues): TSliderRangeValues =>
    [...values].sort((a, b) => a - b) as TSliderRangeValues;

/**
 * Сравнивает пары значений.
 * Сравнение идёт по склейке значений: пары вроде [1, 23] и [12, 3] считаются одинаковыми.
 * Поведение сохранено намеренно — см. SliderRange-ai.md, раздел «Инварианты».
 */
const isSameValues = (values: TSliderRangeValues, otherValues: TSliderRangeValues): boolean =>
    values.join("") === otherValues.join("");

/**
 * Слайдер с двумя ползунками — готовая сборка SliderExtended для выбора диапазона.
 * Компонент рисует ползунки по внутренним значениям и сообщает новую пару через onChange.
 * Внутренние значения синхронизируются с values, когда потребитель присылает новую пару.
 */
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
        const { innerValues } = this.state;

        this.validateValues();

        // Values не изменились — синхронизировать нечего.
        if (isSameValues(values, prevProps.values)) {
            return;
        }

        // Первое значение innerValues меньше второго — присвоение values происходит в обычном порядке.
        // Иначе ползунки перекрещены, и values присваиваются в обратном порядке, чтобы каждый ползунок остался на своей стороне.
        const nextInnerValues: TSliderRangeValues =
            innerValues[0] <= innerValues[1] ? [...values] : [values[1], values[0]];

        // Новые values отличаются от innerValues.
        if (!isSameValues(nextInnerValues, innerValues)) {
            this.setState({ innerValues: nextInnerValues });
        }
    }

    public render(): React.ReactNode {
        // step = 1 дублирует defaultProps намеренно: при чтении this.props тип остаётся
        // number | number[] | undefined, а SliderExtended требует определённый step.
        const {
            draggableTrack,
            marks,
            onChange,
            step = 1,
            values,
            renderTooltipContent,
            ...sliderExtendedAttributes
        } = this.props;
        const { innerValues } = this.state;

        return (
            <SliderExtended step={step} {...sliderExtendedAttributes}>
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
            onChange(sortValues(values));
        }
    };

    /** Возвращает обработчик изменения значения ползунка с индексом valueIndex. */
    private handleChange = (valueIndex: number) => {
        return (value: number) => {
            const { onChange } = this.props;

            // Обновление и вызов onChange идут внутри updater'а намеренно: перемещение трека меняет
            // оба ползунка двумя вызовами подряд, и второй обязан видеть значение, записанное первым.
            this.setState((prevState) => {
                const { innerValues } = prevState;
                const nextVal = [...innerValues] as TSliderRangeValues;
                nextVal[valueIndex] = value;

                // Сортируем значения для передачи в onChange
                const sortedVal = nextVal[0] > nextVal[1] ? sortValues(nextVal) : nextVal;
                onChange(sortedVal);

                return { innerValues: nextVal };
            });
        };
    };
}

export { SliderRange };
