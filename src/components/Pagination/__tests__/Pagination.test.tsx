import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { PaginationExtended } from "../components/PaginationExtended";
import { PaginationNavigation } from "../components/PaginationNavigation";
import { PaginationNavigationButton } from "../components/PaginationNavigationButton";
import { PaginationPageButton } from "../components/PaginationPageButton";
import { PaginationPageEllipsis } from "../components/PaginationPageEllipsis";
import { PaginationSelect } from "../components/PaginationSelect";
import { EPaginationNavigationIconDirection } from "../enums";

describe("PaginationExtended", () => {
    const getPagination = () => screen.getByTestId("pagination-extended");

    it("Should render with default props", () => {
        render(<PaginationExtended data-testid="pagination-extended">Content</PaginationExtended>);
        const nav = getPagination();
        expect(nav).toBeInTheDocument();
        expect(nav.tagName).toBe("NAV");
    });

    it("Should merge custom className", () => {
        render(
            <PaginationExtended className="custom" data-testid="pagination-extended">
                Content
            </PaginationExtended>,
        );
        expect(getPagination()).toHaveClass("custom");
    });

    it("Should forward ref correctly", () => {
        const ref = React.createRef<HTMLElement>();
        render(
            <PaginationExtended ref={ref} data-testid="pagination-extended">
                Content
            </PaginationExtended>,
        );
        expect(ref.current).toBeInstanceOf(HTMLElement);
    });
});

describe("PaginationNavigation", () => {
    const setup = (props = {}) => {
        const onPageChange = vi.fn();
        render(
            <PaginationNavigation
                currentPage={2}
                totalPages={5}
                onCurrentPageChange={onPageChange}
                data-testid="pagination-nav"
                {...props}
            />,
        );
        return { onPageChange };
    };

    it("Should render navigation with page buttons", () => {
        setup();
        expect(screen.getByTestId("pagination-nav")).toBeInTheDocument();
        expect(screen.getAllByRole("button").length).toBeGreaterThan(0);
    });

    it("Should call onCurrentPageChange when clicking page", () => {
        const { onPageChange } = setup({ siblingCount: 1 });
        fireEvent.click(screen.getByText("3"));
        expect(onPageChange).toHaveBeenCalledWith(3);
    });

    it("Should disable previous button on first page", () => {
        setup({ currentPage: 1 });
        const prevBtn = screen.getAllByRole("button")[0];
        expect(prevBtn).toBeDisabled();
    });

    it("Should disable next button on last page", () => {
        setup({ currentPage: 5 });
        const buttons = screen.getAllByRole("button");
        const nextBtn = buttons[buttons.length - 1];
        expect(nextBtn).toBeDisabled();
    });
});

describe("PaginationNavigationButton", () => {
    it("Should render back button", () => {
        render(
            <PaginationNavigationButton direction={EPaginationNavigationIconDirection.BACK} data-testid="back-btn" />,
        );
        expect(screen.getByTestId("back-btn")).toBeInTheDocument();
    });

    it("Should render next button", () => {
        render(
            <PaginationNavigationButton direction={EPaginationNavigationIconDirection.NEXT} data-testid="next-btn" />,
        );
        expect(screen.getByTestId("next-btn")).toBeInTheDocument();
    });

    it("Should apply disabled class", () => {
        render(
            <PaginationNavigationButton
                direction={EPaginationNavigationIconDirection.NEXT}
                disabled
                data-testid="next-btn"
            />,
        );
        const btn = screen.getByTestId("next-btn");
        expect(btn).toHaveClass("disabled");
        expect(btn).toBeDisabled();
    });
});

describe("PaginationPageButton", () => {
    it("Should render page number", () => {
        render(<PaginationPageButton onClick={() => {}}>1</PaginationPageButton>);
        expect(screen.getByText("1")).toBeInTheDocument();
    });

    it("Should apply current class when active", () => {
        render(
            <PaginationPageButton isCurrent onClick={() => {}} data-testid="page-btn">
                2
            </PaginationPageButton>,
        );
        expect(screen.getByTestId("page-btn")).toHaveClass("currentPage");
    });
});

describe("PaginationPageEllipsis", () => {
    it("Should render ellipsis", () => {
        render(<PaginationPageEllipsis data-testid="ellipsis">...</PaginationPageEllipsis>);
        expect(screen.getByTestId("ellipsis")).toHaveTextContent("...");
    });
});

describe("PaginationSelect", () => {
    it("Should render with label", () => {
        render(<PaginationSelect paginationLabel="Items per page" />);
        expect(screen.getByText("Items per page")).toBeInTheDocument();
    });

    it("Should not render when hidden", () => {
        const { container } = render(<PaginationSelect paginationLabel="Hidden" hidden />);
        expect(container).toBeEmptyDOMElement();
    });
});
