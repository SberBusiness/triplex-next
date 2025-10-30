import { AmountBaseInputParser } from "./AmountBaseInputParser";
import { AmountBaseInputFormatter } from "./AmountBaseInputFormatter";

/** Свойства кэша AmountBaseInputCore. */
interface IAmountBaseInputCoreCache {
    /** Отформатированное значение. */
    formattedValue: string;
    /** Значение нажатой клавиши. */
    key: string;
    /** Позиция начала выделения. */
    selectionStart: number | null;
    /** Позиция конца выделения. */
    selectionEnd: number | null;
    /** Направление выделения. */
    selectionDirection: "forward" | "backward" | "none" | null;
}

/** Основная логика в AmountBaseInput. */
export class AmountBaseInputCore {
    /** Значение. */
    public value: string;
    /** Отформатированное значение. */
    public formattedValue: string;
    /** Положение каретки. */
    public caret: number;
    /** Максимальное количество знаков перед запятой. */
    public maxIntegerDigits: number;
    /** Количество чисел после запятой. */
    public fractionDigits: number;
    /** Кэш для хранения значений. */
    public cache: IAmountBaseInputCoreCache;

    constructor(maxIntegerDigits: number, fractionDigits: number) {
        this.value = "";
        this.formattedValue = "";
        this.caret = 0;
        this.maxIntegerDigits = maxIntegerDigits;
        this.fractionDigits = fractionDigits;
        this.cache = {
            formattedValue: "",
            key: "",
            selectionDirection: null,
            selectionEnd: null,
            selectionStart: null,
        };
    }

    /** Применение входных данных. */
    public apply(value: string, caret: number): void {
        this.parse(value, caret);
        this.format(this.value);
    }

    /** Обработка значения. */
    private parse(value: string, caret: number): void {
        const parser = new AmountBaseInputParser(this.maxIntegerDigits, this.fractionDigits);

        parser.apply(value, caret, this.cache.key);

        this.value = parser.getValue();
        this.caret = caret + parser.getCaretOffset();
    }

    /** Форматирование значения. */
    private format(value: string): void {
        const formatter = new AmountBaseInputFormatter(this.maxIntegerDigits, this.fractionDigits);

        formatter.apply(value);

        this.formattedValue = formatter.getValue();
        this.caret += formatter.getCaretOffset();
    }
}
