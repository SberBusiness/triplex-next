/** Минимальная длина свайпа в px, при которой боковая область открывается или закрывается. */
export const SWIPE_MIN_DISTANCE = 24;

/** Направление завершённого свайпа. */
export enum ESwipeDirection {
    LEFT = "left",
    RIGHT = "right",
}

/** Ширина элемента. Если элемента нет — 0. */
export const getElementWidth = (element: HTMLElement | null): number =>
    element ? element.getBoundingClientRect().width : 0;

/** Параметры расчёта координаты контента при перемещении пальца. */
export interface IResolveSwipeMoveParams {
    /** Текущая координата контента. */
    translateX: number;
    /** Координата контента на старте свайпа. */
    translateXOnStart: number;
    /** Смещение пальца по оси X относительно старта свайпа. */
    deltaX: number;
    /** Ширина левой области. null, если левой области нет. */
    leftAreaWidth: number | null;
    /** Ширина правой области. null, если правой области нет. */
    rightAreaWidth: number | null;
}

/**
 * Возвращает координату контента при перемещении пальца.
 * Перемещение ограничено шириной открываемой области. Если двигать некуда, координата не меняется.
 */
export const resolveSwipeMove = ({
    translateX,
    translateXOnStart,
    deltaX,
    leftAreaWidth,
    rightAreaWidth,
}: IResolveSwipeMoveParams): number => {
    // Координата контента без учёта ограничений.
    const translateXNext = translateXOnStart + deltaX;

    // Свайп открытия левой или правой области.
    if (translateXOnStart === 0) {
        // Свайп вправо, и есть контент слева.
        if (deltaX > 0 && leftAreaWidth !== null) {
            return Math.min(translateXNext, leftAreaWidth);
        }

        // Свайп влево, и есть контент справа.
        if (deltaX < 0 && rightAreaWidth !== null) {
            return Math.max(translateXNext, -rightAreaWidth);
        }

        return translateX;
    }

    // Свайп закрытия левой области — контент двигается только влево, до исходного положения.
    if (translateXOnStart > 0) {
        return deltaX < 0 ? Math.max(0, translateXNext) : translateX;
    }

    // Свайп закрытия правой области — контент двигается только вправо, до исходного положения.
    return deltaX > 0 ? Math.min(0, translateXNext) : translateX;
};

/** Параметры расчёта координаты контента при отпускании пальца. */
export interface IResolveSwipeEndParams {
    /** Текущая координата контента. */
    translateX: number;
    /** Координата контента на старте свайпа. */
    translateXOnStart: number;
    /** Ширина левой области. */
    leftAreaWidth: number;
    /** Ширина правой области. */
    rightAreaWidth: number;
}

/** Результат расчёта завершённого свайпа. */
export interface IResolveSwipeEndResult {
    /** Итоговая координата контента. */
    translateX: number;
    /** Направление свайпа, открывшего боковую область. null, если область не открылась. */
    direction: ESwipeDirection | null;
}

/**
 * Возвращает итоговую координату контента при отпускании пальца и направление открывшего свайпа.
 * Область открывается или закрывается, только если длина свайпа превысила SWIPE_MIN_DISTANCE,
 * иначе контент возвращается в положение, которое занимал на старте свайпа.
 *
 * Предусловие: ширина области, в сторону которой шёл свайп, больше нуля. Отсутствующая область
 * отсеивается раньше — resolveSwipeMove не даёт сдвинуть контент в её сторону, поэтому до
 * отпускания пальца дело не доходит.
 */
export const resolveSwipeEnd = ({
    translateX,
    translateXOnStart,
    leftAreaWidth,
    rightAreaWidth,
}: IResolveSwipeEndParams): IResolveSwipeEndResult => {
    // Длина свайпа: положительная — свайп влево, отрицательная — свайп вправо.
    const deltaTranslateX = translateXOnStart - translateX;
    const passedMinDistance = Math.abs(deltaTranslateX) > SWIPE_MIN_DISTANCE;

    // Свайп открытия левой или правой области.
    if (translateXOnStart === 0) {
        if (!passedMinDistance) {
            return { translateX: 0, direction: null };
        }

        return deltaTranslateX > 0
            ? { translateX: -rightAreaWidth, direction: ESwipeDirection.LEFT }
            : { translateX: leftAreaWidth, direction: ESwipeDirection.RIGHT };
    }

    // Свайп закрытия левой области — закрывает только движение влево.
    if (translateXOnStart > 0) {
        if (deltaTranslateX <= 0) {
            return { translateX, direction: null };
        }

        return { translateX: passedMinDistance ? 0 : leftAreaWidth, direction: null };
    }

    // Свайп закрытия правой области — закрывает только движение вправо.
    if (deltaTranslateX >= 0) {
        return { translateX, direction: null };
    }

    return { translateX: passedMinDistance ? 0 : -rightAreaWidth, direction: null };
};

/**
 * Возвращает прозрачность боковой области — она пропорциональна тому, насколько область открыта.
 * Если ширина области равна нулю (элемент ещё не смонтирован либо область скрыта), возвращается 1,
 * как в состоянии покоя, когда область целиком закрыта контентом.
 */
export const getSwipeableAreaOpacity = (translateX: number, areaWidth: number): number =>
    areaWidth > 0 ? Math.abs(translateX) / areaWidth : 1;
