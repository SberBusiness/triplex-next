/** CSS-переменная LightBox с верхней границей его экрана. */
const LIGHT_BOX_SCREEN_TOP_CSS_VAR = "--lightBox-screen-top";

/**
 * Читает верхнюю границу экрана LightBox из CSS-переменной элемента.
 * Возвращает 0, если переменная не задана (оверлей отрисован вне LightBox).
 */
export const getLightBoxScreenTop = (element: HTMLElement): number =>
    parseInt(getComputedStyle(element).getPropertyValue(LIGHT_BOX_SCREEN_TOP_CSS_VAR) || "0", 10);

/**
 * Вычисляет новую позицию top обёртки оверлея.
 *
 * Обёртка позиционируется относительно родителя, поэтому её реальное положение во вьюпорте (`elementTopPosition`)
 * зависит от прокрутки родителя. Смещение считается инкрементально: к текущему `topPosition` добавляется разница
 * между желаемой верхней границей экрана LightBox и фактическим положением обёртки.
 *
 * @param topPosition Текущее смещение обёртки, px.
 * @param elementTopPosition Фактическая верхняя граница обёртки во вьюпорте (`getBoundingClientRect().top`), px.
 * @param lightBoxScreenTop Верхняя граница экрана LightBox, px.
 */
export const getNextTopPosition = (
    topPosition: number,
    elementTopPosition: number,
    lightBoxScreenTop: number,
): number => topPosition - elementTopPosition + lightBoxScreenTop;
