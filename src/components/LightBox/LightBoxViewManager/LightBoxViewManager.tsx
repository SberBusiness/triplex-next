import React from "react";
import { useCallback, useLayoutEffect, useRef, useState } from "react";
import { useResizeDetector } from "react-resize-detector";
import { Portal } from "../../Portal/Portal";
import { LightBoxViewManagerConsts } from "./LightBoxViewManagerConsts";
import isEqual from "lodash-es/isEqual";
import pick from "lodash-es/pick";

export interface ILightBoxViewManagerProps {
    // Элемент, в который рендерится LightBox.
    lightBoxMountNode: HTMLDivElement;
    // Элемент, в визуальных границах (левая и правая координата) которого рендерится LightBox. Отступ LightBox от верхней границы экрана равен высоте этого элемента.
    lightBoxViewManagerNode: HTMLDivElement;
}

// Css класс, подставляемый в lightBoxMountNode. Нужен для создания области видимости css переменных.
const lightBoxMountNodeClassName = "LightBoxMountNodeViewManager";

/**
 * Элемент, определяющий позиционирование LightBox.
 */
export const LightBoxViewManager: React.FC<ILightBoxViewManagerProps> = ({
    lightBoxMountNode,
    lightBoxViewManagerNode,
}) => {
    // Координаты DOM ноды, в границах которой рендерится LightBox.
    const [rectViewNode, setRectViewNode] = useState<DOMRect>();
    // Класснеймы, рассчитанные на основе ширины области LightBox.
    const [breakPointsClassNames, setBreakPointsClassNames] = useState<string>("");
    // DOM нода, в границах которой рендерится LightBox.
    const viewNodeRef = useRef<HTMLDivElement | null>(null);

    /**
     * Раcчет класснеймов на основе ширины области viewNode.
     * Эти класснеймы опеределяют позиционирование LightBox.
     */
    const calculateBreakPointsClassNames = useCallback(
        (rect: DOMRect | undefined) => {
            if (!rect) {
                return;
            }

            let classNames: Array<string> | string = [];

            if (rect.width <= LightBoxViewManagerConsts.lightBoxMediaPoint0) {
                classNames.push(LightBoxViewManagerConsts.breakPointsClassNames["less-or-equal-media-point-0"]);
            } else {
                classNames.push(LightBoxViewManagerConsts.breakPointsClassNames["more-media-point-0"]);
            }

            if (rect.width <= LightBoxViewManagerConsts.lightBoxMediaPoint1) {
                classNames.push(LightBoxViewManagerConsts.breakPointsClassNames["less-or-equal-media-point-1"]);
            } else {
                classNames.push(LightBoxViewManagerConsts.breakPointsClassNames["more-media-point-1"]);
            }

            if (rect.width <= LightBoxViewManagerConsts.lightBoxMediaPoint2) {
                classNames.push(LightBoxViewManagerConsts.breakPointsClassNames["less-or-equal-media-point-2"]);
            } else {
                classNames.push(LightBoxViewManagerConsts.breakPointsClassNames["more-media-point-2"]);
            }

            classNames = classNames.sort().join(" ");

            if (breakPointsClassNames !== classNames) {
                setBreakPointsClassNames(classNames);
            }
        },
        [breakPointsClassNames]
    );

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

    const updateRectAndClassNames = useCallback(() => {
        if (viewNodeRef.current) {
            const nextRect = viewNodeRef.current.getBoundingClientRect();
            setRectViewNode(nextRect);
            calculateBreakPointsClassNames(nextRect);
        }
    }, [calculateBreakPointsClassNames]);

    const addClassNameToMountNode = useCallback(() => {
        if (!breakPointsClassNames) {
            return;
        }

        // Удаление предыдущих классов.
        Array.from(lightBoxMountNode.classList).forEach((c) => {
            if (c.includes("LB-")) {
                lightBoxMountNode.classList.toggle(c);
            }
        });

        breakPointsClassNames.split(" ").forEach((c) => lightBoxMountNode.classList.add(c));
    }, [breakPointsClassNames, lightBoxMountNode.classList]);

    useLayoutEffect(() => {
        updateRectAndClassNames();

        lightBoxMountNode.classList.add(lightBoxMountNodeClassName);
    }, []);

    useLayoutEffect(() => {
        addClassNameToMountNode();
    }, [breakPointsClassNames, addClassNameToMountNode]);

    useLayoutEffect(() => {
        updateRect();
    });

    const { ref: resizeRef } = useResizeDetector({
        handleWidth: true,
        onResize: updateRectAndClassNames,
        refreshMode: "throttle",
        refreshRate: 150,
    });
    return (
        <Portal container={lightBoxViewManagerNode}>
            {/* Высота div должна быть равной высоте lightBoxViewManagerNode. */}
            <div ref={viewNodeRef} style={{ height: "100%" }}>
                <div ref={resizeRef} style={{ width: "100%", height: "100%", position: "absolute" }} />
                {rectViewNode && (
                    <style>
                        {/*
                            Вернуть --lightBox-screen-left: ${rectViewNode.x}px; в 8й версии библиотеки.
                        */}
                        {`
                            .${lightBoxMountNodeClassName} {
                                --lightBox-screen-left: ${rectViewNode.x >= 0 ? rectViewNode.x : 0}px;
                                --lightBox-screen-width: ${rectViewNode.width}px;
                                --lightBox-screen-top: ${rectViewNode.height}px;
                            }
                        `}
                    </style>
                )}
            </div>
        </Portal>
    );
};
