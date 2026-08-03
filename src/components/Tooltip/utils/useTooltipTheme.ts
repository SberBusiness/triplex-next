import { useEffect, useRef } from "react";
import { useToken } from "@sberbusiness/triplex-next/components/ThemeProvider";

/**
 * Задержка снятия класса темы после закрытия подсказки, мс.
 * Закрытие идёт с анимацией, поэтому стили нужно придержать на это время.
 * См. ENTER_EXIT_TRANSITION_DURATION_MS в TooltipDesktopBase.
 */
const THEME_CLEANUP_DELAY_MS = 500;

/**
 * Имя data-атрибута со счётчиком подсказок, которые сейчас используют класс темы на контейнере.
 * @param scopeClassName Класс темы.
 */
const getUsageCounterAttrName = (scopeClassName: string) => `data-tooltip-theme-${scopeClassName}-counter`;

/**
 * Хук для установки css-класса текущей темы на контейнер tooltip-а.
 * @param open Флаг отображения тултипа.
 * @param renderContainer DOM-элемент, куда рендерится тултип
 */
export function useTooltipTheme(open: boolean, renderContainer: Element) {
    const { scopeClassName } = useToken();
    /** Держит ли эта подсказка сейчас инкремент счётчика — чтобы не декрементировать чужой. */
    const hasUsageRef = useRef(false);
    /** Идентификатор отложенного снятия класса темы, запланированного этой подсказкой. */
    const cleanupTimeoutRef = useRef<number | undefined>(undefined);

    useEffect(() => {
        if (scopeClassName && renderContainer) {
            const cl = renderContainer.classList;

            if (open) {
                // Подсказку открыли снова до истечения задержки — снятие класса больше не нужно.
                if (cleanupTimeoutRef.current !== undefined) {
                    window.clearTimeout(cleanupTimeoutRef.current);
                    cleanupTimeoutRef.current = undefined;
                }

                if (!cl.contains(scopeClassName)) {
                    cl.add(scopeClassName);
                }

                if (!hasUsageRef.current) {
                    incTooltipThemeUsage(renderContainer, scopeClassName);
                    hasUsageRef.current = true;
                }
            } else if (hasUsageRef.current) {
                hasUsageRef.current = false;

                const usage = decTooltipThemeUsage(renderContainer, scopeClassName);
                if (usage <= 0) {
                    cleanupTimeoutRef.current = window.setTimeout(() => {
                        cleanupTimeoutRef.current = undefined;

                        // За время задержки контейнер могла занять эта же или другая подсказка — класс ещё нужен.
                        if (getTooltipThemeUsage(renderContainer, scopeClassName) <= 0) {
                            cl.remove(scopeClassName);
                        }
                    }, THEME_CLEANUP_DELAY_MS);
                }
            }
        }

        // очистка эффекта нам нужна только на unmount, тут она мешает, удаляя css класс темы раньше времени
    }, [scopeClassName, open, renderContainer]);

    // unmount, если тултип еще отображался в этот момент
    useEffect(() => {
        return () => {
            const hasPendingCleanup = cleanupTimeoutRef.current !== undefined;

            if (hasPendingCleanup) {
                window.clearTimeout(cleanupTimeoutRef.current);
                cleanupTimeoutRef.current = undefined;
            }

            if (!scopeClassName || !renderContainer) {
                return;
            }

            const cl = renderContainer.classList;

            if (hasUsageRef.current) {
                hasUsageRef.current = false;

                const usage = decTooltipThemeUsage(renderContainer, scopeClassName);
                if (usage <= 0) {
                    cl.remove(scopeClassName);
                }
            } else if (hasPendingCleanup && getTooltipThemeUsage(renderContainer, scopeClassName) <= 0) {
                // Снятие класса было отложено, но ждать больше нечему — снимаем сразу.
                cl.remove(scopeClassName);
            }
        };
    }, [renderContainer, scopeClassName]);
}

/**
 * Текущее значение счётчика подсказок, использующих класс темы на контейнере.
 * @param node Контейнер рендера подсказки.
 * @param scopeClassName Класс темы.
 */
function getTooltipThemeUsage(node: Element, scopeClassName: string): number {
    const counterAttr = node.getAttribute(getUsageCounterAttrName(scopeClassName));

    return counterAttr ? parseInt(counterAttr, 10) : 0;
}

/**
 * Увеличивает счётчик подсказок, использующих класс темы на контейнере.
 * @param node Контейнер рендера подсказки.
 * @param scopeClassName Класс темы.
 * @returns Новое значение счётчика.
 */
function incTooltipThemeUsage(node: Element, scopeClassName: string): number {
    const counterAttrName = getUsageCounterAttrName(scopeClassName);
    const counterAttr = node.getAttribute(counterAttrName);
    const counter = counterAttr ? parseInt(counterAttr, 10) + 1 : 1;
    node.setAttribute(counterAttrName, counter.toString());

    return counter;
}

/**
 * Уменьшает счётчик подсказок, использующих класс темы на контейнере.
 * Когда счётчик доходит до нуля, атрибут удаляется.
 * @param node Контейнер рендера подсказки.
 * @param scopeClassName Класс темы.
 * @returns Новое значение счётчика.
 */
function decTooltipThemeUsage(node: Element, scopeClassName: string): number {
    const counterAttrName = getUsageCounterAttrName(scopeClassName);
    const counterAttr = node.getAttribute(counterAttrName);
    const counter = counterAttr ? parseInt(counterAttr, 10) - 1 : 0;

    if (counter > 0) {
        node.setAttribute(counterAttrName, counter.toString());
    } else {
        node.removeAttribute(counterAttrName);
    }

    return counter;
}
