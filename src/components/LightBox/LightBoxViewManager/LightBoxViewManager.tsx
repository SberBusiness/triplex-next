import React, { useCallback, useLayoutEffect, useRef, useState } from "react";
import { useResizeDetector } from "react-resize-detector";
import isEqual from "lodash-es/isEqual";
import pick from "lodash-es/pick";
import { Portal } from "../../Portal/Portal";
import { LightBoxViewManagerConsts } from "./LightBoxViewManagerConsts";

/** Свойства компонента LightBoxViewManager. */
export interface ILightBoxViewManagerProps {
    /** Элемент, в который рендерится LightBox. */
    lightBoxMountNode: HTMLDivElement;
    /** Элемент, в визуальных границах (левая и правая координата) которого рендерится LightBox. Отступ LightBox от верхней границы экрана равен высоте этого элемента. */
    lightBoxViewManagerNode: HTMLDivElement;
}

/** Css класс, подставляемый в lightBoxMountNode. Нужен для создания области видимости css переменных. */
const lightBoxMountNodeClassName = "LightBoxMountNodeViewManager";

/** Свойства DOMRect, изменение которых требует обновления позиционирования LightBox. */
const rectComparedKeys = ["top", "left", "width", "height"];

/**
 * Расчет класснеймов на основе ширины области viewNode.
 * Эти класснеймы определяют позиционирование LightBox.
 */
const getBreakPointsClassNames = (rect: DOMRect): string =>
    rect.width <= LightBoxViewManagerConsts.lightBoxMediaPoint0
        ? LightBoxViewManagerConsts.breakPointsClassNames["less-or-equal-media-point-0"]
        : LightBoxViewManagerConsts.breakPointsClassNames["more-media-point-0"];

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

    /** Обновление координат viewNode, если они изменились. */
    const updateRect = () => {
        if (viewNodeRef.current) {
            const nextRect = viewNodeRef.current.getBoundingClientRect();

            setRectViewNode((prevRect) =>
                isEqual(pick(prevRect, rectComparedKeys), pick(nextRect, rectComparedKeys)) ? prevRect : nextRect,
            );
        }
    };

    /** Обновление координат viewNode и breakpoint-класснеймов. */
    const updateRectAndClassNames = useCallback(() => {
        if (viewNodeRef.current) {
            const nextRect = viewNodeRef.current.getBoundingClientRect();
            setRectViewNode(nextRect);
            setBreakPointsClassNames(getBreakPointsClassNames(nextRect));
        }
    }, []);

    /** Подстановка breakpoint-класснеймов в lightBoxMountNode. */
    const addClassNameToMountNode = useCallback(() => {
        if (!breakPointsClassNames) {
            return;
        }

        // Удаление предыдущих классов.
        Array.from(lightBoxMountNode.classList).forEach((c) => {
            if (c.includes("LB-")) {
                lightBoxMountNode.classList.remove(c);
            }
        });

        breakPointsClassNames.split(" ").forEach((c) => lightBoxMountNode.classList.add(c));
    }, [breakPointsClassNames, lightBoxMountNode]);

    useLayoutEffect(() => {
        updateRectAndClassNames();

        lightBoxMountNode.classList.add(lightBoxMountNodeClassName);
    }, [lightBoxMountNode, updateRectAndClassNames]);

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

LightBoxViewManager.displayName = "LightBoxViewManager";
