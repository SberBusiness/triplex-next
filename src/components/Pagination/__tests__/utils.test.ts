import { describe, it, expect } from "vitest";
import { PaginationUtils, PAGINATION_ELLIPSIS_VALUE } from "../utils";

const { generateRange, generatePageRanges, createPagesArray } = PaginationUtils;

describe("PaginationUtils.generateRange", () => {
    it("Should generate an inclusive range with default step", () => {
        expect(generateRange(1, 5)).toEqual([1, 2, 3, 4, 5]);
    });

    it("Should generate a single-element range when from equals to", () => {
        expect(generateRange(3, 3)).toEqual([3]);
    });

    it("Should respect a custom step", () => {
        expect(generateRange(1, 7, 2)).toEqual([1, 3, 5, 7]);
    });

    it("Should return an empty array when from is greater than to", () => {
        expect(generateRange(5, 1)).toEqual([]);
    });
});

describe("PaginationUtils.generatePageRanges", () => {
    it("Should expose boundaryDivider and computed start/end page ranges", () => {
        const result = generatePageRanges(5, 1, 1, 10);

        expect(result.boundaryDivider).toBe(2);
        expect(result.startPages).toEqual([1]);
        expect(result.endPages).toEqual([10]);
        expect(result.siblingsStart).toBeLessThanOrEqual(result.siblingsEnd);
    });
});

describe("PAGINATION_ELLIPSIS_VALUE", () => {
    it("Should be the sentinel value used to mark an ellipsis", () => {
        expect(PAGINATION_ELLIPSIS_VALUE).toBe(-1);
    });
});

describe("PaginationUtils.createPagesArray", () => {
    const ELLIPSIS = PAGINATION_ELLIPSIS_VALUE;

    it("Should render a single page for totalPages = 1", () => {
        expect(createPagesArray({ currentPage: 1, siblingCount: 0, boundaryCount: 1, totalPages: 1 })).toEqual([1]);
    });

    it("Should render all pages without ellipsis for a small total", () => {
        const pages = createPagesArray({ currentPage: 1, siblingCount: 1, boundaryCount: 1, totalPages: 5 });

        expect(pages).toEqual([1, 2, 3, 4, 5]);
        expect(pages).not.toContain(ELLIPSIS);
    });

    it("Should not add ellipsis when current page is near the start of a large total", () => {
        const pages = createPagesArray({ currentPage: 1, siblingCount: 1, boundaryCount: 1, totalPages: 10 });

        // Ellipsis only on the right side.
        expect(pages[0]).toBe(1);
        expect(pages.indexOf(ELLIPSIS)).toBeGreaterThan(-1);
        expect(pages.filter((page) => page === ELLIPSIS)).toHaveLength(1);
        expect(pages[pages.length - 1]).toBe(10);
    });

    it("Should add ellipsis on the left side when current page is near the end", () => {
        const pages = createPagesArray({ currentPage: 10, siblingCount: 1, boundaryCount: 1, totalPages: 10 });

        expect(pages[0]).toBe(1);
        expect(pages[1]).toBe(ELLIPSIS);
        expect(pages.filter((page) => page === ELLIPSIS)).toHaveLength(1);
        expect(pages[pages.length - 1]).toBe(10);
        expect(pages).toContain(10);
        expect(pages).toContain(9);
    });

    it("Should add ellipsis on both sides when current page is in the middle", () => {
        const pages = createPagesArray({ currentPage: 5, siblingCount: 1, boundaryCount: 1, totalPages: 10 });

        expect(pages[0]).toBe(1);
        expect(pages[1]).toBe(ELLIPSIS);
        expect(pages[pages.length - 1]).toBe(10);
        expect(pages[pages.length - 2]).toBe(ELLIPSIS);
        expect(pages.filter((page) => page === ELLIPSIS)).toHaveLength(2);
        // Current page and its siblings are present.
        expect(pages).toContain(4);
        expect(pages).toContain(5);
        expect(pages).toContain(6);
    });

    it("Should always include boundary and sibling pages around the current page", () => {
        const pages = createPagesArray({ currentPage: 6, siblingCount: 2, boundaryCount: 2, totalPages: 20 });

        // Boundary pages at start and end.
        expect(pages.slice(0, 2)).toEqual([1, 2]);
        expect(pages.slice(-2)).toEqual([19, 20]);
        // Siblings around current page (currentPage ± siblingCount).
        for (let page = 4; page <= 8; page++) {
            expect(pages).toContain(page);
        }
    });
});
