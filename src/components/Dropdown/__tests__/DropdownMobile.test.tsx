import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { DropdownMobile } from "../mobile/DropdownMobile";
import { DropdownMobileBody } from "../mobile/DropdownMobileBody";
import { DropdownMobileFooter } from "../mobile/DropdownMobileFooter";
import { DropdownMobileHeader } from "../mobile/DropdownMobileHeader";
import { DropdownMobileList } from "../mobile/DropdownMobileList";
import { DropdownMobileListItem } from "../mobile/DropdownMobileListItem";
import { DropdownMobileLoader } from "../mobile/DropdownMobileLoader";

/** DropdownMobileInner переключает состояния открытия через setTimeout. */
const flushOpeningTimers = () => {
    act(() => {
        vi.runOnlyPendingTimers();
    });
};

describe("DropdownMobile", () => {
    it("renders children when opened", () => {
        render(
            <DropdownMobile opened setOpened={() => {}}>
                <span>Mobile content</span>
            </DropdownMobile>,
        );

        expect(screen.getByText("Mobile content")).toBeInTheDocument();
    });

    it("renders nothing when closed", () => {
        render(
            <DropdownMobile opened={false} setOpened={() => {}}>
                <span>Mobile content</span>
            </DropdownMobile>,
        );

        expect(screen.queryByText("Mobile content")).toBeNull();
    });

    it("forwards ref to the content element", () => {
        const ref = React.createRef<HTMLDivElement>();

        render(
            <DropdownMobile opened setOpened={() => {}} ref={ref}>
                <span>Mobile content</span>
            </DropdownMobile>,
        );

        expect(ref.current).toBeInstanceOf(HTMLDivElement);
        expect(ref.current).toHaveClass("dropdownMobile");
    });

    it("passes html attributes to the content element", () => {
        const ref = React.createRef<HTMLDivElement>();

        render(
            <DropdownMobile opened setOpened={() => {}} ref={ref} id="mobile-dropdown" className="custom-class">
                <span>Mobile content</span>
            </DropdownMobile>,
        );

        expect(ref.current).toHaveAttribute("id", "mobile-dropdown");
        expect(document.querySelector(".dropdownMobileWrapper")).toHaveClass("custom-class");
    });

    it("locks the page scroll while opened", () => {
        const { rerender } = render(
            <DropdownMobile opened setOpened={() => {}}>
                <span>Mobile content</span>
            </DropdownMobile>,
        );

        expect(document.body).toHaveClass("dropdownMobileBodyOverflow");

        rerender(
            <DropdownMobile opened={false} setOpened={() => {}}>
                <span>Mobile content</span>
            </DropdownMobile>,
        );

        expect(document.body).not.toHaveClass("dropdownMobileBodyOverflow");
    });

    it("unlocks the page scroll on unmount", () => {
        const { unmount } = render(
            <DropdownMobile opened setOpened={() => {}}>
                <span>Mobile content</span>
            </DropdownMobile>,
        );

        unmount();

        expect(document.body).not.toHaveClass("dropdownMobileBodyOverflow");
    });

    it("closes on backdrop interaction", () => {
        const setOpened = vi.fn();

        render(
            <DropdownMobile opened setOpened={setOpened}>
                <span>Mobile content</span>
            </DropdownMobile>,
        );

        const backdrop = document.querySelector(".dropdownMobileBackdrop");

        expect(backdrop).not.toBeNull();
        fireEvent.mouseDown(backdrop as Element);

        expect(setOpened).toHaveBeenCalledWith(false);
    });

    it("marks the content as opened after the opening animation is scheduled", () => {
        vi.useFakeTimers();

        try {
            const ref = React.createRef<HTMLDivElement>();

            render(
                <DropdownMobile opened setOpened={() => {}} ref={ref}>
                    <span>Mobile content</span>
                </DropdownMobile>,
            );

            flushOpeningTimers();

            expect(ref.current).toHaveClass("opened");
        } finally {
            vi.useRealTimers();
        }
    });
});

describe("DropdownMobile subcomponents", () => {
    it("DropdownMobileBody renders children and merges className", () => {
        render(<DropdownMobileBody className="custom-class">Body</DropdownMobileBody>);

        const body = screen.getByText("Body");

        expect(body).toHaveClass("dropdownMobileContent", "custom-class");
    });

    it("DropdownMobileFooter renders children and merges className", () => {
        render(<DropdownMobileFooter className="custom-class">Footer</DropdownMobileFooter>);

        expect(screen.getByText("Footer")).toHaveClass("dropdownMobileFooter", "custom-class");
    });

    it("DropdownMobileHeader renders content and control buttons", () => {
        render(
            <DropdownMobileHeader controlButtons={<button type="button">Close</button>}>Title</DropdownMobileHeader>,
        );

        expect(screen.getByText("Title")).toHaveClass("dropdownMobileHeaderContent");
        expect(screen.getByRole("button", { name: "Close" })).toBeInTheDocument();
    });

    it("DropdownMobileList renders a listbox with items", () => {
        render(
            <DropdownMobileList>
                <DropdownMobileListItem id="item-1">Option 1</DropdownMobileListItem>
            </DropdownMobileList>,
        );

        expect(screen.getByRole("listbox")).toBeInTheDocument();
        expect(screen.getAllByRole("option")).toHaveLength(1);
    });

    it("DropdownMobileList renders a loader item when loading", () => {
        const { container } = render(
            <DropdownMobileList loading>
                <DropdownMobileListItem id="item-1">Option 1</DropdownMobileListItem>
            </DropdownMobileList>,
        );

        expect(screen.getAllByRole("option")).toHaveLength(2);
        expect(container.querySelector(".dropdownMobileListLoader")).not.toBeNull();
    });

    it("DropdownMobileList forwards ref and className", () => {
        const ref = React.createRef<HTMLDivElement>();

        render(<DropdownMobileList ref={ref} className="custom-class" />);

        expect(ref.current).toBe(screen.getByRole("listbox"));
        expect(ref.current).toHaveClass("custom-class");
    });

    it("DropdownMobileListItem calls onSelect and onClick on click", () => {
        const onSelect = vi.fn();
        const onClick = vi.fn();

        render(
            <DropdownMobileListItem id="item-1" onSelect={onSelect} onClick={onClick}>
                Option 1
            </DropdownMobileListItem>,
        );

        fireEvent.click(screen.getByRole("option"));

        expect(onSelect).toHaveBeenCalledTimes(1);
        expect(onClick).toHaveBeenCalledWith(expect.objectContaining({ type: "click" }));
    });

    it("DropdownMobileListItem reflects the selected state", () => {
        render(
            <DropdownMobileListItem id="item-1" selected>
                Option 1
            </DropdownMobileListItem>,
        );

        const item = screen.getByRole("option");

        expect(item).toHaveClass("selected");
        expect(item).toHaveAttribute("aria-selected", "true");
        expect(item).toHaveAttribute("title", "Option 1");
    });

    it("DropdownMobileListItem renders the notification icon on demand", () => {
        const { container } = render(
            <DropdownMobileListItem id="item-1" showNotificationIcon>
                Option 1
            </DropdownMobileListItem>,
        );

        expect(container.querySelector(".notificationIcon")).not.toBeNull();
    });

    it("DropdownMobileLoader merges className", () => {
        const { container } = render(<DropdownMobileLoader className="custom-class" />);

        expect(container.querySelector(".dropdownMobileLoader")).toHaveClass("custom-class");
    });
});
