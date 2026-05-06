import React, { useLayoutEffect, useRef, useState } from "react";
import { useResizeDetector } from "react-resize-detector";
import isEqual from "lodash-es/isEqual";
import pick from "lodash-es/pick";
import { Portal } from "../../Portal/Portal";
import styles from "../styles/ModalWindow.module.less";

// Id элемента, в визуальных границах (левая и правая координата) которого рендерится ModalWindow. Отступ ModalWindow от верхней границы экрана равен высоте этого элемента.
export const modalWindowViewManagerNodeId = "modalWindowViewManagerNodeId";

/** Создаёт DOM-ноду, в границах которой рендерится модальное окно. */
const getOrCreateModalWindowViewManagerNode = (): HTMLDivElement => {
    let node = document.querySelector<HTMLDivElement>(`#${modalWindowViewManagerNodeId}`);
    if (!node) {
        node = document.createElement("div");
        node.setAttribute("id", modalWindowViewManagerNodeId);
        document.body.appendChild(node);
    }
    return node;
};

/** Элемент, определяющий позиционирование ModalWindow. */
export const ModalWindowViewManager = React.forwardRef<HTMLDivElement>((_, ref) => {
    // DOM нода, в границах которой рендерится ModalWindow.
    const [modalWindowViewManagerNode] = useState<HTMLDivElement>(getOrCreateModalWindowViewManagerNode);
    // Координаты DOM ноды, в границах которой рендерится ModalWindow.
    const [rectViewNode, setRectViewNode] = useState<DOMRect>();
    // DOM нода, в границах которой рендерится ModalWindow.
    const viewNodeRef = useRef<HTMLDivElement | null>(null);

    /** Объединённый ref на внутренний div: внутренний viewNodeRef + forwarded ref. */
    const setViewNodeRef = (instance: HTMLDivElement | null) => {
        viewNodeRef.current = instance;
        if (typeof ref === "function") {
            ref(instance);
        } else if (ref) {
            ref.current = instance;
        }
    };

    /** Обновление координат. */
    const updateRect = () => {
        if (viewNodeRef.current) {
            const nextRect = viewNodeRef.current.getBoundingClientRect();

            if (
                !isEqual(
                    pick(rectViewNode, ["top", "left", "width", "height"]),
                    pick(nextRect, ["top", "left", "width", "height"]),
                )
            ) {
                setRectViewNode(nextRect);
            }
        }
    };

    useLayoutEffect(() => {
        updateRect();
    });

    const { ref: resizeRef } = useResizeDetector({
        handleWidth: true,
        onResize: updateRect,
        refreshMode: "debounce",
        refreshRate: 100,
    });

    return modalWindowViewManagerNode ? (
        <Portal container={modalWindowViewManagerNode}>
            {/* Высота div должна быть равной высоте ModalWindowManagerNode. */}
            <div ref={setViewNodeRef} style={{ height: "100%" }}>
                <div ref={resizeRef} className={styles.modalWindowResizeWrapper} />
                {rectViewNode && (
                    <style>
                        {`
                            :root {
                                --modalWindow-screen-left: ${rectViewNode.x >= 0 ? rectViewNode.x : 0}px;
                                --modalWindow-screen-width: ${rectViewNode.width}px;
                                --modalWindow-screen-top: ${rectViewNode.height}px;
                            }
                        `}
                    </style>
                )}
            </div>
        </Portal>
    ) : null;
});

ModalWindowViewManager.displayName = "ModalWindowViewManager";
