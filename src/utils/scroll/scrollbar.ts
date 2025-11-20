/**
 * Возвращает ширину скроллбара.
 */
export const getScrollbarWidth = (): number => {
    // Возможные ширины скроллбара, обрабатываемые нами в стилях.
    const availableScrollWidths = [0, 15, 16, 17];
    const div = document.createElement('div');

    div.style.overflowY = 'scroll';
    div.style.width = '50px';
    div.style.height = '50px';

    document.body.appendChild(div);
    let scrollWidth = div.offsetWidth - div.clientWidth;

    // Какая-то не стандартная ширина, заменяется на наиболее распространенную.
    if (!availableScrollWidths.includes(scrollWidth)) {
        scrollWidth = 17;
    }

    document.body.removeChild(div);

    return scrollWidth;
};

export const addClassNameWithScrollbarWidth = (styles: Record<string, string>): void => {
    const scrollWidth = getScrollbarWidth();
    const className = styles[`scroll-${scrollWidth}`];
    if (!document.documentElement.classList.contains(className)) {
        document.documentElement.classList.add(className);
    }
};
