import { useEffect } from "react";

/**
 * Получает родительский элемент, который является контейнером прокрутки.
 * @param el - Элемент, для которого нужно найти родительский контейнер прокрутки.
 * @returns Родительский элемент, который является контейнером прокрутки, или окно.
 */
function getScrollParent(el: HTMLElement | null): HTMLElement | Window {
    let node: HTMLElement | null = el;
    while (node && node !== document.documentElement) {
        const style = getComputedStyle(node);
        const overflowY = style.overflowY;
        if (/(auto|scroll|overlay)/.test(overflowY) && node.scrollHeight > node.clientHeight) return node;
        node = node.parentElement;
    }
    return window;
}

/**
 * Управляет радиусом скругления и тенью sticky-элемента.
 * Когда элемент "прилипает" (`r === 0`) — добавляется тень.
 * @param ref - Ссылка на элемент, для которого нужно управлять радиусом скругления и тенью.
 * @param edge - Край элемента, к которому нужно прилипать: "top" (верхний) или "bottom" (нижний).
 * @param isEnabled - Флаг, определяющий, нужно ли управлять радиусом скругления и тенью.
 */
export function useStickyCornerRadius(ref: React.RefObject<HTMLElement>, edge: "top" | "bottom", isEnabled = true) {
    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const cssVarName = edge === "top" ? "--r-top" : "--r-bottom";
        if (!isEnabled) {
            el.style.removeProperty(cssVarName);
            delete el.dataset.stuck;
            return;
        }

        const maxRadius = 16;
        const initializationDelay = 16;

        let stickyOffset = 0;
        let raf = 0;
        let timeoutId: number | null = null;
        let scroller: HTMLElement | Window = window;
        let target: HTMLElement | Window | null = null;

        const update = () => {
            raf = 0;
            const rect = el.getBoundingClientRect();
            const scrollerRect =
                scroller === window
                    ? { top: 0, bottom: window.innerHeight }
                    : (scroller as HTMLElement).getBoundingClientRect();

            const dist =
                edge === "top"
                    ? rect.top - (scrollerRect.top + stickyOffset)
                    : scrollerRect.bottom - stickyOffset - rect.bottom;
            const r = Math.max(0, Math.min(maxRadius, dist));

            el.style.setProperty(cssVarName, `${r}px`);
            if (r <= 0.5) {
                el.dataset.stuck = "true";
            } else {
                delete el.dataset.stuck;
            }
        };

        const handleScrollOrResize = () => {
            if (raf) return;
            raf = requestAnimationFrame(update);
        };

        const initialize = () => {
            timeoutId = null;
            const computed = getComputedStyle(el);
            const offsetRaw = edge === "top" ? computed.top : computed.bottom;
            stickyOffset = parseFloat(offsetRaw || "0") || 0;
            scroller = getScrollParent(el);
            target = scroller === window ? window : (scroller as HTMLElement);

            update();

            target.addEventListener("scroll", handleScrollOrResize, { passive: true });
            window.addEventListener("resize", handleScrollOrResize);
        };

        timeoutId = window.setTimeout(initialize, initializationDelay);

        return () => {
            if (timeoutId !== null) {
                window.clearTimeout(timeoutId);
            }
            if (target) {
                target.removeEventListener("scroll", handleScrollOrResize);
            }
            window.removeEventListener("resize", handleScrollOrResize);
            if (raf) cancelAnimationFrame(raf);
        };
    }, [ref, edge, isEnabled]);
}
