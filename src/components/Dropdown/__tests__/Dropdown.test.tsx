import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { Dropdown } from "../Dropdown";

/** Подменяет matchMedia, чтобы MobileView отрендерил мобильную или десктопную ветку. */
const setMobileView = (matches: boolean) => {
    vi.spyOn(window, "matchMedia").mockImplementation(
        (query: string) =>
            ({
                matches,
                media: query,
                onchange: null,
                addEventListener: () => {},
                removeEventListener: () => {},
                addListener: () => {},
                removeListener: () => {},
                dispatchEvent: () => false,
            }) as unknown as MediaQueryList,
    );
};

interface IDropdownProps extends Partial<React.ComponentProps<typeof Dropdown>> {
    dropdownRef?: React.Ref<HTMLDivElement>;
}

const DropdownWithTarget = ({ dropdownRef, children, ...props }: IDropdownProps) => {
    const targetRef = React.useRef<HTMLDivElement>(null);

    return (
        <>
            <div ref={targetRef} data-testid="target" />
            <Dropdown opened setOpened={() => {}} targetRef={targetRef} ref={dropdownRef} {...props}>
                {children ?? <span>Dropdown content</span>}
            </Dropdown>
        </>
    );
};

describe("Dropdown", () => {
    beforeEach(() => {
        setMobileView(false);
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it("renders the desktop dropdown into document.body", () => {
        const { container } = render(<DropdownWithTarget />);

        const dropdown = document.querySelector<HTMLDivElement>(".dropdownDesktop");

        expect(dropdown).not.toBeNull();
        expect(document.body).toContainElement(dropdown);
        expect(container.querySelector(".dropdownDesktop")).toBeNull();
    });

    it("renders nothing when closed", () => {
        render(<DropdownWithTarget opened={false} />);

        expect(screen.queryByText("Dropdown content")).toBeNull();
    });

    it("forwards ref to the desktop dropdown element", () => {
        const ref = React.createRef<HTMLDivElement>();

        render(<DropdownWithTarget dropdownRef={ref} />);

        expect(ref.current).toBe(document.querySelector(".dropdownDesktop"));
    });

    it("passes desktop props down to DropdownDesktop", () => {
        render(<DropdownWithTarget id="dropdown-id" className="custom-class" />);

        const dropdown = document.querySelector<HTMLDivElement>(".dropdownDesktop");

        expect(dropdown).toHaveAttribute("id", "dropdown-id");
        expect(dropdown).toHaveClass("custom-class");
    });

    describe("onOpen / onClose", () => {
        it("does not call callbacks on mount", () => {
            const onOpen = vi.fn();
            const onClose = vi.fn();

            render(<DropdownWithTarget onOpen={onOpen} onClose={onClose} />);

            expect(onOpen).not.toHaveBeenCalled();
            expect(onClose).not.toHaveBeenCalled();
        });

        it("calls onClose when opened becomes false", () => {
            const onOpen = vi.fn();
            const onClose = vi.fn();

            const { rerender } = render(<DropdownWithTarget onOpen={onOpen} onClose={onClose} />);

            rerender(<DropdownWithTarget opened={false} onOpen={onOpen} onClose={onClose} />);

            expect(onClose).toHaveBeenCalledTimes(1);
            expect(onOpen).not.toHaveBeenCalled();
        });

        it("calls onOpen when opened becomes true", () => {
            const onOpen = vi.fn();
            const onClose = vi.fn();

            const { rerender } = render(<DropdownWithTarget opened={false} onOpen={onOpen} onClose={onClose} />);

            rerender(<DropdownWithTarget opened onOpen={onOpen} onClose={onClose} />);

            expect(onOpen).toHaveBeenCalledTimes(1);
            expect(onClose).not.toHaveBeenCalled();
        });

        it("does not call callbacks on rerenders without a change of opened", () => {
            const onOpen = vi.fn();

            const { rerender } = render(<DropdownWithTarget onOpen={onOpen} />);

            rerender(<DropdownWithTarget onOpen={onOpen} className="next" />);

            expect(onOpen).not.toHaveBeenCalled();
        });

        it("calls the latest callback passed in props", () => {
            const firstOnClose = vi.fn();
            const secondOnClose = vi.fn();

            const { rerender } = render(<DropdownWithTarget onClose={firstOnClose} />);

            rerender(<DropdownWithTarget opened={false} onClose={secondOnClose} />);

            expect(firstOnClose).not.toHaveBeenCalled();
            expect(secondOnClose).toHaveBeenCalledTimes(1);
        });
    });

    describe("mobileViewProps", () => {
        it("renders the desktop version on a wide screen", () => {
            render(<DropdownWithTarget mobileViewProps={{ children: <span>Mobile content</span> }} />);

            expect(screen.getByText("Dropdown content")).toBeInTheDocument();
            expect(screen.queryByText("Mobile content")).toBeNull();
        });

        it("renders the mobile version on a narrow screen", () => {
            setMobileView(true);

            render(<DropdownWithTarget mobileViewProps={{ children: <span>Mobile content</span> }} />);

            expect(screen.getByText("Mobile content")).toBeInTheDocument();
            expect(screen.queryByText("Dropdown content")).toBeNull();
            expect(document.querySelector(".dropdownDesktop")).toBeNull();
        });

        it("falls back to children when mobileViewProps has no children", () => {
            setMobileView(true);

            render(<DropdownWithTarget mobileViewProps={{}} />);

            expect(screen.getByText("Dropdown content")).toBeInTheDocument();
        });

        it("renders the desktop version on a narrow screen without mobileViewProps", () => {
            setMobileView(true);

            render(<DropdownWithTarget />);

            expect(document.querySelector(".dropdownDesktop")).not.toBeNull();
        });
    });
});
