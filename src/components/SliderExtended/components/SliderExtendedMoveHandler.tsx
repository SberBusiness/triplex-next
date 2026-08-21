import React from "react";
import { throttle } from "lodash-es";

/** Интервал троттлинга перемещения мыши по умолчанию, мс. */
const DEFAULT_MOUSE_MOVE_WAIT = 50;

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

/** Свойства компонента SliderExtendedMoveHandler. */
export interface ISliderExtendedMoveHandlerProps {
    /** Render-функция, получающая обработчики начала перемещения. */
    children: TSliderExtendedMoveHandlerChildren;
    /** Интервал троттлинга слушателя движения мыши, мс. По умолчанию 50. */
    mouseMoveWait?: number;
    /** Слушатель движения мыши. */
    onMouseMove: (event: MouseEvent) => void;
    /** Слушатель сенсорного движения. */
    onTouchMove: (event: TouchEvent) => void;
    /** Ссылка на элемент. */
    targetRef: React.RefObject<HTMLElement | null>;
}

/**
 * Обработчик перемещения компонента. Отслеживает перемещение курсора после нажатия по target
 * и вызывает onMouseMove (onTouchMove для касания), пока курсор не отпущен.
 */
export const SliderExtendedMoveHandler: React.FC<ISliderExtendedMoveHandlerProps> = ({
    children,
    mouseMoveWait = DEFAULT_MOUSE_MOVE_WAIT,
    onMouseMove,
    onTouchMove,
    targetRef,
}) => {
    /**
     * Троттлящая обёртка создаётся в обработчике нажатия, а не во время рендера: обёртка живёт
     * ровно одно перетаскивание, отписка получает ту же ссылку, а обработчики, читающие ref,
     * не попадают в вызов throttle() во время рендера.
     */
    const onTargetMouseDown = () => {
        const throttledMouseMove = throttle(onMouseMove, mouseMoveWait);

        const removeMouseListeners = () => {
            // flush, а не cancel: отложенный вызов доводит перемещение до точки отпускания.
            // При cancel() быстрый drag терял последний отрезок в пределах окна троттлинга.
            throttledMouseMove.flush();
            document.removeEventListener("mousemove", throttledMouseMove);
            document.removeEventListener("mouseup", removeMouseListeners);
        };

        document.addEventListener("mousemove", throttledMouseMove);
        document.addEventListener("mouseup", removeMouseListeners);
    };

    const onTargetTouchStart = () => {
        const target = targetRef.current;

        if (!target) {
            return;
        }

        // Слушатель касания вешается на сам элемент, чтобы обработчик мог вызвать preventDefault.
        const throttledTouchMove = throttle(onTouchMove);

        const removeTouchListeners = () => {
            // flush по той же причине, что и в mouse-пути.
            throttledTouchMove.flush();
            target.removeEventListener("touchmove", throttledTouchMove);
            target.removeEventListener("touchend", removeTouchListeners);
        };

        target.addEventListener("touchmove", throttledTouchMove);
        target.addEventListener("touchend", removeTouchListeners);
    };

    // Обработчики читают targetRef только по событию, но правило видит их передачу
    // в вызов children() во время рендера — это и есть контракт render-функции.
    // eslint-disable-next-line react-hooks/refs
    return <>{children({ onTargetMouseDown, onTargetTouchStart })}</>;
};

SliderExtendedMoveHandler.displayName = "SliderExtendedMoveHandler";
