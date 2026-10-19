import { useEffect, useRef, useState } from "react";
import { captureScene } from "./captureScene";
import { createKnitRenderer, IKnitRegion, IKnitRenderer } from "./knitRenderer";

type TCanvasStatus = "loading" | "ready" | "unavailable";

export function useKnittedCanvas(
    sourceRef: React.RefObject<HTMLDivElement>,
    canvasRef: React.RefObject<HTMLCanvasElement>,
    texture: string,
    stitch: number,
    strength: number,
) {
    const [status, setStatus] = useState<TCanvasStatus>("loading");
    const rendererRef = useRef<IKnitRenderer | null>(null);
    const drawRef = useRef<(() => void) | null>(null);
    const optionsRef = useRef({ stitch, strength });

    useEffect(() => {
        optionsRef.current = { stitch, strength };
        drawRef.current?.();
    }, [stitch, strength]);

    useEffect(() => {
        const source = sourceRef.current;
        const canvas = canvasRef.current;
        if (!source || !canvas || !texture) return;
        let disposed = false;
        let busy = false;
        let pending = false;
        let hasFrame = false;
        let timer = 0;
        let transitionTimer = 0;

        const draw = () => {
            if (!hasFrame || disposed) return;
            const bounds = source.getBoundingClientRect();
            const editing: [number, number, number, number] = [-1, -1, -1, -1];
            const active = document.activeElement;
            if (active instanceof HTMLInputElement && source.contains(active)) {
                const field = active.closest("[data-knit-input]") ?? active;
                const rect = field.getBoundingClientRect();
                editing[0] = rect.left - bounds.left - 2;
                editing[1] = rect.top - bounds.top - 2;
                editing[2] = rect.right - bounds.left + 2;
                editing[3] = rect.bottom - bounds.top + 2;
            }
            const regions = Array.from(
                source.querySelectorAll<HTMLElement>("[data-knit-component]"),
                (component): IKnitRegion => {
                    const rect = component.getBoundingClientRect();
                    return {
                        bounds: [
                            rect.left - bounds.left,
                            rect.top - bounds.top,
                            rect.right - bounds.left,
                            rect.bottom - bounds.top,
                        ],
                        radius: Math.min(
                            parseFloat(getComputedStyle(component).borderTopLeftRadius) || 0,
                            rect.width / 2,
                            rect.height / 2,
                        ),
                    };
                },
            );
            rendererRef.current?.draw({
                width: bounds.width,
                height: bounds.height,
                ...optionsRef.current,
                editing,
                regions,
            });
        };
        drawRef.current = draw;

        const refresh = async () => {
            if (disposed || !rendererRef.current) return;
            if (busy) {
                pending = true;
                return;
            }
            busy = true;
            try {
                const image = await captureScene(source);
                if (disposed) return;
                rendererRef.current?.setScene(image);
                hasFrame = true;
                draw();
                setStatus("ready");
            } catch {
                if (!disposed) setStatus("unavailable");
            } finally {
                busy = false;
                if (pending && !disposed) {
                    pending = false;
                    schedule();
                }
            }
        };
        const schedule = () => {
            window.clearTimeout(timer);
            draw();
            timer = window.setTimeout(() => void refresh(), 60);
        };
        const interaction = () => {
            schedule();
            // Capture the final color and label position after the native component transition.
            window.clearTimeout(transitionTimer);
            transitionTimer = window.setTimeout(schedule, 260);
        };
        const image = new Image();
        image.src = texture;
        void image
            .decode()
            .then(() => {
                if (disposed) return;
                rendererRef.current = createKnitRenderer(canvas, image);
                if (!rendererRef.current) setStatus("unavailable");
                else void refresh();
            })
            .catch(() => {
                if (!disposed) setStatus("unavailable");
            });

        const observer = new MutationObserver(interaction);
        observer.observe(source, { subtree: true, childList: true, characterData: true, attributes: true });
        const resize = new ResizeObserver(schedule);
        resize.observe(source);
        const events = [
            "input",
            "focusin",
            "focusout",
            "pointerover",
            "pointerout",
            "pointerdown",
            "pointerup",
            "keydown",
            "keyup",
        ];
        events.forEach((event) => source.addEventListener(event, interaction));
        const lost = (event: Event) => {
            event.preventDefault();
            hasFrame = false;
            setStatus("unavailable");
        };
        canvas.addEventListener("webglcontextlost", lost);

        return () => {
            disposed = true;
            window.clearTimeout(timer);
            window.clearTimeout(transitionTimer);
            observer.disconnect();
            resize.disconnect();
            events.forEach((event) => source.removeEventListener(event, interaction));
            canvas.removeEventListener("webglcontextlost", lost);
            rendererRef.current?.destroy();
            rendererRef.current = null;
            drawRef.current = null;
        };
    }, [sourceRef, canvasRef, texture]);

    return status;
}
