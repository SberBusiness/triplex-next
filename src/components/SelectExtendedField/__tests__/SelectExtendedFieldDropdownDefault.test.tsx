import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { EComponentSize } from "@sberbusiness/triplex-next/enums/EComponentSize";
import { SelectExtendedFieldDropdownDefault } from "../components/SelectExtendedFieldDropdownDefault";
import { EDropdownWidth } from "../../Dropdown/desktop/enums";
import { EScreenWidth } from "../../../helpers/breakpoints";

describe("SelectExtendedFieldDropdownDefault", () => {
    const mockOptions = [
        { id: "1", value: "option1", label: "Первая опция" },
        { id: "2", value: "option2", label: "Вторая опция" },
        { id: "3", value: "option3", label: "Третья опция" },
    ];

    const mockTargetRef = React.createRef<HTMLDivElement>();
    const mockDropdownRef = React.createRef<HTMLDivElement>();

    const mockOnChange = vi.fn();
    const mockSetOpened = vi.fn();

    const renderDropdownDefault = (
        props: Partial<React.ComponentProps<typeof SelectExtendedFieldDropdownDefault>> = {},
    ) =>
        render(
            <SelectExtendedFieldDropdownDefault
                options={mockOptions}
                onChange={mockOnChange}
                opened
                setOpened={mockSetOpened}
                listId="list-1"
                size={EComponentSize.MD}
                width={EDropdownWidth.TARGET}
                loading={false}
                targetRef={mockTargetRef}
                dropdownRef={mockDropdownRef}
                {...props}
            />,
        );

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("Should render desktop options when opened and not loading", () => {
        renderDropdownDefault({ value: mockOptions[1], dropdownListItemClassName: "custom-item-class" });

        const list = screen.getByRole("listbox");

        expect(list).toHaveAttribute("id", "list-1");
        expect(screen.getAllByRole("option")).toHaveLength(3);
        expect(screen.getByRole("option", { name: "Первая опция" })).toBeInTheDocument();

        const selectedOption = screen.getByRole("option", { name: "Вторая опция", selected: true });

        expect(selectedOption).toHaveClass("custom-item-class");
    });

    it("Should not render anything when closed", () => {
        renderDropdownDefault({ opened: false });

        expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    });

    it("Should hide options when loading is true", () => {
        renderDropdownDefault({ value: mockOptions[1], loading: true });

        expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
        expect(screen.queryByRole("option")).not.toBeInTheDocument();
    });

    it("Should call onChange and close when desktop item selected", () => {
        renderDropdownDefault();

        fireEvent.click(screen.getByRole("option", { name: "Вторая опция" }));

        expect(mockOnChange).toHaveBeenCalledWith(mockOptions[1]);
        expect(mockSetOpened).toHaveBeenCalledWith(false);
    });

    it("Should mark no option as selected when value is not set", () => {
        renderDropdownDefault();

        expect(screen.queryByRole("option", { selected: true })).not.toBeInTheDocument();
    });

    it("Should pass dropdownProps to Dropdown", () => {
        const dropdownProps = {
            className: "custom-dropdown-class",
            "data-testid": "dropdown",
            "data-custom": "dropdown-value",
        };

        renderDropdownDefault({ dropdownProps });

        const dropdown = screen.getByTestId("dropdown");

        expect(dropdown).toHaveAttribute("data-custom", "dropdown-value");
        expect(dropdown).toHaveClass("custom-dropdown-class");
    });

    // В мобильном режиме Dropdown рендерит mobileViewProps.children. Мобильность определяется
    // через window.matchMedia (MobileView → MediaMaxWidth → useMatchMedia), а не через
    // window.innerWidth, поэтому мокаем matchMedia: мобильный запрос (max-width: SM_MAX) совпадает.
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

        it("Should render mobile options and title", () => {
            renderDropdownDefault({
                value: mockOptions[1],
                mobileTitle: "Mobile title",
                dropdownListItemClassName: "custom-item-class",
            });

            expect(screen.getByText("Mobile title")).toBeInTheDocument();
            expect(screen.getAllByRole("option")).toHaveLength(3);
            expect(screen.getByRole("option", { name: "Первая опция" })).toBeInTheDocument();

            const selectedOption = screen.getByRole("option", { name: "Вторая опция", selected: true });

            expect(selectedOption).toHaveClass("custom-item-class");
        });

        it("Should call onChange and close when mobile item selected", () => {
            renderDropdownDefault({ mobileTitle: "Mobile title" });

            fireEvent.click(screen.getByRole("option", { name: "Вторая опция" }));

            expect(mockOnChange).toHaveBeenCalledWith(mockOptions[1]);
            expect(mockSetOpened).toHaveBeenCalledWith(false);
        });

        it("Should close on mobile close button click", () => {
            renderDropdownDefault({ mobileTitle: "Mobile title" });

            fireEvent.click(screen.getByRole("button"));

            expect(mockSetOpened).toHaveBeenCalledWith(false);
            expect(mockOnChange).not.toHaveBeenCalled();
        });
    });
});
