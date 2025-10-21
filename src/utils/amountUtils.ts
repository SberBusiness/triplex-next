import Big from "big.js";
import { AmountConst } from "@sberbusiness/triplex-next/consts/AmountConst";

/**
 * Регулярка для отбрасывания незначащих нулей в дробной части.
 */
const AMOUNT_FORMATTER = /^([\d]+)$|^([\d]+)\.0*$|^([\d]+\.[0-9]*?)0*$/;

/**
 * Форматирует число в читаемую форму 1200000,00 -> 1 200 000,00
 *
 * @param {string | Big} amount Значение, которое нужно отформатировать.
 * @param {number} [fractionLength] Количество знаков после запятой, по-умолчанию - 2.
 * @param {boolean} [separateGroups] Необходимо ли разделять группы цифр разделителем (пробелом), по умолчанию true.
 * @param {boolean} [fillFraction] Необходимо ли дополнять десятичную часть нулями, по умолчанию true.
 * @returns {string} Отформатированное значение.
 */
export function formatAmount(
    amount: string | Big,
    fractionLength?: number | null,
    separateGroups = true,
    fillFraction = true,
): string {
    if (!amount) {
        return "";
    }

    // Сохраняем прошлое значение округления числа.
    const prevBigRm = Big.RM;
    try {
        // Задаём режим вычисления без округления числа.
        Big.RM = 0;

        // Если значение для количества дробных знаков не задано - используем по умолчанию 2,
        // если null - то 0, иначе установленное значение.
        const fl = fractionLength === undefined ? AmountConst.FractionLength : fractionLength || 0;

        // Значение, заданное в виде строки преобразуем в BigInt.
        let positiveSign = ""; // Для числа в виде строки требуется сохранить признак наличия знака "+"
        if (!(amount instanceof Big)) {
            try {
                let value = amount
                    .replace(/\s+/g, "") // Очищаем от пробелов.
                    .replace(AmountConst.DecimalComma, AmountConst.DecimalPoint); // Устанавливаем стандартный разделитель для BigInt.
                if (value.length > 0 && value[0] === "+") {
                    positiveSign = "+";
                    value = value.substring(1);
                }
                amount = Big(value);
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
            } catch (e) {
                amount = Big(0);
            }
        }

        // Получим округлённое значение в виде строки.
        amount = amount.toFixed(fl);

        // Если не требуется заполнять нулями разряды в дробной части, то удалим незначащие нули (при их наличии).
        if (!fillFraction) {
            amount = amount.replace(AMOUNT_FORMATTER, "$1$2$3");
        }

        const parts = amount.split(AmountConst.DecimalPoint);

        if (separateGroups && parts.length > 0) {
            parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, AmountConst.GroupSeparator);
        }

        return positiveSign + parts.join(AmountConst.DecimalComma);
    } finally {
        // Возвращаем режим округления числа.
        Big.RM = prevBigRm;
    }
}

/**
 * Утилита для сравнения сумм.
 *
 * @param {string} a - Первое число.
 * @param {string} b - Второе число.
 * @returns {-1 | 0 | 1 } положительное число, если a > b,
 *                          отрицательно число, если a < b,
 *                          0, если a = b.
 */
export function amountComparator(a: string, b: string): -1 | 0 | 1 {
    const aCalc = a.replace(AmountConst.DecimalComma, AmountConst.DecimalPoint);
    const bCalc = b.replace(AmountConst.DecimalComma, AmountConst.DecimalPoint);

    const aAmount = Big(aCalc);
    const bAmount = Big(bCalc);

    if (aAmount.gt(bAmount)) {
        return 1;
    } else if (aAmount.lt(bAmount)) {
        return -1;
    } else {
        return 0;
    }
}
