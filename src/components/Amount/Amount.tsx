import React from "react";
import { clsx } from "clsx";
import { formatAmount } from "@sberbusiness/triplex-next/utils/amountUtils";
import styles from "./styles/Amount.module.less";

/** Длина форматированной (с разделителями групп и дробной частью) строки суммы, начиная с которой уменьшается шрифт. */
const ADAPTIVE_AMOUNT_LENGTH = 14;

/** Дефис-минус (U+002D) — символ, которым formatAmount помечает отрицательное значение. */
const HYPHEN_MINUS = "\u002D";

/** Знак минуса (U+2212) — типографский минус, который озвучивают скрин-ридеры. */
const MINUS_SIGN = "\u2212";

/** Неразрывный пробел между суммой и обозначением валюты. */
const NON_BREAKING_SPACE = "\u00A0";

/** Свойства компонента Amount. */
export interface IAmountProps extends React.HTMLAttributes<HTMLSpanElement> {
    /** Значение суммы. Строка с разделителем дробной части "." или ","; пробелы и ведущий знак "+"/"-" допустимы. */
    value: string;
    /** Количество знаков после запятой. По умолчанию 2. */
    fractionLength?: 0 | 1 | 2 | 3 | 4;
    /** Сокращённое обозначение валюты. Выводится после суммы через неразрывный пробел. */
    currency?: string;
    /** Сообщение подсказки названия валюты. Попадает в атрибут title элемента с обозначением валюты. */
    currencyTitle?: string;
    /** При длине форматированной суммы от ADAPTIVE_AMOUNT_LENGTH символов уменьшает размер шрифта. По умолчанию false. */
    adaptive?: boolean;
    /** Тестовый атрибут. Используется как префикс: `${dataTestId}__amount` и `${dataTestId}__currencyName`. */
    dataTestId?: string;
}

/**
 * Компонент отображения суммы.
 * Форматирует значение (разделители групп разрядов, дробная часть) и при необходимости выводит рядом
 * обозначение валюты. Размер и цвет шрифта наследуются от родителя — как правило, от Text.
 */
export const Amount = React.forwardRef<HTMLSpanElement, IAmountProps>(
    ({ className, value, fractionLength, currency, currencyTitle, adaptive, dataTestId, ...restProps }, ref) => {
        const formattedValue = formatAmount(value, fractionLength);
        // (Accessibility) Меняем дефис-минус на знак минуса для его озвучивания скрин-ридерами.
        const formattedAmount = formattedValue.startsWith(HYPHEN_MINUS)
            ? MINUS_SIGN + formattedValue.slice(1)
            : formattedValue;

        const classNames = clsx(
            {
                [styles.adaptive]: adaptive && formattedAmount.length >= ADAPTIVE_AMOUNT_LENGTH,
            },
            className,
        );

        return (
            <span className={classNames} {...restProps} ref={ref} data-tx={process.env.npm_package_version}>
                <span data-test-id={dataTestId && `${dataTestId}__amount`}>{formattedAmount}</span>
                {currency && (
                    <>
                        {NON_BREAKING_SPACE}
                        <span data-test-id={dataTestId && `${dataTestId}__currencyName`} title={currencyTitle}>
                            {currency}
                        </span>
                    </>
                )}
            </span>
        );
    },
);

Amount.displayName = "Amount";
