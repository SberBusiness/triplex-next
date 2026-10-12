import React, { useState } from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { PageIndicators } from "../PageIndicators";
import { EOrientation } from "../../../enums";
import { IPageIndicatorsProps } from "../types";

type TControlledProps = Partial<IPageIndicatorsProps> & { initialIndex?: number };

const ControlledPageIndicators: React.FC<TControlledProps> = ({
    count = 4,
    initialIndex = 0,
    onChange,
    ...restProps
}) => {
    const [activeIndex, setActiveIndex] = useState(initialIndex);

    return (
        <PageIndicators
            {...restProps}
            count={count}
            activeIndex={activeIndex}
            onChange={(index) => {
                setActiveIndex(index);
                onChange?.(index);
            }}
        />
    );
};

const getSelectedIndex = () =>
    screen.getAllByRole("tab", { hidden: true }).findIndex((tab) => tab.getAttribute("aria-selected") === "true");

describe("PageIndicators", () => {
    beforeEach(() => {
        vi.spyOn(window, "requestAnimationFrame").mockImplementation((cb) => {
            cb(0);
            return 0;
        });
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it("renders nothing when count < 1", () => {
        render(<PageIndicators count={0} activeIndex={0} onChange={vi.fn()} />);
        expect(screen.queryByRole("tablist")).not.toBeInTheDocument();
    });

    it("renders a tablist with an indicator per page", () => {
        render(<PageIndicators count={4} activeIndex={1} onChange={vi.fn()} />);

        const list = screen.getByRole("tablist");
        expect(list).toHaveAttribute("aria-orientation", EOrientation.HORIZONTAL);

        const tabs = screen.getAllByRole("tab");
        expect(tabs).toHaveLength(4);
        expect(tabs[1]).toHaveAttribute("aria-selected", "true");
        expect(tabs[1]).toHaveAttribute("tabIndex", "0");
        expect(tabs[0]).toHaveAttribute("aria-selected", "false");
        expect(tabs[0]).toHaveAttribute("tabIndex", "-1");
    });

    it("calls onChange with the index of the clicked indicator", () => {
        const onChange = vi.fn();
        render(<PageIndicators count={4} activeIndex={0} onChange={onChange} />);

        fireEvent.click(screen.getAllByRole("tab")[2]);
        expect(onChange).toHaveBeenCalledWith(2);
    });

    it("calls the latest onChange after a rerender", () => {
        const first = vi.fn();
        const second = vi.fn();
        const { rerender } = render(<PageIndicators count={4} activeIndex={0} onChange={first} />);
        rerender(<PageIndicators count={4} activeIndex={0} onChange={second} />);

        fireEvent.click(screen.getAllByRole("tab")[1]);
        expect(first).not.toHaveBeenCalled();
        expect(second).toHaveBeenCalledWith(1);
    });

    it.each([
        { label: "beyond the last page", activeIndex: 6, expectedIndex: 3 },
        { label: "negative", activeIndex: -1, expectedIndex: 0 },
    ])("clamps $label activeIndex to the nearest page", ({ activeIndex, expectedIndex }) => {
        render(<PageIndicators count={4} activeIndex={activeIndex} onChange={vi.fn()} />);

        const tabs = screen.getAllByRole("tab");
        expect(tabs[expectedIndex]).toHaveAttribute("aria-selected", "true");
        expect(tabs[expectedIndex]).toHaveAttribute("tabIndex", "0");
        expect(tabs.filter((tab) => tab.getAttribute("tabIndex") === "0")).toHaveLength(1);
    });

    describe("keyboard", () => {
        it.each([
            { key: "ArrowRight", startIndex: 0, expectedIndex: 1 },
            { key: "ArrowRight", startIndex: 3, expectedIndex: 3 },
            { key: "ArrowLeft", startIndex: 1, expectedIndex: 0 },
            { key: "ArrowLeft", startIndex: 0, expectedIndex: 0 },
            { key: "End", startIndex: 0, expectedIndex: 3 },
            { key: "Home", startIndex: 3, expectedIndex: 0 },
        ])("$key: $startIndex → $expectedIndex (horizontal)", ({ key, startIndex, expectedIndex }) => {
            const onKeyDown = vi.fn();
            render(<ControlledPageIndicators initialIndex={startIndex} onKeyDown={onKeyDown} />);

            fireEvent.keyDown(screen.getByRole("tablist"), { key });

            expect(getSelectedIndex()).toBe(expectedIndex);
            expect(onKeyDown).toHaveBeenCalledTimes(1);
        });

        it("navigates with ArrowDown/ArrowUp in vertical orientation", () => {
            render(<ControlledPageIndicators orientation={EOrientation.VERTICAL} initialIndex={1} />);
            const list = screen.getByRole("tablist");
            expect(list).toHaveAttribute("aria-orientation", EOrientation.VERTICAL);

            fireEvent.keyDown(list, { key: "ArrowDown" });
            expect(getSelectedIndex()).toBe(2);

            fireEvent.keyDown(list, { key: "ArrowUp" });
            fireEvent.keyDown(list, { key: "ArrowUp" });
            expect(getSelectedIndex()).toBe(0);

            fireEvent.keyDown(list, { key: "ArrowRight" });
            expect(getSelectedIndex()).toBe(0);
        });

        it("passes unhandled keys to onKeyDown without changing the page", () => {
            const onChange = vi.fn();
            const onKeyDown = vi.fn();
            render(<PageIndicators count={4} activeIndex={0} onChange={onChange} onKeyDown={onKeyDown} />);

            fireEvent.keyDown(screen.getByRole("tablist"), { key: "Enter" });

            expect(onChange).not.toHaveBeenCalled();
            expect(onKeyDown).toHaveBeenCalledWith(expect.objectContaining({ key: "Enter" }));
        });

        it("moves focus to the active indicator", () => {
            render(<ControlledPageIndicators />);
            const tabs = screen.getAllByRole("tab");
            tabs[0].focus();

            fireEvent.keyDown(screen.getByRole("tablist"), { key: "ArrowRight" });
            expect(tabs[1]).toHaveFocus();
        });
    });

    describe("disabled indicators", () => {
        const disableIndices =
            (...disabled: number[]): IPageIndicatorsProps["indicatorProps"] =>
            ({ index }) => ({ disabled: disabled.includes(index) });

        it("does not call onChange for a disabled indicator", () => {
            const onChange = vi.fn();
            render(
                <PageIndicators
                    count={3}
                    activeIndex={0}
                    onChange={onChange}
                    indicatorProps={({ index }) => ({ disabled: index === 2 })}
                />,
            );

            const tabs = screen.getAllByRole("tab");
            expect(tabs[2]).toBeDisabled();

            fireEvent.click(tabs[2]);
            expect(onChange).not.toHaveBeenCalled();
        });

        it("skips a disabled indicator with arrow keys", () => {
            render(<ControlledPageIndicators indicatorProps={disableIndices(1)} />);

            fireEvent.keyDown(screen.getByRole("tablist"), { key: "ArrowRight" });
            expect(getSelectedIndex()).toBe(2);

            fireEvent.keyDown(screen.getByRole("tablist"), { key: "ArrowLeft" });
            expect(getSelectedIndex()).toBe(0);
        });

        it("moves Home/End to the first/last enabled indicator", () => {
            render(<ControlledPageIndicators initialIndex={1} indicatorProps={disableIndices(0, 3)} />);
            const list = screen.getByRole("tablist");

            fireEvent.keyDown(list, { key: "End" });
            expect(getSelectedIndex()).toBe(2);

            fireEvent.keyDown(list, { key: "Home" });
            expect(getSelectedIndex()).toBe(1);
        });

        it("does not call onChange when only disabled indicators remain in that direction", () => {
            const onChange = vi.fn();
            render(<PageIndicators count={3} activeIndex={1} onChange={onChange} indicatorProps={disableIndices(2)} />);

            fireEvent.keyDown(screen.getByRole("tablist"), { key: "ArrowRight" });
            fireEvent.keyDown(screen.getByRole("tablist"), { key: "End" });
            expect(onChange).not.toHaveBeenCalled();
        });

        it("gives the tab stop to the nearest enabled indicator when the selected one is disabled", () => {
            render(<PageIndicators count={4} activeIndex={1} onChange={vi.fn()} indicatorProps={disableIndices(1)} />);

            const tabs = screen.getAllByRole("tab");
            expect(tabs[1]).toHaveAttribute("aria-selected", "true");
            expect(tabs[1]).toHaveAttribute("tabIndex", "-1");
            expect(tabs[2]).toHaveAttribute("tabIndex", "0");
            expect(tabs.filter((tab) => tab.getAttribute("tabIndex") === "0")).toHaveLength(1);
        });

        it("keeps the tab stop within the visible window", () => {
            render(
                <PageIndicators
                    count={12}
                    activeIndex={0}
                    onChange={vi.fn()}
                    indicatorProps={disableIndices(0, 1, 2, 3, 4)}
                />,
            );

            // Окно 0–4 целиком отключено, ближайший доступный (5) скрыт.
            const tabs = screen.getAllByRole("tab", { hidden: true });
            expect(tabs[5]).toHaveAttribute("aria-hidden", "true");
            expect(tabs.every((tab) => tab.getAttribute("tabIndex") === "-1")).toBe(true);
        });

        it("has no tab stop when all indicators are disabled", () => {
            render(<PageIndicators count={3} activeIndex={0} onChange={vi.fn()} indicatorProps={{ disabled: true }} />);

            expect(screen.getAllByRole("tab").every((tab) => tab.getAttribute("tabIndex") === "-1")).toBe(true);
        });
    });

    describe("visible window", () => {
        it("shows all indicators when count <= 5", () => {
            render(<PageIndicators count={5} activeIndex={0} onChange={vi.fn()} />);
            expect(screen.getAllByRole("tab")).toHaveLength(5);
        });

        it("shows 5 indicators when count > 5 and shifts the window with the active one", () => {
            render(<ControlledPageIndicators count={9} />);
            expect(screen.getAllByRole("tab")).toHaveLength(5);
            expect(screen.getAllByRole("tab", { hidden: true })).toHaveLength(9);

            const list = screen.getByRole("tablist");
            for (let i = 0; i < 6; i++) {
                fireEvent.keyDown(list, { key: "ArrowRight" });
            }

            const visibleTabs = screen.getAllByRole("tab");
            expect(visibleTabs).toHaveLength(5);
            expect(visibleTabs.find((tab) => tab.getAttribute("aria-selected") === "true")).toBeDefined();
            expect(screen.getAllByRole("tab", { hidden: true })[0]).toHaveAttribute("aria-hidden", "true");
        });
    });

    describe("indicatorProps", () => {
        it("applies an object to every indicator", () => {
            render(
                <PageIndicators
                    count={3}
                    activeIndex={0}
                    onChange={vi.fn()}
                    indicatorProps={{ className: "custom-indicator" }}
                />,
            );
            screen.getAllByRole("tab").forEach((tab) => expect(tab).toHaveClass("custom-indicator"));
        });

        it("passes the indicator state to the factory", () => {
            const factory = vi.fn(({ page }: { page: number }) => ({ "aria-label": `Page ${page}` }));
            render(<PageIndicators count={3} activeIndex={1} onChange={vi.fn()} indicatorProps={factory} />);

            expect(factory).toHaveBeenCalledWith({ index: 1, page: 2, selected: true });
            expect(screen.getByRole("tab", { name: "Page 3" })).toBeInTheDocument();
        });

        it("calls onClick from indicatorProps along with onChange", () => {
            const onChange = vi.fn();
            const onClick = vi.fn();
            render(<PageIndicators count={3} activeIndex={0} onChange={onChange} indicatorProps={{ onClick }} />);

            fireEvent.click(screen.getAllByRole("tab")[2]);
            expect(onChange).toHaveBeenCalledWith(2);
            expect(onClick).toHaveBeenCalledTimes(1);
        });
    });

    it("merges className and forwards ref to the root <div>", () => {
        const ref = React.createRef<HTMLDivElement>();
        render(<PageIndicators ref={ref} className="custom" count={2} activeIndex={0} onChange={vi.fn()} />);

        expect(ref.current).toBeInstanceOf(HTMLDivElement);
        expect(ref.current).toHaveClass("custom");
    });
});
