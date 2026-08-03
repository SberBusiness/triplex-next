import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeAll, afterAll } from "vitest";
import { Tooltip, ETooltipPreferPlace, ETooltipSize } from "@sberbusiness/triplex-next/components/Tooltip";

const getTargetButton = (name = "Tooltip target") => screen.getByRole("button", { name });

/** Корневой элемент открытой десктопной подсказки. */
const getTooltipRoot = (body = "Tooltip text") => screen.getByText(body).closest(".tooltipDesktop");

const renderDesktopTooltip = ({
    toggleType = "hover" as const,
    preferPlace = ETooltipPreferPlace.BELOW,
    size = ETooltipSize.SM,
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
    size?: ETooltipSize;
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
            size={size}
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

    it("should close by outside mousedown when mounted already opened", () => {
        const toggle = vi.fn();
        renderDesktopTooltip({ toggleType: "click", isOpen: true, toggle });

        expect(screen.getByText("Tooltip text")).toBeInTheDocument();

        fireEvent.mouseDown(document.body);

        expect(toggle).toHaveBeenCalledWith(false);
    });

    it("should close by ESC when mounted already opened", () => {
        const toggle = vi.fn();
        renderDesktopTooltip({ toggleType: "click", isOpen: true, toggle });

        fireEvent.keyDown(document, { key: "Escape", code: "Escape" });

        expect(toggle).toHaveBeenCalledWith(false);
    });

    it("should not close by outside mousedown inside the tooltip itself", () => {
        const toggle = vi.fn();
        renderDesktopTooltip({ toggleType: "click", isOpen: true, toggle });

        fireEvent.mouseDown(screen.getByText("Tooltip text"));

        expect(toggle).not.toHaveBeenCalled();
    });

    it.each([
        [ETooltipSize.SM, "tooltipSM"],
        [ETooltipSize.LG, "tooltipLG"],
    ])("should apply the size class for %s", (size, expectedClass) => {
        renderDesktopTooltip({ toggleType: "click", isOpen: true, size });

        expect(getTooltipRoot()).toHaveClass(expectedClass);
    });

    it("should mark the tooltip as closable when the close button is passed", () => {
        renderDesktopTooltip({ toggleType: "click", isOpen: true, withClose: true });

        expect(getTooltipRoot()).toHaveClass("closable");
    });

    it("should not mark the tooltip as closable without the close button", () => {
        renderDesktopTooltip({ toggleType: "click", isOpen: true });

        expect(getTooltipRoot()).not.toHaveClass("closable");
    });

    it("should open by hover and stay opened while the cursor is over the target", () => {
        const toggle = vi.fn();
        renderDesktopTooltip({ toggleType: "hover", toggle });

        fireEvent.mouseEnter(getTargetButton());

        expect(toggle).toHaveBeenCalledWith(true);
        expect(screen.getByText("Tooltip text")).toBeInTheDocument();
    });

    it("should close by hover leave after the delay", () => {
        renderDesktopTooltip({ toggleType: "hover" });

        const target = getTargetButton();
        fireEvent.mouseEnter(target);
        expect(screen.getByText("Tooltip text")).toBeInTheDocument();

        fireEvent.mouseLeave(target);

        // Подсказка закрывается не сразу: у пользователя есть время довести курсор до неё.
        expect(screen.getByText("Tooltip text")).toBeInTheDocument();

        act(() => {
            // задержка закрытия по уходу курсора
            vi.advanceTimersByTime(500);
        });
        act(() => {
            // анимация исчезновения
            vi.advanceTimersByTime(500);
        });

        expect(screen.queryByText("Tooltip text")).not.toBeInTheDocument();
    });

    it("should not render the tooltip content while closed", () => {
        renderDesktopTooltip({ toggleType: "click", isOpen: false });

        expect(screen.queryByText("Tooltip text")).not.toBeInTheDocument();
        expect(getTargetButton()).toBeInTheDocument();
    });
});
