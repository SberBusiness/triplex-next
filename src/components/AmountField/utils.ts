import React from "react";
import { AmountConst } from "@sberbusiness/triplex-next/consts/AmountConst";
import { isKey } from "@sberbusiness/triplex-next/utils/keyboard";
import { StringUtils } from "@sberbusiness/triplex-next/utils/stringUtils";
import type { AmountBaseInputCore } from "./AmountBaseInputCore";

/**
 * Создать placeholder.
 *
 * @param fractionDigits Количество знаков после запятой.
 */
export function createPlaceholder(fractionDigits: number) {
    const buffer = ["0"];

    if (fractionDigits > 0) {
        buffer.push(AmountConst.DecimalComma);

        for (let i = 0; i < fractionDigits; i++) {
            buffer.push("0");
        }
    }

    return buffer.join("");
}

/**
 * Записать значение в forwarded ref (callback-ref или объектный ref).
 *
 * Внутренний хелпер AmountField: из barrel index.ts не экспортируется.
 *
 * @param ref Внешняя ссылка, переданная потребителем.
 * @param instance Экземпляр элемента или null при размонтировании.
 */
export function setForwardedRef<T>(ref: React.Ref<T> | undefined, instance: T | null): void {
    if (typeof ref === "function") {
        ref(instance);
    } else if (ref != null) {
        // React.RefObject помечен readonly, но запись в current — единственный способ заполнить объектный ref.
        (ref as React.MutableRefObject<T | null>).current = instance;
    }
}

/**
 * Синхронизировать ядро с текущим значением и настройками формата и вернуть отформатированное значение.
 *
 * Пересчёт выполняется, только если значение или настройки формата отличаются от тех, что уже в ядре:
 * иначе повторный рендер затирал бы позицию каретки, вычисленную обработчиком ввода.
 *
 * @param core Ядро форматирования, живущее между рендерами.
 * @param value Значение, пришедшее в inputProps.value.
 * @param maxIntegerDigits Максимальное количество знаков перед запятой.
 * @param fractionDigits Количество знаков после запятой.
 */
export function syncCoreAndGetFormattedValue(
    core: AmountBaseInputCore,
    value: string,
    maxIntegerDigits: number,
    fractionDigits: number,
): string {
    if (value !== core.value || maxIntegerDigits !== core.maxIntegerDigits || fractionDigits !== core.fractionDigits) {
        core.maxIntegerDigits = maxIntegerDigits;
        core.fractionDigits = fractionDigits;
        core.apply(value, value.length);
    }

    core.cache.formattedValue = core.formattedValue;

    return core.formattedValue;
}

/**
 * Установка каретки на случай, если не произойдёт изменения значения.
 *
 * Значение может не измениться по двум причинам:
 *     1) Значение невалидно. Обработчик снаружи не обновляет состояние;
 *     2) Значение идентично предыдущему. Обработчик снаружи [не] обновляет состояние.
 **/
export function setFallbackCaret(input: HTMLInputElement, coreAmount: AmountBaseInputCore, fractionDigits: number) {
    const { formattedValue, key, selectionStart, selectionEnd, selectionDirection } = coreAmount.cache;

    input.value = formattedValue;

    if (selectionStart === null || selectionEnd === null || selectionDirection === null) return;

    if (key === AmountConst.DecimalComma || key === AmountConst.DecimalPoint) {
        // Если каретка находится непосредственно перед десятичным разделителем, сдвигаем каретку вперёд.
        if (selectionStart === selectionEnd && formattedValue[selectionStart] === AmountConst.DecimalComma)
            return input.setSelectionRange(selectionStart + 1, selectionStart + 1);
    } else if (isKey(key, "BACKSPACE")) {
        if (selectionStart === selectionEnd) {
            // Если каретка стоит непосредственно после группового/десятичного разделителя, сдвигаем каретку назад.
            if (StringUtils.isDigit(formattedValue[selectionStart - 1]) === false)
                return input.setSelectionRange(selectionStart - 1, selectionEnd - 1);
        }
        // Если есть выделенный текст, ставим каретку в начало выделения.
        else {
            // Ставим каретку в начало выделения.
            return input.setSelectionRange(selectionStart, selectionStart);
        }
    } else if (isKey(key, "DELETE")) {
        if (selectionStart === selectionEnd) {
            // Если каретка стоит непосредственно перед групповым/десятичным разделителем, сдвигаем каретку вперёд.
            if (StringUtils.isDigit(formattedValue[selectionStart]) === false)
                return input.setSelectionRange(selectionStart + 1, selectionEnd + 1);
        }
        // Если есть выделенный текст, ставим каретку в конец выделения.
        else {
            return input.setSelectionRange(selectionEnd, selectionEnd);
        }
    }

    // Если каретка находится после десятичного разделителя.
    if (fractionDigits > 0 && formattedValue.length - fractionDigits - 1 < selectionStart) {
        // Если новое значение повторяет старое, ставим каретку в расчётное место.
        if (coreAmount.formattedValue === formattedValue)
            return input.setSelectionRange(coreAmount.caret, coreAmount.caret);
    }

    // Если текст выделялся в обратном порядке, ставим каретку в конец выделения.
    if (selectionDirection === "backward") return input.setSelectionRange(selectionEnd, selectionEnd);

    // В остальных случаях ставим каретку в начало выделения.
    return input.setSelectionRange(selectionStart, selectionStart);
}
