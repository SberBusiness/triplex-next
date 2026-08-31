import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { PaginationNavigation } from "../components/PaginationNavigation";
import { PaginationNavigationButton } from "../components/PaginationNavigationButton";
import { PaginationPageButton } from "../components/PaginationPageButton";
import { PaginationPageEllipsis } from "../components/PaginationPageEllipsis";
import { PaginationSelect } from "../components/PaginationSelect";
import { EPaginationNavigationIconDirection } from "../enums";
import { Pagination } from "../Pagination";
import { MasterTable } from "../../Table/MasterTable";
import { EScreenWidth } from "../../../helpers/breakpoints";

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

    it("Should render PaginationNavigation with single disabled page when totalPages is 1", () => {
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

        expect(pagination.querySelector("ul")).toBeInTheDocument();
        expect(screen.getByText("1")).toBeInTheDocument();

        const buttons = screen.getAllByRole("button");
        expect(buttons[0]).toBeDisabled();
        expect(buttons[buttons.length - 1]).toBeDisabled();
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

    it("Should render single page with both arrows disabled when there are no pages", () => {
        setup({ currentPage: 1, totalPages: 0 });
        const buttons = screen.getAllByRole("button");

        expect(screen.getByText("1")).toBeInTheDocument();
        expect(buttons[0]).toBeDisabled();
        expect(buttons[buttons.length - 1]).toBeDisabled();
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

    it("Should keep disabled passed by the consumer outside MasterTable", () => {
        render(
            <PaginationPageButton onClick={() => {}} disabled data-testid="page-btn">
                3
            </PaginationPageButton>,
        );
        // Вне MasterTable контекст отдаёт loading: false — блокировку задаёт только prop.
        expect(screen.getByTestId("page-btn")).toBeDisabled();
    });

    it("Should stay enabled outside MasterTable when disabled is not passed", () => {
        render(
            <PaginationPageButton onClick={() => {}} data-testid="page-btn">
                4
            </PaginationPageButton>,
        );
        expect(screen.getByTestId("page-btn")).toBeEnabled();
    });
});

describe("PaginationPageEllipsis", () => {
    it("Should render ellipsis", () => {
        render(<PaginationPageEllipsis data-testid="ellipsis">...</PaginationPageEllipsis>);
        expect(screen.getByTestId("ellipsis")).toHaveTextContent("...");
    });
});

describe("PaginationSelect", () => {
    const options = [{ id: "0", value: "10", label: "10" }];

    it("Should render with label", () => {
        render(
            <PaginationSelect
                paginationLabel="Items per page"
                onChange={() => {}}
                options={options}
                targetProps={{ fieldLabel: "" }}
                value={options[0]}
            />,
        );

        expect(screen.getByText("Items per page")).toBeInTheDocument();
    });

    it("Should forward rest props to SelectField", () => {
        render(
            <PaginationSelect
                paginationLabel="Items per page"
                onChange={() => {}}
                options={options}
                value={options[0]}
                data-testid="pagination-select"
                data-test-id="page-size-select"
                id="page-size"
            />,
        );

        const select = screen.getByTestId("pagination-select");

        expect(select).toHaveAttribute("id", "page-size");
        expect(select).toHaveAttribute("data-test-id", "page-size-select");
        expect(select).toContainElement(screen.getByRole("combobox"));
    });

    it("Should keep the label linked with the select when rest props are passed", () => {
        render(
            <PaginationSelect
                paginationLabel="Items per page"
                onChange={() => {}}
                options={options}
                value={options[0]}
                data-testid="pagination-select"
            />,
        );

        const label = screen.getByText("Items per page");

        expect(label.id).toBeTruthy();
        expect(screen.getByRole("combobox")).toHaveAttribute("aria-labelledby", label.id);
    });

    it("Should let the consumer override the generated aria-labelledby", () => {
        render(
            <>
                <span id="custom-label">Page size</span>
                <PaginationSelect
                    paginationLabel="Items per page"
                    onChange={() => {}}
                    options={options}
                    value={options[0]}
                    aria-labelledby="custom-label"
                />
            </>,
        );

        expect(screen.getByRole("combobox")).toHaveAttribute("aria-labelledby", "custom-label");
    });

    it("Should forward targetProps to the select target", () => {
        render(
            <PaginationSelect
                paginationLabel="Items per page"
                onChange={() => {}}
                options={options}
                value={options[0]}
                targetProps={{ fieldLabel: "", className: "custom-target" }}
            />,
        );

        const combobox = screen.getByRole("combobox");

        expect(combobox).toHaveClass("custom-target");
        // Заголовок поля пуст: доступное имя даёт лейбл, который рисует сам PaginationSelect.
        expect(combobox).toHaveAccessibleName("Items per page");
    });

    it("Should let the consumer override the internal fieldLabel", () => {
        render(
            <PaginationSelect
                paginationLabel="Items per page"
                onChange={() => {}}
                options={options}
                value={options[0]}
                targetProps={{ fieldLabel: "Page size" }}
            />,
        );

        expect(screen.getByText("Page size")).toBeInTheDocument();
    });

    // В мобильном режиме выпадающий список рендерит заголовок mobileTitle. Мобильность определяется
    // через window.matchMedia (MobileView → MediaMaxWidth → useMatchMedia), поэтому мокаем matchMedia.
    describe("mobile view", () => {
        const originalMatchMedia = window.matchMedia;

        beforeEach(() => {
            Object.defineProperty(window, "matchMedia", {
                configurable: true,
                writable: true,
                value: (query: string) =>
                    ({
                        matches: query === `(max-width: ${EScreenWidth.SM_MAX})`,
                        media: query,
                        onchange: null,
                        addEventListener: () => {},
                        removeEventListener: () => {},
                        addListener: () => {},
                        removeListener: () => {},
                        dispatchEvent: () => false,
                    }) as unknown as MediaQueryList,
            });
        });

        afterEach(() => {
            Object.defineProperty(window, "matchMedia", {
                configurable: true,
                writable: true,
                value: originalMatchMedia,
            });
        });

        it("Should use paginationLabel as mobileTitle by default", () => {
            render(
                <PaginationSelect
                    paginationLabel="Items per page"
                    onChange={() => {}}
                    options={options}
                    value={options[0]}
                />,
            );

            fireEvent.click(screen.getByRole("combobox"));

            // Два вхождения: лейбл рядом с селектом и заголовок мобильного выпадающего списка.
            expect(screen.getAllByText("Items per page")).toHaveLength(2);
        });

        it("Should let the consumer override mobileTitle", () => {
            render(
                <PaginationSelect
                    paginationLabel="Items per page"
                    onChange={() => {}}
                    options={options}
                    value={options[0]}
                    mobileTitle="Page size"
                />,
            );

            fireEvent.click(screen.getByRole("combobox"));

            expect(screen.getByText("Page size")).toBeInTheDocument();
            expect(screen.getAllByText("Items per page")).toHaveLength(1);
        });
    });
});

describe("Pagination inside a loading MasterTable", () => {
    const options = [
        { id: "0", value: "10", label: "10" },
        { id: "1", value: "20", label: "20" },
    ];

    const setup = (loading: boolean) => {
        const onCurrentPageChange = vi.fn();

        render(
            <MasterTable loading={loading}>
                <MasterTable.PaginationPanel>
                    <Pagination
                        paginationNavigationProps={{
                            totalPages: 5,
                            currentPage: 2,
                            onCurrentPageChange,
                            siblingCount: 1,
                        }}
                        paginationSelectProps={{
                            paginationLabel: "Items per page",
                            onChange: () => {},
                            options,
                            targetProps: { fieldLabel: "" },
                            value: options[0],
                        }}
                    />
                </MasterTable.PaginationPanel>
            </MasterTable>,
        );

        return { onCurrentPageChange };
    };

    it("Should disable navigation and page buttons while loading", () => {
        setup(true);

        screen.getAllByRole("button").forEach((button) => expect(button).toBeDisabled());
    });

    it("Should keep buttons enabled when not loading", () => {
        setup(false);

        // Кнопка "Назад" на второй из пяти страниц активна — блокировка приходит только из состояния загрузки.
        expect(screen.getAllByRole("button")[0]).toBeEnabled();
        expect(screen.getByText("3").closest("button")).toBeEnabled();
    });

    it("Should not change page on click while loading", () => {
        const { onCurrentPageChange } = setup(true);

        fireEvent.click(screen.getByText("3").closest("button")!);

        expect(onCurrentPageChange).not.toHaveBeenCalled();
    });

    it("Should not open the rows-per-page dropdown while loading", () => {
        setup(true);

        fireEvent.click(screen.getByText("10"));

        expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    });

    it("Should open the rows-per-page dropdown when not loading", () => {
        setup(false);

        fireEvent.click(screen.getByText("10"));

        expect(screen.getByRole("listbox")).toBeInTheDocument();
    });
});
