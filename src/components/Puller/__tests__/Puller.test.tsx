import React from "react";
import { act, render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, onTestFinished, vi } from "vitest";
import { Puller, IPullerProps } from "../Puller";
import { PullerBody } from "../PullerBody";
import { PullerFooter } from "../PullerFooter";
import { PullerHeader } from "../PullerHeader";
import { PullerList } from "../PullerList";
import { PullerListItem } from "../PullerListItem";
import { PullerLoader } from "../PullerLoader";

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

const getElement = (selector: string) => {
    const element = document.querySelector(selector);

    if (element === null) {
        throw new Error(`Element "${selector}" not found`);
    }

    return element;
};

const getBackdrop = () => getElement(".pullerBackdrop");

const getWrapper = () => getElement(".pullerWrapper");

describe("Puller", () => {
    it("renders children when opened", () => {
        renderPuller();

        expect(screen.getByText("Puller content")).toBeInTheDocument();
    });

    it("renders nothing when closed", () => {
        renderPuller({ opened: false });

        expect(screen.queryByText("Puller content")).toBeNull();
    });

    it("renders into document.body outside the parent container", () => {
        const { container } = renderPuller();

        expect(container).toBeEmptyDOMElement();
        expect(document.querySelector(".pullerWrapper")?.parentElement).toBe(document.body);
    });

    it("renders into renderContainer instead of document.body", () => {
        const renderContainer = document.createElement("div");

        renderPuller({ renderContainer });

        expect(renderContainer.querySelector(".pullerWrapper")).not.toBeNull();
        expect(document.querySelector(".pullerWrapper")).toBeNull();
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

    it("keeps the page scroll locked when a closed Puller mounts while another one is opened", () => {
        renderPuller();
        renderPuller({ opened: false });

        expect(document.body).toHaveClass("pullerScrollLock");
    });

    it("keeps the page scroll locked until the last opened Puller closes", () => {
        const first = renderPuller();
        const second = renderPuller();

        first.close();

        expect(document.body).toHaveClass("pullerScrollLock");

        second.unmount();

        expect(document.body).not.toHaveClass("pullerScrollLock");
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

    it("keeps the content mounted when closing starts", () => {
        const { close } = renderPuller();
        const content = screen.getByText("Puller content");

        close();

        expect(screen.getByText("Puller content")).toBe(content);
    });

    it("lets pointer events through the wrapper only while closing", () => {
        const { close, open } = renderPuller();
        const wrapper = getWrapper();

        expect(wrapper).not.toHaveClass("closing");

        close();
        expect(wrapper).toHaveClass("closing");

        open();
        expect(wrapper).not.toHaveClass("closing");
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

    it("does not call a callback ref again on re-render", () => {
        const ref = vi.fn();
        const { rerender } = render(
            <Puller opened setOpened={() => {}} ref={ref}>
                Content
            </Puller>,
        );
        const callsAfterMount = ref.mock.calls.length;

        rerender(
            <Puller opened setOpened={() => {}} ref={ref}>
                Other content
            </Puller>,
        );

        expect(ref).toHaveBeenCalledTimes(callsAfterMount);
    });
});

describe("Puller focusTrapProps", () => {
    it("does not make the content focusable when the trap is disabled", () => {
        renderPuller({ focusTrapProps: { active: false } });

        expect(document.querySelector(".puller")).not.toHaveAttribute("tabindex");
    });

    it("does not move focus into the puller when the trap is disabled", async () => {
        // focus-trap переносит фокус по таймеру: прогоняем таймеры, чтобы проверять уже после возможного переноса.
        vi.useFakeTimers();
        onTestFinished(() => {
            vi.useRealTimers();
        });

        const ref = React.createRef<HTMLDivElement>();

        renderPuller({ ref, focusTrapProps: { active: false } });
        await act(() => vi.runAllTimersAsync());

        expect(ref.current).not.toHaveFocus();
    });

    it("closes on Escape when the trap is disabled", () => {
        const setOpened = vi.fn();

        renderPuller({ setOpened, focusTrapProps: { active: false } });
        fireEvent.keyDown(screen.getByText("Puller content"), { key: "Escape" });

        expect(setOpened).toHaveBeenCalledWith(false);
    });

    it("moves focus to the content element on open, not to the first tabbable node", async () => {
        const ref = React.createRef<HTMLDivElement>();

        render(
            // В jsdom нет layout: со стандартным displayCheck tabbable считает все узлы скрытыми.
            <Puller
                ref={ref}
                opened
                setOpened={() => {}}
                focusTrapProps={{ focusTrapOptions: { tabbableOptions: { displayCheck: "none" } } }}
            >
                <button type="button">Inside</button>
            </Puller>,
        );

        await waitFor(() => expect(ref.current).toHaveFocus());
        expect(screen.getByRole("button", { name: "Inside" })).not.toHaveFocus();
    });

    it("keeps focus on an element that is already focused inside the puller", async () => {
        // focus-trap переносит фокус по таймеру: прогоняем таймеры, чтобы проверять уже после возможного переноса.
        vi.useFakeTimers();
        onTestFinished(() => {
            vi.useRealTimers();
        });

        render(
            <Puller
                opened
                setOpened={() => {}}
                focusTrapProps={{ focusTrapOptions: { tabbableOptions: { displayCheck: "none" } } }}
            >
                <button type="button">Before</button>
                <input aria-label="Search" autoFocus />
            </Puller>,
        );

        await act(() => vi.runAllTimersAsync());

        expect(screen.getByRole("textbox", { name: "Search" })).toHaveFocus();
    });

    it("focuses the content element when there are no tabbable nodes", async () => {
        const ref = React.createRef<HTMLDivElement>();

        // Без tabbable-узлов focus-trap бросает исключение, если не задан fallbackFocus.
        renderPuller({ ref });

        await waitFor(() => expect(ref.current).toHaveFocus());
        expect(ref.current).toHaveAttribute("tabindex", "-1");
    });

    it("closes on Escape", () => {
        const setOpened = vi.fn();

        renderPuller({ setOpened });
        fireEvent.keyDown(screen.getByText("Puller content"), { key: "Escape" });

        expect(setOpened).toHaveBeenCalledWith(false);
    });

    it("does not propagate Escape to listeners on window, such as a surrounding modal window", () => {
        const handleWindowKeyDown = vi.fn();
        window.addEventListener("keydown", handleWindowKeyDown);
        onTestFinished(() => window.removeEventListener("keydown", handleWindowKeyDown));

        renderPuller();
        fireEvent.keyDown(screen.getByText("Puller content"), { key: "Escape" });

        expect(handleWindowKeyDown).not.toHaveBeenCalled();
    });

    it("does not close when a child stops the Escape propagation", () => {
        const setOpened = vi.fn();

        render(
            <Puller opened setOpened={setOpened} focusTrapProps={{ active: false }}>
                <span onKeyDown={(event) => event.stopPropagation()}>Puller content</span>
            </Puller>,
        );
        fireEvent.keyDown(screen.getByText("Puller content"), { key: "Escape" });

        expect(setOpened).not.toHaveBeenCalled();
    });

    it("closes only the inner puller on Escape inside a nested puller", () => {
        const setOuterOpened = vi.fn();
        const setInnerOpened = vi.fn();

        render(
            <Puller opened setOpened={setOuterOpened} focusTrapProps={{ active: false }}>
                <Puller opened setOpened={setInnerOpened} focusTrapProps={{ active: false }}>
                    <span>Inner content</span>
                </Puller>
            </Puller>,
        );
        fireEvent.keyDown(screen.getByText("Inner content"), { key: "Escape" });

        expect(setInnerOpened).toHaveBeenCalledWith(false);
        expect(setOuterOpened).not.toHaveBeenCalled();
    });

    it("keeps the content focusable for the trap when tabIndex is passed as undefined", () => {
        renderPuller({ tabIndex: undefined });

        expect(document.querySelector(".puller")).toHaveAttribute("tabindex", "-1");
    });

    it("keeps the consumer tabIndex on the content", () => {
        renderPuller({ tabIndex: 0 });

        expect(document.querySelector(".puller")).toHaveAttribute("tabindex", "0");
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

    it("PullerList renders a hidden loader outside the options and marks the listbox busy when loading", () => {
        const { rerender } = render(
            <PullerList loading>
                <PullerListItem id="item-1">Option 1</PullerListItem>
            </PullerList>,
        );

        const listbox = screen.getByRole("listbox");

        expect(listbox).toHaveAttribute("aria-busy", "true");
        expect(screen.getAllByRole("option")).toHaveLength(1);
        expect(listbox.querySelector(".pullerListLoader")).toHaveAttribute("aria-hidden", "true");

        rerender(
            <PullerList>
                <PullerListItem id="item-1">Option 1</PullerListItem>
            </PullerList>,
        );

        expect(listbox).not.toHaveAttribute("aria-busy");
        expect(listbox.querySelector(".pullerListLoader")).toBeNull();
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

    it("PullerListItem passes id to the option element", () => {
        render(<PullerListItem id="item-1">Option 1</PullerListItem>);

        expect(screen.getByRole("option")).toHaveAttribute("id", "item-1");
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
