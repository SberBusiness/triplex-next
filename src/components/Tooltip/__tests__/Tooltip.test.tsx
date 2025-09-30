import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeAll, afterAll } from "vitest";
import { Tooltip, ETooltipPreferPlace, ETooltipSize } from "@sberbusiness/triplex-next/components/Tooltip";

const getTargetButton = (name = "Tooltip target") => screen.getByRole("button", { name });

const renderDesktopTooltip = ({
    toggleType = "hover" as const,
    preferPlace = ETooltipPreferPlace.BELOW,
    isOpen,
    onShow,
    toggle,
    label = "Tooltip target",
    body = "Tooltip text",
    link,
    withClose,
}: {
    toggleType?: "hover" | "click";
    preferPlace?: ETooltipPreferPlace;
    isOpen?: boolean;
    onShow?: (node: HTMLDivElement) => void;
    toggle?: (open: boolean) => void;
    label?: string;
    body?: string;
    link?: { text: string; href: string };
    withClose?: boolean;
} = {}) => {
    const targetRef: { current: HTMLElement | null } = {
        current: null,
    } satisfies React.MutableRefObject<HTMLElement | null>;

    render(
        <Tooltip
            size={ETooltipSize.SM}
            toggleType={toggleType}
            preferPlace={preferPlace}
            disableAdaptiveMode
            isOpen={isOpen}
            onShow={onShow}
            toggle={toggle}
            targetRef={targetRef}
        >
            <Tooltip.Target>
                <button
                    type="button"
                    ref={(el) => {
                        targetRef.current = el;
                    }}
                    aria-label={label}
                />
            </Tooltip.Target>
            <Tooltip.Body>
                {body}
                {link ? (
                    <Tooltip.Link href={link.href} target="_blank" rel="noopener noreferrer">
                        {link.text}
                    </Tooltip.Link>
                ) : null}
            </Tooltip.Body>
            {withClose ? <Tooltip.XButton aria-label="Close tooltip" /> : null}
        </Tooltip>,
    );

    return { targetRef };
};

describe("Tooltip (desktop)", () => {
    beforeAll(() => {
        vi.useFakeTimers();
    });

    afterAll(() => {
        vi.useRealTimers();
    });

    it("should be closed by default and open on hover, then close on ESC", () => {
        renderDesktopTooltip();

        const target = getTargetButton();

        expect(screen.queryByText("Tooltip text")).not.toBeInTheDocument();

        fireEvent.mouseEnter(target);
        expect(screen.getByText("Tooltip text")).toBeInTheDocument();

        const bodyEl = screen.getByText("Tooltip text");
        fireEvent.keyDown(bodyEl, { key: "Escape", code: "Escape" });
        act(() => {
            vi.advanceTimersByTime(500);
        });
        expect(screen.queryByText("Tooltip text")).not.toBeInTheDocument();
    });

    it("should toggle by click and close by outside mousedown", () => {
        renderDesktopTooltip({ toggleType: "click" });

        const target = getTargetButton();
        expect(screen.queryByText("Tooltip text")).not.toBeInTheDocument();

        fireEvent.click(target);
        expect(screen.getByText("Tooltip text")).toBeInTheDocument();

        fireEvent.mouseDown(document.body);

        act(() => {
            // wait exit transition to unmount
            vi.advanceTimersByTime(500);
        });
        expect(screen.queryByText("Tooltip text")).not.toBeInTheDocument();
    });

    it("should close on ESC key press when opened", () => {
        renderDesktopTooltip({ toggleType: "click" });
        const target = getTargetButton();
        fireEvent.click(target);

        const bodyEl = screen.getByText("Tooltip text");
        fireEvent.keyDown(bodyEl, { key: "Escape", code: "Escape" });

        act(() => {
            vi.advanceTimersByTime(500);
        });
        expect(screen.queryByText("Tooltip text")).not.toBeInTheDocument();
    });

    it("should call onShow with tooltip node when opened", () => {
        const onShow = vi.fn();
        renderDesktopTooltip({ toggleType: "click", onShow });
        const target = getTargetButton();
        fireEvent.click(target);

        expect(onShow).toHaveBeenCalledTimes(1);
        const nodeArg = onShow.mock.calls[0][0] as HTMLDivElement;
        expect(nodeArg).toBeInstanceOf(HTMLDivElement);
        expect(screen.getByText("Tooltip text")).toBeInTheDocument();
    });

    it("should support controlled mode via isOpen and toggle callback", () => {
        const toggle = vi.fn();
        renderDesktopTooltip({ toggleType: "click", isOpen: true, toggle });

        // Opened initially by controlled prop
        expect(screen.getByText("Tooltip text")).toBeInTheDocument();

        // Clicking should request close via toggle(false)
        const target = getTargetButton();
        fireEvent.click(target);
        expect(toggle).toHaveBeenCalledWith(false);
    });

    it("should render link and close with XButton", () => {
        renderDesktopTooltip({ link: { text: "Подробнее", href: "#" }, withClose: true, toggleType: "click" });
        const target = getTargetButton();
        fireEvent.click(target);

        expect(screen.getByRole("link", { name: "Подробнее" })).toBeInTheDocument();

        const closeBtn = screen.getByRole("button", { name: "Close tooltip" });
        fireEvent.click(closeBtn);

        act(() => {
            vi.advanceTimersByTime(500);
        });
        expect(screen.queryByText("Tooltip text")).not.toBeInTheDocument();
    });
});
