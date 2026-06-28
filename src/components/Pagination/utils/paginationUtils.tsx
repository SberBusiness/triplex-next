import range from "lodash-es/range";

/** Параметры для построения итогового массива страниц пагинации. */
interface IGeneratePageNumbersProps {
    /** Текущая страница. */
    currentPage: number;
    /** Количество всегда видимых страниц по краям текущей страницы. */
    siblingCount: number;
    /** Количество всегда видимых страниц в начале и в конце. */
    boundaryCount: number;
    /** Общее количество страниц. */
    totalPages: number;
}

/** Служебное значение в массиве страниц, обозначающее место отрисовки многоточия. */
export const PAGINATION_ELLIPSIS_VALUE = -1;

/** Набор утилит для вычисления массива отображаемых номеров страниц пагинации. */
export const PaginationUtils = {
    /** Создание массива чисел в заданном диапазоне (включительно) с заданным шагом. Возвращает пустой массив, если from > to. */
    generateRange: (from: number, to: number, step = 1): number[] => {
        if (from > to) {
            return [];
        }

        return range(from, to + 1, step);
    },

    /** Вычисление диапазонов страниц в начале, конце и вокруг текущей, а также границ для расстановки многоточий. */
    generatePageRanges: (currentPage: number, siblingCount: number, boundaryCount: number, totalPages: number) => {
        // Удвоение числа соседей текущей страницы, чтобы учесть их как слева, так и справа.
        const doubleSiblings = 2;

        // Отделение страниц boundaryCount (в начале и в конце) от последующих или предыдущих страниц для добавления многоточия.
        const boundaryDivider = 2;

        // Массив страниц в начале, от 1 - до boundaryCount либо до конца (в зависимости от количества страниц).
        const startPages = PaginationUtils.generateRange(1, Math.min(boundaryCount, totalPages));

        // Массив страниц в конце, от boundaryCount слева либо от boundaryCount справа (в зависимости от количества страниц) - до конца.
        const endPages = PaginationUtils.generateRange(
            Math.max(totalPages - boundaryCount + 1, boundaryCount + 1),
            totalPages,
        );

        // Первая из отображаемых слева страниц-соседей, если текущая страница находится ближе к концу.
        const lowerBoundaryWhenCurrentPageHigh = totalPages - boundaryCount - 1 - siblingCount * doubleSiblings;

        // Первая из отображаемых слева страниц-соседей текущей вне зависимости от того, где текущая находится.
        const siblingsStart = Math.max(
            Math.min(currentPage - siblingCount, lowerBoundaryWhenCurrentPageHigh),
            boundaryCount + boundaryDivider,
        );

        // Последняя из отображаемых справа страниц-соседей, если текущая страница находится ближе к началу.
        const upperBoundaryWhenCurrentPageLow = boundaryCount + boundaryDivider + siblingCount * doubleSiblings;

        // Последняя из отображаемых справа страниц-соседей текущей вне зависимости от того, где текущая находится.
        const siblingsEnd = Math.min(
            Math.max(currentPage + siblingCount, upperBoundaryWhenCurrentPageLow),
            totalPages - boundaryCount - 1,
        );

        return { boundaryDivider, endPages, siblingsEnd, siblingsStart, startPages };
    },

    /** Создание итогового массива номеров страниц для отображения. Места многоточий помечаются значением PAGINATION_ELLIPSIS_VALUE. */
    createPagesArray: ({
        currentPage,
        siblingCount,
        boundaryCount,
        totalPages,
    }: IGeneratePageNumbersProps): number[] => {
        const { boundaryDivider, endPages, siblingsEnd, siblingsStart, startPages } =
            PaginationUtils.generatePageRanges(currentPage, siblingCount, boundaryCount, totalPages);
        // Инициализация массива страниц с добавлением начальных.
        const pages: number[] = startPages;

        /* Если левые соседи текущей страницы не идут сразу за левой областью boundaryCount (с учетом boundaryDivider), между ними необходимо добавить многоточие.
        Иначе - добавить видимую страницу. */
        if (siblingsStart > boundaryCount + boundaryDivider) {
            pages.push(PAGINATION_ELLIPSIS_VALUE);
        } else if (boundaryCount + 1 < totalPages - boundaryCount) {
            pages.push(boundaryCount + 1);
        }

        // Добавление в массив страниц промежутка от первого слева до последнего справа соседа текущей страницы.
        pages.push(...PaginationUtils.generateRange(siblingsStart, siblingsEnd));

        /* Если за правыми соседями текущей страницы не начинается сразу правая область boundaryCount, между ними необходимо добавить многоточие.
        Иначе - добавить видимую страницу. */
        if (siblingsEnd < totalPages - boundaryCount - 1) {
            pages.push(PAGINATION_ELLIPSIS_VALUE);
        } else if (totalPages - boundaryCount > boundaryCount) {
            pages.push(totalPages - boundaryCount);
        }

        // Добавление в массив конечных страниц.
        pages.push(...endPages);

        return pages;
    },
};
