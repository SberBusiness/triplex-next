import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Puller, IPullerProps } from "../Puller";
import { PullerBody } from "../PullerBody";
import { PullerFooter } from "../PullerFooter";
import { PullerHeader } from "../PullerHeader";
import { PullerList } from "../PullerList";
import { PullerListItem } from "../PullerListItem";
import { PullerLoader } from "../PullerLoader";

/** Рендерит Puller с текстовым содержимым, по умолчанию открытым. open() и close() перерисовывают его открытым или закрытым. */
const renderPuller = ({
    opened = true,
    ...restProps
}: Partial<IPullerProps> & React.RefAttributes<HTMLDivElement> = {}) => {
    const renderTree = (nextOpened: boolean) => (
        <Puller opened={nextOpened} setOpened={() => {}} {...restProps}>
            <span>Puller content</span>
        </Puller>
    );
    const result = render(renderTree(opened));

    return {
        ...result,
        open: () => result.rerender(renderTree(true)),
        close: () => result.rerender(renderTree(false)),
    };
};

const getBackdrop = () => {
    const backdrop = document.querySelector(".pullerBackdrop");

    if (backdrop === null) {
        throw new Error("Puller backdrop not found");
    }

    return backdrop;
};

describe("Puller", () => {
    it("renders children when opened", () => {
        renderPuller();

        expect(screen.getByText("Puller content")).toBeInTheDocument();
    });

    it("renders nothing when closed", () => {
        renderPuller({ opened: false });

        expect(screen.queryByText("Puller content")).toBeNull();
    });

    it("forwards ref and html attributes to the content element", () => {
        const ref = React.createRef<HTMLDivElement>();

        renderPuller({ ref, id: "puller" });

        expect(ref.current).toHaveClass("puller");
        expect(ref.current).toHaveAttribute("id", "puller");
    });

    it("applies className to the wrapper, not to the content element", () => {
        const ref = React.createRef<HTMLDivElement>();

        renderPuller({ ref, className: "custom-class" });

        expect(document.querySelector(".pullerWrapper")).toHaveClass("custom-class");
        expect(ref.current).not.toHaveClass("custom-class");
    });

    it("locks the page scroll while opened", () => {
        const { close } = renderPuller();

        expect(document.body).toHaveClass("pullerScrollLock");

        close();

        expect(document.body).not.toHaveClass("pullerScrollLock");
    });

    it("unlocks the page scroll on unmount", () => {
        const { unmount } = renderPuller();

        unmount();

        expect(document.body).not.toHaveClass("pullerScrollLock");
    });

    it("keeps the page scroll locked when a closed Puller mounts while another one is opened", () => {
        renderPuller();
        renderPuller({ opened: false });

        expect(document.body).toHaveClass("pullerScrollLock");
    });

    it.each(["mouseDown", "touchStart"] as const)("closes on backdrop %s", (eventName) => {
        const setOpened = vi.fn();

        renderPuller({ setOpened });

        fireEvent[eventName](getBackdrop());

        expect(setOpened).toHaveBeenCalledWith(false);
    });

    it("does not call setOpened on backdrop interaction while closing", () => {
        const setOpened = vi.fn();
        const { close } = renderPuller({ setOpened });

        close();
        fireEvent.mouseDown(getBackdrop());

        expect(setOpened).not.toHaveBeenCalled();
    });

    it("marks the content as opening on the next tick until the opening transition on the backdrop ends", async () => {
        const ref = React.createRef<HTMLDivElement>();
        const { open } = renderPuller({ ref, opened: false });

        open();

        expect(ref.current).not.toHaveClass("opening");
        expect(ref.current).not.toHaveClass("opened");

        await waitFor(() => expect(ref.current).toHaveClass("opening", "opened"));

        fireEvent.transitionEnd(getBackdrop());

        await waitFor(() => expect(ref.current).not.toHaveClass("opening"));
        expect(ref.current).toHaveClass("opened");
    });

    it("removes the content only after its own closing transition on the backdrop ends", () => {
        const { close } = renderPuller();

        close();
        fireEvent.transitionEnd(screen.getByText("Puller content"));

        expect(screen.getByText("Puller content")).toBeInTheDocument();

        fireEvent.transitionEnd(getBackdrop());

        expect(screen.queryByText("Puller content")).toBeNull();
    });
});

