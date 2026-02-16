import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { PaginationNavigation } from "../components/PaginationNavigation";
import { PaginationNavigationButton } from "../components/PaginationNavigationButton";
import { PaginationPageButton } from "../components/PaginationPageButton";
import { PaginationPageEllipsis } from "../components/PaginationPageEllipsis";
import { PaginationSelect } from "../components/PaginationSelect";
import { EPaginationNavigationIconDirection } from "../enums";
import { Pagination } from "../Pagination";

describe("Pagination", () => {
    const getPagination = () => screen.getByTestId("pagination");

    it("Should render with PaginationNavigation and PaginationSelect", () => {
        render(
            <Pagination
                paginationNavigationProps={{ totalPages: 10, currentPage: 1, onCurrentPageChange: () => {} }}
                paginationSelectProps={{
                    paginationLabel: "Items per page",
                    onChange: () => {},
                    options: [],
                    targetProps: { fieldLabel: "" },
                    value: { id: "0", value: "10", label: "10" },
                }}
                data-testid="pagination"
            />,
        );
        const pagination = getPagination();
        expect(pagination).toBeInTheDocument();
    });

    it("Should not render PaginationNavigation when totalPages is 1", () => {
        render(
            <Pagination
                paginationNavigationProps={{ totalPages: 1, currentPage: 1, onCurrentPageChange: () => {} }}
                paginationSelectProps={{
                    paginationLabel: "Items per page",
                    onChange: () => {},
                    options: [],
                    targetProps: { fieldLabel: "" },
                    value: { id: "0", value: "10", label: "10" },
                }}
                data-testid="pagination"
            />,
        );
        const pagination = getPagination();
        expect(pagination).toBeInTheDocument();

        const paginationNavigation = pagination.querySelector("PaginationNavigationExtended");
        expect(paginationNavigation).not.toBeInTheDocument();
    });

    it("Should not render PaginationSelect when paginationSelectProps is not provided", () => {
        render(
            <Pagination
                paginationNavigationProps={{ totalPages: 10, currentPage: 1, onCurrentPageChange: () => {} }}
                data-testid="pagination"
            />,
        );
        const pagination = getPagination();
        expect(pagination).toBeInTheDocument();

        const paginationSelect = pagination.querySelector("PaginationSelect");
        expect(paginationSelect).not.toBeInTheDocument();
    });

    it("Should forward ref correctly", () => {
        const ref = React.createRef<HTMLElement>();
        render(
            <Pagination
                ref={ref}
                paginationNavigationProps={{ totalPages: 10, currentPage: 1, onCurrentPageChange: () => {} }}
                paginationSelectProps={{
                    paginationLabel: "Items per page",
                    onChange: () => {},
                    options: [],
                    targetProps: { fieldLabel: "" },
                    value: { id: "0", value: "10", label: "10" },
                }}
                data-testid="pagination"
            />,
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
        render(
            <PaginationSelect
                paginationLabel="Items per page"
                onChange={() => {}}
                options={[]}
                targetProps={{ fieldLabel: "" }}
                value={{ id: "0", value: "10", label: "10" }}
            />,
        );
        expect(screen.getByText("Items per page")).toBeInTheDocument();
    });
});
