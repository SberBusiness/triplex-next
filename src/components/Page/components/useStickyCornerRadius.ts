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
 */
export function useStickyCornerRadius(ref: React.RefObject<HTMLElement>, edge: "top" | "bottom") {
    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const maxRadius = 16;
        const cssVarName = edge === "top" ? "--r-top" : "--r-bottom";

        const computed = getComputedStyle(el);
        const offsetRaw = edge === "top" ? computed.top : computed.bottom;
        const stickyOffset = parseFloat(offsetRaw || "0") || 0;
        const scroller = getScrollParent(el);

        let raf = 0;

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

        const onScrollOrResize = () => {
            if (raf) return;
            raf = requestAnimationFrame(update);
        };

        update();

        const target = scroller === window ? window : (scroller as HTMLElement);
        target.addEventListener("scroll", onScrollOrResize, { passive: true });
        window.addEventListener("resize", onScrollOrResize);

        return () => {
            target.removeEventListener("scroll", onScrollOrResize);
            window.removeEventListener("resize", onScrollOrResize);
            if (raf) cancelAnimationFrame(raf);
        };
    }, [ref, edge]);
}
