/**
 * Плавная прокрутка элемента по горизонтали.
 *
 * @param element Элемент для прокрутки.
 * @param amount Количество пикселей для прокрутки.
 * @param frames Количество кадров для прокрутки.
 */
export const scrollSmoothHorizontally = (element: HTMLElement, amount: number, frames = 24): void => {
    const animateScrolling = (amount: number, depth: number): void => {
        if (amount === 0 || depth === frames) {
            return;
        } else {
            const scrollLeft = element.scrollLeft;

            element.scrollLeft += amount / (frames - depth);
            if (element.scrollLeft !== scrollLeft) {
                amount -= element.scrollLeft - scrollLeft;
                requestAnimationFrame(() => animateScrolling(amount, depth + 1));
            }
        }
    };

    if (frames > 0) {
        animateScrolling(amount, 0);
    }
};