describe("Puller subcomponents", () => {
    it.each([
        { name: "PullerBody", Component: PullerBody, baseClassName: "pullerBody" },
        { name: "PullerFooter", Component: PullerFooter, baseClassName: "pullerFooter" },
        { name: "PullerHeader", Component: PullerHeader, baseClassName: "pullerHeader" },
    ])("$name renders children, forwards ref and merges className", ({ Component, baseClassName }) => {
        const ref = React.createRef<HTMLDivElement>();

        render(
            <Component ref={ref} className="custom-class">
                Content
            </Component>,
        );

        expect(ref.current).toHaveClass(baseClassName, "custom-class");
        expect(ref.current).toHaveTextContent("Content");
    });

    it("PullerHeader renders content and control buttons", () => {
        render(<PullerHeader controlButtons={<button type="button">Close</button>}>Title</PullerHeader>);

        expect(screen.getByText("Title")).toHaveClass("pullerHeaderContent");
        expect(screen.getByRole("button", { name: "Close" }).parentElement).toHaveClass("pullerHeaderControls");
    });

    it("PullerList renders a listbox with items, forwards ref and className", () => {
        const ref = React.createRef<HTMLDivElement>();

        render(
            <PullerList ref={ref} className="custom-class">
                <PullerListItem id="item-1">Option 1</PullerListItem>
            </PullerList>,
        );

        expect(ref.current).toBe(screen.getByRole("listbox"));
        expect(ref.current).toHaveClass("custom-class");
        expect(screen.getAllByRole("option")).toHaveLength(1);
    });

    it("PullerList renders a loader item when loading", () => {
        render(
            <PullerList loading>
                <PullerListItem id="item-1">Option 1</PullerListItem>
            </PullerList>,
        );

        const options = screen.getAllByRole("option");

        expect(options).toHaveLength(2);
        expect(options[1]).toHaveClass("pullerListLoader");
    });

    it("PullerListItem calls onSelect and onClick on click", () => {
        const onSelect = vi.fn();
        const onClick = vi.fn();

        render(
            <PullerListItem id="item-1" onSelect={onSelect} onClick={onClick}>
                Option 1
            </PullerListItem>,
        );

        fireEvent.click(screen.getByRole("option"));

        expect(onSelect).toHaveBeenCalledTimes(1);
        expect(onClick).toHaveBeenCalledWith(expect.objectContaining({ type: "click" }));
        expect(onSelect.mock.invocationCallOrder[0]).toBeLessThan(onClick.mock.invocationCallOrder[0]);
    });

    it("PullerListItem reflects the selected state", () => {
        render(
            <PullerListItem id="item-1" selected>
                Option 1
            </PullerListItem>,
        );

        const item = screen.getByRole("option");

        expect(item).toHaveClass("selected");
        expect(item).toHaveAttribute("aria-selected", "true");
    });

    it("PullerListItem sets title only from string children", () => {
        const { rerender } = render(<PullerListItem id="item-1">Option 1</PullerListItem>);

        expect(screen.getByRole("option")).toHaveAttribute("title", "Option 1");

        rerender(
            <PullerListItem id="item-1">
                <span>Option 1</span>
            </PullerListItem>,
        );

        expect(screen.getByRole("option")).not.toHaveAttribute("title");
    });

    it("PullerListItem renders the notification icon only on demand", () => {
        const { container, rerender } = render(<PullerListItem id="item-1">Option 1</PullerListItem>);

        expect(container.querySelector(".notificationIcon")).toBeNull();

        rerender(
            <PullerListItem id="item-1" showNotificationIcon>
                Option 1
            </PullerListItem>,
        );

        expect(container.querySelector(".notificationIcon")).not.toBeNull();
    });

    it("PullerLoader merges className", () => {
        const { container } = render(<PullerLoader className="custom-class" />);

        expect(container.querySelector(".pullerLoader")).toHaveClass("custom-class");
    });
});
