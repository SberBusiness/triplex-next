import React from "react";

/** Обработчик события onMouseDown. */
export type TOnTargetMouseDown = (event: React.MouseEvent) => void;

/** Обработчик события onTouchStart. */
export type TOnTargetTouchStart = (event: React.TouchEvent) => void;

/** Render-функция children. */
type TSliderExtendedMoveHandlerChildren = ({
    onTargetMouseDown,
    onTargetTouchStart,
}: {
    /** Обработчик нажатия мыши по target. */
    onTargetMouseDown: TOnTargetMouseDown;
    /** Обработчик касания по target. */
    onTargetTouchStart: TOnTargetTouchStart;
}) => React.ReactNode;

export interface ISliderExtendedMoveHandlerProps {
    children: TSliderExtendedMoveHandlerChildren;
    /** Слушатель движения мыши. */
    onMouseMove: (event: MouseEvent) => void;
    /** Слушатель сенсорного движения. */
    onTouchMove: (event: TouchEvent) => void;
    /** Ссылка на элемент. */
    targetRef: React.RefObject<HTMLElement>;
}

/**
 * Обработчик перемещения компонента. Отслеживает перемещение курсора после клика по target и вызывает onMouseMove.
 */
export const SliderExtendedMoveHandler: React.FC<ISliderExtendedMoveHandlerProps> = ({
    children,
    onMouseMove,
    onTouchMove,
    targetRef,
}) => {
    const removeMouseListeners = () => {
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", removeMouseListeners);
    };

    const removeTouchListeners = () => {
        if (targetRef.current) {
            targetRef.current?.removeEventListener("touchmove", onTouchMove);
            targetRef.current?.removeEventListener("touchend", removeTouchListeners);
        }
    };

    const onTargetMouseDown = () => {
        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseup", removeMouseListeners);
    };

    const onTargetTouchStart = () => {
        if (targetRef.current) {
            targetRef.current?.addEventListener("touchmove", onTouchMove);
            targetRef.current?.addEventListener("touchend", removeTouchListeners);
        }
    };

    // eslint-disable-next-line react-hooks/refs
    return <>{children({ onTargetMouseDown, onTargetTouchStart })}</>;
};

SliderExtendedMoveHandler.displayName = "SliderExtendedMoveHandler";
