import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import ReactResizeDetector from "react-resize-detector";
import isEqual from "lodash-es/isEqual";
import pick from "lodash-es/pick";
import { Portal } from "../../Portal/Portal";

// Id элемента, в визуальных границах (левая и правая координата) которого рендерится ModalWindow. Отступ ModalWindow от верхней границы экрана равен высоте этого элемента.
export const modalWindowViewManagerNodeId = "modalWindowViewManagerNodeId";

/** Элемент, определяющий позиционирование ModalWindow. */
export const ModalWindowViewManager: React.FC = () => {
    // DOM нода, в границах которой рендерится ModalWindow.
    const [modalWindowViewManagerNode, setModalWindowViewManagerNode] = useState<HTMLDivElement>();
    // Координаты DOM ноды, в границах которой рендерится ModalWindow.
    const [rectViewNode, setRectViewNode] = useState<DOMRect>();
    // DOM нода, в границах которой рендерится ModalWindow.
    const viewNodeRef = useRef<HTMLDivElement | null>(null);

    /** Обновление координат. */
    const updateRect = () => {
        if (viewNodeRef.current) {
            const nextRect = viewNodeRef.current.getBoundingClientRect();

            if (
                !isEqual(
                    pick(rectViewNode, ["top", "left", "width", "height"]),
                    pick(nextRect, ["top", "left", "width", "height"])
                )
            ) {
                setRectViewNode(nextRect);
            }
        }
    };

    /** Создает DOM-ноду, в границах которой рендерится модальное окно. */
    const createModalWindowViewManagerNode = () => {
        let modalWindowViewManagerNode = document.querySelector<HTMLDivElement>(`#${modalWindowViewManagerNodeId}`);
        if (!modalWindowViewManagerNode) {
            modalWindowViewManagerNode = document.createElement("div");
            modalWindowViewManagerNode.setAttribute("id", modalWindowViewManagerNodeId);
            document.body.appendChild(modalWindowViewManagerNode);
        }

        setModalWindowViewManagerNode(modalWindowViewManagerNode);
    };

    useEffect(() => {
        createModalWindowViewManagerNode();
    }, []);

    useLayoutEffect(() => {
        updateRect();
    });

    return modalWindowViewManagerNode ? (
        <Portal container={modalWindowViewManagerNode}>
            {/* Высота div должна быть равной высоте ModalWindowManagerNode. */}
            <div ref={viewNodeRef} style={{ height: "100%" }}>
                <ReactResizeDetector onResize={updateRect} />
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
};
