import { useEffect } from "react";
import { useToken } from "@sberbusiness/triplex-next/components/ThemeProvider";

/**
 * Хук для установки css-класса текущей темы на контейнер tooltip-а.
 * @param open Флаг отображения тултипа.
 * @param renderContainer DOM-элемент, куда рендерится тултип
 */
export function useTooltipTheme(open: boolean, renderContainer: Element) {
    const { scopeClassName } = useToken();

    useEffect(() => {
        if (scopeClassName && renderContainer) {
            const cl = renderContainer.classList;

            if (open) {
                if (!cl.contains(scopeClassName)) {
                    cl.add(scopeClassName);
                }
                incTooltipThemeUsage(renderContainer, scopeClassName);
            } else {
                if (cl.contains(scopeClassName)) {
                    const usage = decTooltipThemeUsage(renderContainer, scopeClassName);
                    if (usage <= 0) {
                        // т.к. закрытие с анимацией, стили нужно придержать на это время
                        // см. TooltipDesktopBase ENTER_EXIT_TRANSITION_DURATION_MS
                        window.setTimeout(() => {
                            cl.remove(scopeClassName);
                        }, 500);
                    }
                }
            }
        }

        // очистка эффекта нам нужна только на unmount, тут она мешает, удаляя css класс темы раньше времени
    }, [scopeClassName, open, renderContainer]);

    // unmount, если тултип еще отображался в этот момент
    useEffect(() => {
        return () => {
            const cl = renderContainer.classList;
            if (cl.contains(scopeClassName)) {
                const usage = decTooltipThemeUsage(renderContainer, scopeClassName);
                if (usage <= 0) {
                    cl.remove(scopeClassName);
                }
            }
        };
    }, [renderContainer, scopeClassName]);
}

function incTooltipThemeUsage(node: Element, scopeClassName: string): number {
    const counterAttrName = `data-tooltip-theme-${scopeClassName}-counter`;
    const counterAttr = node.getAttribute(counterAttrName);
    const counter = counterAttr ? parseInt(counterAttr, 10) + 1 : 1;
    node.setAttribute(counterAttrName, counter.toString());

    return counter;
}

function decTooltipThemeUsage(node: Element, scopeClassName: string): number {
    const counterAttrName = `data-tooltip-theme-${scopeClassName}-counter`;
    const counterAttr = node.getAttribute(counterAttrName);
    const counter = counterAttr ? parseInt(counterAttr, 10) - 1 : 0;

    if (counter > 0) {
        node.setAttribute(counterAttrName, counter.toString());
    } else {
        node.removeAttribute(counterAttrName);
    }

    return counter;
}
